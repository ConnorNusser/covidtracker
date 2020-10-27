import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { GlobalDataSummary } from '../models/global-data';
import { DateWiseDataModel } from '../models/date-wise-data-model';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private covidDataUrl = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/10-26-2020.csv';
  private covidDateWiseData = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv';
  constructor(private http: HttpClient) { }

  getGlobalData() {
    return this.http.get(this.covidDataUrl, {responseType: 'text'}).pipe(
      map(result => {
        let data: GlobalDataSummary[] = [];
        let rows = result.split('\n');
        let raw = {};
        //remove 0th index as it contains column names
        rows.splice(0, 1);
        
        rows.forEach(row => {
          let cols = row.split(/,(?=\S)/);

          let countryData = {
            country : cols[3],
            confirmed : +cols[7],
            deaths: +cols[8],
            recovered: +cols[9],
            active: +cols[10]
          };
          let temp : GlobalDataSummary = raw[countryData.country];

          if (temp) {
            temp.active = countryData.active + temp.active;
            temp.confirmed = countryData.confirmed + temp.confirmed;
            temp.deaths = countryData.deaths + temp.deaths;
            temp.recovered = countryData.recovered + temp.recovered;

            raw[countryData.country] = temp;
          }
          else {
            raw[countryData.country] = countryData;
          }
          data.push(
            {
              country : cols[3],
              confirmed : +cols[7],
              deaths: +cols[8],
              recovered: +cols[9],
              active: +cols[10]
            }
          )
        })
        return <GlobalDataSummary[]>Object.values(raw);
      })
    )
  }

  getDateWiseData() {
    return this.http.get(this.covidDateWiseData, {responseType: 'text'})
      .pipe(map(result => {
        let rows = result.split('\n');
        let mainData = {};
        let header = rows[0];
        let dates = header.split(/,(?=\S)/)
        dates.splice(0 , 4);
        rows.splice(0 , 1);
        rows.forEach(row=>{
          let cols = row.split(/,(?=\S)/)
          let con = cols[1];
          cols.splice(0 , 4);
          
          mainData[con] = [];
          cols.forEach((value , index)=>{
            let dw : DateWiseDataModel = {
              cases : +value ,
              country : con , 
              date : new Date(Date.parse(dates[index])) 
            }
            mainData[con].push(dw)
          })
          
        })
        return mainData;
      })
      )
      
  }
}
