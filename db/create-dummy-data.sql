INSERT INTO users (username, password, role)
VALUES
  ('guest1', 'guest1', 'guest'),
  ('guest2', 'guest2', 'guest'),
  ('guest3', 'guest3', 'guest'),
  ('restaurant1', 'restaurant1', 'restaurant'),
  ('restaurant2', 'restaurant2', 'restaurant'),
  ('restaurant3', 'restaurant3', 'restaurant');

INSERT INTO guests (user_id)
VALUES
  (1),
  (2),
  (3);

INSERT INTO restaurants (user_id, name, address, phone_number, opening_hours)
VALUES
  (4, 'Restaurant 1', 'Adresse 1', '0123456789', '10:00-22:00'),
  (5, 'Restaurant 2', 'Adresse 2', '0123456789', '10:00-22:00'),
  (6, 'Restaurant 3', 'Adresse 3', '0123456789', '10:00-22:00');

INSERT INTO reservations (guest_id, restaurant_id, datetime, party_size)
VALUES
  (1, 1, '2021-01-01 12:00:00', 2),
  (2, 2, '2021-01-01 12:00:00', 2),
  (3, 3, '2021-01-01 12:00:00', 2);
