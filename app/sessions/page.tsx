"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/app/components/Header";

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

export default function SessionsPage() {
  const router = useRouter();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [newSessionName, setNewSessionName] = useState("");
  const [isInSession, setIsInSession] = useState(false);

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

    const fetchSessions = async () => {
      try {
        const response = await fetch("/api/sessions");
        if (!response.ok) {
          throw new Error("Failed to fetch sessions");
        }
        const data = await response.json();
        setSessions(data);
        // Check if user is in any session
        setIsInSession(data.some((session: Session) => session.userSessions.some((us) => us.user.username === username)));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch sessions");
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, [username]);

  const handleCreateSession = async () => {
    if (!username) return;

    try {
      // Check if user is already in a session
      const response = await fetch("/api/sessions");
      if (!response.ok) {
        throw new Error("Failed to fetch sessions");
      }
      const sessions = await response.json();
      const isInSession = sessions.some((session: Session) => session.userSessions.some((us) => us.user.username === username));

      if (isInSession) {
        setError("You are already in a session. Please leave your current session before creating a new one.");
        return;
      }

      const createResponse = await fetch("/api/sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          name: newSessionName,
        }),
      });

      if (!createResponse.ok) {
        const data = await createResponse.json();
        throw new Error(data.error || "Failed to create session");
      }

      const newSession = await createResponse.json();
      router.push(`/sessions/${newSession.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create session");
    }
  };

  const handleJoinSession = async (sessionId: string) => {
    if (!username) return;

    try {
      const response = await fetch(`/api/sessions/${sessionId}/join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        console.error("Join session error:", data);
        throw new Error(data.error || "Failed to join session");
      }

      const newSession = await response.json();
      console.log("Join session response:", newSession);
      router.push(`/sessions/${sessionId}`);
    } catch (err) {
      console.error("Join session error:", err);
      setError(err instanceof Error ? err.message : "Failed to join session");
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

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Sessions</h1>
          {!isInSession && (
            <div className="flex gap-4">
              <input
                type="text"
                value={newSessionName}
                onChange={(e) => setNewSessionName(e.target.value)}
                placeholder="Session name"
                className="px-4 py-2 border rounded text-gray-800"
              />
              <button
                onClick={handleCreateSession}
                disabled={!newSessionName}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
              >
                Create New Session
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4">
          {sessions.map((session) => (
            <div key={session.id} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-2 text-gray-800">{session.name}</h2>
              <p className="text-gray-800 mb-2">Code: {session.sessionCode}</p>
              <p className="text-gray-800 mb-4">Status: {session.status}</p>
              {session.userSessions.some((us) => us.user.username === username) ? (
                <Link href={`/sessions/${session.id}`} className="text-blue-500 hover:text-blue-700">
                  View Session →
                </Link>
              ) : (
                !isInSession && (
                  <button onClick={() => handleJoinSession(session.id)} className="text-blue-500 hover:text-blue-700">
                    Join Session →
                  </button>
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
