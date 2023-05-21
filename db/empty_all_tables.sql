DO $$DECLARE
    tables CURSOR FOR
        SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname='public';
BEGIN
    FOR table_rec IN tables LOOP
        EXECUTE 'TRUNCATE TABLE ' || table_rec.tablename || ' CASCADE;';
    END LOOP;
END$$;
