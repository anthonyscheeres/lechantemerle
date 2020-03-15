import { Component, OnInit } from '@angular/core';
import { ServerModel } from '../models/ServerModel';
import { ContactInfoModel } from '../models/ContactInfoModel';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactInfoDataFromServer: any;

  constructor(private http: HttpClient) {
    this.showcontactInfo();
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


  ConstructGetContactInfoUrl() {
    var host = ServerModel.host;
    var port = ServerModel.port;
    var url = "https://" + host + ":" + port + "/api/ContactInfo/getContactInfo";
    return url;
  }


}
