import { Component, OnInit } from '@angular/core';

import { constructUrl } from '../services/rooms';
import { ReservationModel } from '../models/ReservationModel';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {
  reservationDataFromServer
  selected
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getUserReservations()

  }

  getUserReservations() {
    this.http.get<ReservationModel[]>(
      constructUrl())
      .subscribe(
        responseData => {
          this.reservationDataFromServer = responseData;

        }
      );
  }



}
