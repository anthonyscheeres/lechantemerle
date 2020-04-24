import { Component, OnInit, Input } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ReservationModel } from '../models/ReservationModel';
import { ServerModel } from '../models/ServerModel';
import { HttpClient } from '@angular/common/http';
import { DataModel } from '../models/DataModel';
import { Router } from '@angular/router';
import { reserveerDezeKamer } from '../services/rooms';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit {
  closeResult: string;
  @Input() product: ReservationModel;
  current = new Date();
  private ms = 5000
  this1 = "Reserveer hier!";
  min = new Date();
  max = new Date(new Date().setMonth(new Date().getMonth()+3))
  arrival
  departure

  isDisabledFrom = [];
  isDisabledTill = [];
  isEnabledFrom = [];
  isEnabledTill = [];
  reservationDataFromServer
  millisecondPerDay = 24 * 60 * 60 * 1000;
  disabledDates = [];

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


  ConstuctDeleteReservationById(id) {
  
    var host = ServerModel.host;
    var port = ServerModel.port;
    var token = JSON.parse(DataModel.account)[0].token.toString();
    var url = "http://" + host + ":" + port + "api/Reservation/deleteReservation?token=" + token;
    return url
  }



  ngOnInit() {


   this.intialize()

  }
  clearFilter() {
   // this.intialize()
    this.reservationDataFromServer.foreach(r => { if (r.time_from == this.arrival) { this.departure = new Date(r.time_till); this.GetDisabledDates2(this.departure) } })

  }

  clearFilter2() {
   //this.intialize()
    this.reservationDataFromServer.foreach(r => { if (r.time_till == this.departure) { this.arrival = new Date(r.time_from); this.GetDisabledDates2(this.arrival) } })

  }

  getEnabledDates(resrvations) {
    var enabledDates = [];
    if (resrvations == null) { enabledDates = [] }
    else {
      resrvations.foreach(r => {
        enabledDates.push(r.time_from)
      });
    }
    return enabledDates;
  }

  getEnabledDates2(resrvations) {
    var enabledDates = [];
    if (resrvations == null) { enabledDates = [] }
    else {
      resrvations.foreach(r => {
        enabledDates.push(r.time_till)
      });
    }
    return enabledDates;
  }

  intialize() {
    this.showAvailableDates()
    var resrvations = this.reservationDataFromServer
    var enabledDates = this.getEnabledDates(resrvations)
    enabledDates = []
    this.GetDisabledDates(enabledDates)
    var enabledDate = this.getEnabledDates2(resrvations)
    this.GetDisabledDates2(enabledDate)
  }


  GetDisabledDates(excludeDates: Array<Date>) {
    var now = new Date();
    var startDate: Date = new Date(now.setFullYear(now.getFullYear() - 1));
    var endDate: Date = new Date(now.setFullYear(now.getFullYear() + 2));//change as per your need

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
 
  }

  GetDisabledDates2(excludeDates: Array<Date>) {
    var now = new Date();

    var startDate: Date = new Date(now.setFullYear(now.getFullYear() - 1));
    var endDate: Date = new Date(now.setFullYear(now.getFullYear() + 2));//change as per your need

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
   
  }



  IsSameDay(date1: Date, date2: Date) {
    if (date1.getFullYear() == date2.getFullYear() && date1.getMonth() == date2.getMonth() && date1.getDate() == date2.getDate()) {
      return true;
    }
    else {
      return false;
    }
  }



  ConstructGetAvailableReservationUrl() {
    var host = ServerModel.host;
    var port = ServerModel.port;
    //var token = JSON.parse(DataModel.account)[0].token.toString();
    var url = "http://" + host + ":" + port + "/api/Reservation/getPendingReservation?id="+this.product.id;
    return url;
  }


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


  constructor(private http: HttpClient, private modalService: NgbModal, private _router: Router) {}


  async reserveer(event) {


    var id 
    id = this.product.id
    const arrival = this.arrival
    const depature = this.departure
  
    await reserveerDezeKamer(arrival, depature,id ).then(response => {
    
       if (response == '"success"') {
         this._router.navigate(['/reserveer']);

       } else this.this1 = "Oops heb je wel een goed account, valideer je mail of log opnieuw in!"
     });

    this.sleep(this.ms)

    this.intialize()

  }



  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


  
}
