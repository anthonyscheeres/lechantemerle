import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { login } from '../services/user';
import { responseR } from '../models/ResponseRequest';
import { Router } from '@angular/router';
import { DataModel } from '../models/DataModel';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginFormComponent implements OnInit {
 


  constructor(private _router: Router) { }

  this1 = "";
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
   


    await login(username, password).then(response => {

      if (response != responseR.fail) {
        DataModel.account.token = response
        localStorage.setItem("token", response)
      
        this._router.navigate(['/']);
      }
      else this.this1 = "Oops think you entered invalid credentials, maybe you haven't verified your email yet?!"

    })
    ;







  };
}
