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

module.exports = {
  getUsers,
  getUserById,
  createUser,
  createBooking,
};
