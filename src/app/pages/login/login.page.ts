import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/auth.service';
import { environment } from 'src/environments/environment.prod';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  message: any

  constructor(private auth: AuthService, private router: Router, private http: HttpClient) { }

  ngOnInit() {
  }

  login: any = new FormGroup({
    email: new FormControl(""),
    password: new FormControl("")
  })
  
  data: any
  
  loginUser(datas: any): void {
    this.data = this.http.post(`${environment.api}login`, {
      email: datas.email,
      password: datas.password
    }).subscribe((res: any) => {
      if(res.status == true) {
        this.auth.login(res.id, res.name, res.token)
      } 
      
    })
    
    
  }


  registerUser() {
    this.router.navigate(['/register'])
  }

}
