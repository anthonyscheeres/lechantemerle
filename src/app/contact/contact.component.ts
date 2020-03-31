import { Component, OnInit } from '@angular/core';
import { ServerModel } from '../models/ServerModel';
import { ContactInfoModel } from '../models/ContactInfoModel';
import { HttpClient} from '@angular/common/http';
import { interval } from 'rxjs';
import { DataModel } from '../models/DataModel';
import { fetchJsonPost } from '../services/http';
import { ProtocolR } from '../models/Protocol';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactInfoDataFromServer: any;
  showInputFields: boolean = false;
    mySubscription: any;

  constructor(private http: HttpClient) {
    this.showcontactInfo();

      this.doStuff();
 
  }


  ngOnInit() {
  }

  showcontactInfo() {
    this.http.get<ContactInfoModel[]>(
      this.ConstructGetContactInfoUrl() )
      .subscribe(
        responseData => {
          this.contactInfoDataFromServer = responseData;
        }
      );
  }



  doStuff() {
    this.showInputFields = this.checkIfSuperUser() ;
  }

  checkIfSuperUser() {
    var obj = JSON.parse(DataModel.account);
  //  console.log(obj[0].is_super_user);
    var isSuper = obj[0].is_super_user;

  
    return isSuper==true;
  }



  async submitNewContactDetails(event) {
    event.preventDefault()

    var target = event.target


    var house = target.querySelector('#houseNickname').value
    var place = target.querySelector('#place').value
    var address = target.querySelector('#address').value
    var postalCode = target.querySelector('#postalCode').value
    var familyName = target.querySelector('#familyName').value
    var mail = target.querySelector('#mail').value
    var telephone = target.querySelector('#telephone').value
    var url = this.ConstructPostContactInfoUrl();
    var data = JSON.stringify({ "house_nickname": house, "place": place, "address": address, "postal_code": postalCode, "family_name": familyName, "telephone": telephone, "mail": mail })
 
    fetchJsonPost(url, data.toString(), ProtocolR.PUT);

    this.sleep(3000)


    this.showcontactInfo()


  }


  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


  ConstructPostContactInfoUrl() {
    var host = ServerModel.host;
    var port = ServerModel.port;
    var token = JSON.parse(DataModel.account)[0].token.toString();
    var url = "http://" + host + ":" + port + "/api/ContactInfo/ChangeContactInfo?token="+token;
    return url;
  }



  ConstructGetContactInfoUrl() {
    var host = ServerModel.host;
    var port = ServerModel.port;
    var url = "http://" + host + ":" + port + "/api/ContactInfo/getContactInfo";
    return url;
  }


}
