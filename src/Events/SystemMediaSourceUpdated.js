import { Event } from "./Event";

export class SystemMediaSourceUpdated extends Event {
  constructor(mediaSource, context) {
    super(mediaSource, context);
  }

  static get name() {
    return "SystemMediaSourceUpdated";
  }

  static get entity() {
    return "mediaSource";
  }
}
