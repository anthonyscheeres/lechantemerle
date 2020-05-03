import { ServerModel } from '../models/ServerModel';
import { DataModel } from '../models/DataModel';
import { fetchJsonPost } from './http';
import { ProtocolR } from '../models/Protocol';
import { ReservationModel } from '../models/ReservationModel';

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


export function ConstructUrlUpdatDescription() {
  var host = ServerModel.host;
  var port = ServerModel.port;
  var token = ""
  try {
    token = JSON.parse(DataModel.account)[0].token.toString();
  } catch (Error) {

  }

  var url = "http://" + host + ":" + port + "/api/Room/updatDescription?token=" + token
  return url;



}


export function constructGetDesribtion(id) {
  var host = ServerModel.host;
  var port = ServerModel.port;
 

  var url = "http://" + host + ":" + port + "/api/Room/getRoomDescription?id=" + id
  return url;
}


  export function constructDelteAllReservations() {
    var host = ServerModel.host;
    var port = ServerModel.port;
    var token = ""
    try {
      token = JSON.parse(DataModel.account)[0].token.toString();
    } catch (Error) {

    }
    var url = "http://" + host + ":" + port + "/api/Reservation/deleteAllReservations?token=" + token
    return url;
  }


export function ConstructGetAvailableReservationUrl2(product: number) {
  var host = ServerModel.host;
  var port = ServerModel.port;
  //var token = JSON.parse(DataModel.account)[0].token.toString();
  var url = "http://" + host + ":" + port + "/api/Reservation/getPendingDatesByIdReservation?id=" + product;
  return url;
}

export function constructGetRoomDetails(product: ReservationModel) {
  var host = ServerModel.host;
  var port = ServerModel.port;
  //var token = JSON.parse(DataModel.account)[0].token.toString();
  var url = "http://" + host + ":" + port + "/api/Reservation/getPendingReservation?id=" + product.id;
  return url;
}
export function ConstuctDeleteReservationById(id) {

  var host = ServerModel.host;
  var port = ServerModel.port;
  var token = JSON.parse(DataModel.account)[0].token.toString();
  var url = "http://" + host + ":" + port + "api/Reservation/deleteReservation?token=" + token;
  return url
}
export function addRoom2() {
  var data = JSON.stringify({ "amountOfBeds": 0 })

  var url = ConstructAddRoomUrl()


  return fetchJsonPost(url, data, ProtocolR.POST);
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


  var data = JSON.stringify({
      "id": id
  });
 

  var response = fetchJsonPost(urlToServer, data.toString(), ProtocolR.POST)

  // @ts-ignore
  return response
}



export function cinstructurlacceptresrvation() {
  var host = ServerModel.host;
  var port = ServerModel.port;
  var token = ""
  try {
    token = JSON.parse(DataModel.account)[0].token.toString();
  } catch (Error) {

  }

  var url = "http://" + host + ":" + port + "/api/Reservation/getPendingResrvationsAdmin?token=" + token;

  return url;
}

export function acceptRResrvation() {
  var host = ServerModel.host;
  var port = ServerModel.port;
  var token = ""
  try {
    token = JSON.parse(DataModel.account)[0].token.toString();
  } catch (Error) {

  }

  var url = "http://" + host + ":" + port + "/api/Reservation/updateAcceptResevation?token=" + token;
  return url;
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
