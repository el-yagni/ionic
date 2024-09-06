import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }


  login(id: any, name: any, token: any) :any {

    return new Promise((resolve) => {
      localStorage.setItem("token", token);
      localStorage.setItem("id", id);
      localStorage.setItem("name", name);
      this.router.navigate(['/']);
      resolve(true)
    });
  }


  logout(token: any, id: any, name: any) {
    return new Promise((resolve) => {
      localStorage.removeItem("token")
        localStorage.removeItem("id")
        localStorage.removeItem("name")
        this.router.navigate(['/login']);
        resolve(true)
    })
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token')
  }
}
