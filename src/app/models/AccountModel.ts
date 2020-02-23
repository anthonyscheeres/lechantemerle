
export class AccountModel {


  token: String = localStorage.getItem("token");
  hasSuperPermission: boolean = false;

  constructor() { }

}
