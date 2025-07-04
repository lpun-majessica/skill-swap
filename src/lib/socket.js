import { io } from "socket.io-client";

const origin = process.env.ORIGIN;
const port = process.env.SOCKET_PORT;
const endpoint = `${origin}:${port}`;

const clientSocket = io(endpoint);

clientSocket.on("connect", () => {
  console.log("Connected to Socket.IO");
});

const connectSocket = (userId) => {
  clientSocket.emit("join", userId);
};

const disconnectSocket = (userId) => {
  clientSocket.emit("leave", userId);
};

export { clientSocket, connectSocket, disconnectSocket };
