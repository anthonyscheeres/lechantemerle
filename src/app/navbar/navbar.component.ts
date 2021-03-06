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
  showInputFields = false
  isLoggedIn = false;
  reservationDataFromServer



  constructor(private http: HttpClient, private _router: Router) {
    this.update();


  }






  update() {

            const time = 500
      this.mySubscription = interval(time).subscribe((x => {
        this.doStuff();
      })

      );
    }


  doStuff() {
    let isLoggedIn = false;
    isLoggedIn = this.checkIfUserIsLoggedIn();
    this.isLoggedIn = isLoggedIn;
    try {
      this.showInputFields = this.checkIfSuperUser();
    }
    catch (Error) { this.showInputFields =false }

  }

  checkIfSuperUser() {
    const obj = JSON.parse(DataModel.account);
    //  console.log(obj[0].is_super_user);
    const isSuper = obj[0].is_super_user;


    return isSuper == true;
  }


  checkIfUserIsLoggedIn() {
    let loggedIn = false;

    try {
      const obj = JSON.parse(DataModel.account)[0];


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
