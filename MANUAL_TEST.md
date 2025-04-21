# Manual Testing of Entire App Flow

1. Run nba:sync-lineups with today's date to get Games, Teams, Athletes for today.
1. Call POST /user API to create a new user.
1. Call GET /user/:id API to get user.
1. Call POST /contests API to create a contest that includes specified games.
1. Call GET /contests API to list current contests.
1. Call GET /contests/:id API to get specified contest info.
1. Call POST /contests/:id/users/:id API to enter specified contest.
1. Call GET /contests/:id/draftables-athletes API to get all draftable athletes for specified contest.
1. Call POST /contestant/:id/roster API to draft athletes.
1. Repeat the next steps
   1.1 Run nba:sync-game-events script for all games in currently entered contest to update events.
   1.1 Call GET /constests/:id/game to get up-to-date info for the contest.
   1.1.1 At this point we will see new games events, but not updated XP yet.
