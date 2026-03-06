import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRouts from './routs/userRouts';
import articleRoutes from './routs/articleRoutes';
import aboutRoutes from './routs/aboutRoutes';
import imageSectionRoutes from './routs/imageSectionRoutes';
import commentRoutes from './routs/commentRoutes';
import reportRoutes from './routs/reportRoutes';
import { syncAllUsers } from './services/userSyncService';

dotenv.config();

const app = express();

// Enable CORS
const corsOptions = {
  origin: [
    'https://www.smartaquamarket.com',
    'https://blog.smartaquamarket.com',
    'http://localhost:3000',
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
app.use(cors(corsOptions));
// Explicitly handle OPTIONS preflight for all routes
app.options('*', cors(corsOptions));

const PORT = process.env.PORT || 8001;
const DB_URL = process.env.DB_URL || '';

/* Middlewares  to parse JSON bodies*/
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

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
mongoose
  .connect(DB_URL, {
    serverSelectionTimeoutMS: 5000,
    bufferCommands: false,
  })
  .then(async () => {
    console.log(`🌎 | App Started on  http://localhost:${PORT}`);
    // One time sync of all users from MySQL to MongoDB
    await syncAllUsers();
  })
  .catch((error: any) => {
    console.log('Error occurred while connecting to database', error);
  });

app.use('/api/v1/users', userRouts);
app.use('/api/v1/articles', articleRoutes);
app.use('/api/v1/about', aboutRoutes);
app.use('/api/v1/imageSection', imageSectionRoutes);
app.use('/api/v1/comments', commentRoutes);
app.use('/api/v1/reports', reportRoutes);

app.use((req, res, next) => {
  //extract the path from the request
  const path = req.path;
  res.status(404).sendFile(__dirname + '/views/index.html');
});

app
  .listen(PORT, () => {
    console.log(
      `Server is Successfully Running, and App is listening on port ${PORT}`,
    );
  })
  .on('error', (error: any) => {
    console.log("Error occurred, server can't start", error);
  });
