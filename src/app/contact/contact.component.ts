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
  showInputFields = false;
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
    const obj = JSON.parse(DataModel.account);
  //  console.log(obj[0].is_super_user);
    const isSuper = obj[0].is_super_user;


    return isSuper==true;
  }



  async submitNewContactDetails(event) {
    event.preventDefault()

    const target = event.target


    const house = target.querySelector('#houseNickname').value
    const place = target.querySelector('#place').value
    const address = target.querySelector('#address').value
    const postalCode = target.querySelector('#postalCode').value
    const familyName = target.querySelector('#familyName').value
    const mail = target.querySelector('#mail').value
    const telephone = target.querySelector('#telephone').value
    const url = ConstructPostContactInfoUrl();
    const data = JSON.stringify({ house_nickname: house, place, address, postal_code: postalCode, family_name: familyName, telephone, mail })

    fetchJsonPost(url, data.toString(), ProtocolR.PUT);

    this.sleep(3000)


    this.showcontactInfo()


  }


  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }




}
