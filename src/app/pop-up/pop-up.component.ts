import { Component, OnInit, Input } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ReservationModel } from '../models/ReservationModel';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit {
  closeResult: string;
  @Input() product: ReservationModel;

  ngOnInit() {
  }

  constructor(private modalService: NgbModal) { }



  
}
