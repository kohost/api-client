// This file is automatically generated. Do not modify it manually.

	  import { createRequire } from 'node:module'; 
	  const require = createRequire(import.meta.url);
"use strict";
export const validate = validate89;
const schema210 = {"$schema":"http://json-schema.org/draft-07/schema","$id":"scene.json","title":"Scene","description":"A room represents a physical space of controllable IoT devices","type":"object","properties":{"id":{"$ref":"definitions.json#/definitions/id"},"name":{"type":"string"},"description":{"type":"string"},"type":{"type":"string","enum":["scene"],"default":"scene"},"devices":{"type":"object","properties":{"switches":{"type":"array","items":{"type":"object","properties":{"id":{"$ref":"definitions.json#/definitions/id"},"state":{"$ref":"switch.json#/properties/state"}},"default":[]}},"dimmers":{"type":"array","items":{"type":"object","properties":{"id":{"$ref":"definitions.json#/definitions/id"},"level":{"$ref":"dimmer.json#/properties/level"}}},"default":[]},"windowCoverings":{"type":"array","items":{"type":"object","properties":{"id":{"$ref":"definitions.json#/definitions/id"},"position":{"$ref":"windowCovering.json#/properties/position"}}},"default":[]},"thermostats":{"type":"array","items":{"type":"object","properties":{"id":{"$ref":"definitions.json#/definitions/id"},"hvacMode":{"$ref":"thermostat.json#/properties/hvacMode"},"setpoints":{"$ref":"thermostat.json#/properties/setpoints"},"fanMode":{"$ref":"thermostat.json#/properties/fanMode"},"setpointDelta":{"type":"number"}}},"default":[]},"mediaSources":{"type":"array","items":{"type":"object","properties":{"id":{"$ref":"definitions.json#/definitions/id"},"volume":{"type":"number","minimum":0,"maximum":100},"commands":{"type":"array","items":{"type":"string"}}}}},"locks":{"type":"array","items":{"type":"object","properties":{"id":{"$ref":"definitions.json#/definitions/id"},"state":{"$ref":"lock.json#/properties/state"},"mode":{"$ref":"lock.json#/properties/mode"}}}}},"additionalProperties":false},"isDefault":{"type":"boolean","default":false},"showOnUi":{"type":"boolean","default":true}},"additionalProperties":false};
const schema13 = {"type":"string","description":"Identifier of the object.","not":{"enum":["global","system"]}};
const schema213 = {"type":"string","enum":["on","off"]};
const schema215 = {"type":["number","null"],"minimum":0,"maximum":100};
const schema217 = {"type":["number","null"],"minimum":0,"maximum":100};
const schema226 = {"type":["string","null"],"enum":["locked","unlocked",null]};
const schema227 = {"type":["string","null"],"enum":["normal","autoLock","emergencyOpen","emergencyClose","holdOpen","lockdown",null],"description":"emergencyOpen and emergencyClose are deprecated and can be removed once Salto, Paxton and Geovision drivers are updated","default":null};
const schema219 = {"type":"string","$ref":"#/properties/supportedHvacModes/items"};
const schema189 = {"enum":["cool","heat","auto","off"]};

