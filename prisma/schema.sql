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

-- index for faster athlete lookup by team (for finding draftable athletes)
-- aka contest.games.teams.athletes
CREATE INDEX idx_athletes_team_id ON athletes(team_id);

-- All known teams of major sports leagues
-- Updated by cron jobs from sports data API
-- Not transactional for the app's purposes
CREATE TABLE teams (
    id TEXT PRIMARY KEY,
    name TEXT,
    league TEXT CHECK (league IN ('nba', 'nfl', 'nhl', 'mlb'))
);

-- Created/updated by cron jobs that fetch games from the API regularly
CREATE TABLE contests (
    id TEXT PRIMARY KEY,
    name TEXT,
    start_time TIMESTAMP,
    status TEXT CHECK (status IN ('upcoming', 'active', 'completed')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Created/updated by cron jobs that fetch games from the API regularly
CREATE TABLE games (
    id TEXT PRIMARY KEY,
    name TEXT,
    start_time TIMESTAMP,
    status TEXT CHECK (status IN ('upcoming', 'active', 'completed')),
    home_team_id TEXT REFERENCES teams(id),
    away_team_id TEXT REFERENCES teams(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Created/updated by cron jobs that fetch games from the API regularly
CREATE TABLE contest_games (
    contest_id TEXT REFERENCES contests(id),
    game_id TEXT REFERENCES games(id),
    PRIMARY KEY (game_id, contest_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Created by websocket events from a sports data API
CREATE TABLE game_events (
    id TEXT PRIMARY KEY,
    game_id TEXT REFERENCES games(id),
    athlete_id TEXT REFERENCES athletes(id),
    event_type TEXT CHECK (
        event_type IN (
            'points',
            'rebounds',
            'assists',
            'steals',
            'blocks'
        )
    ),
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
    stat_power JSONB NOT NULL DEFAULT '{}' -- e.g. { "points": 1, "rebounds": 1, "assists": 1 }
    UNIQUE (user_id, contest_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Created when a contestant drafts an athlete
CREATE TABLE roster_members (
    id TEXT PRIMARY KEY,
    contestant_id TEXT REFERENCES contestants(id),
    athlete_id TEXT REFERENCES athletes(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- All available boosts
-- A boost is a mechanism that changes the accumulation rate of XP for a contestant.
CREATE TABLE boosts (
    id TEXT PRIMARY KEY,
    name TEXT,
    description TEXT,
    cost INTEGER,
    type TEXT CHECK (
        type IN (
            'multiplicative',
            'additive',
            'conditional',
            'instant',
            'action'
        )
    ),
    stat TEXT CHECK (
        stat IN (
            'points',
            'rebounds',
            'assists',
            'steals',
            'blocks'
        )
    ),
    -- The number of statType that must be met to activate the boost, if type is conditional
    requirement INTEGER,
    -- the multiplier or additive value to apply to the stat, if type is multiplicative or additive. the reward for meeting the requirement, if type is conditional
    value NUMERIC,
    -- the action to take when the boost is purchased, if type is action
    action TEXT CHECK (action IN ('extraPlayer', 'stealPlayer')),
    duration INTEGER -- in minutes, undefined for permanent boosts
);

-- All boosts that are currently available for purchase in a contest
CREATE TABLE contest_boosts (
    id TEXT PRIMARY KEY,
    contest_id TEXT REFERENCES contests(id),
    boost_id TEXT REFERENCES boosts(id),
    expires_at TIMESTAMP -- determined on creation by predefined boost availability duration,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE contestant_boosts (
    id TEXT PRIMARY KEY,
    contestant_id TEXT REFERENCES contestants(id),
    boost_id TEXT REFERENCES boosts(id),
    expires_at TIMESTAMP -- determined on creation by adding boost duration to the time of purchase,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);