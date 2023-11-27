import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from '../helpers/validateform';
import { UsersService } from '../Services/Users/users.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';

  
  constructor( private fb: FormBuilder, private _usersService: UsersService, private router: Router){}
  
  
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }

  onLogin(){
    if (this.loginForm.valid){
      console.log(this.loginForm.value);
      //send the obj to database
      this._usersService.signIn(this.loginForm.value)
      .subscribe({
        next:(res)=>{
          alert(res.message);
          //this.toast.success({detail:"SUCCESS", summary:res.message, duration: 5000}); // not use

          this.loginForm.reset();  
          this._usersService.storeToken(res.token);  
          const tokenPayload = this._usersService.decodedToken();        
          this._usersService.setFullNameForStore(tokenPayload.name);
          this._usersService.setRoleForStore(tokenPayload.role);
          this.router.navigate(['personalArea']);
        },
        error:(err)=>{
          alert(err?.error.message)
        //  this.toast.error({detail:"ERROR", summary:"Someting when wrong", duration: 5000}); // not use
        }
      })


    }else{
      ValidateForm.validateAllFormFields(this.loginForm);
      alert("your form is invalid")

    }
  }

  public resetPasswordEmail!:string;
  public isValidEmail!:boolean;

  checkValidEmail(event: string){
    const value = event;
    const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/;
    this.isValidEmail = pattern.test(value);
    return this.isValidEmail;
  }

  confirmToSend(){
    if(this.checkValidEmail(this.resetPasswordEmail)){
      console.log(this.resetPasswordEmail);
      this.resetPasswordEmail = "";
      const buttonRef = document.getElementById("closeBtn");
      buttonRef?.click();
    }
  }

}
