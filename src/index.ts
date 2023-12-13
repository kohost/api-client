import Models from "./Models";
import Errors from "./Errors";
import Commands from "./Commands";
import Events from "./Events";
import defs from "./defs";
import utils from "./utils";
import Client from "./Client";
import SocketIoClient from "./SocketIoClient";
import AMQPClient from "./AMQPClient";

declare module "kohost" {
  import Models from "./Models";
}
