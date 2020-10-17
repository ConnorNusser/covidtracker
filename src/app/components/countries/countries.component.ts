import { Component, OnInit } from '@angular/core';
import { GlobalDataSummary } from 'src/app/models/global-data';
import { DataServiceService } from 'src/app/services/data-service.service';

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

  constructor(private dataService: DataServiceService) { }

  ngOnInit() : void {
    this.dataService.getGlobalData().subscribe((result)=>{
      this.data = result;

      this.data.forEach(covidData=>{
        this.countries.push(covidData.country);
      })
    })
  }

  updateValue(country: string) {
    // console.log(country);

    this.data.forEach(covidData => {
      if(covidData.country == country) {
        this.totalActive = covidData.active;
        this.totalConfirmed = covidData.confirmed;
        this.totalDeaths = covidData.deaths;
        this.totalRecovered = covidData.recovered;
      }
    })
  }

}
