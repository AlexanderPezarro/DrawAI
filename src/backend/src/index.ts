import express, { Express, Request, Response } from 'express';
import dotenv from "dotenv";
import cors from 'cors';
import { Server } from "socket.io";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

const activeRooms = new Set<String>();

const server = require('http').createServer(app);

function makeRoomID() {
    while(true) {
        let result = '';
        // abcdefghijklmnopqrstuvwxyz
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const charactersLength = characters.length;
        for (let index = 0; index < 5; index++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        if (!activeRooms.has(result)) {
            activeRooms.add(result);
            return result;
        }
    }
}

app.use(cors());

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000"
    }
});


app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server + Nodemon');
  });

app.get('/createRoom', (req: Request, res: Response) => {
    res.send(makeRoomID());
    });

io.on('connection', (socket) => {
    console.log(`${socket.id} user just connected!`);
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
});

server.listen(port, () => {
  console.log(`Backend running on port ${port}`)
})