import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../service/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { userRoleEnum } from 'src/app/model/userRole.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private userService: UserService,private router: Router,
    private formBuilder:FormBuilder,private snackBar:MatSnackBar) {
   }

  ngOnInit(): void {
    if(localStorage.getItem){
      localStorage.removeItem('token');
      localStorage.removeItem('id');
      localStorage.removeItem('role');
    }
      this.loginForm=this.formBuilder.group({
        username:[null,Validators.required],
        password:[null,Validators.required]
      })
  }

  login() {
    if(this.loginForm.invalid){
      this.snackBar.open("Please fill in the form!", "Close",{
        duration:2000
      });
      return;
    }
    this.userService.login(this.loginForm.value.username,this.loginForm.value.password).subscribe(
      response => {
        if(response==null){
          this.snackBar.open("User not found!","Close",{
            duration:3000
          });
        }
        else{
          this.userService.account=response;
          let token:string=this.loginForm.value.username;
          localStorage.setItem('token', token);
          localStorage.setItem('id',this.userService.account.id.toString());
          localStorage.setItem('role',this.userService.account.user.role);
          if(this.userService.account.user.role==userRoleEnum.Admin){
            this.router.navigate(["admin"]);
          }else {
            this.router.navigate(["client"]);
          }
        }
      },
      error => this.snackBar=error
    );
  }

  register(){
    this.router.navigate(["register"]);
  }

}
