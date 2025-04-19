import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const mockPlayers = [
  {
    name: "LeBron James",
    team: "LAL",
    position: "SF",
    price: 300,
    league: "nba",
  },
  {
    name: "Stephen Curry",
    team: "GSW",
    position: "PG",
    price: 280,
    league: "nba",
  },
  {
    name: "Nikola Jokic",
    team: "DEN",
    position: "C",
    price: 270,
    league: "nba",
  },
  {
    name: "Giannis Antetokounmpo",
    team: "MIL",
    position: "PF",
    price: 290,
    league: "nba",
  },
  {
    name: "Luka Doncic",
    team: "DAL",
    position: "PG",
    price: 275,
    league: "nba",
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
