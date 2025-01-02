// This file is automatically generated. Do not modify it manually.

	  import { createRequire } from 'node:module'; 
	  const require = createRequire(import.meta.url);
"use strict";
export const validate = validate62;
const schema163 = {"$schema":"http://json-schema.org/draft-07/schema","$id":"reservation.json","title":"Reservation","type":"object","required":["type","status","checkInDateTime","checkOutDateTime"],"properties":{"id":{"$ref":"definitions.json#/definitions/id"},"driver":{"$ref":"definitions.json#/definitions/driver"},"primaryGuest":{"type":"string"},"type":{"type":"string","default":"reservation","enum":["reservation"]},"sharedGuests":{"type":"array","items":{"type":"string"}},"spaceCategory":{"type":"string"},"space":{"type":["string","null"]},"previousSpace":{"type":["string","null"],"default":null,"description":"Used when there was a space assigned and it changes"},"status":{"type":"string","enum":["reserved","checkedIn","checkedOut","cancelled","noShow","enquired","requested","optional"],"description":" reserved - confirmed by both parties, before check-in\n checkedIn - checked in\n checkedOut - checked out\n cancelled - Cancelled\n noShow - No show\n enquired - Confirmed neither by the customer nor enterprise\n requested - Confirmed by the customer but not the enterprise (waitlist)\n optional - Confirmed by the enterprise but not the customer (holding)"},"mobileCheckInSpaceCategoryChanged":{"type":"boolean","description":"spaceCategory has changed from original."},"mobileCheckInSpaceChanged":{"type":"boolean"},"mobileCheckInStatus":{"type":"string","enum":["ready","blocked","preArrivalStepsRequired","spaceNotAssigned","spaceNotReady","checkInTimeNotStarted"]},"mobileCheckInStatusMessage":{"type":"string"},"confirmationNumber":{"type":"string"},"expectedCheckInDateTime":{"type":["string","object"],"format":"date-time","description":"Expected arrival time of guest."},"checkInDateTime":{"type":["string","object"],"format":"date-time"},"checkOutDateTime":{"type":["string","object"],"format":"date-time"},"adultCount":{"type":"number","default":1,"minimum":1},"childCount":{"type":"number","default":0},"spaceCategoryAvailabilites":{"type":"array","items":{"type":"object","properties":{"id":{"type":"string"},"price":{"type":"number"},"unit":{"type":"string","enum":["night","stay","hour"]},"isUpgrade":{"type":"boolean"}}}},"revenue":{"$ref":"definitions.json#/definitions/revenue"},"rateSuppressed":{"type":"boolean"},"payment":{"type":"string"},"company":{"type":"string"},"travelAgent":{"type":"string"},"systemId":{"$ref":"definitions.json#/definitions/systemId"},"metadata":{"ref":"definitions.json#/definitions/metadata"},"updatedAt":{"$ref":"definitions.json#/definitions/updatedAt"}}};
const schema13 = {"type":"string","description":"Identifier of the object.","not":{"enum":["global","system"]}};
const schema19 = {"type":"string","description":"Driver used to communicate with the object.","enum":["aws-kinesis","butler","crestron","dell","dmp","doorbird","dormakaba","dsc","ecobee","epson","geovision-rs","geovision-as-manager","honeywell-vista","igor","inncom","isapi","kohost-k7","kohost","lg","lg-webos","lapi","lirc","mews","mht","paxton","pelican-wireless","power-shades","rachio","rebrandly","rtsp","salto","salto-irn","samsung","se","sendgrid","sonifi","stay-n-touch","storable","twilio","unifi","valcom","vizio","wisenet","cloudflare-images","cloudflare-stream","insperia-privacy"]};
const schema15 = {"type":"string","description":"Identifier of the object, directly related to the system."};
const schema150 = {"type":["string","object"],"format":"date-time"};
const formats4 = require("ajv-formats/dist/formats").fullFormats["date-time"];
const schema166 = {"type":"array","items":{"type":"object","properties":{"id":{"$ref":"definitions.json#/definitions/id"},"name":{"type":"string"},"date":{"type":"string","format":"date-time"},"price":{"type":"number"},"tax":{"type":["number","null"]}}}};

