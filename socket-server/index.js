import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const origin = process.env.AUTH_URL;
const port = process.env.NEXT_PUBLIC_SOCKET_PORT;

const io = new Server(httpServer, {
  cors: { origin },
});

io.on("connection", (socket) => {
  console.log("Connected to Socket.IO");

  socket.on("join", (room) => {
    if (room in socket.rooms) {
      return;
    }
    socket.join(room);
    console.log("Joined user stream");
  });

  socket.on("leave", (room) => {
    socket.leave(room);
    console.log("Left user stream");
  });

  socket.on("connectionRequest", (type, notification, connection) => {
    io.to(notification.receiver)
      .to(notification.sender)
      .emit(type, notification, connection);
  });
});

httpServer.listen(port, () => console.log(`Listening on PORT: ${port}`));
