import dotenv from 'dotenv';
import connectDB from "./db/index.js";
import { app } from './app.js';
import http from 'http'; // Import http module
import setupWebSocket from './websocket/websocket.js'; // Import WebSocket setup

dotenv.config({ path: './.env' });

connectDB()
  .then(() => {
    const server = http.createServer(app); // Create HTTP server
    const io = setupWebSocket(server); // Initialize WebSocket

    // Attach io to the request object
    app.use((req, res, next) => {
      req.io = io;
      next();
    });

    server.listen(process.env.PORT || 8000, () => {
      console.log("Server is running at port " + process.env.PORT);
    });
  })
  .catch(err => {
    console.log("Mongo connection error: " + err);
    throw err;
  });