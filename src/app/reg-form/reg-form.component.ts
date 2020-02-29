import { Component, OnInit } from '@angular/core';
import { register } from '../services/user';
import { responseR } from '../models/ResponseRequest';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reg-form',
  templateUrl: './reg-form.component.html',
  styleUrls: ['./reg-form.component.css']
})
export class RegFormComponent implements OnInit {
this1:string = ""
  constructor(private _router: Router) { }
  ngOnInit() {
  }



  async registerUser(event) {
    event.preventDefault()
    const target = event.target

    const username = target.querySelector('#username').value
    const password = target.querySelector('#password').value
    const email = target.querySelector('#email').value
    await register(username, password, email).then(response => {

      if (response != responseR.fail) {
        this._router.navigate(['/login']);

      } else this.this1 = "Oops heb je een juist email adress gegeven, anders probeer een andere gebruikersnaam"
    });


  }

}
