import { MediaSourceSchema } from "../Models/MediaSource";
import { Event } from "./Event";

class SystemMediaSourceUpdated extends Event {
  constructor(mediaSource: MediaSourceSchema, context = {}) {
    super(mediaSource, context);
  }

  static get name() {
    return "SystemMediaSourceUpdated";
  }

  get entity() {
    return "mediaSource" as const;
  }
}

export default SystemMediaSourceUpdated;
