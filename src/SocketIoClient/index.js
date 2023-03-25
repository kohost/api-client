const io = require("socket.io-client");
const { EventEmitter } = require("events");

module.exports = class SocketIoClient extends EventEmitter {
  constructor(config = { url: null, propertyId: null, options: {} }) {
    super();
    if (!config.url) throw new Error("Websocket URL / endpoint not provided");
    if (!config.propertyId) throw new Error("Property ID not provided");
    this.url = config.url;
    this.propertyId = config.propertyId;
    this.options = {
      autoConnect: false,
      extraHeaders: {
        "X-Property-Id": this.propertyId,
      },
      forceNew: false,
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      withCredentials: true,
      ...config.options,
    };

    this.socket = io(this.url, this.options);

    this.socket.on("connect", () => {
      this.emit("connect", this.socket);
    });

    this.socket.on("disconnect", (reason) => {
      this.emit("disconnect", reason);
    });

    this.socket.on("reconnect_attempt", (data) => {
      this.emit("reconnect_attempt", data);
    });

    this.socket.on("connect_error", (error) => {
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

  subscribe(event, callback) {
    this.socket.on(event, callback);
  }

  unsubscribe(event, callback) {
    this.socket.off(event, callback);
  }

  send(event, { data = {}, query = {} }) {
    this.socket.emit(event, { data, query });
  }
};
