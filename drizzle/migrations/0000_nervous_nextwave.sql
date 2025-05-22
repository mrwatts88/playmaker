CREATE TABLE IF NOT EXISTS processed_game_events (
  game_event_id UUID NOT NULL REFERENCES game_events(id),
  contestant_id UUID NOT NULL REFERENCES contestants(id),
  game_id UUID NOT NULL REFERENCES games(id),
  processed_at TIMESTAMP NOT NULL DEFAULT NOW(),
  PRIMARY KEY (game_event_id, contestant_id)
);
CREATE INDEX IF NOT EXISTS idx_processed_game_events_game_id ON processed_game_events(game_id);