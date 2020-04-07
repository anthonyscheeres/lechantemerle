import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataModel } from '../models/DataModel';
import { interval } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { constructUrl } from '../services/rooms';
import { ReservationModel } from '../models/ReservationModel';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  mySubscription: any;
  mySubscription2: any;
  isLoggedIn: boolean = false;
  reservationDataFromServer
  isReservationsEmty = false


  constructor(private http: HttpClient, private _router: Router) {
    this.update();
    this.getUserReservations()
    this.update2();
    
  }



  getUserReservations() {
    this.http.get<ReservationModel[]>(
      constructUrl())
      .subscribe(
        responseData => {
          this.reservationDataFromServer = responseData;

          //console.log(responseData.length)

          if (responseData.length ==0) {
            this.isReservationsEmty = true;

           
          }
        }
      );
  }

  update2() {
    
    var time = 60000 //1 minute
      this.mySubscription2 = interval(time).subscribe((x => {
        this.getUserReservations()
      })

      );
    }
  

  update() {
    
            var time = 500
      this.mySubscription = interval(time).subscribe((x => {
        this.doStuff();
      })
     
      );
    }


  doStuff() {
    var isLoggedIn = false;
    isLoggedIn = this.checkIfUserIsLoggedIn();
    this.isLoggedIn = isLoggedIn;

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

  ngOnInit() {
  }

  logOut() {
    this.logOut2()
    this._router.navigate(['/']);
  }
  
logOut2() {
  DataModel.account = null;
  localStorage.clear();
}

}
