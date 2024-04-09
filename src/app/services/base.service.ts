import { Injectable } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { toJSDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  dataRef:AngularFireList<any>;
  orderRef:AngularFireList<any>;
  finishRef:AngularFireList<any>;

  constructor(private db : AngularFireDatabase) { 
    this.dataRef = this.db.list('db')
    this.orderRef = this.db.list('order')
    this.finishRef = this.db.list('finish')

  }

  getData(){
    return this.dataRef;
  }

  addData(body:any){
    return this.dataRef.push(body);
  }

  deleteData(key:any){
    return this.dataRef.remove(key)
  }

  updateData(key:any, newData:any){
    return this.dataRef.update(key, newData)
  }

  addToOrder(body:any){
    return this.orderRef.push(body)
  }

  getOrders(){
    return this.orderRef
  }

  deleteOrder(key:any){
    return this.orderRef.remove(key)
  }

  finish(body:any){
    return this.finishRef.push(body)
  }
}
