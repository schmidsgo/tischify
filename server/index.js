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

app.get("/guests/bookings", authMiddleware, db.getGuestBookings);

app.delete("/guests/bookings/:booking_id", authMiddleware, db.deleteBooking);

app.post("/bookings", authMiddleware, db.createBooking);

app.get("/restaurants/settings/", authMiddleware, db.getRestaurantSettings);

app.get("/restaurants/availabilities", db.getRestaurantAvailabilities);

app.put("/restaurants/settings/", authMiddleware, db.updateRestaurantSettings);

app.get("/restaurants/:restaurant_id?", db.getRestaurants);

app.post("/login", db.login);

app.post("/register", db.register);

app.get("/protected", authMiddleware, (req, res) => {
  res.send("You are authenticated");
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
