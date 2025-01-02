import express from 'express';
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

/* Middlewares  to parse JSON bodies*/
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

app.get('/', async(req, res) => {
    res.send('Server is running');
});
app.get('/info', async(req, res) => {
    res.send({
        PORT: PORT,
        NODE_ENV: process.env.ENV,
        DATABASE_URL: process.env.DB_URL,
    });
});
app.use((req, res, next) => {
    //extract the path from the request
    const path = req.path;
    res.status(404).sendFile(__dirname + "/views/index.html");
  });

app.listen(PORT, () => {
    console.log(`Server is Successfully Running, and App is listening on port ${PORT}`);
}).on('error', (error: any) => {
    console.log("Error occurred, server can't start", error);
});