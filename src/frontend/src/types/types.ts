export interface Message {
    text: string;
    username: string;
    id: string;
    socketID: string;
}

export interface MessageResponse {
    text: string;
    username: string;
    id: string;
}

export interface ServerToClientEvents {
    noArg: () => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
}

export interface ClientToServerEvents {
    hello: () => void;
}

export interface InterServerEvents {
    ping: () => void;
}

export interface SocketData {
    name: string;
    age: number;
}
