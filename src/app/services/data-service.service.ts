import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { GlobalDataSummary } from '../models/global-data';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private covidDataUrl = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/10-16-2020.csv';
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
            temp.active = countryData.active + temp.active;

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
}
