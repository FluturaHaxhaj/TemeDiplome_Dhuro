exports.up = async (knex) => {
  await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  await knex.schema.raw(`CREATE TABLE "categories"(
		id UUID DEFAULT uuid_generate_v4(),
		name varchar(255),
		PRIMARY KEY (id)
	)`);
};

exports.down = async (knex) => {
  await knex.raw("DROP TABLE IF EXISTS categories CASCADE");
};
