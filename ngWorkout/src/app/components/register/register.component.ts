import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  register(userForm :NgForm) {
    const user = {
    username: userForm.value.username,
    email: userForm.value.email,
    password: userForm.value.password
    }

    console.log('register')
    this.auth.register(user).subscribe(
      data => {
        console.log('RegisterComponent.register(): user registered.');
        this.auth.login(user.username, user.password).subscribe(
          next => {
            console.log('RegisterComponent.register(): user logged in, routing to /todo.');
            this.router.navigateByUrl('/todolist');
          },
          error => {
            console.error('RegisterComponent.register(): error logging in.');
          }
        );
      },
      err => {
        console.error('RegisterComponent.register(): error registering.');
        console.error(err);
      }
    );
  }
}



