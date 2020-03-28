
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReservationModel } from '../models/ReservationModel';
import { ServerModel } from '../models/ServerModel';
import { DataModel } from '../models/DataModel';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  current = new Date();
  minDate
  arrival: string = "arrival"
  departure: string = "departure"
  enabledDates 
  isDisabledFrom = [];
  isDisabledTill = [];
  reservationDataFromServer
  millisecondPerDay = 24 * 60 * 60 * 1000;

  constructor(private http: HttpClient) {
   
    this.minDate = {
      year: this.current.getFullYear(),
      month: this.current.getMonth() + 1,
      day: this.current.getDate()
    };


    this.showAvailableDates()
  }

  ngOnInit(): void {

  }

  defineIsDisbaled(reservationDataFromServer) {
    let constructisDisabledFrom = []
    let constructisDisabledtill = []
    reservationDataFromServer.foreach(r => { constructisDisabledFrom.push(r.time_from); constructisDisabledtill.push(r.time_till)});
  

    this.isDisabledTill = this.GetDisabledDates(constructisDisabledtill)
    this.isDisabledFrom = this.GetDisabledDates(constructisDisabledtill)
  }





  GetDisabledDates(excludeDates: Array<Date>) {
    var now = new Date();
    var startDate: Date = new Date(now.setFullYear(now.getFullYear() - 1));
    var endDate: Date = new Date(now.setFullYear(now.getFullYear() + 2));//change as per your need
    console.log(startDate);
    console.log(endDate);
    var isDisabledFrom = [];
    do {
      var found = false;
      for (var i = 0; i < excludeDates.length; i++) {
        var excludeDate: Date = excludeDates[i];
        if (this.IsSameDay(excludeDate, startDate)) {
          found = true;
        }
      }
      if (!found) {
        isDisabledFrom.push(startDate);
      }
      startDate = new Date((startDate.getTime() + this.millisecondPerDay));
    } while (startDate <= endDate)
    console.log("Calculated: " + isDisabledFrom.length);
    //console.log("Calculated: "+this.disabledDates);
    return isDisabledFrom;
  }

  IsSameDay(date1: Date, date2: Date) {
    if (date1.getFullYear() == date2.getFullYear() && date1.getMonth() == date2.getMonth() && date1.getDate() == date2.getDate()) {
      return true;
    }
    else {
      return false;
    }
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


  //api/Reservation/getPendingReservation


  showAvailableDates() {
    this.http.get<ReservationModel[]>(
      this.ConstructGetAvailableReservationUrl())
      .subscribe(
        responseData => {
          this.reservationDataFromServer = responseData;

          this.defineIsDisbaled(responseData)
        }
      );
  }

  ConstructGetAvailableReservationUrl() {
    var host = ServerModel.host;
    var port = ServerModel.port;
    //var token = JSON.parse(DataModel.account)[0].token.toString();
    var url = "http://" + host + ":" + port + "/api/Reservation/getPendingReservation";
    return url;
  }

  

}
