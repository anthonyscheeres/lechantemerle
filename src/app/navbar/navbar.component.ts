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

  isLoggedIn: boolean = false;
  reservationDataFromServer



  constructor(private http: HttpClient, private _router: Router) {
    this.update();

    
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
