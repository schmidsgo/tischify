DO $$DECLARE
    tables CURSOR FOR
        SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname='public';
BEGIN
    FOR table_rec IN tables LOOP
        EXECUTE 'TRUNCATE TABLE ' || table_rec.tablename || ' CASCADE;';
    END LOOP;
END$$;

ALTER SEQUENCE users_user_id_seq RESTART WITH 1;
ALTER SEQUENCE guests_guest_id_seq RESTART WITH 1;
ALTER SEQUENCE restaurants_restaurant_id_seq RESTART WITH 1;
ALTER SEQUENCE reservations_reservation_id_seq RESTART WITH 1;