function validate90(data, {instancePath="", parentData, parentDataProperty, rootData=data}={}){
let vErrors = null;
let errors = 0;
if(typeof data !== "string"){
const err0 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(!((((data === "cool") || (data === "heat")) || (data === "auto")) || (data === "off"))){
const err1 = {instancePath,schemaPath:"#/properties/supportedHvacModes/items/enum",keyword:"enum",params:{allowedValues: schema189.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
validate90.errors = vErrors;
return errors === 0;
}

const schema221 = {"type":"object","additionalProperties":false,"properties":{"cool":{"$ref":"#/$defs/setpoint"},"heat":{"$ref":"#/$defs/setpoint"},"auto":{"$ref":"#/$defs/setpoint"}}};
const schema191 = {"type":"object","additionalProperties":false,"properties":{"value":{"$ref":"#/$defs/setpointValue"},"min":{"$ref":"#/$defs/setpointMinMax"},"max":{"$ref":"#/$defs/setpointMinMax"}}};
const schema192 = {"type":"number","minimum":0,"maximum":99};
const schema193 = {"type":["number","null"],"minimum":0,"maximum":99};

function validate74(data, {instancePath="", parentData, parentDataProperty, rootData=data}={}){
let vErrors = null;
let errors = 0;
if(data && typeof data == "object" && !Array.isArray(data)){
for(const key0 in data){
if(!(((key0 === "value") || (key0 === "min")) || (key0 === "max"))){
const err0 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
}
if(data.value !== undefined){
let data0 = data.value;
if(typeof data0 == "number"){
if(data0 > 99 || isNaN(data0)){
const err1 = {instancePath:instancePath+"/value",schemaPath:"#/$defs/setpointValue/maximum",keyword:"maximum",params:{comparison: "<=", limit: 99},message:"must be <= 99"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data0 < 0 || isNaN(data0)){
const err2 = {instancePath:instancePath+"/value",schemaPath:"#/$defs/setpointValue/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
}
else {
const err3 = {instancePath:instancePath+"/value",schemaPath:"#/$defs/setpointValue/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
}
if(data.min !== undefined){
let data1 = data.min;
if((!(typeof data1 == "number")) && (data1 !== null)){
const err4 = {instancePath:instancePath+"/min",schemaPath:"#/$defs/setpointMinMax/type",keyword:"type",params:{type: schema193.type},message:"must be number,null"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
if(typeof data1 == "number"){
if(data1 > 99 || isNaN(data1)){
const err5 = {instancePath:instancePath+"/min",schemaPath:"#/$defs/setpointMinMax/maximum",keyword:"maximum",params:{comparison: "<=", limit: 99},message:"must be <= 99"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
if(data1 < 0 || isNaN(data1)){
const err6 = {instancePath:instancePath+"/min",schemaPath:"#/$defs/setpointMinMax/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
}
}
if(data.max !== undefined){
let data2 = data.max;
if((!(typeof data2 == "number")) && (data2 !== null)){
const err7 = {instancePath:instancePath+"/max",schemaPath:"#/$defs/setpointMinMax/type",keyword:"type",params:{type: schema193.type},message:"must be number,null"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
if(typeof data2 == "number"){
if(data2 > 99 || isNaN(data2)){
const err8 = {instancePath:instancePath+"/max",schemaPath:"#/$defs/setpointMinMax/maximum",keyword:"maximum",params:{comparison: "<=", limit: 99},message:"must be <= 99"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
if(data2 < 0 || isNaN(data2)){
const err9 = {instancePath:instancePath+"/max",schemaPath:"#/$defs/setpointMinMax/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
}
}
}
else {
const err10 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
validate74.errors = vErrors;
return errors === 0;
}


function validate92(data, {instancePath="", parentData, parentDataProperty, rootData=data}={}){
let vErrors = null;
let errors = 0;
if(data && typeof data == "object" && !Array.isArray(data)){
for(const key0 in data){
if(!(((key0 === "cool") || (key0 === "heat")) || (key0 === "auto"))){
const err0 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
}
if(data.cool !== undefined){
if(!(validate74(data.cool, {instancePath:instancePath+"/cool",parentData:data,parentDataProperty:"cool",rootData}))){
vErrors = vErrors === null ? validate74.errors : vErrors.concat(validate74.errors);
errors = vErrors.length;
}
}
if(data.heat !== undefined){
if(!(validate74(data.heat, {instancePath:instancePath+"/heat",parentData:data,parentDataProperty:"heat",rootData}))){
vErrors = vErrors === null ? validate74.errors : vErrors.concat(validate74.errors);
errors = vErrors.length;
}
}
if(data.auto !== undefined){
if(!(validate74(data.auto, {instancePath:instancePath+"/auto",parentData:data,parentDataProperty:"auto",rootData}))){
vErrors = vErrors === null ? validate74.errors : vErrors.concat(validate74.errors);
errors = vErrors.length;
}
}
}
else {
const err1 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
validate92.errors = vErrors;
return errors === 0;
}

const schema222 = {"type":"string","$ref":"#/properties/supportedFanModes/items"};
const schema190 = {"enum":["auto","low","medium","high","off","on"]};

function validate97(data, {instancePath="", parentData, parentDataProperty, rootData=data}={}){
let vErrors = null;
let errors = 0;
if(typeof data !== "string"){
const err0 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(!((((((data === "auto") || (data === "low")) || (data === "medium")) || (data === "high")) || (data === "off")) || (data === "on"))){
const err1 = {instancePath,schemaPath:"#/properties/supportedFanModes/items/enum",keyword:"enum",params:{allowedValues: schema190.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
validate97.errors = vErrors;
return errors === 0;
}


function validate89(data, {instancePath="", parentData, parentDataProperty, rootData=data}={}){
/*# sourceURL="scene.json" */;
let vErrors = null;
let errors = 0;
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.type === undefined){
data.type = "scene";
}
if(data.isDefault === undefined){
data.isDefault = false;
}
if(data.showOnUi === undefined){
data.showOnUi = true;
}
for(const key0 in data){
if(!(((((((key0 === "id") || (key0 === "name")) || (key0 === "description")) || (key0 === "type")) || (key0 === "devices")) || (key0 === "isDefault")) || (key0 === "showOnUi"))){
const err0 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
}
if(data.id !== undefined){
let data0 = data.id;
if(typeof data0 !== "string"){
const err1 = {instancePath:instancePath+"/id",schemaPath:"definitions.json#/definitions/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
const _errs5 = errors;
const _errs6 = errors;
if(!((data0 === "global") || (data0 === "system"))){
const err2 = {};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
var valid2 = _errs6 === errors;
if(valid2){
const err3 = {instancePath:instancePath+"/id",schemaPath:"definitions.json#/definitions/id/not",keyword:"not",params:{},message:"must NOT be valid"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
else {
errors = _errs5;
if(vErrors !== null){
if(_errs5){
vErrors.length = _errs5;
}
else {
vErrors = null;
}
}
}
}
if(data.name !== undefined){
if(typeof data.name !== "string"){
const err4 = {instancePath:instancePath+"/name",schemaPath:"#/properties/name/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
}
if(data.description !== undefined){
if(typeof data.description !== "string"){
const err5 = {instancePath:instancePath+"/description",schemaPath:"#/properties/description/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
}
let data3 = data.type;
if(typeof data3 !== "string"){
const err6 = {instancePath:instancePath+"/type",schemaPath:"#/properties/type/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
if(!(data3 === "scene")){
const err7 = {instancePath:instancePath+"/type",schemaPath:"#/properties/type/enum",keyword:"enum",params:{allowedValues: schema210.properties.type.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
if(data.devices !== undefined){
let data4 = data.devices;
if(data4 && typeof data4 == "object" && !Array.isArray(data4)){
if(data4.dimmers === undefined){
data4.dimmers = [];
}
if(data4.windowCoverings === undefined){
data4.windowCoverings = [];
}
if(data4.thermostats === undefined){
data4.thermostats = [];
}
for(const key1 in data4){
if(!((((((key1 === "switches") || (key1 === "dimmers")) || (key1 === "windowCoverings")) || (key1 === "thermostats")) || (key1 === "mediaSources")) || (key1 === "locks"))){
const err8 = {instancePath:instancePath+"/devices",schemaPath:"#/properties/devices/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key1},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
}
if(data4.switches !== undefined){
let data5 = data4.switches;
if(Array.isArray(data5)){
const len0 = data5.length;
for(let i0=0; i0<len0; i0++){
let data6 = data5[i0];
if(data6 && typeof data6 == "object" && !Array.isArray(data6)){
if(data6.id !== undefined){
let data7 = data6.id;
if(typeof data7 !== "string"){
const err9 = {instancePath:instancePath+"/devices/switches/" + i0+"/id",schemaPath:"definitions.json#/definitions/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
const _errs23 = errors;
const _errs24 = errors;
if(!((data7 === "global") || (data7 === "system"))){
const err10 = {};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
var valid8 = _errs24 === errors;
if(valid8){
const err11 = {instancePath:instancePath+"/devices/switches/" + i0+"/id",schemaPath:"definitions.json#/definitions/id/not",keyword:"not",params:{},message:"must NOT be valid"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
else {
errors = _errs23;
if(vErrors !== null){
if(_errs23){
vErrors.length = _errs23;
}
else {
vErrors = null;
}
}
}
}
if(data6.state !== undefined){
let data8 = data6.state;
if(typeof data8 !== "string"){
const err12 = {instancePath:instancePath+"/devices/switches/" + i0+"/state",schemaPath:"switch.json#/properties/state/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
if(!((data8 === "on") || (data8 === "off"))){
const err13 = {instancePath:instancePath+"/devices/switches/" + i0+"/state",schemaPath:"switch.json#/properties/state/enum",keyword:"enum",params:{allowedValues: schema213.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
}
}
else {
const err14 = {instancePath:instancePath+"/devices/switches/" + i0,schemaPath:"#/properties/devices/properties/switches/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
}
}
else {
const err15 = {instancePath:instancePath+"/devices/switches",schemaPath:"#/properties/devices/properties/switches/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
}
let data9 = data4.dimmers;
if(Array.isArray(data9)){
const len1 = data9.length;
for(let i1=0; i1<len1; i1++){
let data10 = data9[i1];
if(data10 && typeof data10 == "object" && !Array.isArray(data10)){
if(data10.id !== undefined){
let data11 = data10.id;
if(typeof data11 !== "string"){
const err16 = {instancePath:instancePath+"/devices/dimmers/" + i1+"/id",schemaPath:"definitions.json#/definitions/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
const _errs35 = errors;
const _errs36 = errors;
if(!((data11 === "global") || (data11 === "system"))){
const err17 = {};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
var valid14 = _errs36 === errors;
if(valid14){
const err18 = {instancePath:instancePath+"/devices/dimmers/" + i1+"/id",schemaPath:"definitions.json#/definitions/id/not",keyword:"not",params:{},message:"must NOT be valid"};
if(vErrors === null){
vErrors = [err18];
}
else {
vErrors.push(err18);
}
errors++;
}
else {
errors = _errs35;
if(vErrors !== null){
if(_errs35){
vErrors.length = _errs35;
}
else {
vErrors = null;
}
}
}
}
if(data10.level !== undefined){
let data12 = data10.level;
if((!(typeof data12 == "number")) && (data12 !== null)){
const err19 = {instancePath:instancePath+"/devices/dimmers/" + i1+"/level",schemaPath:"dimmer.json#/properties/level/type",keyword:"type",params:{type: schema215.type},message:"must be number,null"};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
}
errors++;
}
if(typeof data12 == "number"){
if(data12 > 100 || isNaN(data12)){
const err20 = {instancePath:instancePath+"/devices/dimmers/" + i1+"/level",schemaPath:"dimmer.json#/properties/level/maximum",keyword:"maximum",params:{comparison: "<=", limit: 100},message:"must be <= 100"};
if(vErrors === null){
vErrors = [err20];
}
else {
vErrors.push(err20);
}
errors++;
}
if(data12 < 0 || isNaN(data12)){
const err21 = {instancePath:instancePath+"/devices/dimmers/" + i1+"/level",schemaPath:"dimmer.json#/properties/level/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err21];
}
else {
vErrors.push(err21);
}
errors++;
}
}
}
}
else {
const err22 = {instancePath:instancePath+"/devices/dimmers/" + i1,schemaPath:"#/properties/devices/properties/dimmers/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err22];
}
else {
vErrors.push(err22);
}
errors++;
}
}
}
else {
const err23 = {instancePath:instancePath+"/devices/dimmers",schemaPath:"#/properties/devices/properties/dimmers/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err23];
}
else {
vErrors.push(err23);
}
errors++;
}
let data13 = data4.windowCoverings;
if(Array.isArray(data13)){
const len2 = data13.length;
for(let i2=0; i2<len2; i2++){
let data14 = data13[i2];
if(data14 && typeof data14 == "object" && !Array.isArray(data14)){
if(data14.id !== undefined){
let data15 = data14.id;
if(typeof data15 !== "string"){
const err24 = {instancePath:instancePath+"/devices/windowCoverings/" + i2+"/id",schemaPath:"definitions.json#/definitions/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err24];
}
else {
vErrors.push(err24);
}
errors++;
}
const _errs47 = errors;
const _errs48 = errors;
if(!((data15 === "global") || (data15 === "system"))){
const err25 = {};
if(vErrors === null){
vErrors = [err25];
}
else {
vErrors.push(err25);
}
errors++;
}
var valid20 = _errs48 === errors;
if(valid20){
const err26 = {instancePath:instancePath+"/devices/windowCoverings/" + i2+"/id",schemaPath:"definitions.json#/definitions/id/not",keyword:"not",params:{},message:"must NOT be valid"};
if(vErrors === null){
vErrors = [err26];
}
else {
vErrors.push(err26);
}
errors++;
}
else {
errors = _errs47;
if(vErrors !== null){
if(_errs47){
vErrors.length = _errs47;
}
else {
vErrors = null;
}
}
}
}
if(data14.position !== undefined){
let data16 = data14.position;
if((!(typeof data16 == "number")) && (data16 !== null)){
const err27 = {instancePath:instancePath+"/devices/windowCoverings/" + i2+"/position",schemaPath:"windowCovering.json#/properties/position/type",keyword:"type",params:{type: schema217.type},message:"must be number,null"};
if(vErrors === null){
vErrors = [err27];
}
else {
vErrors.push(err27);
}
errors++;
}
if(typeof data16 == "number"){
if(data16 > 100 || isNaN(data16)){
const err28 = {instancePath:instancePath+"/devices/windowCoverings/" + i2+"/position",schemaPath:"windowCovering.json#/properties/position/maximum",keyword:"maximum",params:{comparison: "<=", limit: 100},message:"must be <= 100"};
if(vErrors === null){
vErrors = [err28];
}
else {
vErrors.push(err28);
}
errors++;
}
if(data16 < 0 || isNaN(data16)){
const err29 = {instancePath:instancePath+"/devices/windowCoverings/" + i2+"/position",schemaPath:"windowCovering.json#/properties/position/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err29];
}
else {
vErrors.push(err29);
}
errors++;
}
}
}
}
else {
const err30 = {instancePath:instancePath+"/devices/windowCoverings/" + i2,schemaPath:"#/properties/devices/properties/windowCoverings/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err30];
}
else {
vErrors.push(err30);
}
errors++;
}
}
}
else {
const err31 = {instancePath:instancePath+"/devices/windowCoverings",schemaPath:"#/properties/devices/properties/windowCoverings/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err31];
}
else {
vErrors.push(err31);
}
errors++;
}
let data17 = data4.thermostats;
if(Array.isArray(data17)){
const len3 = data17.length;
for(let i3=0; i3<len3; i3++){
let data18 = data17[i3];
if(data18 && typeof data18 == "object" && !Array.isArray(data18)){
if(data18.id !== undefined){
let data19 = data18.id;
if(typeof data19 !== "string"){
const err32 = {instancePath:instancePath+"/devices/thermostats/" + i3+"/id",schemaPath:"definitions.json#/definitions/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err32];
}
else {
vErrors.push(err32);
}
errors++;
}
const _errs59 = errors;
const _errs60 = errors;
if(!((data19 === "global") || (data19 === "system"))){
const err33 = {};
if(vErrors === null){
vErrors = [err33];
}
else {
vErrors.push(err33);
}
errors++;
}
var valid26 = _errs60 === errors;
if(valid26){
const err34 = {instancePath:instancePath+"/devices/thermostats/" + i3+"/id",schemaPath:"definitions.json#/definitions/id/not",keyword:"not",params:{},message:"must NOT be valid"};
if(vErrors === null){
vErrors = [err34];
}
else {
vErrors.push(err34);
}
errors++;
}
else {
errors = _errs59;
if(vErrors !== null){
if(_errs59){
vErrors.length = _errs59;
}
else {
vErrors = null;
}
}
}
}
if(data18.hvacMode !== undefined){
if(!(validate90(data18.hvacMode, {instancePath:instancePath+"/devices/thermostats/" + i3+"/hvacMode",parentData:data18,parentDataProperty:"hvacMode",rootData}))){
vErrors = vErrors === null ? validate90.errors : vErrors.concat(validate90.errors);
errors = vErrors.length;
}
}
if(data18.setpoints !== undefined){
if(!(validate92(data18.setpoints, {instancePath:instancePath+"/devices/thermostats/" + i3+"/setpoints",parentData:data18,parentDataProperty:"setpoints",rootData}))){
vErrors = vErrors === null ? validate92.errors : vErrors.concat(validate92.errors);
errors = vErrors.length;
}
}
if(data18.fanMode !== undefined){
if(!(validate97(data18.fanMode, {instancePath:instancePath+"/devices/thermostats/" + i3+"/fanMode",parentData:data18,parentDataProperty:"fanMode",rootData}))){
vErrors = vErrors === null ? validate97.errors : vErrors.concat(validate97.errors);
errors = vErrors.length;
}
}
if(data18.setpointDelta !== undefined){
if(!(typeof data18.setpointDelta == "number")){
const err35 = {instancePath:instancePath+"/devices/thermostats/" + i3+"/setpointDelta",schemaPath:"#/properties/devices/properties/thermostats/items/properties/setpointDelta/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err35];
}
else {
vErrors.push(err35);
}
errors++;
}
}
}
else {
const err36 = {instancePath:instancePath+"/devices/thermostats/" + i3,schemaPath:"#/properties/devices/properties/thermostats/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err36];
}
else {
vErrors.push(err36);
}
errors++;
}
}
}
else {
const err37 = {instancePath:instancePath+"/devices/thermostats",schemaPath:"#/properties/devices/properties/thermostats/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err37];
}
else {
vErrors.push(err37);
}
errors++;
}
if(data4.mediaSources !== undefined){
let data24 = data4.mediaSources;
if(Array.isArray(data24)){
const len4 = data24.length;
for(let i4=0; i4<len4; i4++){
let data25 = data24[i4];
if(data25 && typeof data25 == "object" && !Array.isArray(data25)){
if(data25.id !== undefined){
let data26 = data25.id;
if(typeof data26 !== "string"){
const err38 = {instancePath:instancePath+"/devices/mediaSources/" + i4+"/id",schemaPath:"definitions.json#/definitions/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err38];
}
else {
vErrors.push(err38);
}
errors++;
}
const _errs73 = errors;
const _errs74 = errors;
if(!((data26 === "global") || (data26 === "system"))){
const err39 = {};
if(vErrors === null){
vErrors = [err39];
}
else {
vErrors.push(err39);
}
errors++;
}
var valid31 = _errs74 === errors;
if(valid31){
const err40 = {instancePath:instancePath+"/devices/mediaSources/" + i4+"/id",schemaPath:"definitions.json#/definitions/id/not",keyword:"not",params:{},message:"must NOT be valid"};
if(vErrors === null){
vErrors = [err40];
}
else {
vErrors.push(err40);
}
errors++;
}
else {
errors = _errs73;
if(vErrors !== null){
if(_errs73){
vErrors.length = _errs73;
}
else {
vErrors = null;
}
}
}
}
if(data25.volume !== undefined){
let data27 = data25.volume;
if(typeof data27 == "number"){
if(data27 > 100 || isNaN(data27)){
const err41 = {instancePath:instancePath+"/devices/mediaSources/" + i4+"/volume",schemaPath:"#/properties/devices/properties/mediaSources/items/properties/volume/maximum",keyword:"maximum",params:{comparison: "<=", limit: 100},message:"must be <= 100"};
if(vErrors === null){
vErrors = [err41];
}
else {
vErrors.push(err41);
}
errors++;
}
if(data27 < 0 || isNaN(data27)){
const err42 = {instancePath:instancePath+"/devices/mediaSources/" + i4+"/volume",schemaPath:"#/properties/devices/properties/mediaSources/items/properties/volume/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err42];
}
else {
vErrors.push(err42);
}
errors++;
}
}
else {
const err43 = {instancePath:instancePath+"/devices/mediaSources/" + i4+"/volume",schemaPath:"#/properties/devices/properties/mediaSources/items/properties/volume/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err43];
}
else {
vErrors.push(err43);
}
errors++;
}
}
if(data25.commands !== undefined){
let data28 = data25.commands;
if(Array.isArray(data28)){
const len5 = data28.length;
for(let i5=0; i5<len5; i5++){
if(typeof data28[i5] !== "string"){
const err44 = {instancePath:instancePath+"/devices/mediaSources/" + i4+"/commands/" + i5,schemaPath:"#/properties/devices/properties/mediaSources/items/properties/commands/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err44];
}
else {
vErrors.push(err44);
}
errors++;
}
}
}
else {
const err45 = {instancePath:instancePath+"/devices/mediaSources/" + i4+"/commands",schemaPath:"#/properties/devices/properties/mediaSources/items/properties/commands/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err45];
}
else {
vErrors.push(err45);
}
errors++;
}
}
}
else {
const err46 = {instancePath:instancePath+"/devices/mediaSources/" + i4,schemaPath:"#/properties/devices/properties/mediaSources/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err46];
}
else {
vErrors.push(err46);
}
errors++;
}
}
}
else {
const err47 = {instancePath:instancePath+"/devices/mediaSources",schemaPath:"#/properties/devices/properties/mediaSources/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err47];
}
else {
vErrors.push(err47);
}
errors++;
}
}
if(data4.locks !== undefined){
let data30 = data4.locks;
if(Array.isArray(data30)){
const len6 = data30.length;
for(let i6=0; i6<len6; i6++){
let data31 = data30[i6];
if(data31 && typeof data31 == "object" && !Array.isArray(data31)){
if(data31.id !== undefined){
let data32 = data31.id;
if(typeof data32 !== "string"){
const err48 = {instancePath:instancePath+"/devices/locks/" + i6+"/id",schemaPath:"definitions.json#/definitions/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err48];
}
else {
vErrors.push(err48);
}
errors++;
}
const _errs88 = errors;
const _errs89 = errors;
if(!((data32 === "global") || (data32 === "system"))){
const err49 = {};
if(vErrors === null){
vErrors = [err49];
}
else {
vErrors.push(err49);
}
errors++;
}
var valid38 = _errs89 === errors;
if(valid38){
const err50 = {instancePath:instancePath+"/devices/locks/" + i6+"/id",schemaPath:"definitions.json#/definitions/id/not",keyword:"not",params:{},message:"must NOT be valid"};
if(vErrors === null){
vErrors = [err50];
}
else {
vErrors.push(err50);
}
errors++;
}
else {
errors = _errs88;
if(vErrors !== null){
if(_errs88){
vErrors.length = _errs88;
}
else {
vErrors = null;
}
}
}
}
if(data31.state !== undefined){
let data33 = data31.state;
if((typeof data33 !== "string") && (data33 !== null)){
const err51 = {instancePath:instancePath+"/devices/locks/" + i6+"/state",schemaPath:"lock.json#/properties/state/type",keyword:"type",params:{type: schema226.type},message:"must be string,null"};
if(vErrors === null){
vErrors = [err51];
}
else {
vErrors.push(err51);
}
errors++;
}
if(!(((data33 === "locked") || (data33 === "unlocked")) || (data33 === null))){
const err52 = {instancePath:instancePath+"/devices/locks/" + i6+"/state",schemaPath:"lock.json#/properties/state/enum",keyword:"enum",params:{allowedValues: schema226.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err52];
}
else {
vErrors.push(err52);
}
errors++;
}
}
if(data31.mode !== undefined){
let data34 = data31.mode;
if((typeof data34 !== "string") && (data34 !== null)){
const err53 = {instancePath:instancePath+"/devices/locks/" + i6+"/mode",schemaPath:"lock.json#/properties/mode/type",keyword:"type",params:{type: schema227.type},message:"must be string,null"};
if(vErrors === null){
vErrors = [err53];
}
else {
vErrors.push(err53);
}
errors++;
}
if(!(((((((data34 === "normal") || (data34 === "autoLock")) || (data34 === "emergencyOpen")) || (data34 === "emergencyClose")) || (data34 === "holdOpen")) || (data34 === "lockdown")) || (data34 === null))){
const err54 = {instancePath:instancePath+"/devices/locks/" + i6+"/mode",schemaPath:"lock.json#/properties/mode/enum",keyword:"enum",params:{allowedValues: schema227.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err54];
}
else {
vErrors.push(err54);
}
errors++;
}
}
}
else {
const err55 = {instancePath:instancePath+"/devices/locks/" + i6,schemaPath:"#/properties/devices/properties/locks/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err55];
}
else {
vErrors.push(err55);
}
errors++;
}
}
}
else {
const err56 = {instancePath:instancePath+"/devices/locks",schemaPath:"#/properties/devices/properties/locks/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err56];
}
else {
vErrors.push(err56);
}
errors++;
}
}
}
else {
const err57 = {instancePath:instancePath+"/devices",schemaPath:"#/properties/devices/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err57];
}
else {
vErrors.push(err57);
}
errors++;
}
}
if(typeof data.isDefault !== "boolean"){
const err58 = {instancePath:instancePath+"/isDefault",schemaPath:"#/properties/isDefault/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err58];
}
else {
vErrors.push(err58);
}
errors++;
}
if(typeof data.showOnUi !== "boolean"){
const err59 = {instancePath:instancePath+"/showOnUi",schemaPath:"#/properties/showOnUi/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err59];
}
else {
vErrors.push(err59);
}
errors++;
}
}
else {
const err60 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err60];
}
else {
vErrors.push(err60);
}
errors++;
}
validate89.errors = vErrors;
return errors === 0;
}
