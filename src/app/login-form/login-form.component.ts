import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { login } from '../services/user';
import { responseR } from '../models/ResponseRequest';
import { Router } from '@angular/router';
import { DataModel } from '../models/DataModel';
import { PermissionModel } from '../models/PermissionModel';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginFormComponent implements OnInit {



  constructor(private _router: Router) { }

  this1 = '';
  ngOnInit() {
  }



  /**
  *
  * @author Anthony Scheeres
  *
  */
  async loginUser(event) {

    event.preventDefault()
    const target = event.target

    const username = target.querySelector('#username').value
    const password = target.querySelector('#password').value


    try {
      await login(username, password).then(response => {
        DataModel.account;
        const jsonObject = JSON.parse(response);
        localStorage.setItem('token', jsonObject)

        DataModel.account = jsonObject;

        this._router.navigate(['/']);


      })
        ;
    }
    catch (Error) {
      this.this1 = 'Oops denk dat je de verkeerde gegvens heb ingevuld! Heb je, je email al gevalideert?!'
    }






  };
}
