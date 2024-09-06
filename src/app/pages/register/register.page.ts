import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  message: any = {
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  }
  status: any



  constructor(private http: HttpClient, private router: Router) { }
  alertButtons = ['Okay']

  isAlertOpen = false

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

  register = new FormGroup({
    name: new FormControl(""),
    email: new FormControl(""),
    password: new FormControl(""),
    confirm_password: new FormControl(""),
  })

  data: any

  registerUser(datas: any) {
    this.data = this.http.post(`${environment.api}register`, {
      name: datas.name,
      email: datas.email,
      password: datas.password,
      confirm_password: datas.confirm_password
    }
    ).subscribe((res: any) => {

      this.setOpen(true)



      if (res.success == true) {
        this.status = "Berhasil Register"
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 15)
      }

      if (res.success == false) {
        this.status = "GAGAL!"
        
        
        
        
        if (res.data?.name !== undefined) {
          let name: any
          name = res.data?.name[0]
          this.message.name = name
        } else if (res.data?.email !== undefined) {
          let email: any
          email = res.data?.email[0]
          this.message.email = email
        } else if (res.data?.password !== undefined) {
          let password: any
          password = res.data?.password[0]
          this.message.password = password
        } else if (res.data?.confirm_password !== undefined) {
          let confirm_password: any
          confirm_password = res.data?.confirm_password[0]
          this.message.confirm_password = confirm_password
        }
      }



    })
  }

  loginUser() {
    this.router.navigate(['/login']);
  }

  ngOnInit() {
  }





}
