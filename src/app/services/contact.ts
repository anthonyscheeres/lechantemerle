import { ServerModel } from '../models/ServerModel';
import { DataModel } from '../models/DataModel';

export function ConstructPostContactInfoUrl() {
  var host = ServerModel.host;
  var port = ServerModel.port;
  var token = JSON.parse(DataModel.account)[0].token.toString();
  var url = "http://" + host + ":" + port + "/api/ContactInfo/ChangeContactInfo?token=" + token;
  return url;
}



export function ConstructGetContactInfoUrl() {
  var host = ServerModel.host;
  var port = ServerModel.port;
  var url = "http://" + host + ":" + port + "/api/ContactInfo/getContactInfo";
  return url;
}

