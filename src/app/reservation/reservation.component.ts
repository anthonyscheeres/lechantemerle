
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReservationModel } from '../models/ReservationModel';
import { ServerModel } from '../models/ServerModel';


@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
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
 

  constructor(private http: HttpClient) {
   

  }

  defineIsDisbaled(reservationDataFromServer) {
    let constructisEnabledFrom2 = []
    let constructisEnabledtill2 = []
    reservationDataFromServer.foreach(r => { constructisEnabledFrom2.push(r.time_from); constructisEnabledtill2.push(r.time_till) });


    this.setIsEnabledTill(constructisEnabledtill2) 
    this.setisEnabledFrom(constructisEnabledFrom2)
  }

  setIsEnabledTill(constructisEnabledtill2) {
    this.isEnabledTill = constructisEnabledtill2
    this.GetDisabledDates2(constructisEnabledtill2)
  }

  setisEnabledFrom(constructisEnabledFrom2) {
    this.isEnabledFrom = constructisEnabledFrom2
    this.GetDisabledDates(constructisEnabledFrom2)
  }



  ngOnInit() {
  
      let enabledDates = []
      this.GetDisabledDates(enabledDates)
      this.GetDisabledDates2(enabledDates)


      this.showAvailableDates()

  
  }

  GetDisabledDates(excludeDates: Array<Date>) {
    var now = new Date();
    var startDate: Date = new Date(now.setFullYear(now.getFullYear() - 1));
    var endDate: Date = new Date(now.setFullYear(now.getFullYear() + 2));//change as per your need
    console.log(startDate);
    console.log(endDate);
    this.isDisabledFrom = [];
    do {
      var found = false;
      for (var i = 0; i < excludeDates.length; i++) {
        var excludeDate: Date = excludeDates[i];
        if (this.IsSameDay(excludeDate, startDate)) {
          found = true;
        }
      }
      if (!found) {
        this.isDisabledFrom.push(startDate);
      }
      startDate = new Date((startDate.getTime() + this.millisecondPerDay));
    } while (startDate <= endDate)
    console.log("Calculated: " + this.isDisabledFrom.length);
    //console.log("Calculated: "+this.disabledDates);
  }

  GetDisabledDates2(excludeDates: Array<Date>) {
    var now = new Date();
    var startDate: Date = new Date(now.setFullYear(now.getFullYear() - 1));
    var endDate: Date = new Date(now.setFullYear(now.getFullYear() + 2));//change as per your need
    console.log(startDate);
    console.log(endDate);
    this.isDisabledTill = [];
    do {
      var found = false;
      for (var i = 0; i < excludeDates.length; i++) {
        var excludeDate: Date = excludeDates[i];
        if (this.IsSameDay(excludeDate, startDate)) {
          found = true;
        }
      }
      if (!found) {
        this.isDisabledTill.push(startDate);
      }
      startDate = new Date((startDate.getTime() + this.millisecondPerDay));
    } while (startDate <= endDate)
    console.log("Calculated: " + this.isDisabledTill.length);
    //console.log("Calculated: "+this.disabledDates);
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
