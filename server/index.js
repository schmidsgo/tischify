const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./queries");
const authMiddleware = require("./authMiddleware.js");
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

app.get("/users/:id", db.getUserById);

app.get("/restaurants/:restaurant_id?", db.getRestaurants);

app.get("/restaurants/availabilities", db.getRestaurantAvailabilities);

app.put("/restaurants/settings/", authMiddleware, db.updateRestaurantSettings);

// app.get("/restaurant/settings/", authMiddleware, db.getRestaurantSettings);

app.post("/bookings", db.createBooking);

app.post("/login", db.login);

app.post("/register", db.register);

app.get("/protected", authMiddleware, (req, res) => {
  res.send("You are authenticated");
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
