CREATE OR REPLACE FUNCTION login_user(
  p_username VARCHAR(255),
  p_password VARCHAR(255)
)
RETURNS INTEGER AS $$
DECLARE
  v_user_id INTEGER;
BEGIN
  -- Check if the username and password match
  SELECT user_id INTO v_user_id
  FROM users
  WHERE username = p_username AND password = crypt(p_password, password);

  -- Return the user_id if the login is successful
  IF v_user_id IS NOT NULL THEN
    RETURN v_user_id;
  ELSE
    RETURN NULL;
  END IF;
END;
$$ LANGUAGE plpgsql;
