import { Component, Input } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { HttpClientServiceService } from '../http-client-service.service';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent {
  // Variable
  @Input() timestamp: number = Date.now();
  responseFitiot: any[] = [];
  responseRaspy: any[] = [];
  /** Based on the screen size, switch from standard to one column per row */
  cardLayout = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return {
          columns: 1,
          miniCard: { cols: 1, rows: 1 },
          chart: { cols: 1, rows: 2 },
          table: { cols: 1, rows: 4 },
        };
      }
 
     return {
        columns: 4,
        miniCard: { cols: 1, rows: 1 },
        chart: { cols: 2, rows: 2 },
        table: { cols: 4, rows: 4 },
      };
    })
  );

  constructor(private breakpointObserver: BreakpointObserver, private httpClientServiceService : HttpClientServiceService) {}

  async askData(minutesAsked: number) {
    this.timestamp = minutesAsked
    console.log(this.timestamp);
    let responses = await this.httpClientServiceService.askDataToServer(minutesAsked);
    this.responseFitiot = responses[0];
    this.responseRaspy = responses[1];
  }
}
