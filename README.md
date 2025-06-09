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
   npm run nba:sync-lineups 20250510
   ```

3. **Create Contest**

   - Create a new contest by clicking on Create contest button and filling required details

4. **Join Contest**

   - Visit `http://localhost:3000/`
   - Select team and join contest

5. **Sync Live Events**

   ```bash
   npm run nba:sync-game-events 0042400132
   ```

6. **Buy additional boosts**

   - Choose the boost you want to buy & click on buy boost.
   - Those boost will be added to your boost list

7. **Calculate XP**
   - There are 3 buttons on contest game page - 1 Event, 10 Event, 50 Event.
   - Click on one of the 3 buttons accordingly to process the game events.

## 🛠️ Available Scripts

| Command                                 | Description              |
| --------------------------------------- | ------------------------ |
| `npm run dev`                           | Start development server |
| `npm run nba:sync-lineups [date]`       | Sync upcoming NBA games  |
| `npm run nba:sync-completed [date]`     | Sync completed NBA games |
| `npm run nba:sync-game-events [gameId]` | Sync game events         |
