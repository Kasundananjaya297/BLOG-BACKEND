import express from 'express';

const app = express();
const PORT = 3300;

app.listen(PORT, () => {
    console.log(`Server is Successfully Running, and App is listening on port ${PORT}`);
}).on('error', (error: any) => {
    console.log("Error occurred, server can't start", error);
});