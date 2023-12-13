function getFormalDeviceType(deviceType: string) {
  return deviceType.charAt(0).toUpperCase() + deviceType.slice(1);
}

module.exports = getFormalDeviceType;
