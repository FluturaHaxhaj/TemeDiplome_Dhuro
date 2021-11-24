exports.up = async (knex) => {
  await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

  await knex.schema.raw(`CREATE TABLE "deals"(
		id UUID DEFAULT uuid_generate_v4(),
		user_id UUID NOT NULL,
		deal_id UUID NOT NULL,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		PRIMARY KEY (id)
	)`);
};

exports.down = async (knex) => {
  await knex.raw("DROP TABLE IF EXISTS deals CASCADE");
};
