const io = require("socket.io-client");
const { EventEmitter } = require("events");

module.exports = class SocketIoClient extends EventEmitter {
  constructor(config) {
    super();
    this.socket = null;
    this.subscriptions = [];
    this.reconnectAttempt = 0;
    this._configureSocketIo(config);
  }

  _configureSocketIo({
    url,
    propertyId,
    options = {},
    errHandler = function () {},
  }) {
    if (!url) throw new Error("Websocket URL / endpoint not provided");
    this.url = url;
    this.propertyId = propertyId;
    this.options = options;
    this.errHandler = errHandler.bind(this);

    this.init();
  }

  get connected() {
    return this.socket?.connected;
  }

  init() {
    if (this.socket?.connected || this.socket?.connecting) return;
    const options = {
      autoConnect: false,
      extraHeaders: {
        "X-Property-Id": this.propertyId,
      },
      forceNew: false,
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 3000,
      withCredentials: true,
    };
    this.socket = io(this.url, options);

    this.socket.on("connect", () => {
      this.emit("connect", this.socket);
    });

    this.socket.on("disconnect", (reason) => {
      this.emit("disconnect", reason);
    });

    this.socket.on("reconnect_attempt", () => {
      this.reconnectAttempt++;
      this.emit("reconnect_attempt", this.reconnectAttempt);
    });

    this.socket.on("connect_error", (error) => {
      this.errHandler(error);
    });
  }

  _reconnect(force = false) {
    if (this.socket?.disconnected || force) {
      this.reconnectAttempt++;
      this._disconnect();
      this._connect();
    }
  }

  _disconnect() {
    if (!this.socket) return;
    this.socket.disconnect();
    this.socket.removeAllListeners();
  }

  connect() {
    return this.socket.connect();
  }

  reconnect(force = false) {
    return this._reconnect(force);
  }

  disconnect() {
    this._disconnect();
  }

  subscribe(event, callback) {
    this.socket.on(event, callback);
  }

  unsubscribe(event, callback) {
    this.socket.off(event, callback);
  }

  resubscribe() {
    for (const sub of this.subscriptions) {
      this.subscribe(sub.event, sub.callback, false);
    }
  }

  send(event, { data = {}, query = {} }) {
    this.socket.emit(event, { data, query });
  }
};
