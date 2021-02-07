import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { EventEmitterService } from '../../event-emitter.service'; 

@Component({
  selector: 'app-fitiot-data',
  templateUrl: './fitiot-data.component.html',
  styleUrls: ['./fitiot-data.component.css']
})
export class FitiotDataComponent implements OnInit {
  chartOptions = {
    responsive: true
  };
  chartData = [
    { data: [330, 600, 260, 700], label: 'Temperature' },
    { data: [120, 455, 100, 340], label: 'Humidity' }
  ];
  chartLabels = ['January', 'February', 'Mars', 'April'];

  constructor(private eventEmitterService: EventEmitterService  ) { }

  ngOnInit() { 
      this.eventEmitterService.subsVar = this.eventEmitterService.    
      invokeUpdateFitiotData.subscribe((fitiotData:any[]) => {
        console.log('allo')    
        this.updateData(fitiotData);    
      });  
  }

  updateData(fitiotData: any[]){
    console.log('on graph');
    console.log(fitiotData)
  }
}
