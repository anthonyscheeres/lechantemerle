import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReservationModel } from '../models/ReservationModel';
import { ServerModel } from '../models/ServerModel';
import { DataModel } from '../models/DataModel';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopUpComponent } from '../pop-up/pop-up.component';
@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  reservationDataFromServer
  constructor(private http: HttpClient, private _router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
  }


  showAvailableDates() {
    this.http.get<ReservationModel[]>(
      this.ConstructGetAvailableReservationUrl())
      .subscribe(
        responseData => {
          this.reservationDataFromServer = responseData;

        }
      );
  }

  click(value) {
    const modalRef = this.modalService.open(PopUpComponent, { windowClass: "myCustomModalClass" });
    modalRef.componentInstance.product = value;
  }


  ConstructGetAvailableReservationUrl() {
    var host = ServerModel.host;
    var port = ServerModel.port;
    //var token = JSON.parse(DataModel.account)[0].token.toString();
    var url = "http://" + host + ":" + port + "/api/Reservation/getPendingReservation";
    return url;
  }


}
