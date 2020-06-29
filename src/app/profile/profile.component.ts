import { Component, OnInit } from '@angular/core';
import { ServerModel } from '../models/ServerModel';
import { HttpClient } from '@angular/common/http';
import { DataModel } from '../models/DataModel';
import { UserModel } from '../models/UserModel';
import { ProtocolR } from '../models/Protocol';
import { fetchJsonPost } from '../services/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  reservationDataFromServer

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getProfileInformation()
  }

  getProfileInformation() {

      this.http.get<UserModel[]>(
        this.ConstructGetAvailableProfileUrl())
        .subscribe(
          responseData => {
            this.reservationDataFromServer = responseData;

          }
        );

  }
  ConstructGetAvailableProfileUrl() {
    const host = ServerModel.host;
    const port = ServerModel.port;
    const token = JSON.parse(DataModel.account)[0].token.toString();
    const url = 'http://' + host + ':' + port + '/api/User/validateGetProfile?token='+token;
    return url;
  }
  ConstructUrl() {
    const host = ServerModel.host;
    const port = ServerModel.port;
    const token = JSON.parse(DataModel.account)[0].token.toString();
    const url = 'http://' + host + ':' + port + '/api/User/validateMail?token='+token;
    return url;
  }

  sendMail() {
    const url = this.ConstructUrl();
    const data = ''
    fetchJsonPost(url,data, ProtocolR.POST)

  }
}
