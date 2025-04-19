"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import { useAuth } from "../providers/AuthProvider";

interface Session {
  id: string;
  name: string;
  sessionCode: string;
  status: string;
  startTime: string;
  userSessions: {
    id: string;
    user: {
      id: string;
      username: string;
    };
  }[];
}

export default function SessionsPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [newSessionName, setNewSessionName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const router = useRouter();
  const { username, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    fetchSessions();
  }, [isAuthenticated, router]);

  const fetchSessions = async () => {
    try {
      const response = await fetch("/api/sessions");
      if (!response.ok) throw new Error("Failed to fetch sessions");
      const data = await response.json();
      setSessions(data);

      // Check if current user is in any session
      if (username) {
        const userSession = data.find((session: Session) => session.userSessions.some((userSession) => userSession.user.username === username));
        if (userSession) {
          setCurrentSessionId(userSession.id);
        } else {
          setCurrentSessionId(null);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch sessions");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSession = async () => {
    if (currentSessionId) {
      setError("You are already in a session. Please leave your current session before creating a new one.");
      return;
    }

    if (!username) {
      router.push("/login");
      return;
    }

    try {
      const response = await fetch("/api/sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newSessionName, username }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to create session");
      }

      const session = await response.json();
      router.push(`/sessions/${session.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create session");
    }
  };

  const handleJoinSession = async (sessionId: string) => {
    if (currentSessionId) {
      setError("You are already in a session. Please leave your current session before joining another one.");
      return;
    }

    if (!username) {
      router.push("/login");
      return;
    }

    try {
      const response = await fetch(`/api/sessions/${sessionId}/join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to join session");
      }

      router.push(`/sessions/${sessionId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to join session");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header />
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-700">Loading sessions...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
            <div className="p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Create New Session</h1>
              <div className="flex gap-4">
                <input
                  type="text"
                  value={newSessionName}
                  onChange={(e) => setNewSessionName(e.target.value)}
                  placeholder="Enter session name"
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  disabled={!!currentSessionId}
                />
                <button
                  onClick={handleCreateSession}
                  disabled={!newSessionName || !!currentSessionId}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create Session
                </button>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Active Sessions</h2>
              <div className="space-y-4">
                {sessions.map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{session.name}</h3>
                      <p className="text-sm text-gray-700">Code: {session.sessionCode}</p>
                      <p className="text-sm text-gray-700">
                        {session.userSessions.length} player{session.userSessions.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                    {session.id === currentSessionId ? (
                      <button
                        onClick={() => router.push(`/sessions/${session.id}`)}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        Enter
                      </button>
                    ) : (
                      <button
                        onClick={() => handleJoinSession(session.id)}
                        disabled={!!currentSessionId}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Join
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
