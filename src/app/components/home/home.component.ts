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
  chartOptions = {
    responsive: true
  };
  
  public doughnutChartLabels: string[] = [];
  public doughnutChartData: number[] = [];
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartType = 'bar';
  public barChartData = [
    {data: [], label: 'Confirmed '}
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
              this.barChartData[0].data.push(countryData.confirmed);
            }
          })
          this.loaded = true;
        }
      }
    )
  }

}
