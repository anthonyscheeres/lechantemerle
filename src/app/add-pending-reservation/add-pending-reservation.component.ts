import { Component, OnInit } from '@angular/core';
import { ServerModel } from '../models/ServerModel';
import { DataModel } from '../models/DataModel';
import { ProtocolR } from '../models/Protocol';
import { fetchJsonPost } from '../services/http';
import { HttpClient } from '@angular/common/http';
import { ReservationModel } from '../models/ReservationModel';
import { Router } from '@angular/router';
import { convertToYYYYMMDD } from '../services/general';


@Component({
  selector: 'app-add-pending-reservation',
  templateUrl: './add-pending-reservation.component.html',
  styleUrls: ['./add-pending-reservation.component.css']
})
export class AddPendingReservationComponent implements OnInit {
  current: Date = new Date();
  theCheckbox = false;
  marked =false
  arrival : Date
  departure : Date
  this1 = ''
  min=new Date()

  isDisabledFrom: Date[] = [];
  isDisabledTill: Date[] = [];

  reservationDataFromServer
  millisecondPerDay = 24 * 60 * 60 * 1000;
  disabledDates: Date[] = [] ;
  selected: ReservationModel= new ReservationModel();


  constructor(private http: HttpClient, private _router : Router) { }

  ngOnInit(): void {
    this.showAvailableDates()
   const resrvations= this.reservationDataFromServer
    this.isDisabledFrom = this.getEnabledDates(resrvations)
    this.isDisabledTill=this.getEnabledDates2(resrvations)
  }


  clearFilter() {
    const newDateDeparture = new Date(this.arrival)
    newDateDeparture.setDate(newDateDeparture.getDate() + 1)
    this.departure = newDateDeparture
  }

  getEnabledDates(resrvations) {
    let enabledDates = [];
    if (resrvations == null) { enabledDates = [] }
    else {
      resrvations.foreach(r => {
        enabledDates.push(r.time_from)
      });
    }
    return enabledDates;
  }

  getEnabledDates2(resrvations: ReservationModel[] ) {
    let enabledDates = [];
    if (resrvations == null) { enabledDates = [] }
    else {
      resrvations.forEach(r => {
        enabledDates.push(r.time_till)
      });
    }
    return enabledDates;
  }

  showAvailableDates() {
    this.http.get<ReservationModel[]>(
      this.ConstructGetAvailableReservationUrl())
      .subscribe(
        responseData => {
          this.reservationDataFromServer = responseData;

        }
      );
  }


  ConstructGetAvailableReservationUrl() {
    const host = ServerModel.host;
    const port = ServerModel.port;
    // var token = JSON.parse(DataModel.account)[0].token.toString();
    const url = 'http://' + host + ':' + port + '/api/Room/listAvailableRooms';
    return url;
  }


  async openSubmit(event) {
    event.preventDefault()

    const target = event.target


    let roomno: number;

    const roomNumber = this.selected.toString()

    roomno = parseInt(roomNumber)

    let price: number;

    price = parseInt(target.querySelector('#price').value)

    const arrival = this.arrival
    const departure = this.departure

    const data = this.valiidateJsonAddresrvation(roomno, departure, arrival, price)
    const host = ServerModel.host;
    const port = ServerModel.port;
    const token = JSON.parse(DataModel.account)[0].token.toString();
    const url = 'http://' + host + ':' + port + '/api/Reservation/addPendingReservation?token=' + token;


    await fetchJsonPost(url, data, ProtocolR.PUT).then(r => {
      console.log(r)
      this.changeThis1(r)
    })

  }

  changeThis1(r:string) {
    if (r == '"success"') {
      this._router.navigate(['/admin']);
      this.this1 = 'Gelukt!'
    } else this.this1 = 'Oops er ging iets fout'
  }


  valiidateJsonAddresrvation(roomno: number, departure: Date, arrival: Date, price: number) {
    return JSON.stringify({ roomno, price, time_till: convertToYYYYMMDD(departure.toString()), time_from: convertToYYYYMMDD(arrival.toString()), everyMonth: this.marked })
  }


  toggleVisibility(e) {
    this.marked = e.target.checked;
  }


}
