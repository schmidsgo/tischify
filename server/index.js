const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./queries");
const dummyData = require("./dummyData.js");
const app = express();
const port = 3000;

app.use(cors());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

app.get("/users", db.getUsers);

app.get("/users/:id", db.GetUserById);

app.get("/restaurants", dummyData.getRestaurants);

app.post("/users", db.CreateUser);

//TODO: add a logic for bookings
app.post("/bookings", db.CreateBooking);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
