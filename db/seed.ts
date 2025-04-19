const boosts = [
  {
    name: "3x Multiplier",
    description: "Triple your XP for 3 minutes",
    type: "multiplier",
    multiplier: 3.0,
    duration: 180,
    cost: 500,
  },
  {
    name: "2x Points Multiplier",
    description: "Double XP from points for 2 minutes",
    type: "multiplier",
    multiplier: 2.0,
    duration: 120,
    cost: 300,
    conditions: { statType: "points" },
  },
  {
    name: "Add 50 rebound XP permanently",
    description: "Add 50 rebound XP permanently",
    type: "additive",
    multiplier: 2.0,
    duration: 120,
    cost: 300,
    conditions: { statType: "points" },
  },
];
