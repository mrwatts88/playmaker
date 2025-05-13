// import useSWR from "swr";

// const USER_ID_KEY = "playmaker_user_id";

// interface Contestant {
//   id: string;
//   contestId: string;
//   userId: string;
//   name: string;
//   contest: {
//     id: string;
//     name: string;
//     status: "upcoming" | "active" | "completed";
//     league: "nba" | "nfl" | "nhl" | "mlb";
//   };
// }

// interface User {
//   id: string;
//   name: string;
//   createdAt: string;
//   updatedAt: string;
//   contestants?: Contestant[];
// }

// async function createAnonymousUser(): Promise<User> {
//   const adjectives = ["Swift", "Mighty", "Clever", "Brave", "Quick", "Silent", "Fierce", "Bold"];
//   const nouns = ["Warrior", "Champion", "Knight", "Hunter", "Titan", "Phoenix", "Dragon", "Legend"];

//   const randomName = `${adjectives[Math.floor(Math.random() * adjectives.length)]} ${nouns[Math.floor(Math.random() * nouns.length)]} ${Math.floor(
//     Math.random() * 1000
//   )}`;

//   const response = await fetch("/api/users", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ name: randomName }),
//   });

//   if (!response.ok) {
//     throw new Error("Failed to create anonymous user");
//   }

//   const data = await response.json();
//   localStorage.setItem(USER_ID_KEY, data.id);
//   return data;
// }

// async function fetcher(url: string) {
//   const response = await fetch(url);
//   if (!response.ok) {
//     throw new Error("Failed to fetch user");
//   }
//   return response.json();
// }

// export function useUser() {
//   const userId = typeof window !== "undefined" ? localStorage.getItem(USER_ID_KEY) : null;
//   const { data: user, error, isLoading, mutate } = useSWR<User>(userId ? `/api/users/${userId}` : null, fetcher);

//   return {
//     user,
//     isLoading,
//     isError: error,
//     createAnonymousUser: async () => {
//       const newUser = await createAnonymousUser();
//       await mutate(newUser);
//       return newUser;
//     },
//   };
// }

import useSWR from "swr";
import { setCookie, getCookie } from "cookies-next";

const USER_ID_COOKIE = "playmaker_user_id";

interface Contestant {
  id: string;
  contestId: string;
  userId: string;
  name: string;
  contest: {
    id: string;
    name: string;
    status: "upcoming" | "active" | "completed";
    league: "nba" | "nfl" | "nhl" | "mlb";
  };
}

interface User {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  contestants?: Contestant[];
}

async function createAnonymousUser(): Promise<User> {
  const randomName = `User_${Math.random().toString(36).substring(2, 15)}`;

  const response = await fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: randomName }),
  });

  if (!response.ok) {
    throw new Error("Failed to create anonymous user");
  }

  const data = await response.json();
  setCookie(USER_ID_COOKIE, data.id, {
    maxAge: 30 * 24 * 60 * 60,
    path: "/",
    sameSite: "strict",
  });

  return data;
}

async function fetcher(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }
  return response.json();
}

export function useUser() {
  const userId =
    typeof window !== "undefined"
      ? (getCookie(USER_ID_COOKIE) as string | undefined)
      : undefined;

  const {
    data: user,
    error,
    isLoading,
    mutate,
  } = useSWR<User>(userId ? `/api/users/${userId}` : null, fetcher);

  return {
    user,
    isLoading,
    isError: error,
    createAnonymousUser: async () => {
      const newUser = await createAnonymousUser();
      await mutate(newUser);
      return newUser;
    },
  };
}
