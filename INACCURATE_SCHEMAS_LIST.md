# Schemas with Type Inaccuracies

## Summary

Out of 44 schemas analyzed, **43 are fully accurate**. Only 1 minor issue was found.

## Minor Issue

### definitions.json - notification.name property

**Affected Schemas:** All schemas that use `definitions.json#/definitions/notification`

- Alarm
- Camera
- Courtesy
- Dimmer
- Gateway
- Lock
- MediaSource
- MotionSensor
- Switch
- Thermostat
- WindowCovering

**Current Type:** `any`

**Expected Type:**

```typescript
"button 1" |
  "button 2" |
  "button 3" |
  "button 4" |
  "button 5" |
  "idle" |
  "powerHasBeedApplied" |
  "acMainsDisconnected" |
  "acMainsReconnected" |
  "replaceBatterySoon" |
  "replaceBatteryNow" |
  "batteryOk" |
  "hardwareFailure" |
  "softwareFailure" |
  "hardwareFailureWithCode" |
  "softwareFailureWithCode" |
  "motionDetection" |
  "airFilterNeedsCleaned" |
  "airFilterNeedsReplaced" |
  "smokeDetected" |
  "outsideSafeTemperatureRange" |
  "outsideSafeHumidityRange" |
  "scheduleMaintenance" |
  "doorAjar" |
  "communicationFailure" |
  "communicationOk" |
  "burglarAlarm" |
  "fireAlarm";
```

**Root Cause:**

In `src/schemas/definitions.js` line 212-214:

```javascript
name: {
  type: "string",
  $ref: "#/definitions/supportedNotifications/items",
},
```

The property has both a `type` declaration and a `$ref`. The build script currently prioritizes the $ref but doesn't properly resolve external refs that point to nested items in another schema section.

**Fix Options:**

Option 1 - Update Schema (Recommended):

```javascript
name: {
  $ref: "#/definitions/supportedNotifications/items",
},
```

Option 2 - Update Build Script:
Enhance `getPropertyType()` in `scripts/utils/jsdoc.js` to handle external refs with JSON pointers (e.g., `#/definitions/supportedNotifications/items`).

**Impact:**

- Low - The field is still typed as string, which is structurally correct
- Missing enum constraint means less IDE autocomplete support

## All Other Schemas: ✅ ACCURATE

The following schema types are 100% accurate:

- Announcement, Automation, Category, Credential, DeviceRouter
- DiscoveredDevice, EmailMessage, EnergyReport, EnergyReportShard
- Identification, Issue, Log, MediaFile, Notification
- Order, Organization, Payment, Policy, Product
- Property, Reservation, Room, Scene, Session
- ShortLink, SmsMessage, Space, System, SystemUser
- Ticket, TimeSheet, User, Vendor

These schemas correctly handle:

- ✅ External references
- ✅ Local references (#/$defs/_, #/properties/_/items)
- ✅ Nested objects
- ✅ Arrays of objects
- ✅ Enums
- ✅ Union types
- ✅ Nullable types
