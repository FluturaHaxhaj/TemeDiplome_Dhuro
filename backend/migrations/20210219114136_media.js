exports.up = async (knex) => {
  await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  await knex.schema.raw(`CREATE TABLE media(
		id UUID DEFAULT uuid_generate_v4(),
		title varchar(255),
		mime varchar(255),
		size integer,
		model_id UUID,
		model_type varchar(255)
	)`);
};

exports.down = async (knex) => {
  await knex.raw("DROP TABLE IF EXISTS media CASCADE");
};
