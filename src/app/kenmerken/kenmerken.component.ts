import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-kenmerken',
  templateUrl: './kenmerken.component.html',
  styleUrls: ['./kenmerken.component.css']
})
export class KenmerkenComponent implements OnInit {

  constructor() { }

  ngOnInit() {
   // this.refresh()
  }
  refresh(): void {
    window.location.reload();
  }
}
