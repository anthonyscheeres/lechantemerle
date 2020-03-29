import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReservationModel } from '../models/ReservationModel';
import { ServerModel } from '../models/ServerModel';
import { DataModel } from '../models/DataModel';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { fetchJsonPost } from '../services/http';
import { ProtocolR } from '../models/Protocol';
import { AddPendingReservationComponent } from '../add-pending-reservation/add-pending-reservation.component';
@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  reservationDataFromServer
  selected: any = null;
  showInputFields


  constructor(private http: HttpClient, private _router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.doStuff()
    this.showAvailableDates()
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


  fileChange(event, product: ReservationModel) {
    var target = event.target
    let fileList: FileList = target.files;
    console.log(fileList)
    if (fileList.length > 0) {
      let file: File = fileList[0];
      this.getBase64(file, product)

      this.showAvailableDates()
    }

  }




  doStuff() {
    this.showInputFields = this.checkIfSuperUser();
  }

  checkIfSuperUser() {
    var obj = JSON.parse(DataModel.account);
    //  console.log(obj[0].is_super_user);
    var isSuper = obj[0].is_super_user;


    return isSuper == true;
  }


  getBase64(file, product) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      RoomsComponent.changeImg(reader.result, product.id);
    };
    reader.onerror = function (error) {
      // console.log('Error: ', error);
    };
  }

  open(value) {
    this.deleteReservationById(value);

    this.showAvailableDates()
  }
  deleteReservationById(value) {

  }
  openSubmit(value, event) {
    event.preventDefault()

    var target = event.target


    var house = target.querySelector('roomno').value
   
    var data = JSON.stringify({ "amountOfBeds": house, "id": value.name })
    var host = ServerModel.host;
    var port = ServerModel.port;
    var token = JSON.parse(DataModel.account)[0].token.toString();
    var url = "http://" + host + ":" + port + "/api/Room/updatAmountOfBedsRoom?token="+token;



  }

  static changeImg(img, id) {
    var host = ServerModel.host;
    var port = ServerModel.port;
    var token = JSON.parse(DataModel.account)[0].token.toString();
    var url = "http://" + host + ":" + port + "/api/Room/updateImgRoom?token=" + token;
 

    var json = JSON.stringify({
      "id": id,
      "img": img
    });

   




    return fetchJsonPost(url, json, ProtocolR.POST);
  }
  clickPopUp() {
    const modalRef = this.modalService.open(AddPendingReservationComponent, { windowClass: "myCustomModalClass" });
    
  }

}

