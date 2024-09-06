import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { environment } from 'src/environments/environment.prod';



@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  
  constructor(private http: HttpClient, private route: Router, private loadingCtrl: LoadingController) {

  }

  
  ngOnInit() {
    
  }
  
  create = new FormGroup({
    title: new FormControl(""),
    activity: new FormControl("")
  })

  
  id: any = localStorage['id']
  name: any = localStorage['name']
  token: any = localStorage['token']

  data: any

  onSubmit(datas: any) {


    this.data = this.http.post(`${environment.api}v1/`, {
      name: datas.title,
      activity: datas.activity,
      user_id: this.id,
      user_name: this.name
    }, {
      "headers": {
        'Authorization': `Bearer ${this.token}`
      },
    }).subscribe((result: any) => {
      if (result.status == 200) {
        this.showLoading();
        this.route.navigate(['/']);
      }
    })
  }


  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Memuat halaman..',
      duration: 1500
    });

    loading.present();
  }



}
