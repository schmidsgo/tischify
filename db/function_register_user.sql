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
