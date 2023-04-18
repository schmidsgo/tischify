const Pool = require("pg").Pool;
const pool = new Pool({
  user: "tischify",
  host: "localhost",
  database: "tischify",
  password: "tischify",
  port: 5432,
});

const getUsers = (request, response) => {
  pool.query("SELECT * FROM users", (error, results) => {
    if (error) {
      response.status(400).send(error);
    }
    response.status(200).json(results.rows);
  });
};

const GetUserById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    "SELECT * FROM users WHERE user_id = $1",
    [id],
    (error, results) => {
      if (error) {
        response.status(400).send(error);
      }
      response.status(200).json(results.rows);
    }
  );
};

const CreateUser = (request, response) => {
  const { email, password, role } = request.body;

  pool.query(
    "INSERT INTO users (email, password, role) VALUES ($1, $2, $3)",
    [email, password, role],
    (error, results) => {
      if (error) {
        response.status(400).send(error);
      }
      response.status(201).send(`User added with ID: ${results.insertId}`);
    }
  );
};

module.exports = {
  getUsers,
  GetUserById,
  CreateUser,
};
