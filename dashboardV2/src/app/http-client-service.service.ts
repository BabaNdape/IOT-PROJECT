import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { from } from 'rxjs';
import { stringify } from '@angular/compiler/src/util';
@Injectable({
  providedIn: 'root'
})
export class HttpClientServiceService {
  constructor(private httpClient: HttpClient) { }
  optionRequest = {
    headers: new HttpHeaders({ 
      'Access-Control-Allow-Origin':'*',
      'Authorization':'authkey',
      'userid':'1'
    })
  };

  //public baseurlFitiot = 'http://localhost:3000/sensors-data-fitiot/';
  //public baseurlRaspy = 'http://localhost:3000/sensors-data-raspy/';

  public baseurlFitiot = 'http://137.194.15.200:3000/sensors-data-fitiot/';
  public baseurlRaspy = 'http://137.194.15.200:3000/sensors-data-raspy/';

  async askDataToServer(minutesAsked: number) {
    const fitiotResponse = await this.httpClient
    .get<any[]>(this.baseurlFitiot + minutesAsked.toString())
    .toPromise();
    console.log(fitiotResponse);

    const raspyResponse = await this.httpClient
      .get<any[]>(this.baseurlRaspy + minutesAsked.toString())
      .toPromise();
    console.log(raspyResponse);
    return [fitiotResponse, raspyResponse]
  }
}
