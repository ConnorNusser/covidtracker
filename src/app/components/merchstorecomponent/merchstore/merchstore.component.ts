import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-merchstore',
  templateUrl: './merchstore.component.html',
  styleUrls: ['./merchstore.component.css']
})
export class MerchstoreComponent implements OnInit {
  merchItems: string[] = [];
  constructor() { }

  ngOnInit() {
  }
  onclick(box: string){
    this.merchItems.push(box);
    console.log(box);
    console.log("hello");
  }
}
