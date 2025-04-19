import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const boosts = [
  // Multiplier Boosts
  {
    name: "3x Multiplier",
    description: "Triple your XP for 3 minutes",
    boostType: "multiplier",
    multiplier: 3.0,
    duration: 180,
    cost: 500,
  },
  {
    name: "2x Points Multiplier",
    description: "Double XP from points for 2 minutes",
    boostType: "multiplier",
    multiplier: 2.0,
    duration: 120,
    cost: 300,
    conditions: { statType: "points" },
  },
  // Conditional Boosts
  {
    name: "Quick Score",
    description: "Earn 500 XP if your player scores in the next minute",
    boostType: "conditional",
    duration: 60,
    cost: 200,
    conditions: {
      type: "score",
      timeWindow: 60,
      statType: "points",
      requirement: 1,
    },
    reward: 500,
  },
  {
    name: "Assist Streak",
    description: "Earn 800 XP if your player gets 2 assists in 3 minutes",
    boostType: "conditional",
    duration: 180,
    cost: 300,
    conditions: {
      type: "accumulate",
      timeWindow: 180,
      statType: "assists",
      requirement: 2,
    },
    reward: 800,
  },
  // Instant Boosts
  {
    name: "Extra Player",
    description: "Add a 6th player for 3 minutes",
    boostType: "instant",
    duration: 180,
    cost: 1000,
    conditions: { type: "extraPlayer" },
  },
  {
    name: "Player Swap",
    description: "Swap out one of your players",
    boostType: "instant",
    duration: 0,
    cost: 300,
    conditions: { type: "swap" },
  },
  {
    name: "Double Double Bonus",
    description: "Earn 1000 XP if your player gets a double-double in 5 minutes",
    boostType: "conditional",
    duration: 300,
    cost: 400,
    conditions: {
      type: "doubleDouble",
      timeWindow: 300,
      requirement: 10,
    },
    reward: 1000,
  },
  {
    name: "Rebound Master",
    description: "2.5x XP from rebounds for 2 minutes",
    boostType: "multiplier",
    multiplier: 2.5,
    duration: 120,
    cost: 350,
    conditions: { statType: "rebounds" },
  },
];

async function main() {
  // Create test users
  const user1 = await prisma.user.upsert({
    where: { username: "player1" },
    update: {},
    create: {
      username: "player1",
    },
  });

  const user2 = await prisma.user.upsert({
    where: { username: "player2" },
    update: {},
    create: {
      username: "player2",
    },
  });

  // Create boosts
  for (const boost of boosts) {
    await prisma.boost.upsert({
      where: { name: boost.name },
      update: boost,
      create: boost,
    });
  }

  console.log("Seed data created:", { user1, user2, boostsCount: boosts.length });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
