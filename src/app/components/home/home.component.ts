  import { Component } from '@angular/core';
  import { map } from 'rxjs';
  import { BaseService } from 'src/app/services/base.service';

  export interface Data{
    title?:string,
    price?:number,
    key?:any,
    db?:any,
  }

  @Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
  })
  export class HomeComponent {

    datas:Data[] = []
    formData= { title:'', price:''};

    constructor(private base:BaseService){
      this.base.getData().snapshotChanges().pipe(
        map(changes => changes.map(
          c => ({key: c.payload.key, ...c.payload.val()})
        ))
      ).subscribe(adatok => this.datas = adatok)
    }

    delete(data:any){
      this.base.deleteData(data.key)
    }

    update(data:any){
      const newData = {title: data.title, price: data.price};
      this.base.updateData(data.key, newData)
    }

    add(){
      this.base.addData(this.formData)
      this.formData = { title:'', price:''}
    }

    addToOrder(data: Data){
      const order = {
        title: data.title,
        price: data.price,
        db: data.db,
      }
      this.base.addToOrder(order)
      
    }

  }
