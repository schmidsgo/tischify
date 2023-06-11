DO $$
DECLARE
    table_name TEXT;
BEGIN
    -- Get all table names
    FOR table_name IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
        -- Build and execute the drop table statement
        EXECUTE 'DROP TABLE IF EXISTS ' || table_name || ' CASCADE';
        RAISE NOTICE 'Dropped table: %', table_name;
    END LOOP;
END $$;
