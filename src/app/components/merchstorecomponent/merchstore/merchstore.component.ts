import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-merchstore',
  templateUrl: './merchstore.component.html',
  styleUrls: ['./merchstore.component.css']
})
export class MerchstoreComponent implements OnInit {
  
  constructor() { }

  ngOnInit() {
  }
  onclick(){
    console.log("hello");
  }
}
