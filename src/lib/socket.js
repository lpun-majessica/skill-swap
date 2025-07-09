import { io } from "socket.io-client";

const origin = process.env.NEXT_PUBLIC_ORIGIN;
const port = process.env.NEXT_PUBLIC_SOCKET_PORT;
const URL = `${origin}:${port}`;

let clientSocket;
if (!clientSocket) {
  clientSocket = io(URL, { transports: ["websocket"] });
}

clientSocket.on("connect_error", (err) => {
  // the reason of the error, for example "xhr poll error"
  console.log(err.message);

  // some additional description, for example the status code of the initial HTTP response
  console.log(err.description);
});

const connectSocket = (userId) => {
  if (!userId) {
    return;
  }
  clientSocket.emit("join", userId);
};

const disconnectSocket = (userId) => {
  if (!userId) {
    return;
  }
  clientSocket.emit("leave", userId);
};

export { clientSocket, connectSocket, disconnectSocket };
