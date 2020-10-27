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
    responsive: true,
    maintainAspectRatio: false
  };
  
  public doughnutChartLabels: string[] = [];
  public barChartLabels: string[] = [];
  public doughnutChartData: number[] = [];
  public barChartOptions = {
    scaleShowVerticalLines: false,
    maintainAspectRatio: false,
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
            }
          })
          this.initializeChart('confirmed');
          this.loaded = true;
        }
      }
    )
  }

  initializeChart(caseType: String) {
    this.globalData.forEach(countryData => {
      if(caseType == 'confirmed')
        this.doughnutChartData.push(countryData.confirmed);      
      if (caseType == 'active') 
        this.doughnutChartData.push(countryData.active);
      if (caseType == 'recovered')
        this.doughnutChartData.push(countryData.recovered);
      if (caseType == 'deaths')
        this.doughnutChartData.push(countryData.deaths);

      this.doughnutChartLabels.push(countryData.country);

      if (countryData.confirmed > 10000) {
        if(caseType == 'confirmed') {
          this.barChartData[0].data.push(countryData.confirmed);
          this.barChartData[0].label = 'Confirmed cases: ';
        }
        if (caseType == 'active'){
          this.barChartData[0].data.push(countryData.active);
          this.barChartData[0].label = 'Active cases: ';
        }
        if (caseType == 'recovered') {
          this.barChartData[0].data.push(countryData.recovered);
          this.barChartData[0].label = 'Recovered cases: ';
        }
        if (caseType == 'deaths'){
          this.barChartData[0].data.push(countryData.deaths);
          this.barChartData[0].label = 'Deaths: ';
        }
        this.barChartLabels.push(countryData.country);
      }
    })
  }

  updateChartType(input: HTMLInputElement) {
    this.doughnutChartData = [];
    this.barChartData[0].data = [];
    this.barChartData[0].label = '';

    this.initializeChart(input.value);
  }

}
