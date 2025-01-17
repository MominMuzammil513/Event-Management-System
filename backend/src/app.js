import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import eventRoutes from './routes/eventRoutes.js';

// Initialize Express app
const app = express();

// Allowed origins for CORS
const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173'];

// CORS setup
app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

// Middleware for parsing JSON
app.use(express.json({ limit: '16kB' }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

export { app };