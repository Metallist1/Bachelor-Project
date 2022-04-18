import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngxs/store";
import {Login, Register} from "../shared/states/statistics/statistics.action";

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss']
})
export class LoginViewComponent implements OnInit {

  loading = false;
  // @ts-ignore
  errorMsg: string;
  // @ts-ignore
  emailDetails: FormGroup;
  showPwd = false;
  submitted = false;

  error = false;

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) {
  }

  ngOnInit(): any {
    this.emailDetails = this.fb.group({
      email : ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(100)])],
      password : ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(20)])],
    });
  }

  get f(): any { return this.emailDetails.controls; }

  isDisabled = false;
  backendError = false;

  isChecked = false;

  async login(){
    this.isDisabled = false;
    this.error = false;
    await this.sleep(500);
    if (this.emailDetails.invalid) {
      this.error = true;
      return;
    }

    console.log(this.emailDetails.value.email, this.emailDetails.value.password)
    if(this.isChecked){
      this.store.dispatch( new Register(this.emailDetails.value.email, this.emailDetails.value.password));
    }else{
      this.store.dispatch( new Login(this.emailDetails.value.email, this.emailDetails.value.password));
    }
   /* this.emailService.newEmail({
      email:this.emailDetails.value.email,
      title: this.emailDetails.value.title,
      contents: this.emailDetails.value.contents
    }).subscribe(
      response => {
        console.log(response);
        this.isDisabled = false;
        this.submitted = true;
      },
      error => {
        console.log(error);
        this.isDisabled = false;
        this.backendError = true;
      });*/
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
