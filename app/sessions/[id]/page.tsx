"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import { use } from "react";
import { useAuth } from "../../providers/AuthProvider";

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

export default function SessionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [session, setSession] = useState<Session | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { username, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    fetchSession();
  }, [id, isAuthenticated, router]);

  const fetchSession = async () => {
    try {
      const response = await fetch(`/api/sessions/${id}`);
      if (!response.ok) throw new Error("Failed to fetch session");
      const data = await response.json();
      setSession(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch session");
    } finally {
      setLoading(false);
    }
  };

  const handleLeaveSession = async () => {
    if (!username) {
      router.push("/login");
      return;
    }

    try {
      const response = await fetch(`/api/sessions/${id}/leave`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to leave session");
      }

      router.push("/sessions");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to leave session");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header />
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-700">Loading session...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header />
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <div className="bg-white p-8 rounded-lg shadow-md w-96">
            <h1 className="text-2xl font-bold mb-4 text-center text-red-600">Error</h1>
            <p className="text-center text-gray-700">{error}</p>
            <button
              onClick={() => router.push("/sessions")}
              className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Back to Sessions
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header />
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <div className="bg-white p-8 rounded-lg shadow-md w-96">
            <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Session Not Found</h1>
            <button
              onClick={() => router.push("/sessions")}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Back to Sessions
            </button>
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
          <div className="flex justify-between items-center mb-6">
            <button onClick={() => router.push("/sessions")} className="text-indigo-600 hover:text-indigo-800 flex items-center">
              <svg
                className="h-5 w-5 mr-1"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to All Sessions
            </button>
            <button
              onClick={handleLeaveSession}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Leave Session
            </button>
          </div>
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{session.name}</h1>
                  <p className="text-sm text-gray-700">Code: {session.sessionCode}</p>
                </div>
                <div className="text-sm font-medium text-gray-700">Status: {session.status}</div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Players</h2>
                <div className="space-y-2">
                  {session.userSessions.map((userSession) => (
                    <div key={userSession.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium text-gray-800">{userSession.user.username}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
