import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../Services/Users/users.service';
import ValidateForm from '../helpers/validateform';
import { user } from '../Models/Users';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public signUpForm!: FormGroup;
  constructor(private fb : FormBuilder, private _usersService: UsersService, private router: Router) { }

  ngOnInit():void {
    this.signUpForm = this.fb.group({
      firstName:['', Validators.required],
      lastName:['', Validators.required],
      userName:['', Validators.required],
      email:['', Validators.required],
      password:['', Validators.required],
      role:[''],
      token:[''],
    });
  }

  
  type: string = 'password';
  isText: boolean = false;
  eyeIcon:string = "fa-eye-slash"

  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = 'fa-eye' : this.eyeIcon = 'fa-eye-slash'
    this.isText ? this.type = 'text' : this.type = 'password'
  }
  

  onSingup(){
    if (this.signUpForm.valid){
      //perform logic for signup
      console.log(this.signUpForm.value);
      //send to database
      this._usersService.signUp(this.signUpForm.value)
      .subscribe({
        next:(res)=>{
          alert(res.message);
          this.signUpForm.reset();
          this.router.navigate(['login']);
        },
        error:(err)=>{
          alert(err?.error.message)
        }
      })
      
    }else{
      ValidateForm.validateAllFormFields(this.signUpForm);
      //logic for throwing error
      alert("your form is invalid")

    }
  }



  








}
