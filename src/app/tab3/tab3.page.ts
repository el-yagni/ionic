import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  id: any = localStorage['id'];
  token: any = localStorage['token'];
  datas: any

  constructor(private router: Router, private http: HttpClient, private auth: AuthService) {
    this.getUser()
  }
  
  data: any
  getUser() {
    this.data = this.http.get(`${environment.api}user/${this.id}`,
      {
        "headers": {
          "Authorization": `Bearer ${this.token}`
        }
      }).subscribe((res: any) => {
        this.datas = res.data
      })
  }


  handleRefresh(event: any) {
    setTimeout(() => {
      this.getUser();
      document.location.reload()
      event.target?.complete();
    }, 900)
  }


  logOut() {  
    this.http.post(`${environment.api}user/logout`, {
      "Token": `${this.token}`
    }, {
      headers : {
        "Authorization": `Bearer ${this.token}`
      }
    }).subscribe((res: any) => {
      if(res.status == true) {
        this.auth.logout(res.token, res.id, res.name);
      }
    })
  }
}
