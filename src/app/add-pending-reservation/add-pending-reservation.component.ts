import { Component, OnInit } from '@angular/core';
import { ServerModel } from '../models/ServerModel';
import { DataModel } from '../models/DataModel';
import { ProtocolR } from '../models/Protocol';
import { fetchJsonPost } from '../services/http';
import { HttpClient } from '@angular/common/http';
import { ReservationModel } from '../models/ReservationModel';

@Component({
  selector: 'app-add-pending-reservation',
  templateUrl: './add-pending-reservation.component.html',
  styleUrls: ['./add-pending-reservation.component.css']
})
export class AddPendingReservationComponent implements OnInit {
  current = new Date();
  theCheckbox = false;
  marked =false
  arrival 
  departure 

  isDisabledFrom = [];
  isDisabledTill = [];
  isEnabledFrom = [];
  isEnabledTill = [];
  reservationDataFromServer
  millisecondPerDay = 24 * 60 * 60 * 1000;
  disabledDates = [];
  selected = new ReservationModel();


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.showAvailableDates()
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
    var host = ServerModel.host;
    var port = ServerModel.port;
    //var token = JSON.parse(DataModel.account)[0].token.toString();
    var url = "http://" + host + ":" + port + "/api/Room/listAvailableRooms";
    return url;
  }


  openSubmit(event) {
    event.preventDefault()

    var target = event.target


    var roomno: number;

    var roomNumber = this.selected.toString()
    console.log(roomNumber)
    roomno = parseInt(roomNumber)
    
    var price: number;

    price = parseInt(target.querySelector('#price').value)
    
    var arrival = this.arrival
    var departure = this.departure
 


    var data = JSON.stringify({ "roomno": roomno, "price": price, "time_till": departure, "time_from":arrival, "everyMonth": this.marked })
    var host = ServerModel.host;
    var port = ServerModel.port;
    var token = JSON.parse(DataModel.account)[0].token.toString();
    var url = "http://" + host + ":" + port + "/api/Reservation/addPendingReservation?token=" + token;
   

    return fetchJsonPost(url, data, ProtocolR.PUT);

  }

  toggleVisibility(e) {
    this.marked = e.target.checked;
  }


}
