// This file is automatically generated. Do not modify it manually.

  import { Entity } from './entity';
  import { validateMediaSource as validate } from '../validators/mediaSource';

  export class MediaSource extends Entity {
	constructor(data) {
	  super(data);
	  this.id = data.id;
            this.type = data.type;
            this.discriminator = data.discriminator;
            this.playlists = data.playlists;
            this.remote = data.remote;
            this.name = data.name;
            this.driver = data.driver;
            this.offline = data.offline;
            this.audio = data.audio;
            this.video = data.video;
            this.powerFeedback = data.powerFeedback;
            this.volumeFeedback = data.volumeFeedback;
            this.muted = data.muted;
            this.volume = data.volume;
            this.brightness = data.brightness;
            this.contrast = data.contrast;
            this.power = data.power;
            this.input = data.input;
            this.supportedInputs = data.supportedInputs;
            this.supportedOutputs = data.supportedOutputs;
            this.command = data.command;
            this.supportedNotifications = data.supportedNotifications;
            this.notification = data.notification;
            this.systemId = data.systemId;
            this.watts = data.watts;
	}
	  

	
	  
	  

	  

	  
  }

  Object.defineProperty(MediaSource.prototype, "schema", {
	value: {"$schema":"http://json-schema.org/draft-07/schema","$id":"mediaSource.json","title":"Media Source","description":"Any media source","type":"object","required":["id","type","discriminator","audio","video","driver"],"properties":{"id":{"$ref":"definitions.json#/definitions/id"},"type":{"type":"string","default":"mediaSource","enum":["mediaSource"]},"discriminator":{"type":"string","enum":["tv","dvr","appleTv","discPlayer","mediaPlayer","paSystem","uncontrolledDevice"]},"playlists":{"type":"array","items":{"type":"object","properties":{"id":{"$ref":"definitions.json#/definitions/id"},"name":{"$ref":"definitions.json#/definitions/name"}}}},"remote":{"type":"string","enum":["MR22GA","XRT260","XRT270","HOF-16K 1.2","219863500","SONIFI","AKB76039803","BN59-01388A"]},"name":{"$ref":"definitions.json#/definitions/name"},"driver":{"$ref":"definitions.json#/definitions/driver"},"offline":{"type":"boolean"},"audio":{"type":"boolean"},"video":{"type":"boolean"},"powerFeedback":{"type":"boolean"},"volumeFeedback":{"type":"boolean"},"muted":{"type":"boolean"},"volume":{"type":"number","minimum":0,"maximum":100},"brightness":{"type":"number","minimum":0,"maximum":100},"contrast":{"type":"number","minimum":0,"maximum":100},"power":{"type":"string","enum":["on","off"]},"input":{"type":"string"},"supportedInputs":{"type":"array","items":{"type":"string"}},"supportedOutputs":{"type":"array","items":{"type":"string"}},"command":{"type":["string","null"],"enum":["mute","volumeUp","volumeDown","brightnessUp","brightnessDown","channelUp","channelDown","number0","number1","number2","number3","number4","number5","number6","number7","number8","number9","lastChannel","display","favoriteChannel","play","playing","stop","stopped","pause","paused","fastForward","fastForwarding","rewind","rewinding","instantReplay","record","ac3","pvrMenu","guide","menu","menuUp","menuDown","menuLeft","menuRight","pageUp","pageDown","select","exit","input","power","enterChannel","enterVolume","enterBrightness","enterContrast","number10","number11","number12","number13","number14","number15","number16","number10Plus","number20Plus","number100","dash","threeChan","threeD","sixChan","a","add","alarm","am","analog","angle","antenna","antennaEast","antennaWest","aspect","audio1","audio2","audio3","audioDumming","audioLevelDown","audioLevelUp","b","back","c","component1","component2","component3","d","home","list","liveTv","discreteInputCable","powerOff","powerOn","setupMenu","skipForward","skipReverse","video1","video2","video3","video4","video5","details","hdmi1","hdmi2","hdmi3","cecDeviceList","mtsSap","red","green","yellow","blue","alert","order"]},"supportedNotifications":{"$ref":"definitions.json#/definitions/supportedNotifications"},"notification":{"$ref":"definitions.json#/definitions/notification"},"systemId":{"$ref":"definitions.json#/definitions/systemId"},"watts":{"$ref":"definitions.json#/definitions/watts"}},"additionalProperties":false}
  });

  Object.defineProperty(MediaSource.prototype, "validator", {
	get: function() { return validate; }
  });
