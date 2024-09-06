import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {

  studentId !: any
  getTodolist !: any

  token: any = localStorage['token'];


  title: any
  id: any = localStorage['id'];
  activity: any


  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.studentId = this.route.snapshot.paramMap.get('id');
    this.getData();
  }


  updates = new FormGroup({
    title: new FormControl(""),
    activity: new FormControl("")
  })


  getData() {
    this.http.get(`${environment.api}v1/${this.studentId}`, {
      'headers': {
        'Authorization': `Bearer ${this.token}`
      },
    }).subscribe((result: any) => {
      this.getTodolist = result.data
      console.log(result.data)
    })

  }

  data: any

  update() {

    console.log(this.title)
    console.log(this.activity)

    this.data = this.http.put(`${environment.api}v1/${this.studentId}`,
      {
        name: this.title,
        activity: this.activity,
        user_id: this.id
      },
      {
        'headers': {
          'Authorization': `Bearer ${this.token}`
        },
      }).subscribe((result: any) => {
        console.log(result)
        if (result.status == 200) {
          document.location.href = 'tab2'
        }
      })
  }

}


