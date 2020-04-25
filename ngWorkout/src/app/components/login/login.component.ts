import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

loginTest(){
  console.log('login')
}

  login(loginForm :NgForm){
    console.log('log in');
    // const user: User = new User();
    //   user.username = loginForm.value.username;
    //   user.password = loginForm.value.password;

    // this.auth.login(user.username, user.password).subscribe(
    //   next => {
    //     console.log('RegisterComponent.register(): user logged in, routing to /todolist.');
    //     this.router.navigateByUrl('/todolist');
    //   },
    //   error => {
    //     this.accessDenied = true;
    //     console.error('RegisterComponent.register(): error logging in.');
    //     this.router.navigateByUrl('/login');
    //   }
    // );
    }

}
