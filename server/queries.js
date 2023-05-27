const { log } = require("debug/src/browser");

const jwt = require("jsonwebtoken");
const Pool = require("pg").Pool;
const pool = new Pool({
  user: "tischify",
  host: "online24.myfirewall.org",
  database: "tischify",
  password: "tischify",
  port: 5432,
});
// #region Api Functions
const getUsers = (request, response) => {
  pool.query("SELECT * FROM users", (error, results) => {
    if (error) {
      response.status(400).send(error);
    } else {
      response.status(200).json(results.rows);
    }
  });
};

const getUserById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    "SELECT * FROM users WHERE user_id = $1",
    [id],
    (error, results) => {
      if (error) {
        response.status(400).send(error);
      } else {
        response.status(200).json(results.rows);
      }
    }
  );
};

const createBooking = (request, response) => {
  const user = request.user;
  const { restaurant_id, date, time, number_of_people } = request.body;
};

const getRestaurants = (request, response) => {
  pool.query("SELECT * FROM restaurants", (error, results) => {
    if (error) {
      response.status(400).send(error);
    } else {
      response.status(200).json(results.rows);
    }
  });
};

const getRestaurantAvailabilities = (request, response) => {
  getRestaurantAvailabilitiesInputValidation(request, response);
  if (response.statusCode === 400) {
    return;
  }

  const { restaurant_id, startDateTime, endDateTime } = request.body;
  pool
    .query(
      "SELECT * FROM reservations WHERE restaurant_id = $1 And datetime > $2 And datetime < $3",
      [restaurant_id, startDateTime, endDateTime]
    )
    .then((result) => {
      response.status(200).json(result.rows);
    })
    .catch((error) => {
      response.status(400).send(error);
    });
};

const register = (request, response) => {
  registerInputValidation(request, response);
  if (response.statusCode === 400) {
    return;
  }
  const { username, password, role } = request.body;

  pool
    .query("INSERT INTO users (username, password, role) VALUES ($1, $2, $3)", [
      username,
      password,
      role,
    ])
    .then((result) => {
      pool
        .query("SELECT * FROM users WHERE username = $1", [username])
        .then((result) => {
          const user_id = result.rows[0].user_id;
          if (role === "guest") {
            pool
              .query("INSERT INTO guests (user_id) VALUES ($1)", [user_id])
              .then((result) => {
                response.status(201).send(`Guest added`);
              })
              .catch((error) => {
                response.status(400).send(error);
              });
          } else if (role === "restaurant") {
            const { restaurant_name, address, phone_number, opening_hours } =
              request.body;
            pool
              .query(
                "INSERT INTO restaurants (user_id, name, address, phone_number, opening_hours) VALUES ($1, $2, $3, $4, $5)",
                [user_id, restaurant_name, address, phone_number, opening_hours]
              )
              .then((result) => {
                response.status(201).send(`Restaurant added`);
              })
              .catch((error) => {
                response.status(400).send(error);
              });
          }
        })
        .catch((error) => {
          response.status(400).send(error);
        });
    })
    .catch((error) => {
      if (error.detail.startsWith("Key (username)")) {
        response.status(400).send("Username already exists.");
      } else {
        response.status(402).send(error);
      }
    });
};

const login = (request, response) => {
  loginInputValidation(request, response);
  if (response.statusCode === 400) {
    return;
  }
  const { username, password } = request.body;

  //query for finding the entry in the table users where the username = username
  pool
    .query("SELECT * FROM users WHERE username = $1", [username])
    .then((result) => {
      if (result.rowCount === 0) {
        response.status(401).send("Username does not exist.");
        return;
      }
      const db_password = result.rows[0].password;
      if (db_password !== password) {
        response.status(401).send("Wrong password.");
        return;
      }
      const user_id = result.rows[0].user_id;
      const token = jwt.sign(
        { id: user_id, username: username },
        "yourSecretKey",
        { expiresIn: "1h" }
      );
      response.status(200).json(token);
    });
};
// #endregion Api Functions

// #region Helper Functions
const registerInputValidation = (request, response) => {
  const { username, password, role } = request.body;

  if (!username || !password || !role) {
    response.status(400).send("Missing fields.");
    return;
  }

  if (role !== "guest" && role !== "restaurant") {
    response.status(400).send("Invalid role.");
    return;
  }

  if (role === "restaurant") {
    const { restaurant_name, address, phone_number, opening_hours } =
      request.body;
    if (!restaurant_name || !address || !phone_number || !opening_hours) {
      response.status(400).send("Missing fields for new Restaurant.");
      return;
    }
    const regex = new RegExp(
      "^([0-1]?[0-9]|2[0-3]):[0-5][0-9]-([0-1]?[0-9]|2[0-3]):[0-5][0-9]$"
    );
    if (!regex.test(opening_hours)) {
      response.status(400).send("Invalid opening hours. Must be HH:MM-HH:MM.");
      return;
    }
  }
};

const loginInputValidation = (request, response) => {
  const { username, password } = request.body;
  if (!username || !password) {
    response.status(400).send("Missing fields.");
    return;
  }
};

const getRestaurantAvailabilitiesInputValidation = (request, response) => {
  const { restaurant_id, startDateTime, endDateTime } = request.body;
  if (!restaurant_id || !startDateTime || !endDateTime) {
    response.status(400).send("Missing fields.");
    return;
  }
  const regex = new RegExp("^\\d{2}.\\d{2}.\\d{4} \\d{2}:\\d{2}$");
  if (!regex.test(startDateTime) || !regex.test(endDateTime)) {
    response.status(400).send("Invalid date format. Must be DD.MM.YYYY HH:MM");
    return;
  }
};
// #endregion Helper Functions

module.exports = {
  getUsers,
  getUserById,
  createBooking,
  register,
  login,
  getRestaurantAvailabilities,
  getRestaurants,
};
