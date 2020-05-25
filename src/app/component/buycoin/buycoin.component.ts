import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../.././service/user.service';
import { BuycoinService } from '../.././service/buycoin.service';
import { Coin } from '../.././model/coin';
import { History } from '../.././model/history';
import { promotion } from '../.././model/promotion';


@Component({
  selector: 'app-buycoin',
  templateUrl: './buycoin.component.html',
  styleUrls: ['./buycoin.component.css']
})
export class BuycoinComponent implements OnInit {

//@Input() coin: Coin;

  username:string;
  uid:string;
  //myCoins;
  coins:number;
  price:number;

  total_coins;
  his;

  his_coin;
  his_date;


  buycoins_lst = [
    {
      coin : 169,
      price: 59,
    },
    {
      coin : 340,
      price: 119,
    },
    {
      coin : 429,
      price: 249,
    },
  ];

  historys;

  constructor(
    private userService: UserService,
    private buyCoinService: BuycoinService,
  ) {

    this.username = this.userService.getCurrentUserName();
    this.uid = this.userService.getCurrentUserId();
    //console.log(this.uid);

  }

  ngOnInit() {

    this.buyCoinService.getHistory(this.uid).subscribe(val => {
      this.historys = val.map(
        e => {
          this.total_coins = e.payload.doc.data()['total_coin'];
          this.his = e.payload.doc.data()['his'];
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data()
          } as History
        }
      )
    });
  
  }


  buycoin(b_lst, history){
    
    if(confirm(`Do you buy ${b_lst.coin} coin?`)){
      this.buyCoinService.updateCoin(history.id, b_lst.coin);
      this.buyCoinService.updatehistory(history.id , b_lst.coin);
      window.alert("buy coin is success");
    }
  }

}