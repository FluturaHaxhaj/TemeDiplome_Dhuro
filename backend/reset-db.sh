#!/bin/bash
SCRIPT="
  echo 'DROP SCHEMA public CASCADE; CREATE SCHEMA public; GRANT ALL ON SCHEMA public TO public; CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\";' | PGPASSWORD=postgres psql -h postgres -p 5432 -U postgres medhuro; 
  # Run migrations
  echo 'Running migrate:rollback';
	knex migrate:rollback --all;
  echo 'Running migrate:latest';
  knex migrate:latest;
  # Seed data
  echo 'Seeding data';
  knex seed:run;
"
docker exec -it medhuro_app sh -c "$SCRIPT"