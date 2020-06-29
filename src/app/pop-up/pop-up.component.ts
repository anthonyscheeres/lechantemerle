import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import {
  ModalDismissReasons,
  NgbModal
} from '@ng-bootstrap/ng-bootstrap';

import {
  ReservationModel
} from '../models/ReservationModel';
import {
  ServerModel
} from '../models/ServerModel';
import {
  HttpClient
} from '@angular/common/http';
import {
  DataModel
} from '../models/DataModel';
import {
  Router, ActivatedRoute
} from '@angular/router';
import {
  reserveerDezeKamer, ConstructGetAvailableReservationUrl, constructGetRoomDetails, ConstructGetAvailableReservationUrl2, constructGetDesribtion
} from '../services/rooms';
import { convertToYYYYMMDD, sleepForASetAmountOfTimeInMiliSeconds } from '../services/general';
import { RoomModel } from '../models/RoomsModel';


@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit {
  closeResult: string;
  @Input() product: RoomModel;
  current = new Date();
  private ms= 5000
  this1 = 'Reserveer hier!';
  min:Date= new Date();
  max : Date= new Date(new Date().setMonth(new Date().getMonth() + 3))
  arrival: Date
  departure: Date
  price= 'Onbekend aantal'
  loggedIn = false
  isDisabledFrom: Date[] = [];
  isDisabledTill  : Date[] = []
  isEnabledFrom: Date[] = [];
  isEnabledTill: Date[] = [];
  reservationDataFromServer: ReservationModel[];
  millisecondPerDay = 24 * 60 * 60 * 1000; // time equals a whole day
  disabledDates : Date[] = [];
  id: number // id of current reservation

  defineIsDisbaled(reservationDataFromServer: ReservationModel[]) {
    const constructisEnabledFrom2 : ReservationModel[] = []
    const constructisEnabledtill2: ReservationModel[] = []
    reservationDataFromServer.forEach(r => {
      constructisEnabledFrom2.push(r.time_from);
      constructisEnabledtill2.push(r.time_till)
    });


    this.setIsEnabledTill(constructisEnabledtill2)
    this.setisEnabledFrom(constructisEnabledFrom2)
  }




  showInfo(id) {


    const url = constructGetDesribtion(id)

    this.http.get<RoomModel>(
      url)
      .subscribe(
        responseData => {
          this.product = responseData[0];

        }
      );
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


    this.intializeFields()

  }
  clearFilter() {

    const a: string = convertToYYYYMMDD(this.arrival.toString())

    // this.intialize()
    this.reservationDataFromServer.forEach(r => {
      const b = r.time_from.split('T')[0];
      if (a == b) {

        this.departure = new Date(r.time_till);

        this.price = r.price;
        this.id = r.id
      }
    })

  }

  clearFilter2() {
    // this.intialize()
    const departureDateAsDate = convertToYYYYMMDD(this.departure.toString())
    this.reservationDataFromServer.forEach(
      SingleResrvationWithArivalPriceId => {
        const departureDateFromResrvation = SingleResrvationWithArivalPriceId.time_till.split('T')[0];

        if (departureDateAsDate == departureDateFromResrvation) {

          this.arrival = new Date(SingleResrvationWithArivalPriceId.time_from);
          this.price = SingleResrvationWithArivalPriceId.price;
          this.id = SingleResrvationWithArivalPriceId.id
        }
      })

  }



  getEnabledDates(resrvations: ReservationModel[]) {
    let enabledDatesWhatDatesThatCanBeRserved = []; // default is an emty list
    if (resrvations == null) {
      enabledDatesWhatDatesThatCanBeRserved = []// null response should be emty instead
    } else {
      resrvations.forEach(r => {
        enabledDatesWhatDatesThatCanBeRserved.push(new Date(r.time_from))
      });
    }
    return enabledDatesWhatDatesThatCanBeRserved;
  }

  getEnabledDates2(resrvationsDataAsJson: ReservationModel[]) {
    let response = []
    if (resrvationsDataAsJson == null) {
      const enabledDates = []
      const response = enabledDates
      return response;

    } else {
      resrvationsDataAsJson.forEach(r => {
        const enabledDates2 = [];
        enabledDates2.push(new Date(r.time_till))
        response = enabledDates2
      });
    }
    return response;
  }

  checkIfUserIsLoggedIn() {
    let loggedIn = false;

    try {

      const obj = JSON.parse(DataModel.account)[0];


      loggedIn = obj.token != null
      //  console.log(loggedIn);




    } catch {

    }

    return loggedIn;
  }






  intializeFields() {

    let isLoggedIn = false;
    isLoggedIn = this.checkIfUserIsLoggedIn();
    this.loggedIn = isLoggedIn;


    let id: number = null
    try {
      id = this.product.id
    }
    catch (Error) {
      const subscription = this.activatedRoute.queryParams.subscribe(params => {
        id = params.id;

      });
    }



    if (id != null) {
      this.showInfo(id)

      this.showAvailableDatesFromServer(id)
    }









    const resrvationsDataFromServerInJsonFormat = this.reservationDataFromServer
    let enabledDates : Date[]= [] // default is emty list
    enabledDates = this.getEnabledDates(resrvationsDataFromServerInJsonFormat)


    this.GetDisabledDates(enabledDates)
    const enabledDate = this.getEnabledDates2(resrvationsDataFromServerInJsonFormat)
    this.GetDisabledDates2(enabledDate)
  }


  GetDisabledDates(excludeDates: Array<Date>) {
    const now : Date= new Date();
    let startDate: Date = new Date(now.setFullYear(now.getFullYear() - 1));
    const endDate: Date = new Date(now.setFullYear(now.getFullYear() + 2)); // change as per your need

    this.isDisabledFrom = [];
    do {
      let found = false;
      for (let i = 0; i < excludeDates.length; i++) {
        const excludeDate: Date = excludeDates[i];
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
    const now = new Date();

    let startDate: Date = new Date(now.setFullYear(now.getFullYear() - 1));
    const endDate: Date = new Date(now.setFullYear(now.getFullYear() + 2)); // change as per your need

    this.isDisabledTill = [];
    do {
      let found = false;
      for (let i = 0; i < excludeDates.length; i++) {
        const excludeDate: Date = excludeDates[i];
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
    const date = new Date(date1)
    const date3 = new Date(date2)
    return date.getFullYear() == date3.getFullYear() && date.getMonth() == date3.getMonth() && date.getDate() == date3.getDate();

  }



  ConstructGetAvailableReservationUrl(product: number) {
    return ConstructGetAvailableReservationUrl2(product);
  }

  constructGetRoomDetails(product) {
    return constructGetRoomDetails(product)
  }

  showAvailableDatesFromServer(id : number) {





    this.http.get<ReservationModel[]>(
      this.ConstructGetAvailableReservationUrl(id))
      .subscribe(
        responseData => {

          this.reservationDataFromServer = responseData;
          this.defineIsDisbaled(responseData)
        }
      );
  }


  constructor(private http: HttpClient, private modalService: NgbModal, private _router: Router, private activatedRoute: ActivatedRoute) { }


  async reserveer(event) {


    // get from fields
    const id = this.id
    const arrival = this.arrival
    const depature = this.departure


    await reserveerDezeKamer(arrival, depature, id).then(response => { // await response from server
      const successMessage = '"success"'
      if (response == successMessage) {


        const ms = this.ms;  // get amount you should sleep
        this.sleepforAsetAmountOfTime(ms) // sleep for set amount


        const pathToGoTo = '/reserveer';
        this._router.navigate([pathToGoTo]);

      } else {
        const failedMessage = 'Oops heb je wel een goed account, valideer je mail of log opnieuw in!';
        this.this1 = failedMessage;
      }
    });




  }



  sleepforAsetAmountOfTime(ms: number) {
    const promiseToSleep = sleepForASetAmountOfTimeInMiliSeconds(ms);
    return promiseToSleep
  }



}
