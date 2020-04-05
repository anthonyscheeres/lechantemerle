import { Component } from '@angular/core';
import { DataModel } from './models/DataModel';
import { HttpClient } from '@angular/common/http';
import { ReservationModel } from './models/ReservationModel';
import { ConstructGetAvailableReservationUrl } from './services/rooms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Le-Chantemerle';

  constructor(private http: HttpClient) {
    this.showAvailableDates()
  }



  showAvailableDates() {
    this.http.get<ReservationModel[]>(
      ConstructGetAvailableReservationUrl())
      .subscribe(
        responseData => {
          DataModel.rooms.RoomReservationData = responseData;

        }
      );
  }

}
