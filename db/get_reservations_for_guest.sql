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