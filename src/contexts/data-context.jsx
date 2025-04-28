'use client';

import { createContext, useContext, useState } from 'react';
import usersData from '../lib/data/users.json';
import connectionsData from '../lib/data/connections.json';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [users, setUsers] = useState(usersData);
  const [connections, setConnections] = useState(connectionsData);

  // User  
  const updateUser = (id, updatedFields) => {
    setUsers((prev) => prev.map((user) => user.id === id ? { ...user, ...updatedFields } : user));
  };

  // CRUD Connection
  const createConnection = (senderId, receiverId) => {
    const newConnection = {
      id: Date.now(), // fake id
      sender_id: senderId,
      receiver_id: receiverId,
      isAccepted: false,
    };
    setConnections((prev) => [...prev, newConnection]);
  };

  const acceptConnection = (connectionId) => {
    setConnections((prev) => prev.map((conn) => conn.id === connectionId ? { ...conn, isAccepted: true } : conn));
  };

  const rejectConnection = (connectionId) => {
    setConnections((prev) => prev.filter((conn) => conn.id !== connectionId));
  };

  const removeConnection = (connectionId) => {
    setConnections((prev) => prev.filter((conn) => conn.id !== connectionId));
  };

  return (
    <DataContext.Provider value={{
      users,
      connections,
      updateUser,
      createConnection,
      acceptConnection,
      rejectConnection,
      removeConnection
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useDataContext() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useDataContext must be used within a DataProvider');
  }
  return context;
}