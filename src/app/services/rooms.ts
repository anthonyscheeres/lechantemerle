import { ServerModel } from '../models/ServerModel';
import { DataModel } from '../models/DataModel';
import { fetchJsonPost } from './http';
import { ProtocolR } from '../models/Protocol';

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
  var token = ""
  try {
    token = JSON.parse(DataModel.account)[0].token.toString();
  } catch (Error) {

  }


  var url = "http://" + host + ":" + port + "/api/Room/addRoom?token=" + token
  return url;
}


export function constructDeleteRoom() {
  var host = ServerModel.host;
  var port = ServerModel.port;
  var token = ""
  try {
    token = JSON.parse(DataModel.account)[0].token.toString();
  } catch (Error) {

  }

  var url = "http://" + host + ":" + port + "/api/Room/deleteRoom?token=" + token
  return url;
}

export function constructUrl() {
  var host = ServerModel.host;
  var port = ServerModel.port;
  var token = ""
  try {
    token = JSON.parse(DataModel.account)[0].token.toString();
  } catch (Error) {

  }

  var url = "http://" + host + ":" + port + "/api/Reservation/getUsersReservations?token=" + token
  return url;
}


export function ConstuctUpdateAmountOfBeds() {

  var host = ServerModel.host;
  var port = ServerModel.port;
  var token = ""
  try {
    token = JSON.parse(DataModel.account)[0].token.toString();
  } catch (Error) {

  }

  var url = "http://" + host + ":" + port + "/api/Room/updatAmountOfBedsRoom?token=" + token;
  return url;
}


export async function reserveerDezeKamer(arrival, depature, id) {

  var urlToServer = constructClaimResrvation();
  console.log("hi")

  var data = JSON.stringify({
    "time_from": arrival,
    "time_till": depature,
    "roomno": id
  });
 

  var response = fetchJsonPost(urlToServer, data.toString(), ProtocolR.POST)

  // @ts-ignore
  return response
}



export function constructClaimResrvation() {
  var host = ServerModel.host;
  var port = ServerModel.port;
  var token = ""
  try {
    token = JSON.parse(DataModel.account)[0].token.toString();
  } catch (Error) {

  }

  var url = "http://" + host + ":" + port + "/api/Reservation/claimReservations?token=" + token
  return url
}
