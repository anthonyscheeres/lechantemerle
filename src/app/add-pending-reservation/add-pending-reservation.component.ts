import { Component, OnInit } from '@angular/core';
import { ServerModel } from '../models/ServerModel';
import { DataModel } from '../models/DataModel';
import { ProtocolR } from '../models/Protocol';
import { fetchJsonPost } from '../services/http';

@Component({
  selector: 'app-add-pending-reservation',
  templateUrl: './add-pending-reservation.component.html',
  styleUrls: ['./add-pending-reservation.component.css']
})
export class AddPendingReservationComponent implements OnInit {
  current = new Date();

  arrival: string = "arrival"
  departure: string = "departure"

  isDisabledFrom = [];
  isDisabledTill = [];
  isEnabledFrom = [];
  isEnabledTill = [];
  reservationDataFromServer
  millisecondPerDay = 24 * 60 * 60 * 1000;
  disabledDates = [];

  constructor() { }

  ngOnInit(): void {
  }
  openSubmit(event) {
    event.preventDefault()

    var target = event.target


    var roomno = target.querySelector('roomno').value
    var price = target.querySelector('price').value
    	


	


    var data = JSON.stringify({ "amountOfBeds": roomno, "id": price, "time_till": this.departure, "time_from": this.arrival })
    var host = ServerModel.host;
    var port = ServerModel.port;
    var token = JSON.parse(DataModel.account)[0].token.toString();
    var url = "http://" + host + ":" + port + "/api/Room/updatAmountOfBedsRoom?token=" + token;


    return fetchJsonPost(url, data, ProtocolR.PUT);

  }

  clickPopUp() {

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
