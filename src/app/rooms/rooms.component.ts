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
import { ConstructAddRoomUrl, ConstuctUpdateAmountOfBeds, ConstructGetAvailableReservationUrl, constructDeleteRoom, addRoom2 } from '../services/rooms';
import { sleepForASetAmountOfTimeInMiliSeconds } from '../services/general';
import { RoomModel } from '../models/RoomsModel';
@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  reservationDataFromServer: RoomModel[] = []
  selected: any = null;
  showInputFields = false
  ms = 2 * 1000 // 2 * 1000ms = 2 seconden

  constructor(private http: HttpClient, private _router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
    
    this.showAvailableDates()

      this.doStuff()

  }




  showAvailableDates() {
    this.http.get<RoomModel[]>(
      ConstructGetAvailableReservationUrl())
      .subscribe(
        responseData => {
          this.reservationDataFromServer = responseData;

        }
      );
  }

 sleep(ms) {
   return sleepForASetAmountOfTimeInMiliSeconds(ms);
}



  click(value) {
/*    const modalRef = this.modalService.open(PopUpComponent, { windowClass: "myCustomModalClass" });
    modalRef.componentInstance.product = value;
    */

    this._router.navigate(['/detail'], { queryParams: { id: value.id } });



  }

  click2(value) {
        const modalRef = this.modalService.open(PopUpComponent, { windowClass: "myCustomModalClass" });
        modalRef.componentInstance.product = value;
        



  }

  addRoom() {
    this.addRoom2();

    this.sleep(this.ms)
    this.showAvailableDates()

 
  }

  addRoom2() {
    return addRoom2()
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


    var amountOfBeds= target.querySelector('#amount').value

    this.updateBeds(amountOfBeds, value.id)

    this.sleep(this.ms)
    this.showAvailableDates()


  }

  updateBeds(amountOfBeds:string, id:number) {

    var data = JSON.stringify({ "amountOfBeds": parseFloat(amountOfBeds), "id": id})

    var url = ConstuctUpdateAmountOfBeds()

    fetchJsonPost(url, data, ProtocolR.PUT);

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
     this.modalService.open(AddPendingReservationComponent, { windowClass: "myCustomModalClass" });
    
  }

}

