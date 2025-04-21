# Draft XP User Story

This doc is meant for a developer or product owner to fully understand the Draft XP product. It walks through a user's journey and describe what is happening from a UX perspective, which API calls are being made, and what database storage is relevant. Any Draft XP specific terms will be in all caps.

1. A USER arrives on draftxp.com and see a MARKETING PAGE with a header that includes a link to 'Log in' and to 'Sign up'.
1. Clicking Log in or Sign up will take you the appropriate LOG IN PAGE or SIGN IN PAGE and allow you to log in or sign up.
1. Signing up will create a user in Clerk, followed by creating a user in our database (request to POST /users API, creates a user records in the database). The following step will happen after sign up which is equivalent to what happens on login.
1. Logging in will authenticate with Clerk. A session token will be placed in the browser's cookies, the user from our database is fetched (request to GET /users API, retrieves a record from the users table) and stored in client memory. The user will be redirected to the APP LOBBY.
1. The app lobby shows a list of CONTESTS that are available (upcoming or late reg) to join (request to GET /contests API, retrieve multiple records from the contests table). See Processes below to learn how contests are created and how games are related to contests.
1. The user clicks on a contest and is taken to a CONTEST LOBBY (request to GET /contests/:id API, retrieves a record from the contests table). This page shows details about the selected contest, including which GAMES are included in the contest. See Processes below to learn how GAMES are created.
1. The user clicks JOIN and becomes a CONTESTANT in the contest (request to POST /contests/:id/users/:userId API, creates a contestant record in the database which relates a user to a contest).
1. The user is taken to the DRAFT PAGE. This page shows a list of DRAFTABLE ATHLETES (request to GET /contests/:id/draftable-athletes API, retrieves multiple records from the athletes table.). Draftable athletes are all ATHLETES that belong to all TEAMS that are included in a given contest. See Processes below to learn how athletes and teams are created.
1. The user selects a ROSTER of 5 draftable athletes. They must choose 5 athletes whose combined COST is less than or equal to a predefined DRAFT BALANCE. They can edit their roster until they are satisfied. They then click 'Submit Roster' which will add the selected athletes to the user's roster for this contest (request to POST /contestants/:id/roster API, creates 5 ROSTER MEMBER records in the database).
1. The user is taken to the CONTEST GAME page, (request to GET /contests/:id/game API, retrieves data from multiple tables). This page shows all contestant that have joined the contest. Each contestant has an avatar and avatars are placed in an oval around a COURT (court/field/rink) background (imagine a poker client like Full Tilt) but adapted to sports. The contest will begin when the earliest game involved in the contest starts.
1. GAME EVENTs arrive from all games included in the contest (polling GET /contests/:id/game API). See Processes below to learn how game events are created. The middle of the court shows a feed of recent events as they occur. Contestants earn XP based on the event's relevant athlete and ACTION (e.g. Lebron James rebound). The amount of XP earned is a factor of the contestants STAT WEIGHTS and their APPLIED BOOSTS. As a user earns xp, it is added to both their TOTAL XP and their SPENDABLE XP. See Processes below to learn the details of how EVENT-EARNED XP is calculated.
1. 3 AVAILABLE BOOSTS are shown in the center of the court during BOOSTUNITIES (polling GET /contests/:id/game API). These are times when boosts are availble for purchase by contestants. The available boosts change with each new boostunity. See Processes below to learn how available boosts are chosen and about boostunity timing.
1. The user can use their spendable xp to increase any of their stat weights at any time (request to PATCH /contestant/:id/stat-weights, updates the appropriate contestant record in the database). This action will affect the accumulation rate of event-earned xp.
1. The user can use their spendable xp to purchase/apply a boost chosen from the available boosts in the center of the court during a boostunity (request to POST /contestant/:id/boosts, creates a record in the boosts table). This action may affect the accumulation rate of event-earned xp.
1. The contest ends when the latest-ending game involved in the contest ends. At this point, the contestant with the most xp is declared the winner of the contest (request to PATCH /contests/:id, the relevant contest record is updated with a completed status and winner).
1. Any user-permanent effects (badges, trophies, etc.) caused by the results of the contest are associated with the appropriate users (request to POST /contests/:id/results, updates multiple tables).

## Processes

### Game Creation

In Progress. Summary: games are fetched from a sports api by a script run at some interval near daily.

### Contest Creation

In Progress. Summary: done manually by admins or through a script.

### Athlete Creation

In Progress. Summary: athletes are fetched from a sports api by a script run at some interval near daily. also created when games are fetched if the relevant athletes don't exist yet.

### Event Creation

In Progress. Summary: events are fetched from a sports api by a script run very often.

### Event-Earned XP

In Progress. Summary: find all contestants that have the event's athlete on a current roster, scale xp base by stat weight for relevant event type, adjust by all applied boosts for that contestant.

### Available Boosts

In Progress. Summary: When a new boostunity happens for a contest, choose 3 random boosts relevant to the contest's sport.

### Boostunity Timing

In Progress. Summary: maybe always available and changes available boosts every 10 minutes.

### Contest Availability

In Progress, Unknown. Summary: update contest record based on game events, i.e. game start, game end. only show contests that are upcoming or recently started.
