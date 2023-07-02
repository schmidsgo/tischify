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
  location VARCHAR(255) NOT NULL,
  category VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  phone_number VARCHAR(255) NOT NULL,
  opening_hours VARCHAR(255) NOT NULL,
  capacity INTEGER,
  category VARCHAR(255),
  rating INTEGER,
  price_level INTEGER,
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

INSERT INTO users (username, password, role) VALUES
('guest1', '$2a$10$19t52R.ky6wiX63W3OUhJukB5K8/tsGGPYw9zwwdeXaoXO57Xf9c2', 'guest'),
('guest2', '$2a$10$wSOf29UDAoKRCc8HifZT1uFnxZDAJYkz1OXvk18QmyUPfjtRiPJ32', 'guest'),
('guest3', '$2a$10$x2JHoIyH.vfxXL0tuLESEO9r3KbVqfcCWrOdQqq5VC6X/UlM0clfq', 'guest'),
('guest4', '$2a$10$xTCfFW/ArYKOrQr5Gf4h6uopx5SqPuNZCsz5C8BIO1sr5lC.zp9de', 'guest'),
('guest5', '$2a$10$VAJA0us8mGknmj/uFdKNC.4k8dg6qTuyK3tsYjR1RD7lGUt9J1Ju6', 'guest'),
('restaurant1', '$2a$10$7J/5XkRgXN3PTcyDcvi1KugaTGlGpdWnxoYixyXoBOtMrP8UJFrIG', 'restaurant'),
('restaurant2', '$2a$10$jPTTdtijBQoVPCspXF8.V.VlsclGfpIWpUJvx2ts4tWHZ7Ahpxeyy', 'restaurant'),
('restaurant3', '$2a$10$lcvwYBhPTr5zY1RcFy6dLuWfW96ecztGWvZrJ9qzn11k1lSAEFRzO', 'restaurant'),
('restaurant4', '$2a$10$7RXPG2/fZTCA3idTrv3msOgVBdw6iEq4mxCIlogw.i6uf.hvYK9Gu', 'restaurant'),
('restaurant5', '$2a$10$8rgJQOtsuZ/.wV0AYRI65OjbPV0bTy4MXbrQ5gHi8iqwvp/1EbDPe', 'restaurant'),
('restaurant6', '$2a$10$2.NXUHFukGXEUl1/Roa/bOux/O.MHrK04qr5BvdiyyV.ue8PO.l7y', 'restaurant'),
('restaurant7', '$2a$10$wU2s8IahYvgwSjD1E8UN8enBsbUBR8HQ6OfYQMEGRBsKj.sVp9m2O', 'restaurant'),
('restaurant8', '$2a$10$z7MyIlPemVIAGPRjZWZ4x.N7VYfuQTf0mF.Yir5obJ4MQQyyMfFE6', 'restaurant'),
('restaurant9', '$2a$10$2W6.T71AulfuJcZRYqYtOumdm8gC1EWXIxWhZEscSGRgO5u6t/yXK', 'restaurant'),
('restaurant10', '$2a$10$qbtXxNic4UtK450rAA97R.ksRWHcNIRnA3GjESuHH3exOxfNt1pxa', 'restaurant'),
('restaurant11', '$2a$10$pWnjmvGiDSJuSy84XBvRFuPiEXltXDnSndHYRb5hLFDWvwGwlbl8.', 'restaurant'),
('restaurant12', '$2a$10$DckcYdWMcoZI5m3N0cCkHefPUqUXoHonp/LdaH6c/GddWHQ1ftyE2', 'restaurant'),
('restaurant13', '$2a$10$s.Rq4LsQWgaRk4P.G97nd.l9VLbOYtrV5M/XE7m7kitTtM.pLo4DG', 'restaurant'),
('restaurant14', '$2a$10$Hu0o.OE.RhH3MHcjCMSmQ.5jO6Y6s/qM3bmgUyhaIsGvyfh./d25.', 'restaurant'),
('restaurant15', '$2a$10$WumvSPjEIiFWqPWVXDZc0uHk3CsswOxcxRnwQOOx.A4YNTbDdBcmS', 'restaurant'),
('restaurant16', '$2a$10$N3/8HVSs0bdn.zYrEYRMX.FxQjg0DV6YpIq9Kk9s2TGyyAMDSClAq', 'restaurant'),
('restaurant17', '$2a$10$.wO7FUkKvryWc.1GPB7s8OsWvhMsGQqHUEBJ4w58AZHWFEpxsxiUe', 'restaurant'),
('restaurant18', '$2a$10$ZQXzKekSUlpwJkSGVy.CtusS/mIi6gV9qezWv7CI1nY0JvP889uf.', 'restaurant'),
('restaurant19', '$2a$10$f6EbmvVJz5aiBa.gU3udFewptHQk/.cwlPVHYG54z1kLwniWMxZgO', 'restaurant'),
('restaurant20', '$2a$10$jbihY1aO0jAf5LXvZaBtEeQltk48.8iHfTvftKyswdxYp6kDynCPu', 'restaurant'),
('restaurant21', '$2a$10$hN5hsLTddjVCv.Ebev6oxOenQ089PCLcncen5hIU43HbFkfDHI8OW', 'restaurant'),
('restaurant22', '$2a$10$d9DBYGU2vdfbSBT9FzGACOkYO41lnkpTK0CkWwQXvuzO1R1Tckrjy', 'restaurant'),
('restaurant23', '$2a$10$.V37aCfJXaEWTrabYoyzNOFTz9B7AqHrk7PkecKSAFfDxBRJMK3xq', 'restaurant'),
('restaurant24', '$2a$10$jfnD18jyTgrbZUQMCk1XhueSQOKNR6zFJTndHyoXQX3E8V.uldKLe', 'restaurant'),
('restaurant25', '$2a$10$S1VuAPADaM7eTQ4CB3WqOeCna58dpY2AjQ5mjVX0DUDd4dzO8DfFK', 'restaurant'),
('restaurant26', '$2a$10$yRxBSuW703es/nODOCKgDuvKPpQupyrIRID3zQPcQrcDnrQzn5xhm', 'restaurant'),
('restaurant27', '$2a$10$uw2p/t7QXE6orxEZ3xrP.uPno4o6egNeb9EeJqGFoH8Vc5aIvpx9q', 'restaurant'),
('restaurant28', '$2a$10$ZJ8jdw6xQI/GzpkMXkb8leNfWfjS6KlnOFTd/ri8WYn5DwWjDSWXm', 'restaurant'),
('restaurant29', '$2a$10$9x2zmDc31OndIN4ANq8Q4eoI0ra1ZTbbCB6/YsqTvxu2/W1MpFS32', 'restaurant'),
('restaurant30', '$2a$10$ZdU8jqDLVnXFeZXu5CS49OIzgY7VyqD.fDJjG9VureX3DNWbaauhq', 'restaurant');
INSERT INTO guests (user_id) VALUES
(1),
(2),
(3),
(4),
(5);
INSERT INTO restaurants (user_id, name, city, category, address, rating, price_level, phone_number, opening_hours) VALUES
(6, 'restaurant1', 'Essen', 'cafe', 'address-str.1', '2', '3', '0851/2629', '10:00-22:00'),
(7, 'restaurant2', 'Dortmund', 'cafe', 'address-str.2', '2', '2', '0415/5541', '11:00-23:00'),
(8, 'restaurant3', 'Wuppertal', 'bar', 'address-str.3', '4', '2', '0446/564', '08:00-20:00'),
(9, 'restaurant4', 'Nürnberg', 'bar', 'address-str.4', '3', '2', '0945/7418', '10:00-22:00'),
(10, 'restaurant5', 'Köln', 'restaurant', 'address-str.5', '4', '3', '0211/30', '11:00-23:00'),
(11, 'restaurant6', 'Düsseldorf', 'bar', 'address-str.6', '1', '3', '0598/4125', '08:00-20:00'),
(12, 'restaurant7', 'Frankfurt', 'restaurant', 'address-str.7', '2', '3', '0453/3495', '10:00-22:00'),
(13, 'restaurant8', 'Bremen', 'cafe', 'address-str.8', '3', '3', '096/4991', '11:00-23:00'),
(14, 'restaurant9', 'Hamburg', 'bar', 'address-str.9', '4', '1', '0118/7685', '08:00-20:00'),
(15, 'restaurant10', 'Bielefeld', 'cafe', 'address-str.10', '3', '1', '0119/4176', '10:00-22:00'),
(16, 'restaurant11', 'München', 'restaurant', 'address-str.11', '3', '1', '0873/260', '11:00-23:00'),
(17, 'restaurant12', 'Berlin', 'restaurant', 'address-str.12', '5', '1', '0804/8581', '08:00-20:00'),
(18, 'restaurant13', 'Köln', 'bar', 'address-str.13', '5', '1', '0369/1160', '10:00-22:00'),
(19, 'restaurant14', 'Berlin', 'restaurant', 'address-str.14', '5', '2', '0996/7397', '11:00-23:00'),
(20, 'restaurant15', 'Köln', 'cafe', 'address-str.15', '1', '3', '0922/5925', '08:00-20:00'),
(21, 'restaurant16', 'Dortmund', 'restaurant', 'address-str.16', '5', '2', '0373/3773', '10:00-22:00'),
(22, 'restaurant17', 'Bremen', 'cafe', 'address-str.17', '5', '1', '0887/3022', '11:00-23:00'),
(23, 'restaurant18', 'Hamburg', 'cafe', 'address-str.18', '5', '1', '0223/7092', '08:00-20:00'),
(24, 'restaurant19', 'Münster', 'restaurant', 'address-str.19', '5', '1', '0215/6472', '10:00-22:00'),
(25, 'restaurant20', 'Frankfurt', 'bar', 'address-str.20', '1', '3', '0971/7156', '11:00-23:00'),
(26, 'restaurant21', 'Frankfurt', 'restaurant', 'address-str.21', '4', '2', '0274/2238', '08:00-20:00'),
(27, 'restaurant22', 'Frankfurt', 'restaurant', 'address-str.22', '5', '1', '0544/9386', '10:00-22:00'),
(28, 'restaurant23', 'Leipzig', 'bar', 'address-str.23', '2', '3', '0512/7569', '11:00-23:00'),
(29, 'restaurant24', 'Wuppertal', 'cafe', 'address-str.24', '2', '1', '044/446', '08:00-20:00'),
(30, 'restaurant25', 'Dresden', 'restaurant', 'address-str.25', '3', '1', '0686/4574', '10:00-22:00'),
(31, 'restaurant26', 'Dortmund', 'bar', 'address-str.26', '5', '1', '0887/4786', '11:00-23:00'),
(32, 'restaurant27', 'Münster', 'cafe', 'address-str.27', '3', '2', '0956/7044', '08:00-20:00'),
(33, 'restaurant28', 'Düsseldorf', 'bar', 'address-str.28', '5', '1', '0103/7139', '10:00-22:00'),
(34, 'restaurant29', 'Frankfurt', 'cafe', 'address-str.29', '1', '3', '0951/7367', '11:00-23:00'),
(35, 'restaurant30', 'Berlin', 'restaurant', 'address-str.30', '1', '3', '0549/4271', '08:00-20:00');
INSERT INTO reservations (guest_id, restaurant_id, datetime, party_size) VALUES
(1, 30, '2023-05-28 14:30:00', 6),
(1, 29, '2023-05-26 02:30:00', 1),
(2, 27, '2023-05-31 01:30:00', 8),
(2, 28, '2023-05-27 18:00:00', 1),
(2, 8, '2023-05-26 04:00:00', 5),
(2, 15, '2023-05-30 08:00:00', 5),
(2, 21, '2023-05-30 08:30:00', 3),
(3, 29, '2023-05-26 08:30:00', 10),
(4, 26, '2023-05-27 03:30:00', 1),
(5, 29, '2023-05-26 11:30:00', 6),
(5, 6, '2023-05-31 06:30:00', 7),
(5, 3, '2023-05-26 08:30:00', 5),
(5, 22, '2023-05-28 12:30:00', 2);

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE OR REPLACE FUNCTION register_user(
  p_username VARCHAR(255),
  p_password VARCHAR(255),
  p_role VARCHAR(255),
  p_address VARCHAR(255),
  p_city VARCHAR(255),
  p_phone_number VARCHAR(255),
  p_opening_hours VARCHAR(255),
  p_capacity INTEGER
)
RETURNS JSON AS $$
DECLARE
  v_user_id INTEGER;
  v_restaurant_id INTEGER;
  v_phone_regex TEXT := '^\d{8}$';
  v_opening_hours_regex TEXT := '^([0-1]?[0-9]|2[0-3]):[0-5][0-9]-([0-1]?[0-9]|2[0-3]):[0-5][0-9]$';
