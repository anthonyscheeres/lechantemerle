import { ServerModel } from '../models/ServerModel';
import { DataModel } from '../models/DataModel';
import { fetchJsonPost } from './http';
import { ProtocolR } from '../models/Protocol';
import { ReservationModel } from '../models/ReservationModel';

export function ConstructGetAvailableReservationUrl() {
  const host = ServerModel.host;
  const port = ServerModel.port;
  // var token = JSON.parse(DataModel.account)[0].token.toString();
  const url = 'http://' + host + ':' + port + '/api/Room/listAvailableRooms';
  return url;
}


export function ConstructAddRoomUrl() {
  const host = ServerModel.host;
  const port = ServerModel.port;
  let token = ''
  try {
    token = JSON.parse(DataModel.account)[0].token.toString();
  } catch (Error) {

  }

  const url = 'http://' + host + ':' + port + '/api/Room/addRoom?token=' + token
  return url;
}


export function ConstructUrlUpdatDescription() {
  const host = ServerModel.host;
  const port = ServerModel.port;
  let token = ''
  try {
    token = JSON.parse(DataModel.account)[0].token.toString();
  } catch (Error) {

  }

  const url = 'http://' + host + ':' + port + '/api/Room/updatDescription?token=' + token
  return url;



}


export function constructGetDesribtion(id) {
  const host = ServerModel.host;
  const port = ServerModel.port;


  const url = 'http://' + host + ':' + port + '/api/Room/getRoomDescription?id=' + id
  return url;
}


  export function constructDelteAllReservations() {
    const host = ServerModel.host;
    const port = ServerModel.port;
    let token = ''
    try {
      token = JSON.parse(DataModel.account)[0].token.toString();
    } catch (Error) {

    }
    const url = 'http://' + host + ':' + port + '/api/Reservation/deleteAllReservations?token=' + token
    return url;
  }


export function ConstructGetAvailableReservationUrl2(product: number) {
  const host = ServerModel.host;
  const port = ServerModel.port;
  // var token = JSON.parse(DataModel.account)[0].token.toString();
  const url = 'http://' + host + ':' + port + '/api/Reservation/getPendingDatesByIdReservation?id=' + product;
  return url;
}

export function constructGetRoomDetails(product: ReservationModel) {
  const host = ServerModel.host;
  const port = ServerModel.port;
  // var token = JSON.parse(DataModel.account)[0].token.toString();
  const url = 'http://' + host + ':' + port + '/api/Reservation/getPendingReservation?id=' + product.id;
  return url;
}
export function ConstuctDeleteReservationById(id) {

  const host = ServerModel.host;
  const port = ServerModel.port;
  const token = JSON.parse(DataModel.account)[0].token.toString();
  const url = 'http://' + host + ':' + port + 'api/Reservation/deleteReservation?token=' + token;
  return url
}
export function addRoom2() {
  const data = JSON.stringify({ amountOfBeds: 0 })

  const url = ConstructAddRoomUrl()


  return fetchJsonPost(url, data, ProtocolR.POST);
}



export function constructDeleteRoom() {
  const host = ServerModel.host;
  const port = ServerModel.port;
  let token = ''
  try {
    token = JSON.parse(DataModel.account)[0].token.toString();
  } catch (Error) {

  }

  const url = 'http://' + host + ':' + port + '/api/Room/deleteRoom?token=' + token
  return url;
}

export function constructUrl() {
  const host = ServerModel.host;
  const port = ServerModel.port;
  let token = ''
  try {
    token = JSON.parse(DataModel.account)[0].token.toString();
  } catch (Error) {

  }

  const url = 'http://' + host + ':' + port + '/api/Reservation/getUsersReservations?token=' + token
  return url;
}


export function ConstuctUpdateAmountOfBeds() {

  const host = ServerModel.host;
  const port = ServerModel.port;
  let token = ''
  try {
    token = JSON.parse(DataModel.account)[0].token.toString();
  } catch (Error) {

  }

  const url = 'http://' + host + ':' + port + '/api/Room/updatAmountOfBedsRoom?token=' + token;
  return url;
}


export async function reserveerDezeKamer(arrival, depature, id) {

  const urlToServer = constructClaimResrvation();


  const data = JSON.stringify({
      id
  });


  const response = fetchJsonPost(urlToServer, data.toString(), ProtocolR.POST)

  // @ts-ignore
  return response
}



export function cinstructurlacceptresrvation() {
  const host = ServerModel.host;
  const port = ServerModel.port;
  let token = ''
  try {
    token = JSON.parse(DataModel.account)[0].token.toString();
  } catch (Error) {

  }

  const url = 'http://' + host + ':' + port + '/api/Reservation/getPendingResrvationsAdmin?token=' + token;

  return url;
}

export function acceptRResrvation() {
  const host = ServerModel.host;
  const port = ServerModel.port;
  let token = ''
  try {
    token = JSON.parse(DataModel.account)[0].token.toString();
  } catch (Error) {

  }

  const url = 'http://' + host + ':' + port + '/api/Reservation/updateAcceptResevation?token=' + token;
  return url;
}


export function constructClaimResrvation() {
  const host = ServerModel.host;
  const port = ServerModel.port;
  let token = ''
  try {
    token = JSON.parse(DataModel.account)[0].token.toString();
  } catch (Error) {

  }

  const url = 'http://' + host + ':' + port + '/api/Reservation/claimReservations?token=' + token
  return url
}
