import { Component, Input, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.css']
})
export class DashboardCardComponent implements OnInit, OnChanges {

  @Input('totalConfirmed')
  totalConfirmed;
  @Input('totalDeaths')
  totalDeaths;
  @Input('totalActive')
  totalActive;
  @Input('totalRecovered')
  totalRecovered;

  constructor() { }

  ngOnInit() {
    
  }

  ngOnChanges() {
    this.totalActive = this.convertNumber(this.totalActive);
    this.totalConfirmed = this.convertNumber(this.totalConfirmed);
    this.totalDeaths = this.convertNumber(this.totalDeaths);
    this.totalRecovered = this.convertNumber(this.totalRecovered);    
  }

  convertNumber(x) {
    if (isNaN(x)) return x;

    if (x < 9999) {
      return x;
    }

    if (x < 1000000) {
      return Math.round(x / 1000) + "K";
    }
    if (x < 10000000) {
      return (x / 1000000).toFixed(2) + "M";
    }

    if (x < 1000000000) {
      return (x / 1000000).toFixed(2) + "M";
    }

    if (x < 1000000000000) {
      return Math.round((x / 1000000000)) + "B";
    }

    return "1T+";
  }

}
