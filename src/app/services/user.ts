
import { ServerModel } from '../models/ServerModel';
import { responseR } from '../models/ResponseRequest';
import { fetchJsonPost, fetchJsonGet } from './http';
import {UserModel} from "../models/UserModel";

import { ProtocolR } from '../models/Protocol';
import { DataModel } from '../models/DataModel';



export function login(username, password) {
  var host = ServerModel.host;
  var port = ServerModel.port;
  var url = "http://" + host + ":" + port + "/api/User/login";

  var data = JSON.stringify({
    "user_id": 0,
    "username": username,
    "password": password,
    "email": null,
    "is_super_user": false,
    "token": null
  });

  // @ts-ignore
  return fetchJsonPost(url, data.toString(), ProtocolR.POST);

}


export function register(username, password, email) {

  var host = ServerModel.host;
  var port = ServerModel.port;
  var urlToServer = "http://" + host + ":" + port + "/api/User/register";

  var data = JSON.stringify({
    "user_id": 0,
    "username": username,
    "password": password,
    "email": email,
    "is_super_user": false,
    "token": null
  });


  // @ts-ignore
  return fetchJsonPost(urlToServer, data.toString(), ProtocolR.POST)

}
