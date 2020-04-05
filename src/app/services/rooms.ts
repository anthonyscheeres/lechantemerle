import { ServerModel } from '../models/ServerModel';
import { DataModel } from '../models/DataModel';

export function ConstructGetAvailableReservationUrl() {
  var host = ServerModel.host;
  var port = ServerModel.port;
  //var token = JSON.parse(DataModel.account)[0].token.toString();
  var url = "http://" + host + ":" + port + "/api/Room/listAvailableRooms";
  return url;
}


export function ConstructAddRoomUrl() {
  var host = ServerModel.host;
  var port = ServerModel.port;
  var token = JSON.parse(DataModel.account)[0].token.toString();
  var url = "http://" + host + ":" + port + "/api/Room/addRoom?token=" + token
  return url;
}


export function constructDeleteRoom() {
  var host = ServerModel.host;
  var port = ServerModel.port;
  var token = JSON.parse(DataModel.account)[0].token.toString();
  var url = "http://" + host + ":" + port + "/api/Room/deleteRoom?token=" + token
  return url;
}


export function ConstuctUpdateAmountOfBeds() {

  var host = ServerModel.host;
  var port = ServerModel.port;
  var token = JSON.parse(DataModel.account)[0].token.toString();
  var url = "http://" + host + ":" + port + "/api/Room/updatAmountOfBedsRoom?token=" + token;
  return url;
}
