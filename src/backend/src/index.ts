import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Server } from "socket.io";
import fs from "fs";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

const activeRooms = new Set<String>();

const server = require("http").createServer(app);

function makeRoomID() {
    while (true) {
        let result = "";
        // abcdefghijklmnopqrstuvwxyz
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const charactersLength = characters.length;
        for (let index = 0; index < 5; index++) {
            result += characters.charAt(
                Math.floor(Math.random() * charactersLength)
            );
        }

        if (!activeRooms.has(result)) {
            activeRooms.add(result);
            return result;
        }
    }
}

app.use(cors());
app.use(express.json());

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
    },
});

app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server + Nodemon");
});

app.get("/createRoom", (req: Request, res: Response) => {
    res.send(makeRoomID());
});

app.post("/predict", (req: Request, res: Response) => {
    fs.writeFile(
        "./images/array.json",
        JSON.stringify(req.body),
        "utf8",
        (err) => {
            if (err) console.log(err);
        }
    );

    res.json({
        label: "bat",
        confidence: 0.933,
    });
});

io.on("connection", (socket) => {
    console.log(`Id-${socket.id} connected!`);

    socket.on("join", (data: { username: string; roomCode: string }) => {
        if (activeRooms.has(data.roomCode)) {
            socket.join(data.roomCode);
            socket.to(data.roomCode).emit("joined");
        } else {
            console.log("Invalid room code");
        }
    });

    socket.on("leave", (data: { username: string; roomCode: string }) => {
        if (activeRooms.has(data.roomCode)) {
            socket.leave(data.roomCode);
            socket.to(data.roomCode).emit("left");
        } else {
            console.log("Invalid room code");
        }
    });

    socket.on("disconnect", () => {
        console.log(`Id-${socket.id} disconnected!`);
    });
});

server.listen(port, () => {
    console.log(`Backend running on port ${port}`);
});
