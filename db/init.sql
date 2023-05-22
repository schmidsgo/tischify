-- Erstellen der Benutzertabelle
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL
);

-- Erstellen der Gästetabelle
CREATE TABLE guests (
  guest_id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (user_id)
);

-- Erstellen der Restauranttabelle
CREATE TABLE restaurants (
  restaurant_id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  phone_number VARCHAR(255) NOT NULL,
  opening_hours VARCHAR(255) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (user_id)
);

-- Erstellen der Reservierungstabelle
CREATE TABLE reservations (
  reservation_id SERIAL PRIMARY KEY,
  guest_id INTEGER NOT NULL,
  restaurant_id INTEGER NOT NULL,
  datetime TIMESTAMP NOT NULL,
  party_size INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (guest_id) REFERENCES guests (guest_id),
  FOREIGN KEY (restaurant_id) REFERENCES restaurants (restaurant_id)
);

-- -- Erstellen der Verfügbarkeitstabelle für Restaurants
-- CREATE TABLE restaurant_availabilities (
--   availability_id SERIAL PRIMARY KEY,
--   restaurant_id INTEGER NOT NULL,
--   start_time TIME NOT NULL,
--   end_time TIME NOT NULL,
--   max_party_size INTEGER NOT NULL,
--   FOREIGN KEY (restaurant_id) REFERENCES restaurants (restaurant_id)
-- );
