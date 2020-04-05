
import { PermissionModel } from './PermissionModel';
import { RoomsData } from './RoomsData';


export class DataModel {
  static account: any = localStorage.getItem("token");
  static rooms: RoomsData = new RoomsData;
}
