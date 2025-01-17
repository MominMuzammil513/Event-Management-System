import { Server } from "socket.io";

const setupWebSocket = (server) => {
    console.log(process.env.CORS_ORIGIN,"PPPPPP")
  const io = new Server(server, {
    cors: {
      origin: process.env.CORS_ORIGIN, // Allow connections from this origin
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("joinEvent", (eventId) => {
      socket.join(eventId);
      console.log(`User joined event room: ${eventId}`);
    });

    socket.on("leaveEvent", (eventId) => {
      socket.leave(eventId);
      console.log(`User left event room: ${eventId}`);
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });

  return io;
};

export default setupWebSocket;