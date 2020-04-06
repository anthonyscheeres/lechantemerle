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

  arrival: string = "Aankomst"
  departure: string = "Vertrek"

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
          console.log(responseData)

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


    var roomno = this.selected
    var price = target.querySelector('#price').value
    var checkbox = target.querySelector('#checkbox').value


	


    var data = JSON.stringify({ "amountOfBeds": roomno, "id": price, "time_till": this.departure, "time_from": this.arrival })
    var host = ServerModel.host;
    var port = ServerModel.port;
    var token = JSON.parse(DataModel.account)[0].token.toString();
    var url = "http://" + host + ":" + port + "/api/Room/updatAmountOfBedsRoom?token=" + token;


    return fetchJsonPost(url, data, ProtocolR.PUT);

  }


  onDateSelect2(event) {
    event.preventDefault()
    const target = event.target
    const arrival = target.querySelector('#arrival').value
    this.arrival = arrival

  }
  onDateSelect(event) {
    event.preventDefault()
    const target = event.target
    const departure = target.querySelector('#departure').value
    this.departure = departure


  }

}
