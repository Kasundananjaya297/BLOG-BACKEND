import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRouts from './routs/userRouts';
import articleRoutes from './routs/articleRoutes';
import aboutRoutes from './routs/aboutRoutes';
import imageSectionRoutes from './routs/imageSectionRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL || '';
const SOCKET_PORT = process.env.SOCKET_PORT || 8080;

// Main HTTP server
const httpServer = createServer(app);

// WebSocket server
const wsServer = createServer();
const io = new Server(wsServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.emit('message', 'Hello from the server!',);

  // Handle incoming messages
  socket.on('message', (data) => {
    console.log('Message received:', data);
    // Broadcast to all clients except sender
    socket.broadcast.emitWithAck('message');
  });

  

  // Handle client errors
  socket.on('error', (error) => {
    console.error('Socket error:', error);
  });

  // Handle client disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });

  // Send welcome message
  socket.emit('welcome', {
    message: 'Welcome to the server!',
    socketId: socket.id,
  });
});

/* Middlewares to parse JSON bodies */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1/users', userRouts);
app.use('/api/v1/articles', articleRoutes);
app.use('/api/v1/about', aboutRoutes);
app.use('/api/v1/image-sections', imageSectionRoutes);

app.get('/', async (req, res) => {
  res.send('Server is running');
});

app.get('/info', async (req, res) => {
  res.send({
    PORT: PORT,
    NODE_ENV: process.env.ENV,
    DATABASE_URL: process.env.DB_URL,
  });
});

// MongoDB connection
mongoose
  .connect(DB_URL)
  .then(() => {
    httpServer.listen(PORT, () => {
      console.log(`🌎 | App Started on http://localhost:${PORT}`);
    });

    wsServer.listen(SOCKET_PORT, () => {
      console.log(`🔌 | WebSocket Server running on port ${SOCKET_PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });
