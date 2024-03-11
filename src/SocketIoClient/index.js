const io = require("socket.io-client");
const { EventEmitter } = require("events");

module.exports = class SocketIoClient extends EventEmitter {
  constructor(
    config = {
      url: null,
      options: {},
    }
  ) {
    super();
    if (!config.url) throw new Error("config.url is required");
    this.url = config.url;
    this.options = {
      autoConnect: false,
      forceNew: false,
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      withCredentials: true,
      transports: ["websocket", "polling"],
      upgrade: true,
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

  #url = null;

  get url() {
    return this.#url;
  }

  set url(url) {
    this.#url = url;
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

  getSubscriptions(event) {
    return this.socket.listeners(event);
  }

  send(event, { data = {}, query = {}, ...rest }) {
    this.socket.emit(event, { data, query, ...rest });
  }

  destroy() {
    this.disconnect();
    this.socket.removeAllListeners();
    this.socket = null;
  }
};
