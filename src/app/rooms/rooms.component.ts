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
import { ConstructAddRoomUrl, ConstuctUpdateAmountOfBeds, ConstructGetAvailableReservationUrl, constructDeleteRoom } from '../services/rooms';
@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  reservationDataFromServer = DataModel.rooms.RoomReservationData
  selected: any = null;
  showInputFields = false
  ms = 2 * 1000 // 2 * 1000ms = 2 seconden

  constructor(private http: HttpClient, private _router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {

    this.showAvailableDates()

      this.doStuff()

  }




  showAvailableDates() {
    this.http.get<ReservationModel[]>(
      ConstructGetAvailableReservationUrl())
      .subscribe(
        responseData => {
          this.reservationDataFromServer = responseData;

        }
      );
  }

 sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}



  click(value) {
   // console.log(value)
    const modalRef = this.modalService.open(PopUpComponent, { windowClass: "myCustomModalClass" });
    modalRef.componentInstance.product = value;
    
  }



  addRoom() {
    this.addRoom2();

    this.sleep(this.ms)
    this.showAvailableDates()

 
  }

  addRoom2() {
    var data = JSON.stringify({ "amountOfBeds": 0 })

    var url = ConstructAddRoomUrl()


    return fetchJsonPost(url, data, ProtocolR.POST);
  }

  fileChange(event, product: ReservationModel) {
    this.fileChange2(event, product);

    this.sleep(this.ms)
    this.showAvailableDates()

  }



  fileChange2(event, product: ReservationModel) {
    var target = event.target
    let fileList: FileList = target.files;
    console.log(fileList)
    if (fileList.length > 0) {
      let file: File = fileList[0];
      this.getBase64(file, product)
      this.sleep(this.ms)
      this.showAvailableDates()
    }

  }




  doStuff() {
    try {
      this.showInputFields = this.checkIfSuperUser();
    }
    catch (Error) { this.showInputFields = false}
   
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
    this.deleteRoom(value);
    this.sleep(this.ms)
    this.showAvailableDates()
  }

  deleteRoom(value) {
    var data = JSON.stringify({  "id": value.id })

    var url = constructDeleteRoom()

    return fetchJsonPost(url, data, ProtocolR.DELETE);
  }




  openSubmit(value, event) {
    event.preventDefault()

    var target = event.target


    var house = target.querySelector('roomno').value
    var data = JSON.stringify({ "amountOfBeds": house, "id": value.id })

    var url = ConstuctUpdateAmountOfBeds() 

    fetchJsonPost(url, data, ProtocolR.PUT);

    this.sleep(this.ms)
    this.showAvailableDates()


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

