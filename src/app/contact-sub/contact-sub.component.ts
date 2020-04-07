import { Component, OnInit } from '@angular/core';
import { DataModel } from '../models/DataModel';
import { ConstructGetContactInfoUrl } from '../services/contact';
import { ContactInfoModel } from '../models/ContactInfoModel';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact-sub',
  templateUrl: './contact-sub.component.html',
  styleUrls: ['./contact-sub.component.css']
})
export class ContactSubComponent implements OnInit {

  contactInfoDataFromServer: any = DataModel.contact;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.showcontactInfo()
  }

  showcontactInfo() {
    this.http.get<ContactInfoModel[]>(
      ConstructGetContactInfoUrl())
      .subscribe(
        responseData => {
          this.contactInfoDataFromServer = responseData;
          DataModel.contact = responseData;
        }
      );
  }

}
