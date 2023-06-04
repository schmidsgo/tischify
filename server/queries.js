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
  const { id } = request.params;

  if (id) {
    pool.query(
      "SELECT * FROM restaurants WHERE restaurant_id = $1",
      [id],
      (error, result) => {
        if (error) {
          response.status(400).send(error);
        } else {
          if (result.rows.length === 0) {
            response.status(404).send(`Restaurant with ID ${id} not found.`);
          } else {
            response.status(200).json(result.rows[0]);
          }
        }
      }
    );
  } else {
    pool.query("SELECT * FROM restaurants", (error, results) => {
      if (error) {
        response.status(400).send(error);
      } else {
        response.status(200).json(results.rows);
      }
    });
  }
};

const getRestaurantAvailabilities = (request, response) => {
  getRestaurantAvailabilitiesInputValidation(request, response);
  if (response.statusCode === 400) {
    return;
  }

  const { restaurant_id, startDateTime, endDateTime, party_size } =
    request.body;
  const defaultPartySize = party_size || 2;

  pool
    .query(
      "SELECT * FROM reservations WHERE restaurant_id = $1 AND datetime > $2 AND datetime < $3",
      [restaurant_id, startDateTime, endDateTime]
    )
    .then((result) => {
      const bookings = result.rows;
      pool
        .query("SELECT capacity FROM restaurants WHERE restaurant_id = $1", [
          restaurant_id,
        ])
        .then((result) => {
          const capacity = result.rows[0].capacity;
          const quaterhourcapacity = calculateQuaterHourCapacity(
            bookings,
            startDateTime,
            endDateTime,
            capacity
          );
          const availabilities = calculateRestaurantAvailabilities(
            quaterhourcapacity,
            defaultPartySize
          );
          response.status(200).json(availabilities);
        })
        .catch((error) => {
          response.status(400).send(error);
        });
    })
    .catch((error) => {
      response.status(400).send(error);
    });
};

const updateRestaurantSettings = (request, response) => {
  const { id } = request.params;
  const {
    name,
    address,
    city,
    phone_number,
    opening_hours,
    capacity,
    category,
    rating,
    price_level,
  } = request.body;

  const allowedFields = [
    "name",
    "address",
    "city",
    "phone_number",
    "opening_hours",
    "capacity",
    "category",
    "rating",
    "price_level",
  ];

  const updatedData = Object.entries(request.body)
    .filter(([key]) => allowedFields.includes(key))
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

  if (Object.keys(updatedData).length === 0) {
    response.status(400).send("No valid fields to update.");
    return;
  }

  pool.query(
    `UPDATE restaurants SET ${Object.keys(updatedData)
      .map((field, index) => `${field} = $${index + 1}`)
      .join(", ")} WHERE restaurant_id = $${
      Object.keys(updatedData).length + 1
    }`,
    [...Object.values(updatedData), id],
    (error) => {
      if (error) {
        response.status(400).send(error);
      } else {
        response
          .status(200)
          .send(
            `Restaurant settings updated successfully for restaurant with ID ${id}`
          );
      }
    }
  );
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

function calculateQuaterHourCapacity(
  bookings,
  startDateTime,
  endDateTime,
  capacity
) {
  startDateTime = new Date(startDateTime);
  endDateTime = new Date(endDateTime);
  const quaterhourcapacity = [];
  const quaterhour = 15 * 60 * 1000;
  const quaterhourstart = startDateTime.getTime();
  const quaterhourend = endDateTime.getTime();
  const quaterhourlength = quaterhourend - quaterhourstart;
  const quaterhourcount = quaterhourlength / quaterhour;
  for (let i = 0; i < quaterhourcount; i++) {
    const timeslot = {
      capacity: capacity,
      datetime: new Date(quaterhourstart + i * quaterhour),
    };
    quaterhourcapacity.push(timeslot);
  }
  for (let i = 0; i < bookings.length; i++) {
    const bookingstart = new Date(bookings[i].datetime).getTime();
    const bookinglength = 1000 * 60 * 90; // 90 minutes
    const bookingcount = bookinglength / quaterhour;
    const bookingstartindex = (bookingstart - quaterhourstart) / quaterhour;
    for (let j = 0; j < bookingcount; j++) {
      quaterhourcapacity[bookingstartindex + j].capacity -=
        bookings[i].party_size;
    }
  }
  return quaterhourcapacity;
}

function calculateRestaurantAvailabilities(quaterhourcapacity, party_size) {
  const validStartingTimes = [];

  for (let i = 0; i < quaterhourcapacity.length; i++) {
    const timeslot = quaterhourcapacity[i];
    const nextSlots = quaterhourcapacity.slice(i + 1, i + 7);
    if (
      timeslot.capacity >= party_size &&
      nextSlots.every((slot) => slot.capacity >= party_size) &&
      nextSlots.length >= 6
    ) {
      validStartingTimes.push(timeslot.datetime);
    }
  }

  return validStartingTimes;
}

// #endregion Helper Functions

module.exports = {
  getUsers,
  getUserById,
  createBooking,
  register,
  login,
  getRestaurantAvailabilities,
  getRestaurants,
  updateRestaurantSettings,
};
