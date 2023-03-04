import express, { Express, Request, Response } from 'express';
import dotenv from "dotenv";
import cors from 'cors';
import { Server } from "socket.io";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;


const http = require('http').Server(app);

app.use(cors());

const io = new Server();

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server + Nodemon');
  });

io.on('connection', (socket) => {
    console.log('a user connected');
});

app.listen(port, () => {
  console.log(`Backend running on port ${port}`)
})