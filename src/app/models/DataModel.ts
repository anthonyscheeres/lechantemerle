
import { PermissionModel } from './PermissionModel';
import { RoomsData } from './RoomsData';
import { ContactInfoModel } from './ContactInfoModel';


export class DataModel {
  static account: any = localStorage.getItem("token");
  static rooms: RoomsData = new RoomsData;
  static contact: ContactInfoModel[]
}
