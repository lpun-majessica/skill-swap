"use client";

const initialConnections = [];

import { createContext, useEffect, useState, useContext } from "react";
import { useSession } from "next-auth/react";

import connectionService from "@/services/connection";

const ConnectionContext = createContext();

export function ConnectionProvider({ children }) {
  const { data } = useSession();
  const [connections, setConnections] = useState(initialConnections);

  useEffect(() => {
    const fetchConnectionData = async () => {
      const CONNECTIONS = await connectionService.getAllConnections();
      setConnections(CONNECTIONS);
    };

    fetchConnectionData();
  }, [data]);

  const createConnection = async (
    sender_id,
    receiver_id,
    isAccepted = false,
  ) => {
    const connection = { sender_id, receiver_id, isAccepted };
    const newConnection = await connectionService.addConnection(connection);

    setConnections(connections.concat(newConnection));
  };

  const updateConnection = async (connectionId, isAccepted = true) => {
    const updatedConnection = await connectionService.updateConnection({
      connectionId,
      isAccepted,
    });

    setConnections(
      connections.map((conn) =>
        conn.id === updatedConnection.id ? updatedConnection : conn,
      ),
    );
  };

  const removeConnection = async (connectionId) => {
    const removedConnection = await connectionService.removeConnection({
      connectionId,
    });

    setConnections(
      connections.filter((conn) => conn.id !== removedConnection.id),
    );
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
