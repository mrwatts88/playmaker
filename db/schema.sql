CREATE TYPE league_type AS ENUM ('nba', 'nfl', 'nhl', 'mlb');

CREATE TYPE contest_status AS ENUM ('upcoming', 'active', 'completed');

CREATE TYPE game_status AS ENUM ('upcoming', 'active', 'completed');

CREATE TYPE event_type AS ENUM (
    'points',
    'rebounds',
    'assists',
    'steals',
    'blocks',
);

CREATE TYPE boost_type AS ENUM (
    'team',
    'athlete',
);

CREATE TYPE stat_type AS ENUM (
    'points',
    'rebounds',
    'assists',
    'steals',
    'blocks',
    '3 pointers',
    'foul',
    'turnover',
    'free throw made'
);

CREATE TYPE boost_action AS ENUM ('extraPlayer', 'stealPlayer');

-- All known athletes of major sports leagues
-- Updated by cron jobs from sports data API
-- Not transactional for the app's purposes
CREATE TABLE athletes (
    id TEXT PRIMARY KEY,
    name TEXT,
    team_id TEXT REFERENCES teams(id),
    position TEXT,
    cost INTEGER NOT NULL CHECK (cost > 0)
);

-- All known teams of major sports leagues
-- Updated by cron jobs from sports data API
-- Not transactional for the app's purposes
CREATE TABLE teams (
    id TEXT PRIMARY KEY,
    name TEXT,
    league league_type
);

-- Created/updated by cron jobs that fetch games from the API regularly
CREATE TABLE contests (
    id TEXT PRIMARY KEY,
    name TEXT,
    start_time TIMESTAMP,
    status contest_status,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Created/updated by cron jobs that fetch games from the API regularly
CREATE TABLE games (
    id TEXT PRIMARY KEY,
    name TEXT,
    start_time TIMESTAMP,
    status game_status,
    home_team_id TEXT REFERENCES teams(id),
    away_team_id TEXT REFERENCES teams(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Created/updated by cron jobs that fetch games from the API regularly
CREATE TABLE contest_games (
    game_id TEXT REFERENCES games(id),
    contest_id TEXT REFERENCES contests(id),
    PRIMARY KEY (game_id, contest_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Created by websocket events from a sports data API
CREATE TABLE game_events (
    id TEXT PRIMARY KEY,
    game_id TEXT REFERENCES games(id),
    athlete_id TEXT REFERENCES athletes(id),
    event_type event_type,
    value INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Created during signup
CREATE TABLE users (
    id TEXT PRIMARY KEY,
    name TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Created when a user enters a contest
CREATE TABLE contestants (
    id TEXT PRIMARY KEY,
    contest_id TEXT REFERENCES contests(id),
    user_id TEXT REFERENCES users(id),
    name TEXT,
    total_xp INTEGER DEFAULT 0 NOT NULL CHECK (total_xp >= 0),
    spendable_xp INTEGER DEFAULT 0 NOT NULL CHECK (spendable_xp >= 0),
    -- e.g. { "points": 1, "rebounds": 1, "assists": 1 }
    stat_power JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- a user can only enter a contest once
    UNIQUE (user_id, contest_id)
);

CREATE TABLE IF NOT EXISTS processed_game_events (
  game_event_id UUID NOT NULL REFERENCES game_events(id),
  contestant_id UUID NOT NULL REFERENCES contestants(id),
  game_id UUID NOT NULL REFERENCES games(id),
  processed_at TIMESTAMP NOT NULL DEFAULT NOW(),
  PRIMARY KEY (game_event_id, contestant_id)
);

-- Created when a contestant drafts an athlete
-- CREATE TABLE roster_members (
--     contestant_id TEXT REFERENCES contestants(id),
--     athlete_id TEXT REFERENCES athletes(id),
--     PRIMARY KEY (contestant_id, athlete_id),
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- All available boosts
-- A boost is a mechanism that changes the accumulation rate of XP for a contestant.
CREATE TABLE boosts (
    id TEXT PRIMARY KEY,
    name TEXT,
    description TEXT,
    cost INTEGER,
    type boost_type,
    stat stat_type,
    -- The number of statType that must be met to activate the boost, if type is conditional
    requirement INTEGER,
    -- the multiplier or additive value to apply to the stat, if type is multiplicative or additive. the reward for meeting the requirement, if type is conditional
    value NUMERIC,
    -- the action to take when the boost is purchased, if type is action
    action boost_action,
    duration INTEGER -- in minutes, undefined for permanent boosts
);

-- All boosts that are currently available for purchase in a contest
CREATE TABLE contest_boosts (
    id TEXT PRIMARY KEY,
    contest_id TEXT REFERENCES contests(id),
    boost_id TEXT REFERENCES boosts(id),
    -- determined on creation by predefined boost availability duration
    expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE contestant_boosts (
    id TEXT PRIMARY KEY,
    contestant_id TEXT REFERENCES contestants(id),
    boost_id TEXT REFERENCES boosts(id),
    -- determined on creation by adding boost duration to the time of purchase
    expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);