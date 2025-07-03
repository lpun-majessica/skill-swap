import { io } from "socket.io-client";

const origin = process.env.ORIGIN;
const port = process.env.SOCKET_PORT;
const endpoint = `${origin}:${port}`;

let clientSocket;

clientSocket.on("connect", () => {
  console.log("Connected to Socket.IO");
});

const connectSocket = (userId) => {
  clientSocket = io(endpoint);
  clientSocket.emit("join", userId);
};

const disconnectSocket = (userId) => {
  clientSocket.emit("leave", userId);
};

export { clientSocket, connectSocket, disconnectSocket };
