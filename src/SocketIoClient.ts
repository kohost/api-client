import { io, Socket } from "socket.io-client";
import { EventEmitter } from "events";

interface ClientOptions {
  url: string;
}

export class SocketIoClient extends EventEmitter {
  socket: Socket;
  constructor(config: ClientOptions = { url: "" }) {
    super();
    if (!config.url) throw new Error("config.url is required");

    this.socket = io(config.url, {
      autoConnect: false,
      forceNew: false,
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      withCredentials: true,
      transports: ["websocket", "polling"],
      upgrade: true,
    });

    this.socket.on("connect", () => {
      this.emit("connect", this.socket);
    });

    this.socket.on("disconnect", (reason: string) => {
      this.emit("disconnect", reason);
    });

    this.socket.on("reconnect_attempt", (attempt: number) => {
      this.emit("reconnect_attempt", attempt);
    });

    this.socket.on("connect_error", (error: Error) => {
      this.emit("connect_error", error);
    });
  }

  get connected() {
    return this.socket?.connected || false;
  }

  get disconnected() {
    return this.socket?.disconnected || false;
  }

  connect() {
    this.socket.connect();
  }

  disconnect() {
    this.socket.disconnect();
  }

  reconnect() {
    this.disconnect();
    this.connect();
  }

  subscribe(event: string, callback: () => any) {
    this.socket.on(event, callback);
  }

  unsubscribe(event: string, callback: () => any) {
    this.socket.off(event, callback);
  }

  send(event: string, { data = {}, query = {}, ...rest }) {
    this.socket.emit(event, { data, query, ...rest });
  }

  destroy() {
    this.disconnect();
    this.socket.removeAllListeners();
  }
}
