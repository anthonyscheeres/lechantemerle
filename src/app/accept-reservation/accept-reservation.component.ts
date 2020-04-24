import { Component, OnInit } from '@angular/core';
import { acceptRResrvation, cinstructurlacceptresrvation } from '../services/rooms';
import { fetchJsonPost } from '../services/http';
import { ProtocolR } from '../models/Protocol';
import { HttpClient } from '@angular/common/http';
import { ReservationModel } from '../models/ReservationModel';

@Component({
  selector: 'app-accept-reservation',
  templateUrl: './accept-reservation.component.html',
  styleUrls: ['./accept-reservation.component.css']
})
export class AcceptReservationComponent implements OnInit {
  ms = 2 * 1000 // 2 * 1000ms = 2 seconden
  reservationDataFromServer
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.intialize()
  }
  acpt(value) {
    var url = acceptRResrvation() //url to server
    var data = JSON.stringify({ "id": value.id })

    fetchJsonPost(url, data.toString(), ProtocolR.PUT)
    this.sleep(this.ms)

    this.intialize()
  }
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  intialize() {
    this.getResrvation()
  }
  getResrvation() {

  
      this.http.get<ReservationModel[]>(

        cinstructurlacceptresrvation())
        .subscribe(
          responseData => {
            this.reservationDataFromServer = responseData;

          }
        );

  }
}
