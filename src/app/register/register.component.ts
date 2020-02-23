import { Component, OnInit } from '@angular/core';
import { register } from '../services/user';
import { Router } from '@angular/router';
import { responseR } from '../models/ResponseRequest';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})




/**
*
* @author Anthony Scheeres
*
*/
export class RegisterComponent implements OnInit {

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

      }
    });


  }
}