BEGIN
  -- Validate input fields
  IF p_username IS NULL OR p_password IS NULL OR p_role IS NULL THEN
    RAISE EXCEPTION 'Missing fields.';
  END IF;

  -- Validate role
  IF p_role <> 'guest' AND p_role <> 'restaurant' THEN
    RAISE EXCEPTION 'Invalid role.';
  END IF;

  IF p_role = 'restaurant' THEN
    -- Validate additional fields for restaurant registration
    IF p_city IS NULL OR p_address IS NULL OR p_phone_number IS NULL OR p_opening_hours IS NULL OR p_capacity IS NULL THEN
      RAISE EXCEPTION 'Missing fields for new restaurant.';
    END IF;

    -- Validate phone number format
    IF NOT p_phone_number ~ v_phone_regex THEN
      RAISE EXCEPTION 'Invalid phone number. Must be 00000000 (8 digits).';
    END IF;

    -- Validate opening hours format
    IF NOT p_opening_hours ~ v_opening_hours_regex THEN
      RAISE EXCEPTION 'Invalid opening hours. Must be HH:MM-HH:MM.';
    END IF;
  END IF;

  -- Encrypt the password
  p_password := crypt(p_password, gen_salt('bf'));

  -- Insert the user into the users table
  INSERT INTO users (username, password, role)
  VALUES (p_username, p_password, p_role)
  RETURNING user_id INTO v_user_id;

  -- Check the role and perform the necessary actions
  IF p_role = 'guest' THEN
    -- Insert the guest into the guests table
    INSERT INTO guests (user_id)
    VALUES (v_user_id)
    RETURNING guest_id INTO v_restaurant_id;

  ELSIF p_role = 'restaurant' THEN
    -- Insert the restaurant into the restaurants table
    INSERT INTO restaurants (user_id, name, city, category, address, phone_number, opening_hours, capacity)
    VALUES (v_user_id, p_username, p_city, 'N/A', p_address, p_phone_number, p_opening_hours, p_capacity)
    RETURNING restaurant_id INTO v_restaurant_id;

  ELSE
    -- Return an error if the role is invalid
    RAISE EXCEPTION 'Invalid role: %', p_role;
  END IF;

  -- Construct the JSON response
  RETURN json_build_object('user_id', v_user_id, 'restaurant_id', v_restaurant_id);

