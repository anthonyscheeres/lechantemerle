import { Component } from '@angular/core';
import { DataModel } from './models/DataModel';
import { HttpClient } from '@angular/common/http';
import { ReservationModel } from './models/ReservationModel';
import { ConstructGetAvailableReservationUrl } from './services/rooms';
import { RoomModel } from './models/RoomsModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Le-Chantemerle';

  constructor(private http: HttpClient) {
  
  }



}
