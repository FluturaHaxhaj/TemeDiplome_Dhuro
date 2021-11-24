exports.up = async (knex) => {
  await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

  await knex.schema.raw(`
		CREATE TABLE "users"(
			id UUID DEFAULT uuid_generate_v4(),
			first_name varchar(100) NOT NULL,
			last_name varchar(100) NOT NULL,
			email varchar(255) NOT NULL,
			address varchar(255) NOT NULL,
			phone_number varchar(30) NOT NULL,
			password varchar(255),
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMP,
			PRIMARY KEY (id)
		)
	`);

  await knex.schema.raw(`
	CREATE TABLE "special_users"(
		id UUID DEFAULT uuid_generate_v4(),
		name varchar(100) NOT NULL,
		function varchar(100) NOT NULL,
		email varchar(255) NOT NULL,
		address varchar(255) NOT NULL,
		password varchar(255),
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		updated_at TIMESTAMP,
		PRIMARY KEY (id)
	)
`);

  await knex.schema.raw(`CREATE TABLE "app_review"(
	id UUID DEFAULT uuid_generate_v4(),
	user_id UUID,
	review_score decimal (14,2),
	review_description varchar(255),
	PRIMARY KEY (id)
)`);
};

exports.down = async (knex) => {
  await knex.raw("DROP TABLE IF EXISTS app_review CASCADE");
  await knex.raw("DROP TABLE IF EXISTS special_users CASCADE");
  await knex.raw("DROP TABLE IF EXISTS users CASCADE");
};
