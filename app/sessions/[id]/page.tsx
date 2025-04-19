"use client";

import { use } from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/app/components/Header";

interface Player {
  id: string;
  name: string;
  position: string;
  rating: number;
  price: number;
}

interface Session {
  id: string;
  name: string;
  sessionCode: string;
  status: string;
  userSessions: {
    id: string;
    user: {
      username: string;
    };
    isCreator: boolean;
  }[];
}

interface PageParams {
  id: string;
}

export default function SessionDetail({ params }: { params: Promise<PageParams> }) {
  const router = useRouter();
  const { id: sessionId } = use(params);
  const [session, setSession] = useState<Session | null>(null);
  const [availablePlayers, setAvailablePlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (!storedUsername) {
      router.replace("/login");
      return;
    }
    setUsername(storedUsername);
  }, [router]);

  useEffect(() => {
    if (!username) return;

    const fetchSession = async () => {
      try {
        const response = await fetch(`/api/sessions/${sessionId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch session");
        }
        const data = await response.json();

        // Check if user is part of this session
        const isUserInSession = data.userSessions.some((us: { user: { username: string } }) => us.user.username === username);

        if (!isUserInSession) {
          setError("You are not part of this session");
          return;
        }

        setSession(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch session");
      } finally {
        setLoading(false);
      }
    };

    const fetchAvailablePlayers = async () => {
      try {
        const response = await fetch("/api/players/available");
        if (!response.ok) {
          throw new Error("Failed to fetch available players");
        }
        const data = await response.json();
        setAvailablePlayers(data);
      } catch (err) {
        console.error("Failed to fetch available players:", err);
      }
    };

    fetchSession();
    fetchAvailablePlayers();
  }, [sessionId, username, router]);

  const handleStartDraft = async () => {
    if (!username) return;

    try {
      const response = await fetch(`/api/sessions/${sessionId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "DRAFTING" }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to start draft");
      }

      // Refresh session data
      const updatedResponse = await fetch(`/api/sessions/${sessionId}`);
      if (!updatedResponse.ok) {
        throw new Error("Failed to fetch updated session");
      }
      const updatedData = await updatedResponse.json();
      setSession(updatedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to start draft");
    }
  };

  const handleLeaveSession = async () => {
    if (!username) return;

    try {
      const response = await fetch(`/api/sessions/${sessionId}/leave`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to leave session");
      }

      router.push("/sessions");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to leave session");
    }
  };

  if (!username) {
    return null; // Will redirect in useEffect
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-800">{session.name}</h1>
            <Link href="/sessions" className="text-blue-500 hover:text-blue-700">
              ← Return to all sessions
            </Link>
          </div>
          <p className="text-gray-700 mb-4">Code: {session.sessionCode}</p>
          <p className="text-gray-700 mb-4">Status: {session.status}</p>

          <h2 className="text-xl font-semibold mb-2 text-gray-800">Players</h2>
          <ul className="mb-4">
            {session.userSessions.map((userSession) => (
              <li key={userSession.id} className="mb-1 text-gray-700">
                {userSession.user.username}
                {userSession.isCreator && " (Creator)"}
              </li>
            ))}
          </ul>

          <div className="flex gap-4">
            {session.status === "WAITING" && (
              <button onClick={handleStartDraft} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Start Draft
              </button>
            )}
            <button onClick={handleLeaveSession} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
              Leave Session
            </button>
          </div>

          {session.status === "DRAFTING" && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold mb-2 text-gray-800">Available Players</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {availablePlayers.map((player) => (
                  <div key={player.id} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                    <h3 className="font-semibold text-gray-800">{player.name}</h3>
                    <p className="text-gray-800">{player.position}</p>
                    <p className="text-gray-800">Cost: ${player.price}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
