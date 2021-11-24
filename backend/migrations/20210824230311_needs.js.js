exports.up = async (knex) => {
  await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  await knex.schema.raw(`DROP TYPE IF EXISTS deal_status_type`);
  await knex.schema.raw(
    `CREATE TYPE deal_status_type AS ENUM ('free', 'taken')`
  );
  await knex.schema.raw(`CREATE TABLE "needs"(
		id UUID DEFAULT uuid_generate_v4(),
		user_id UUID references users(id) ON DELETE CASCADE,
		product_name varchar(255),
		description varchar(255),
		category_id UUID references categories(id) ON DELETE CASCADE,
		address varchar(255),
    date_until date,
		status deal_status_type NOT NULL DEFAULT 'free',
		latitude varchar(255),
		longitude varchar(255),
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		updated_at TIMESTAMP,
		PRIMARY KEY (id)
	)`);
};

exports.down = async (knex) => {
  await knex.raw("DROP TABLE IF EXISTS needs CASCADE");
};
