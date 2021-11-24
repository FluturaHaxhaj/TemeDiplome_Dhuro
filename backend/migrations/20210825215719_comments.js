exports.up = async (knex) => {
  await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

  await knex.schema.raw(`CREATE TABLE "comments"(
		id UUID DEFAULT uuid_generate_v4(),
		post_id UUID NOT NULL,
		user_id UUID references users(id) ON DELETE CASCADE,
		comment varchar(255),
		PRIMARY KEY (id)
	)`);
};

exports.down = async (knex) => {
  await knex.schema.raw("DROP TABLE IF EXISTS comments CASCADE");
};
