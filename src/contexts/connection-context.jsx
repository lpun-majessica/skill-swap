"use client";

const initialConnections = [];

import { createContext, useEffect, useState, useContext } from "react";
import { useSession } from "next-auth/react";

import connectionService from "@/services/connection";
import { clientSocket } from "@/lib/socket";

const ConnectionContext = createContext();

export function ConnectionProvider({ children }) {
  const { data, status } = useSession();
  const [connections, setConnections] = useState(initialConnections);

  useEffect(() => {
    const fetchConnectionData = async (userId) => {
      const CONNECTIONS = await connectionService.getAllConnections(userId);
      setConnections(CONNECTIONS);
    };

    if (data && status !== "loading") {
      fetchConnectionData(data.user);
    }
  }, [data]);

  useEffect(() => {
    const handleCreate = (_, connection) => {
      setConnections(connections.concat(connection));
    };

    const handleAccept = (_, connection) => {
      setConnections(
        connections.map((conn) =>
          conn.id === connection.id ? { ...conn, isAccepted: true } : conn,
        ),
      );
    };

    const handleDelete = (_, connection) => {
      setConnections(connections.filter((conn) => conn.id !== connection.id));
    };

    clientSocket.on("createConnection", handleCreate);
    clientSocket.on("acceptConnection", handleAccept);

    clientSocket.on("cancelConnection", handleDelete);
    clientSocket.on("declineConnection", handleDelete);
    clientSocket.on("removeConnection", handleDelete);

    return () => {
      clientSocket.off("createConnection", handleCreate);
      clientSocket.off("acceptConnection", handleAccept);

      clientSocket.on("cancelConnection", handleDelete);
      clientSocket.on("declineConnection", handleDelete);
      clientSocket.on("removeConnection", handleDelete);
    };
  }, [connections]);

  const createConnection = async (
    sender_id,
    receiver_id,
    isAccepted = false,
  ) => {
    const connection = { sender_id, receiver_id, isAccepted };
    const newConnection = await connectionService.addConnection(connection);

    setConnections(connections.concat(newConnection));

    return newConnection;
  };

  const updateConnection = async (connectionId, isAccepted = true) => {
    const updatedConnection = await connectionService.updateConnection(
      connectionId,
      { isAccepted },
    );

    setConnections(
      connections.map((conn) =>
        conn.id === connectionId ? { ...conn, isAccepted } : conn,
      ),
    );

    return updatedConnection;
  };

  const removeConnection = async (connectionId) => {
    await connectionService.removeConnection({
      connectionId,
    });

    setConnections(connections.filter((conn) => conn.id !== connectionId));
  };

  const findConnectionWith = (userId) => {
    const connection = connections.filter(
      (conn) =>
        (conn.sender_id === userId && conn.receiver_id === data?.user) ||
        (conn.sender_id === data?.user && conn.receiver_id === userId),
    );

    console.assert(
      connection.length <= 1,
      `${data?.user} and ${userId} has ${connection.length} connections`,
    );

    return connection.length !== 0 ? connection[0] : null;
  };

  return (
    <ConnectionContext.Provider
      value={{
        connections,
        createConnection,
        updateConnection,
        removeConnection,
        findConnectionWith,
      }}
    >
      {children}
    </ConnectionContext.Provider>
  );
}

export function useConnectionContext() {
  const context = useContext(ConnectionContext);
  if (!context) {
    throw new Error(
      "useConnectionContext must be used within an ConnectionProvider",
    );
  }
  return context;
}
