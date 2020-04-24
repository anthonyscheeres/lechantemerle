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
  arrival: Date
  departure: Date
  price = "Onbekend aantal"
  loggedIn = false
  isDisabledFrom = [];
  isDisabledTill = [];
  isEnabledFrom = [];
  isEnabledTill = [];
  reservationDataFromServer: ReservationModel[];
  millisecondPerDay = 24 * 60 * 60 * 1000;
  disabledDates = [];

  defineIsDisbaled(reservationDataFromServer) {
    let constructisEnabledFrom2 = []
    let constructisEnabledtill2 = []
    reservationDataFromServer.forEach(r => { constructisEnabledFrom2.push(r.time_from); constructisEnabledtill2.push(r.time_till) });


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

    var a = this.convert(this.arrival.toString())
    
    // this.intialize()
    this.reservationDataFromServer.forEach(r => {
      var b = r.time_from.split("T")[0];
      if (a == b) {
      
        this.departure = new Date(r.time_till);
   
        this.price = r.price;
      }
    })

  }

  clearFilter2() {
    //this.intialize()
    var a = this.convert(this.departure.toString())
    this.reservationDataFromServer.forEach(
      r => {
        var b = r.time_till.split("T")[0];
    
        if (a == b) {
       
          this.arrival = new Date(r.time_from);
          this.price = r.price;
        }
      })

  }


  convert(str: string) {
  var mnths = {
    Jan: "01",
    Feb: "02",
    Mar: "03",
    Apr: "04",
    May: "05",
    Jun: "06",
    Jul: "07",
    Aug: "08",
    Sep: "09",
    Oct: "10",
    Nov: "11",
    Dec: "12"
  },
    date = str.split(" ");

  return [date[3], mnths[date[1]], date[2]].join("-");
}

  getEnabledDates(resrvations: ReservationModel[]) {
    var enabledDates =[];
    if (resrvations == null) { enabledDates = [] }
    else {
      resrvations.forEach(r => {
        enabledDates.push(new Date(r.time_from))
      });
    }
    return enabledDates;
  }

  getEnabledDates2(resrvations) {
    var enabledDates = [];
    if (resrvations == null) { enabledDates = [] }
    else {
      resrvations.foreach(r => {
        enabledDates.push(new Date(r.time_till))
      });
    }
    return enabledDates;
  }

  checkIfUserIsLoggedIn() {
    var loggedIn = false;

    try {
      var obj = JSON.parse(DataModel.account)[0];


      loggedIn = obj.token != null
      //  console.log(loggedIn);

    }
    catch{

    }

    return loggedIn;
  }
  intialize() {

    var isLoggedIn = false;
    isLoggedIn = this.checkIfUserIsLoggedIn();
    this.loggedIn = isLoggedIn;

    this.showAvailableDates()
    var resrvations = this.reservationDataFromServer
    var enabledDates = []
    enabledDates = this.getEnabledDates(resrvations)
    console.log(enabledDates)
   
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
    var date = new Date(date1)
    var date3 = new Date(date2)
    return date.getFullYear() == date3.getFullYear() && date.getMonth() == date3.getMonth() && date.getDate() == date3.getDate();
 
  }



  ConstructGetAvailableReservationUrl() {
    var host = ServerModel.host;
    var port = ServerModel.port;
    //var token = JSON.parse(DataModel.account)[0].token.toString();
    var url = "http://" + host + ":" + port + "/api/Reservation/getPendingDatesByIdReservation?id="+this.product.id;
    return url;
  }

  constructGetRoomDetails() {
    var host = ServerModel.host;
    var port = ServerModel.port;
    //var token = JSON.parse(DataModel.account)[0].token.toString();
    var url = "http://" + host + ":" + port + "/api/Reservation/getPendingReservation?id=" + this.product.id;
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
