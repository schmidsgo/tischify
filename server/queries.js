const Pool = require("pg").Pool;
const pool = new Pool({
  user: "tischify",
  host: "online24.myfirewall.org",
  database: "tischify",
  password: "tischify",
  port: 5432,
});

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

const createUser = (request, response) => {
  const { email, password, role } = request.body;

  pool.query(
    "INSERT INTO users (email, password, role) VALUES ($1, $2, $3)",
    [email, password, role],
    (error, results) => {
      if (error) {
        response.status(400).send(error);
      } else {
        response.status(201).send(`User added with ID: ${results.insertId}`);
      }
    }
  );
};

const createBooking = (request, response) => {
  const { user_id, restaurant_id, date, time, guests } = request.body;
  pool.query(
    "INSERT INTO bookings (user_id, restaurant_id, date, time, guests) VALUES ($1, $2, $3, $4, $5)",
    [user_id, restaurant_id, date, time, guests],
    (error, result) => {
      if (error) {
        response.status(400).send(error);
      }
    }
  );
};

const register = (request, response) => {
  // Input validation
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
    const { restaurant_name, address, phone, opening_hours } = request.body;
    if (!restaurant_name || !address || !phone || !opening_hours) {
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

  pool
    .query("INSERT INTO users (username, password, role) VALUES ($1, $2, $3)", [
      username,
      password,
      role,
    ])
    .then((result) => {
      console.log(result);
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
            pool
              .query(
                "INSERT INTO restaurants (user_id, restaurant_name, address, phone, opening_hours) VALUES ($1, $2, $3, $4, $5)",
                [user_id, restaurant_name, address, phone, opening_hours]
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
      //if detail starts with "Key (username)= "
      if (error.detail.startsWith("Key (username)")) {
        response.status(400).send("Username already exists.");
      } else {
        response.status(402).send(error);
      }
    });
};

module.exports = {
  getUsers,
  getUserById,
  createBooking,
  register,
};
