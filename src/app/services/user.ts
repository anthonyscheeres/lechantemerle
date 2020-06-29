
import { ServerModel } from '../models/ServerModel';
import { responseR } from '../models/ResponseRequest';
import { fetchJsonPost, fetchJsonGet } from './http';
import {UserModel} from '../models/UserModel';

import { ProtocolR } from '../models/Protocol';
import { DataModel } from '../models/DataModel';



export function login(username, password) {
  const host = ServerModel.host;
  const port = ServerModel.port;
  const url = 'http://' + host + ':' + port + '/api/User/login';

  const data = JSON.stringify({
    user_id: 0,
    username,
    password,
    email: null,
    is_super_user: false,
    token: null
  });

  // @ts-ignore
  return fetchJsonPost(url, data.toString(), ProtocolR.POST);

}





export function register(username, password, email) {

  const host = ServerModel.host;
  const port = ServerModel.port;
  const urlToServer = 'http://' + host + ':' + port + '/api/User/register';

  const data = JSON.stringify({
    user_id: 0,
    username,
    password,
    email,
    is_super_user: false,
    token: null
  });


  // @ts-ignore
  return fetchJsonPost(urlToServer, data.toString(), ProtocolR.POST)

}
