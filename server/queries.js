const e = require("cors");
const { log } = require("debug/src/browser");
require("dotenv").config();
const env = process.env;

const jwt = require("jsonwebtoken");
const Pool = require("pg").Pool;
const pool = new Pool({
  user: env.PG_USER,
  host: env.PG_HOST,
  database: env.PG_DATABASE,
  password: env.PG_PASSWORD,
  port: env.PG_PORT,
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

const getRestaurants = (request, response) => {
  const { restaurant_id } = request.params;

  if (restaurant_id) {
    pool.query(
      "SELECT * FROM restaurants WHERE restaurant_id = $1",
      [restaurant_id],
      (error, result) => {
        if (error) {
          response.status(400).send(error);
        } else {
          if (result.rows.length === 0) {
            response
              .status(404)
              .send(`Restaurant with ID ${restaurant_id} not found.`);
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

const createBooking = (request, response) => {
  const user = request.user;
  createBookingInputValidation(request, response);
  const { restaurant_id, datetime, number_of_people } = request.body;
  const startDateTime = new Date(datetime);
  const endDateTime = new Date(startDateTime.getTime() + 5400000); // 1.5 hours later

  //check if restaurant has availabilities for the given datetime and number of people
  pool
    .query(
      "SELECT * FROM reservations WHERE restaurant_id = $1 AND datetime > $2 AND datetime < $3",
      [restaurant_id, datetime, endDateTime]
    )
    .then((result) => {
      const bookings = result.rows;
      const quaterhourcapacity = calculateQuaterHourCapacity(
        bookings,
        datetime,
        endDateTime,
        restaurant_id
      );
      //if all quaterhours have capacity, create booking
      if (
        quaterhourcapacity.every(
          (quaterhourcapacity) => quaterhourcapacity.capacity > number_of_people
        )
      ) {
        pool
          .query(
            "INSERT INTO reservations (guest_id, restaurant_id, datetime, party_size) VALUES ($1, $2, $3, $4) RETURNING reservation_id",
            [user.guest_id, restaurant_id, datetime, number_of_people]
          )
          .then((result) => {
            const reservationId = result.rows[0].reservation_id;
            response.status(201).json({ reservation_id: reservationId });
          })
          .catch((error) => {
            response.status(400).send(error);
          });
      }
    })
    .catch((error) => {
      response.status(400).send(error);
    });
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

const updateRestaurantSettings = (request, response) => {
  const id = request.user.restaurant_id;
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

  //query von chatGPT 3.5
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

const getRestaurantSettings = (request, response) => {
  request.params.restaurant_id = request.user.restaurant_id;
  getRestaurants(request, response);
};

const register = (request, response) => {
  registerInputValidation(request, response);
  if (response.statusCode === 400) {
    return;
  }
  const { username, password, role } = request.body;
  if (role === "guest") {
    pool
      .query("SELECT register_user($1, $2, $3, null, null, null, null, null)", [
        username,
        password,
        role,
      ])
      .then((result) => {
        response.status(201).send(`Guest added`);
      })
      .catch((error) => {
        response.status(400).send(error.detail);
      });
  } else if (role === "restaurant") {
    const { address, city, phone_number, opening_hours, capacity } =
      request.body;
    pool
      .query("SELECT register_user($1, $2, $3, $4, $5, $6, $7, $8)", [
        username,
        password,
        role,
        address,
        city,
        phone_number,
        opening_hours,
        capacity,
      ])
      .then((result) => {
        response.status(201).send(`Restaurant added`);
      })
      .catch((error) => {
        response.status(400).send(error.detail);
      });
  }
};

const login = (request, response) => {
  loginInputValidation(request, response);
  if (response.statusCode === 400) {
    return;
  }
  const { username, password } = request.body;

  pool
    .query("SELECT login_user($1, $2)", [username, password])
    .then((result) => {
      const loginResult = result.rows[0].login_user;
      if (!loginResult) {
        response.status(401).send("Invalid username or password.");
        return;
      }

      const trimmedstring = loginResult.substring(1, loginResult.length - 1);
      const [user_id, id, role] = trimmedstring.split(",");

      var token;
      if (role === "guest") {
        token = jwt.sign(
          {
            user_id: user_id,
            guest_id: id,
            username: username,
            role: role,
          },
          env.JWT_SECRET,
          { expiresIn: "1h" }
        );
      } else if (role === "restaurant") {
        token = jwt.sign(
          {
            user_id: user_id,
            restaurant_id: id,
            username: username,
            role: role,
          },
          env.JWT_SECRET,
          { expiresIn: "1h" }
        );
      }
      const responseObject = {
        token: token,
        role: role,
      };
      response.status(200).json(responseObject);
    })
    .catch((error) => {
      response.status(400).send(error.detail);
    });
};

const getGuestBookings = (request, response) => {
  const guestId = request.user.guest_id;
  pool
    .query("SELECT * FROM get_reservations_for_guest($1)", [guestId])
    .then((result) => {
      response.status(200).json(result.rows);
    })
    .catch((error) => {
      response.status(400).send(error.detail);
    });
};

const deleteBooking = (request, response) => {
  if (request.user.role === "guest") {
    const guestId = request.user.guest_id;
    const reservationId = request.params.booking_id;
    pool
      .query(
        "DELETE FROM reservations WHERE guest_id = $1 AND reservation_id = $2",
        [guestId, reservationId]
      )
      .then(() => {
        response.status(200).send("Reservation deleted successfully");
      })
      .catch((error) => {
        response.status(400).send("Error deleting reservation $1", [error]);
      });
  } else if (request.user.role === "restaurant") {
    const restaurantId = request.user.restaurant_id;
    const reservationId = request.params.booking_id;
    pool
      .query(
        "DELETE FROM reservations WHERE restaurant_id = $1 AND reservation_id = $2",
        [restaurantId, reservationId]
      )
      .then(() => {
        response.status(200).send("Reservation deleted successfully");
      })
      .catch((error) => {
        response.status(400).send("Error deleting reservation $1", [error]);
      });
  }
};

const getRestaurantBookings = (request, response) => {
  const restaurantId = request.user.restaurant_id;
  pool
    .query(
      "SELECT reservation_id, datetime, party_size FROM reservations WHERE restaurant_id = $1",
      [restaurantId]
    )
    .then((result) => {
      response.status(200).json(result.rows);
    })
    .catch((error) => {
      response.status(400).send(error.detail);
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
    const { address, city, phone_number, opening_hours, capacity } =
      request.body;
    if (!city || !address || !phone_number || !opening_hours || !capacity) {
      response.status(400).send("Missing fields for new Restaurant.");
      return;
    }
    const phoneRegex = new RegExp("^\\d{8}$");
    if (!phoneRegex.test(phone_number)) {
      response
        .status(400)
        .send("Invalid phone number. Must be 00000000(8 digits).");
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

const createBookingInputValidation = (request, response) => {
  const { restaurant_id, datetime, number_of_people } = request.body;
  if (!restaurant_id || !datetime || !number_of_people) {
    response.status(400).send("Missing fields.");
    return;
  }
  const regex = new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}$");
  if (!regex.test(datetime)) {
    response.status(400).send("Invalid date format. Must be DD.MM.YYYYTHH:MM");
    return;
  }
  if (number_of_people < 1) {
    response.status(400).send("Invalid number of people.");
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
  getRestaurantSettings,
  getGuestBookings,
  deleteBooking,
  getRestaurantBookings,
};