END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION login_user(
  p_username VARCHAR(255),
  p_password VARCHAR(255)
)
RETURNS TABLE (user_id INTEGER, id INTEGER, role VARCHAR(255)) AS $$
BEGIN
  -- Declare variables
  DECLARE
    v_user_id INTEGER;
    v_guest_id INTEGER;
    v_restaurant_id INTEGER;
    v_role VARCHAR(255);
    v_username VARCHAR(255);
  BEGIN
    -- Check if the username and password match
    SELECT u.user_id, r.restaurant_id, g.guest_id, u.role, u.username
    INTO v_user_id, v_restaurant_id, v_guest_id, v_role, v_username
    FROM users u
    LEFT JOIN restaurants r ON u.user_id = r.user_id
    LEFT JOIN guests g ON u.user_id = g.user_id
    WHERE u.username = p_username AND u.password = crypt(p_password, u.password);

    -- Return the user ID, ID (guest or restaurant), role, and username if the login is successful
    IF v_user_id IS NOT NULL THEN
      IF v_role = 'guest' THEN
        RETURN QUERY SELECT v_user_id, v_guest_id, v_role;
      ELSIF v_role = 'restaurant' THEN
        RETURN QUERY SELECT v_user_id, v_restaurant_id, v_role;
      END IF;
    END IF;

    -- Return empty result if login fails
    RETURN;
  END;
END;
$$ LANGUAGE plpgsql;
CREATE OR REPLACE FUNCTION get_reservations_for_guest(p_guest_id INTEGER)
RETURNS TABLE (
  reservation_id INTEGER,
  datetime TIMESTAMP,
  party_size INTEGER,
  restaurant_name VARCHAR(255),
  restaurant_category VARCHAR(255)
) AS $$
BEGIN
  RETURN QUERY
    SELECT r.reservation_id, r.datetime, r.party_size, rest.name AS restaurant_name, rest.category AS restaurant_category
    FROM reservations r
    JOIN restaurants rest ON r.restaurant_id = rest.restaurant_id
    WHERE r.guest_id = p_guest_id;
END;
$$ LANGUAGE plpgsql;