import { Component } from '@angular/core';
import { CoronaService } from './services/corona.service';
import { GlobalModel } from './model/global.model'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // countries:any
  // country:any
  // confirmed:Number
  // recovered:Number
  // deaths:Number
  global: boolean;
  country: string;
  data: GlobalModel;
  dailyDate: any[];
  countries: any[];
  lineChartData: any[] = [
    {
      data: [65, 64, 33, 44], label: 'Temp label'
    }
  ]
  lineChartType = 'line'
  lineChartLabels: any[] = [
    'Label01', 'Label01', 'Label03'
  ]
  barChartType = 'bar'
  barChartLabel: any[] = [
    'Infected', 'Recovered', 'Deaths'
  ]
  barChartData: any[] = [
    {data: [65, 76, 33], label: 'Lable'}
  ]

  constructor(private corona:CoronaService) {
    this.data = new GlobalModel();
  }

  ngOnInit(): void {
    this.global = true;
    this.fetchData();
    this.fetchCountries()
    this.fetchDailyData()
  }

  fetchData() {
    this.corona.fetchData().subscribe((res: any[]) => {

      this.data.confirmed = res["confirmed"]["value"];
      this.data.recovered = res["recovered"]["value"];
      this.data.deaths = res["deaths"]["value"];
      this.data.lastupdate = res["lastUpdate"];
    });
  }

  fetchCountries() {
    this.corona.fetchCountries().subscribe((res: any[]) => {
      var countries = res["countries"]
      this.countries = countries.map((name) => name['name'])
    })
  }

  fetchDataByCountry(country: string) {
    this.corona.fetchDataByCountry(country).subscribe((res: any[]) => {
      this.data.confirmed = res["confirmed"]["value"];
      this.data.recovered = res["recovered"]["value"];
      this.data.deaths = res["deaths"]["value"];
      this.data.lastupdate = res["lastUpdate"];

      this.barChartData = [
        {
          data: [this.data.confirmed, this.data.recovered, this.data.deaths],
          label: 'People',
        }
      ]
    })
  }

  fetchDailyData() {
    this.corona.fetchDailyData().subscribe((res: any[]) => {
      this.lineChartLabels = res.map((date) => date["reportDate"]);
      var infectedData = res.map((confirmed) => confirmed["totalConfirmed"]);
      var deaths = res.map((deaths) => deaths["deaths"]["total"]);
      var recovered = res.map(((rev) => rev));


      this.lineChartData = [
        {
          data: infectedData,
          label: 'Infected',
        },
        {
          data: deaths,
          label: 'Deaths'
        }
      ]
    })
  }

  countryChanged(value: string) {
    this.country = value
    if(value == 'global') {
      this.fetchData()
      this.global = true
    } else {
      this.fetchDataByCountry(value)
      this.global = false
    }
  }
  // ngOnInit(){
  //   this.corona.getCountries().subscribe((data) => {
  //     console.log(data)
  //     this.countries = data
  //   })
  // }

  // getCoronaData(){
  //   this.corona.getCoronaRealtimeData(this.country).subscribe((data) => {
  //     console.log(data)
  //     var index = data.length - 1
  //     console.log(index)
  //     this.confirmed = data[index].Confirmed
  //     this.recovered = data[index].Recovered
  //     this.deaths = data[index].Deaths
  //   })
  // }

  // getCountry(country:any){
  //   this.country = country
  // }
}
