import { Component, OnInit } from '@angular/core';
import { DataModel } from '../models/DataModel';
import { constructGetDesribtion, ConstructUrlUpdatDescription } from '../services/rooms';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { RoomModel } from '../models/RoomsModel';
import { ProtocolR } from '../models/Protocol';
import { fetchJsonPost } from '../services/http';

@Component({
  selector: 'app-detail-page-rooms',
  templateUrl: './detail-page-rooms.component.html',
  styleUrls: ['./detail-page-rooms.component.css']
})
export class DetailPageRoomsComponent implements OnInit {
  showInputFields = false
  InfoDataFromServer: RoomModel[] =[]
  id:number= 0


  doStuff() {
    this.showInputFields = this.checkIfSuperUser();
  }

  click(value) {
    // console.log(value)
    const modalRef = this.modalService.open(PopUpComponent, { windowClass: "myCustomModalClass" });
    modalRef.componentInstance.product = value;

  }

  checkIfSuperUser() {
    var isSuper= false
    try {
      var obj = JSON.parse(DataModel.account);
      //  console.log(obj[0].is_super_user);
      isSuper = obj[0].is_super_user;
    }
    catch (Error) {

    }

  return isSuper;
}

  constructor(private http: HttpClient, private _router: Router, private modalService: NgbModal, private activatedRoute: ActivatedRoute) { }


  ngOnInit(): void {
    this.doStuff()

    var id: number =0

    var subscription = this.activatedRoute.queryParams.subscribe(params => {
      id = params['id'];
 
    });
    this.id = id;
    this.showInfo(id);




  }



  async submitNewDetails(event) {
    event.preventDefault()

    var target = event.target

    var description = target.querySelector('#description').value

    var url = ConstructUrlUpdatDescription();

    var floatId = parseFloat(this.id.toString())


    var data = JSON.stringify({ "id": floatId , "description": description })




    fetchJsonPost(url, data.toString(), ProtocolR.PUT);

    this.sleep(3000)


    this.showInfoUsingId()


  }


  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


  showInfoUsingId() {
    this.showInfo(this.id)
  }


  showInfo(id) {


    var url = constructGetDesribtion(id)

    this.http.get<RoomModel[]>(
      url)
      .subscribe(
        responseData => {
          this.InfoDataFromServer = responseData;
     
        }
      );
  }


}
