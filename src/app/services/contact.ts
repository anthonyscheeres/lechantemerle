import { ServerModel } from '../models/ServerModel';
import { DataModel } from '../models/DataModel';

export function ConstructPostContactInfoUrl() {
  const host = ServerModel.host;
  const port = ServerModel.port;
  const token = JSON.parse(DataModel.account)[0].token.toString();
  const url = 'http://' + host + ':' + port + '/api/ContactInfo/ChangeContactInfo?token=' + token;
  return url;
}



export function ConstructGetContactInfoUrl() {
  const host = ServerModel.host;
  const port = ServerModel.port;
  const url = 'http://' + host + ':' + port + '/api/ContactInfo/getContactInfo';
  return url;
}

