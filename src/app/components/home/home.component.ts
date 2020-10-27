import { Component, OnInit } from '@angular/core';
import { GlobalDataSummary } from 'src/app/models/global-data';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  totalConfirmed = 0;
  totalDeaths = 0;
  totalActive = 0;
  totalRecovered = 0;
  globalData : GlobalDataSummary[];
  loaded = false;
  
  public doughnutChartLabels: string[] = [];
  public doughnutChartData: number[] = [];
  chartOptions = {
    responsive: true
  };

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];

  constructor(private dataService: DataServiceService) { }

  ngOnInit() {
    this.dataService.getGlobalData().subscribe(
      {
        next: (result) => {
          this.globalData = result;
          result.forEach(countryData => {
            if (!Number.isNaN(countryData.confirmed)) {
              this.totalActive += countryData.active;
              this.totalConfirmed +=  countryData.confirmed;
              this.totalDeaths += countryData.deaths;
              this.totalRecovered += countryData.recovered;

              this.doughnutChartData.push(countryData.confirmed);
              this.doughnutChartLabels.push(countryData.country);
            }
          })
          this.loaded = true;
        }
      }
    )
  }

}
