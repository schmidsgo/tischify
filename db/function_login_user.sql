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