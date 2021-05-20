import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoronaService {

  baseUrl = 'https://covid19.mathdro.id/api';

  constructor(private http: HttpClient) {}

  fetchData() {
    return this.http.get(this.baseUrl);
  }

  fetchDataByCountry(country: string) {
    return this.http.get(this.baseUrl + '/countries/' + country)
  }

  fetchDailyData() {
    return this.http.get(this.baseUrl + '/daily');
  }

  fetchCountries() {
    return this.http.get(this.baseUrl + '/countries');
  }

  // getCountries():Observable<any>{
  //   const url = "https://api.covid19api.com/countries"
  //   return this.http.get<any>(url)
  // }

  // getCoronaRealtimeData(country):Observable<any>{
  //   const url = "https://api.covid19api.com/total/dayone/country/"+ country
  //   return this.http.get<any>(url)
  // }

}
