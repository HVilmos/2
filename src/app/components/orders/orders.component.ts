import { Component } from '@angular/core';
import { map } from 'rxjs';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {

  orders:any;
  name:any;
  place:any;


  constructor(private base:BaseService){
    this.base.getOrders().snapshotChanges().pipe(
      map(changes => changes.map(
        c => ({key: c.payload.key, ...c.payload.val()})
      ))
    ).subscribe(adatok => this.orders = adatok)
  }


  delete(data:any){
    this.base.deleteOrder(data.key)
  }

  order(){
    const orderr = {
      fullName: this.name,
      orderPlace: this.place,
      orderList: this.orders
    }

    this.base.finish(orderr)

    this.orders.forEach((orderItem:any) => {
      this.base.deleteOrder(orderItem.key)
    })


    this.name = '';
    this.place = '';
    alert("Sikeres")
  }


}
