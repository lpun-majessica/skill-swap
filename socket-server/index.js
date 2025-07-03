import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const origin = process.env.ORIGIN;
const port = process.env.SOCKET_PORT;

const io = new Server(httpServer, {
  cors: { origin, methods: ["GET"] },
});

io.on("connection", (socket) => {
  console.log("Connected to Socket.IO");

  socket.on("join", (room) => {
    socket.join(room);
    console.log("Joined user stream");
  });

  socket.on("leave", (room) => {
    socket.leave(room);
    console.log("Left user stream");
  });

  socket.on("connection", ({ targetUserId, type, notificationId }) => {
    io.to(targetUserId).emit(type, notificationId);
  });
});

httpServer.listen(port);
console.log("Listening on PORT: ", port);
