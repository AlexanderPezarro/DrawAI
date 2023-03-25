import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Server } from "socket.io";
const ImageDataURI = require("image-data-uri");
const spawn = require("child_process").spawn;
const fs = require("fs");

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

// Set up the evaluation
const eval_child = spawn("python3", ["evaluate.py"]);
eval_child.stdin.setEncoding("utf-8");

async function eval_fn() {
    return Promise.resolve({
        then(onFulfill: (arg0: string) => void, onReject: any) {
            eval_child.stderr.on("data", (data: string) => {
                console.log(`stderr: ${data}`);
                // onFulfill(data);
            });
            eval_child.stdout.on("data", (data: string) => {
                // console.log(`stdout: ${data}`);
                onFulfill(data);
            });
        },
    });
}

const activeRooms = new Set<String>();

const server = require("http").createServer(app);

const words = [
    "banana",
    "bat",
    "bed",
    "book",
    "bowtie",
    "brain",
    "monkey",
    "mushroom",
    "skull",
    "whale",
];

function generateRandomSequence(n: number) {
    return words.sort(() => 0.5 - Math.random()).slice(0, n);
}

function makeRoomID() {
    while (true) {
        let result = "";
        // abcdefghijklmnopqrstuvwxyz
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const charactersLength = characters.length;
        for (let index = 0; index < 6; index++) {
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
app.use(express.json({ limit: "50mb" }));
app.use(
    express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
    },
});

app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server + Nodemon");
});

app.get("/createRoom", (req: Request, res: Response) => {
    const roomCode = makeRoomID();
    res.send(roomCode);
    console.log(`Sent room code: ${roomCode}`);
});

app.post("/predict", async (req: Request, res: Response) => {
    const name = (Math.random() + 1).toString(36).substring(7);
    await ImageDataURI.outputFile(req.body.data, `./images/${name}.png`);
    console.log("print here...");
    // Pass file to evaluation
    eval_child.stdin.write(`./images/${name}.png\n`);

    eval_fn().then((result: string) => {
        res.json(JSON.parse(result));
    });
});

app.post("/checkRoom", (req: Request, res: Response) => {
    console.log(`Checking room ${JSON.stringify(req.body.roomCode)}`);
    if (activeRooms.has(req.body.roomCode)) res.send(req.body.roomCode).end();
    res.status(401).send();
});

io.on("connection", (socket) => {
    console.log(`Id-${socket.id} connected!`);

    socket.on("join", (data: { username: string; roomCode: string }) => {
        if (activeRooms.has(data.roomCode)) {
            console.log(`${data.username} has join room ${data.roomCode}`);
            socket.join(data.roomCode);
            io.to(data.roomCode).emit("joined", data.username);
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

    socket.on(
        "message",
        (data: {
            text: string;
            username: string;
            roomCode: string;
            id: string;
            socketID: string;
        }) => {
            console.log(`Got message: ${JSON.stringify(data)}`);
            if (activeRooms.has(data.roomCode)) {
                io.to(data.roomCode).emit("message", {
                    text: data.text,
                    username: data.username,
                    id: data.id,
                });
            } else {
                console.log(`Invalid room code: ${JSON.stringify(data)}`);
            }
        }
    );

    socket.on("start", (roomCode: string) => {
        console.log(`Room starting: ${roomCode}`);
        if (activeRooms.has(roomCode)) {
            io.to(roomCode).emit("started", generateRandomSequence(5));
        } else {
            console.log(
                `Invalid room code when starting: ${JSON.stringify(roomCode)}`
            );
        }
    });

    socket.on("game over", (data: { roomCode: string; username: string }) => {
        console.log(`Game over: ${data.roomCode}`);
        if (activeRooms.has(data.roomCode)) {
            io.to(data.roomCode).emit("over", data.username);
        } else {
            console.log(
                `Invalid room code when ending: ${JSON.stringify(data)}`
            );
        }
    });

    socket.on("disconnect", () => {
        console.log(`Id-${socket.id} disconnected!`);
    });
});

server.listen(port, () => {
    console.log(`Backend running on port ${port}`);
});
