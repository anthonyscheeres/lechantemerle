import { Component, OnInit } from '@angular/core';
import { ContactInfoModel } from '../models/ContactInfoModel';
import { HttpClient} from '@angular/common/http';
import { interval } from 'rxjs';
import { DataModel } from '../models/DataModel';
import { fetchJsonPost } from '../services/http';
import { ProtocolR } from '../models/Protocol';
import { ConstructGetContactInfoUrl, ConstructPostContactInfoUrl } from '../services/contact';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactInfoDataFromServer: any = []
  showInputFields: boolean = false;
    mySubscription: any;

  constructor(private http: HttpClient) {

 
  }


  ngOnInit() {
    this.showcontactInfo();

    this.doStuff();
  }

  showcontactInfo() {
    this.http.get<ContactInfoModel[]>(
      ConstructGetContactInfoUrl() )
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
    var url = ConstructPostContactInfoUrl();
    var data = JSON.stringify({ "house_nickname": house, "place": place, "address": address, "postal_code": postalCode, "family_name": familyName, "telephone": telephone, "mail": mail })
 
    fetchJsonPost(url, data.toString(), ProtocolR.PUT);

    this.sleep(3000)


    this.showcontactInfo()


  }


  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }




}
