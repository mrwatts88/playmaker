# Playmaker Web App

A web application for NBA fantasy contests and game predictions.

## 🚀 Getting Started

Follow these steps to set up and run the Playmaker web app locally.

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Database setup (ensure your database is configured)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd playmaker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3000`

## 📊 Data Synchronization

### Sync NBA Games

Before using the application, you need to sync NBA game data:

#### For Upcoming Games
```bash
npm run nba:sync-lineups YYYYMMDD
```
**Example:**
```bash
npm run nba:sync-lineups 20250510
```

#### For Completed Games
```bash
npm run nba:sync-completed YYYYMMDD
```
**Example:**
```bash
npm run nba:sync-completed 20250510
```

> **Note:** Replace `YYYYMMDD` with your desired date in the format shown above.

## 🏆 Contest Management

### Creating a Contest

1. Navigate to the API documentation: `http://localhost:3000/docs`
2. Create a new contest using the available endpoints
3. Note down the contest ID for future reference

### Joining a Contest

1. Go to the main application: `http://localhost:3000/`
2. Select your team
3. Join the desired contest
4. View all contestants and their current scores

## 🎮 Event Synchronization

### Sync Game Events and Boosts

To load real-time events and calculate contestant XP:

```bash
npm run nba:sync-events-boost <GAME_API_ID>
```

**Example:**
```bash
npm run nba:sync-events-boost 0042400132
```

> **Note:** The `GAME_API_ID` is the unique identifier for the specific NBA game you want to sync.

## 📋 Complete Setup Workflow

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
   # Load events for specific game
   npm run nba:sync-events-boost 0042400132
   ```

6. **View Results**
   - Contestant stats and XP will be automatically updated
   - Check leaderboard and scores in the main interface

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run nba:sync-lineups [date]` | Sync upcoming NBA games |
| `npm run nba:sync-completed [date]` | Sync completed NBA games |
| `npm run nba:sync-events-boost [gameId]` | Sync game events and calculate XP |

