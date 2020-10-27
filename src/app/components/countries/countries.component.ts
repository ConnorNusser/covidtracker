import { Component, OnInit } from '@angular/core';
import { GlobalDataSummary } from 'src/app/models/global-data';
import { DataServiceService } from 'src/app/services/data-service.service';
import { DateWiseDataModel } from 'src/app/models/date-wise-data-model';
import { ChartDataSets, ChartOptions } from "chart.js";

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  data: GlobalDataSummary[];
  countries: string[]= [];
  totalConfirmed = 0;
  totalDeaths = 0;
  totalActive = 0;
  totalRecovered = 0;

  selectedCountryData : DateWiseDataModel[];
  dateWiseData;
  loaded = false;

  public lineChartData: ChartDataSets[] = [
    {data: [], label: 'Cases '}
  ];
  public lineChartLabels = [];

  public lineChartOptions: ChartOptions & { annotation: any } = {
    responsive: true
  };
  public lineChartLegend = true;
  public lineChartType = "line";

  constructor(private dataService: DataServiceService) { }

  ngOnInit() : void {
    this.dataService.getDateWiseData().subscribe((result)=>{
      this.dateWiseData = result;
      this.updateChart();
    });

    this.dataService.getGlobalData().subscribe((result)=>{
      this.data = result;

      this.data.forEach(covidData=>{
        this.countries.push(covidData.country);
      })
    })
  }

  updateChart() {
    this.lineChartData[0].data = [];
    this.lineChartLabels = [];

    this.selectedCountryData.forEach(countryData => {
      if (countryData.cases>10000){
        this.lineChartData[0].data.push(countryData.cases);
        this.lineChartLabels.push(countryData.date.getMonth().toLocaleString() + "/" + countryData.date.getFullYear().toPrecision());
      }
    })    
  }

  updateValue(country: string) {
    this.data.forEach(covidData => {
      if(covidData.country == country) {
        this.totalActive = covidData.active;
        this.totalConfirmed = covidData.confirmed;
        this.totalDeaths = covidData.deaths;
        this.totalRecovered = covidData.recovered;
      }
    })

    this.selectedCountryData = this.dateWiseData[country];
    this.updateChart();
    this.loaded = true;
  }

}
