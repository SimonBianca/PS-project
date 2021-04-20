import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Account } from '../../model/account';
import { User } from '../../model/user';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  account: Account;
  registerForm: FormGroup;

  constructor(private userService:UserService,private router:Router,
    private formBuilder:FormBuilder,private snackBar:MatSnackBar) { 
    this.account=new Account();
    this.account.user=new User();
    this.account.user.role='CLIENT';

  }

  ngOnInit(): void {
    this.registerForm=this.formBuilder.group({
      username:[null,[Validators.required]],
      password:[null,[Validators.required,Validators.minLength(8)]],
      firstName:[null,Validators.required],
      lastName:[null,Validators.required],
      email:[null,[Validators.required,Validators.email,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      phone:[null,[Validators.required, Validators.pattern("07[0-9]{8}$")]],
      age:[null,[Validators.required,Validators.pattern("[1-9]{1}[0-9]{1}$")]]
    })
  }
  register(){
    if(this.registerForm.invalid){
      this.snackBar.open("Please fill in the form!", "Close",{
        duration:2000
      });
      return;
    }
    this.account.username=this.registerForm.value.username;
    this.account.password=this.registerForm.value.password;
    this.account.user.firstName=this.registerForm.value.firstName;
    this.account.user.lastName=this.registerForm.value.lastName;
    this.account.user.email=this.registerForm.value.email;
    this.account.user.phone=this.registerForm.value.phone;
    this.account.user.age=this.registerForm.value.age;
    this.userService.register(this.account).subscribe(
      response => {
        if(response!=null){
          this.userService.account=response;
          this.router.navigate(["login"]);
        }
        if(response==null){
          this.snackBar.open("This account already exists!", "Close",{
            duration:2000
          });
        }
      },
      error => this.snackBar=error
    );
  }

  get password() {
    return this.registerForm.get("password");
  }
  get email() {
    return this.registerForm.get("email");
  }

  get phone() {
    return this.registerForm.get("phone");
  }

  get age() {
    return this.registerForm.get("age");
  }

}
