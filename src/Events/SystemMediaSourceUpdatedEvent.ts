import MediaSource from "../Models/MediaSource";
import Event from "./Event";

class SystemMediaSourceUpdatedEvent extends Event {
  constructor(mediaSource: MediaSource) {
    super(mediaSource);
  }

  get name() {
    return "SystemMediaSourceUpdated";
  }

  get routingKey() {
    return `mediaSource.${this.keyId}.updated`;
  }
}

export default SystemMediaSourceUpdatedEvent;
