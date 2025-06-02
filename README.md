# Playmaker Web App

A web application for NBA fantasy contests and game predictions.

## 🚀 Getting Started

Follow these steps to set up and run the Playmaker web app locally.

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Database setup (ensure your database is configured)

## 📋 Complete Setup Workflow ( Follow Step by Step)

1. **Setup Environment**

   ```bash
   git clone <repository-url>
   cd playmaker
   npm install
   npm run dev
   ```

2. **Load Game Data**

   ```bash
   # Sync games for specific date
   npm run nba:sync-lineups 20250510
   ```

3. **Create Contest**

   - Visit `http://localhost:3000/docs`
   - Create a new contest via API

4. **Join Contest**

   - Visit `http://localhost:3000/`
   - Select team and join contest

5. **Sync Live Events**

   ```bash
   # Load events for specific game (use correct apiId)
   npm run nba:sync-game-events 0042400132
   ```

6. **Buy additional boosts**

   - Choose the boost you want to buy & click on buy boost.
   - Those boost will be added to your boost list

7. **Calculate XP**
   - Enter GameId in the input box for processing game events related to that game.
   - Then click on one of the 3 buttons accordingly to process the game events.

## 🛠️ Available Scripts

| Command                                 | Description              |
| --------------------------------------- | ------------------------ |
| `npm run dev`                           | Start development server |
| `npm run nba:sync-lineups [date]`       | Sync upcoming NBA games  |
| `npm run nba:sync-completed [date]`     | Sync completed NBA games |
| `npm run nba:sync-game-events [gameId]` | Sync game events         |