function validate63(data, {instancePath="", parentData, parentDataProperty, rootData=data}={}){
let vErrors = null;
let errors = 0;
if(Array.isArray(data)){
const len0 = data.length;
for(let i0=0; i0<len0; i0++){
let data0 = data[i0];
if(data0 && typeof data0 == "object" && !Array.isArray(data0)){
if(data0.id !== undefined){
let data1 = data0.id;
if(typeof data1 !== "string"){
const err0 = {instancePath:instancePath+"/" + i0+"/id",schemaPath:"definitions.json#/definitions/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
const _errs6 = errors;
const _errs7 = errors;
if(!((data1 === "global") || (data1 === "system"))){
const err1 = {};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
var valid4 = _errs7 === errors;
if(valid4){
const err2 = {instancePath:instancePath+"/" + i0+"/id",schemaPath:"definitions.json#/definitions/id/not",keyword:"not",params:{},message:"must NOT be valid"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
else {
errors = _errs6;
if(vErrors !== null){
if(_errs6){
vErrors.length = _errs6;
}
else {
vErrors = null;
}
}
}
}
if(data0.name !== undefined){
if(typeof data0.name !== "string"){
const err3 = {instancePath:instancePath+"/" + i0+"/name",schemaPath:"#/items/properties/name/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
}
if(data0.date !== undefined){
let data3 = data0.date;
if(typeof data3 === "string"){
if(!(formats4.validate(data3))){
const err4 = {instancePath:instancePath+"/" + i0+"/date",schemaPath:"#/items/properties/date/format",keyword:"format",params:{format: "date-time"},message:"must match format \""+"date-time"+"\""};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
}
else {
const err5 = {instancePath:instancePath+"/" + i0+"/date",schemaPath:"#/items/properties/date/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
}
if(data0.price !== undefined){
if(!(typeof data0.price == "number")){
const err6 = {instancePath:instancePath+"/" + i0+"/price",schemaPath:"#/items/properties/price/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
}
if(data0.tax !== undefined){
let data5 = data0.tax;
if((!(typeof data5 == "number")) && (data5 !== null)){
const err7 = {instancePath:instancePath+"/" + i0+"/tax",schemaPath:"#/items/properties/tax/type",keyword:"type",params:{type: schema166.items.properties.tax.type},message:"must be number,null"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
}
}
else {
const err8 = {instancePath:instancePath+"/" + i0,schemaPath:"#/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
}
}
else {
const err9 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
validate63.errors = vErrors;
return errors === 0;
}


function validate62(data, {instancePath="", parentData, parentDataProperty, rootData=data}={}){
/*# sourceURL="reservation.json" */;
let vErrors = null;
let errors = 0;
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.type === undefined){
data.type = "reservation";
}
if(data.previousSpace === undefined){
data.previousSpace = null;
}
if(data.adultCount === undefined){
data.adultCount = 1;
}
if(data.childCount === undefined){
data.childCount = 0;
}
if(data.type === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "type"},message:"must have required property '"+"type"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.status === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "status"},message:"must have required property '"+"status"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.checkInDateTime === undefined){
const err2 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "checkInDateTime"},message:"must have required property '"+"checkInDateTime"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
if(data.checkOutDateTime === undefined){
const err3 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "checkOutDateTime"},message:"must have required property '"+"checkOutDateTime"+"'"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
if(data.id !== undefined){
let data0 = data.id;
if(typeof data0 !== "string"){
const err4 = {instancePath:instancePath+"/id",schemaPath:"definitions.json#/definitions/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
const _errs4 = errors;
const _errs5 = errors;
if(!((data0 === "global") || (data0 === "system"))){
const err5 = {};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
var valid2 = _errs5 === errors;
if(valid2){
const err6 = {instancePath:instancePath+"/id",schemaPath:"definitions.json#/definitions/id/not",keyword:"not",params:{},message:"must NOT be valid"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
else {
errors = _errs4;
if(vErrors !== null){
if(_errs4){
vErrors.length = _errs4;
}
else {
vErrors = null;
}
}
}
}
if(data.driver !== undefined){
let data1 = data.driver;
if(typeof data1 !== "string"){
const err7 = {instancePath:instancePath+"/driver",schemaPath:"definitions.json#/definitions/driver/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
if(!((((((((((((((((((((((((((((((((((((((((((((((data1 === "aws-kinesis") || (data1 === "butler")) || (data1 === "crestron")) || (data1 === "dell")) || (data1 === "dmp")) || (data1 === "doorbird")) || (data1 === "dormakaba")) || (data1 === "dsc")) || (data1 === "ecobee")) || (data1 === "epson")) || (data1 === "geovision-rs")) || (data1 === "geovision-as-manager")) || (data1 === "honeywell-vista")) || (data1 === "igor")) || (data1 === "inncom")) || (data1 === "isapi")) || (data1 === "kohost-k7")) || (data1 === "kohost")) || (data1 === "lg")) || (data1 === "lg-webos")) || (data1 === "lapi")) || (data1 === "lirc")) || (data1 === "mews")) || (data1 === "mht")) || (data1 === "paxton")) || (data1 === "pelican-wireless")) || (data1 === "power-shades")) || (data1 === "rachio")) || (data1 === "rebrandly")) || (data1 === "rtsp")) || (data1 === "salto")) || (data1 === "salto-irn")) || (data1 === "samsung")) || (data1 === "se")) || (data1 === "sendgrid")) || (data1 === "sonifi")) || (data1 === "stay-n-touch")) || (data1 === "storable")) || (data1 === "twilio")) || (data1 === "unifi")) || (data1 === "valcom")) || (data1 === "vizio")) || (data1 === "wisenet")) || (data1 === "cloudflare-images")) || (data1 === "cloudflare-stream")) || (data1 === "insperia-privacy"))){
const err8 = {instancePath:instancePath+"/driver",schemaPath:"definitions.json#/definitions/driver/enum",keyword:"enum",params:{allowedValues: schema19.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
}
if(data.primaryGuest !== undefined){
if(typeof data.primaryGuest !== "string"){
const err9 = {instancePath:instancePath+"/primaryGuest",schemaPath:"#/properties/primaryGuest/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
}
let data3 = data.type;
if(typeof data3 !== "string"){
const err10 = {instancePath:instancePath+"/type",schemaPath:"#/properties/type/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
if(!(data3 === "reservation")){
const err11 = {instancePath:instancePath+"/type",schemaPath:"#/properties/type/enum",keyword:"enum",params:{allowedValues: schema163.properties.type.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
if(data.sharedGuests !== undefined){
let data4 = data.sharedGuests;
if(Array.isArray(data4)){
const len0 = data4.length;
for(let i0=0; i0<len0; i0++){
if(typeof data4[i0] !== "string"){
const err12 = {instancePath:instancePath+"/sharedGuests/" + i0,schemaPath:"#/properties/sharedGuests/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
}
}
else {
const err13 = {instancePath:instancePath+"/sharedGuests",schemaPath:"#/properties/sharedGuests/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
}
if(data.spaceCategory !== undefined){
if(typeof data.spaceCategory !== "string"){
const err14 = {instancePath:instancePath+"/spaceCategory",schemaPath:"#/properties/spaceCategory/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
}
if(data.space !== undefined){
let data7 = data.space;
if((typeof data7 !== "string") && (data7 !== null)){
const err15 = {instancePath:instancePath+"/space",schemaPath:"#/properties/space/type",keyword:"type",params:{type: schema163.properties.space.type},message:"must be string,null"};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
}
let data8 = data.previousSpace;
if((typeof data8 !== "string") && (data8 !== null)){
const err16 = {instancePath:instancePath+"/previousSpace",schemaPath:"#/properties/previousSpace/type",keyword:"type",params:{type: schema163.properties.previousSpace.type},message:"must be string,null"};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
if(data.status !== undefined){
let data9 = data.status;
if(typeof data9 !== "string"){
const err17 = {instancePath:instancePath+"/status",schemaPath:"#/properties/status/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
if(!((((((((data9 === "reserved") || (data9 === "checkedIn")) || (data9 === "checkedOut")) || (data9 === "cancelled")) || (data9 === "noShow")) || (data9 === "enquired")) || (data9 === "requested")) || (data9 === "optional"))){
const err18 = {instancePath:instancePath+"/status",schemaPath:"#/properties/status/enum",keyword:"enum",params:{allowedValues: schema163.properties.status.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err18];
}
else {
vErrors.push(err18);
}
errors++;
}
}
if(data.mobileCheckInSpaceCategoryChanged !== undefined){
if(typeof data.mobileCheckInSpaceCategoryChanged !== "boolean"){
const err19 = {instancePath:instancePath+"/mobileCheckInSpaceCategoryChanged",schemaPath:"#/properties/mobileCheckInSpaceCategoryChanged/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
}
errors++;
}
}
if(data.mobileCheckInSpaceChanged !== undefined){
if(typeof data.mobileCheckInSpaceChanged !== "boolean"){
const err20 = {instancePath:instancePath+"/mobileCheckInSpaceChanged",schemaPath:"#/properties/mobileCheckInSpaceChanged/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err20];
}
else {
vErrors.push(err20);
}
errors++;
}
}
if(data.mobileCheckInStatus !== undefined){
let data12 = data.mobileCheckInStatus;
if(typeof data12 !== "string"){
const err21 = {instancePath:instancePath+"/mobileCheckInStatus",schemaPath:"#/properties/mobileCheckInStatus/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err21];
}
else {
vErrors.push(err21);
}
errors++;
}
if(!((((((data12 === "ready") || (data12 === "blocked")) || (data12 === "preArrivalStepsRequired")) || (data12 === "spaceNotAssigned")) || (data12 === "spaceNotReady")) || (data12 === "checkInTimeNotStarted"))){
const err22 = {instancePath:instancePath+"/mobileCheckInStatus",schemaPath:"#/properties/mobileCheckInStatus/enum",keyword:"enum",params:{allowedValues: schema163.properties.mobileCheckInStatus.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err22];
}
else {
vErrors.push(err22);
}
errors++;
}
}
if(data.mobileCheckInStatusMessage !== undefined){
if(typeof data.mobileCheckInStatusMessage !== "string"){
const err23 = {instancePath:instancePath+"/mobileCheckInStatusMessage",schemaPath:"#/properties/mobileCheckInStatusMessage/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err23];
}
else {
vErrors.push(err23);
}
errors++;
}
}
if(data.confirmationNumber !== undefined){
if(typeof data.confirmationNumber !== "string"){
const err24 = {instancePath:instancePath+"/confirmationNumber",schemaPath:"#/properties/confirmationNumber/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err24];
}
else {
vErrors.push(err24);
}
errors++;
}
}
if(data.expectedCheckInDateTime !== undefined){
let data15 = data.expectedCheckInDateTime;
if((typeof data15 !== "string") && (!(data15 && typeof data15 == "object" && !Array.isArray(data15)))){
const err25 = {instancePath:instancePath+"/expectedCheckInDateTime",schemaPath:"#/properties/expectedCheckInDateTime/type",keyword:"type",params:{type: schema163.properties.expectedCheckInDateTime.type},message:"must be string,object"};
if(vErrors === null){
vErrors = [err25];
}
else {
vErrors.push(err25);
}
errors++;
}
if(typeof data15 === "string"){
if(!(formats4.validate(data15))){
const err26 = {instancePath:instancePath+"/expectedCheckInDateTime",schemaPath:"#/properties/expectedCheckInDateTime/format",keyword:"format",params:{format: "date-time"},message:"must match format \""+"date-time"+"\""};
if(vErrors === null){
vErrors = [err26];
}
else {
vErrors.push(err26);
}
errors++;
}
}
}
if(data.checkInDateTime !== undefined){
let data16 = data.checkInDateTime;
if((typeof data16 !== "string") && (!(data16 && typeof data16 == "object" && !Array.isArray(data16)))){
const err27 = {instancePath:instancePath+"/checkInDateTime",schemaPath:"#/properties/checkInDateTime/type",keyword:"type",params:{type: schema163.properties.checkInDateTime.type},message:"must be string,object"};
if(vErrors === null){
vErrors = [err27];
}
else {
vErrors.push(err27);
}
errors++;
}
if(typeof data16 === "string"){
if(!(formats4.validate(data16))){
const err28 = {instancePath:instancePath+"/checkInDateTime",schemaPath:"#/properties/checkInDateTime/format",keyword:"format",params:{format: "date-time"},message:"must match format \""+"date-time"+"\""};
if(vErrors === null){
vErrors = [err28];
}
else {
vErrors.push(err28);
}
errors++;
}
}
}
if(data.checkOutDateTime !== undefined){
let data17 = data.checkOutDateTime;
if((typeof data17 !== "string") && (!(data17 && typeof data17 == "object" && !Array.isArray(data17)))){
const err29 = {instancePath:instancePath+"/checkOutDateTime",schemaPath:"#/properties/checkOutDateTime/type",keyword:"type",params:{type: schema163.properties.checkOutDateTime.type},message:"must be string,object"};
if(vErrors === null){
vErrors = [err29];
}
else {
vErrors.push(err29);
}
errors++;
}
if(typeof data17 === "string"){
if(!(formats4.validate(data17))){
const err30 = {instancePath:instancePath+"/checkOutDateTime",schemaPath:"#/properties/checkOutDateTime/format",keyword:"format",params:{format: "date-time"},message:"must match format \""+"date-time"+"\""};
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
let data18 = data.adultCount;
if(typeof data18 == "number"){
if(data18 < 1 || isNaN(data18)){
const err31 = {instancePath:instancePath+"/adultCount",schemaPath:"#/properties/adultCount/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
if(vErrors === null){
vErrors = [err31];
}
else {
vErrors.push(err31);
}
errors++;
}
}
else {
const err32 = {instancePath:instancePath+"/adultCount",schemaPath:"#/properties/adultCount/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err32];
}
else {
vErrors.push(err32);
}
errors++;
}
if(!(typeof data.childCount == "number")){
const err33 = {instancePath:instancePath+"/childCount",schemaPath:"#/properties/childCount/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err33];
}
else {
vErrors.push(err33);
}
errors++;
}
if(data.spaceCategoryAvailabilites !== undefined){
let data20 = data.spaceCategoryAvailabilites;
if(Array.isArray(data20)){
const len1 = data20.length;
for(let i1=0; i1<len1; i1++){
let data21 = data20[i1];
if(data21 && typeof data21 == "object" && !Array.isArray(data21)){
if(data21.id !== undefined){
if(typeof data21.id !== "string"){
const err34 = {instancePath:instancePath+"/spaceCategoryAvailabilites/" + i1+"/id",schemaPath:"#/properties/spaceCategoryAvailabilites/items/properties/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err34];
}
else {
vErrors.push(err34);
}
errors++;
}
}
if(data21.price !== undefined){
if(!(typeof data21.price == "number")){
const err35 = {instancePath:instancePath+"/spaceCategoryAvailabilites/" + i1+"/price",schemaPath:"#/properties/spaceCategoryAvailabilites/items/properties/price/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err35];
}
else {
vErrors.push(err35);
}
errors++;
}
}
if(data21.unit !== undefined){
let data24 = data21.unit;
if(typeof data24 !== "string"){
const err36 = {instancePath:instancePath+"/spaceCategoryAvailabilites/" + i1+"/unit",schemaPath:"#/properties/spaceCategoryAvailabilites/items/properties/unit/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err36];
}
else {
vErrors.push(err36);
}
errors++;
}
if(!(((data24 === "night") || (data24 === "stay")) || (data24 === "hour"))){
const err37 = {instancePath:instancePath+"/spaceCategoryAvailabilites/" + i1+"/unit",schemaPath:"#/properties/spaceCategoryAvailabilites/items/properties/unit/enum",keyword:"enum",params:{allowedValues: schema163.properties.spaceCategoryAvailabilites.items.properties.unit.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err37];
}
else {
vErrors.push(err37);
}
errors++;
}
}
if(data21.isUpgrade !== undefined){
if(typeof data21.isUpgrade !== "boolean"){
const err38 = {instancePath:instancePath+"/spaceCategoryAvailabilites/" + i1+"/isUpgrade",schemaPath:"#/properties/spaceCategoryAvailabilites/items/properties/isUpgrade/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err38];
}
else {
vErrors.push(err38);
}
errors++;
}
}
}
else {
const err39 = {instancePath:instancePath+"/spaceCategoryAvailabilites/" + i1,schemaPath:"#/properties/spaceCategoryAvailabilites/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err39];
}
else {
vErrors.push(err39);
}
errors++;
}
}
}
else {
const err40 = {instancePath:instancePath+"/spaceCategoryAvailabilites",schemaPath:"#/properties/spaceCategoryAvailabilites/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err40];
}
else {
vErrors.push(err40);
}
errors++;
}
}
if(data.revenue !== undefined){
if(!(validate63(data.revenue, {instancePath:instancePath+"/revenue",parentData:data,parentDataProperty:"revenue",rootData}))){
vErrors = vErrors === null ? validate63.errors : vErrors.concat(validate63.errors);
errors = vErrors.length;
}
}
if(data.rateSuppressed !== undefined){
if(typeof data.rateSuppressed !== "boolean"){
const err41 = {instancePath:instancePath+"/rateSuppressed",schemaPath:"#/properties/rateSuppressed/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err41];
}
else {
vErrors.push(err41);
}
errors++;
}
}
if(data.payment !== undefined){
if(typeof data.payment !== "string"){
const err42 = {instancePath:instancePath+"/payment",schemaPath:"#/properties/payment/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err42];
}
else {
vErrors.push(err42);
}
errors++;
}
}
if(data.company !== undefined){
if(typeof data.company !== "string"){
const err43 = {instancePath:instancePath+"/company",schemaPath:"#/properties/company/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err43];
}
else {
vErrors.push(err43);
}
errors++;
}
}
if(data.travelAgent !== undefined){
if(typeof data.travelAgent !== "string"){
const err44 = {instancePath:instancePath+"/travelAgent",schemaPath:"#/properties/travelAgent/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err44];
}
else {
vErrors.push(err44);
}
errors++;
}
}
if(data.systemId !== undefined){
if(typeof data.systemId !== "string"){
const err45 = {instancePath:instancePath+"/systemId",schemaPath:"definitions.json#/definitions/systemId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err45];
}
else {
vErrors.push(err45);
}
errors++;
}
}
if(data.updatedAt !== undefined){
let data32 = data.updatedAt;
if((typeof data32 !== "string") && (!(data32 && typeof data32 == "object" && !Array.isArray(data32)))){
const err46 = {instancePath:instancePath+"/updatedAt",schemaPath:"definitions.json#/definitions/updatedAt/type",keyword:"type",params:{type: schema150.type},message:"must be string,object"};
if(vErrors === null){
vErrors = [err46];
}
else {
vErrors.push(err46);
}
errors++;
}
if(typeof data32 === "string"){
if(!(formats4.validate(data32))){
const err47 = {instancePath:instancePath+"/updatedAt",schemaPath:"definitions.json#/definitions/updatedAt/format",keyword:"format",params:{format: "date-time"},message:"must match format \""+"date-time"+"\""};
if(vErrors === null){
vErrors = [err47];
}
else {
vErrors.push(err47);
}
errors++;
}
}
}
}
else {
const err48 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err48];
}
else {
vErrors.push(err48);
}
errors++;
}
validate62.errors = vErrors;
return errors === 0;
}
