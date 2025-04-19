import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const mockPlayers = [
  {
    name: "LeBron James",
    team: "LAL",
    position: "SF",
    price: 300,
    stats: {
      points: 25.0,
      assists: 7.0,
      rebounds: 8.0,
      steals: 1.2,
      blocks: 0.8,
    },
  },
  {
    name: "Stephen Curry",
    team: "GSW",
    position: "PG",
    price: 280,
    stats: {
      points: 29.0,
      assists: 6.0,
      rebounds: 5.0,
      steals: 1.0,
      blocks: 0.2,
    },
  },
  {
    name: "Nikola Jokic",
    team: "DEN",
    position: "C",
    price: 270,
    stats: {
      points: 24.0,
      assists: 9.0,
      rebounds: 12.0,
      steals: 1.3,
      blocks: 0.9,
    },
  },
  {
    name: "Giannis Antetokounmpo",
    team: "MIL",
    position: "PF",
    price: 290,
    stats: {
      points: 31.0,
      assists: 5.0,
      rebounds: 11.0,
      steals: 1.2,
      blocks: 1.3,
    },
  },
  {
    name: "Luka Doncic",
    team: "DAL",
    position: "PG",
    price: 275,
    stats: {
      points: 28.0,
      assists: 8.0,
      rebounds: 8.0,
      steals: 1.1,
      blocks: 0.5,
    },
  },
];

async function main() {
  // Clear existing players
  await prisma.availablePlayer.deleteMany();

  // Create mock players
  const players = await prisma.availablePlayer.createMany({
    data: mockPlayers,
    skipDuplicates: true,
  });

  console.log("Seed players created:", players);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
