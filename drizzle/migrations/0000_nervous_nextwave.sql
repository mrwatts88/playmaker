CREATE TYPE boost_type_new AS ENUM ('team', 'athlete');

ALTER TABLE boosts
ALTER COLUMN type TYPE boost_type_new
USING type::text::boost_type_new;

DROP TYPE boost_type;

ALTER TYPE boost_type_new RENAME TO boost_type;
ALTER TYPE stat_type ADD VALUE IF NOT EXISTS '3 pointers';
ALTER TYPE stat_type ADD VALUE IF NOT EXISTS 'foul';
ALTER TYPE stat_type ADD VALUE IF NOT EXISTS 'turnover';
ALTER TYPE stat_type ADD VALUE IF NOT EXISTS 'free throw made';