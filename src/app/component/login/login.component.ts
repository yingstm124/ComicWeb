import { Component, OnInit } from '@angular/core';
import { Router, Route } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from '../.././service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginform: FormGroup;
  email: string;
  password: string;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private afAuth: AngularFireAuth,
    private route: Router,
  ) {}

  ngOnInit() {
    this.loginform = this.formBuilder.group({
      Email: [this.email, [Validators.required, Validators.email]],
      Password: [this.password, [Validators.required, Validators.minLength(6)]],
    });
  }

  Login() {
    if (confirm('Login!!')) {
      this.afAuth.auth
        .signInWithEmailAndPassword(this.loginform.value.Email, this.loginform.value.Password)

        .catch(function (error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          window.alert(errorMessage);
        });
      this.route.navigate(['']);
    }
  }
}
