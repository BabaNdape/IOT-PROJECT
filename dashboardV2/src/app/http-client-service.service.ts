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

  public baseurl = 'http://localhost:3000/sensors-data-fitiot/'

  async askDataToServer(minutesAsked: number) {
    this.httpClient
    .get<any[]>(this.baseurl + minutesAsked.toString())
    .subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
