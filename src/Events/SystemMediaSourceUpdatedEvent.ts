import Event from "./Event";

type MediaSoure = import("../types/MediaSourceSchema").MediaSource;

class SystemMediaSourceUpdatedEvent extends Event {
  constructor(mediaSource: MediaSoure) {
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
