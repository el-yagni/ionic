
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';



@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})

export class Tab2Page {
  public getTodolist: any

  
  
  
  
  
  constructor(private http: HttpClient, private actionDel: ActionSheetController, private route: Router, private loadingCtrl: LoadingController) {
    this.getData()
  }
  
  
  
  id: any = localStorage['id']
  token: any = localStorage['token']

  data: any = this.http.get(`${environment.api}v1`, {
    'headers': {
      'Authorization': `Bearer ${this.token}`
    },

  })
  getData() {
    this.showLoading()
    this.data.subscribe((result: { data: any; }) => {
      this.getTodolist = result.data
    })

  }

  

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Memuat halaman..',
      duration: 1500
    });

    loading.present();
  }



  deleteData(datas: any) {
    this.http.delete(`${environment.api}v1/${datas}`, {
      'headers': {
        'Authorization': `Bearer ${this.token}`
      },
    }).subscribe((res) => res)
  }



  handleRefresh(event: any) {
    setTimeout(() => {
      this.getData();
      event.target?.complete();
    }, 900)
  }



  search(event: any) {

  }

  onclick() {
    this.route.navigate(['tab2/create'])
  }


  async ActionDel(datas: any) {
    const actionSheet = await this.actionDel.create({
      header: 'Actions',
      buttons: [
        
        {
       

            text: 'Delete',
            role: 'destructive',
            handler: () => {
              this.deleteData(datas)
              this.handleRefresh(datas)
            }
          
        },
        {
          text: 'Update',
          handler: () => {
            this.route.navigate([`./update/${datas}`])
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();
  }




}


