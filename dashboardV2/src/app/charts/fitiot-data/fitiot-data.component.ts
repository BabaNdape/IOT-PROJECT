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
    { data: [0], label: 'Temperature' },
    { data: [0], label: 'Humidity' }
  ];
  chartLabels = ['0'];
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

    let temperatureArray: number[] = [];
    let humidityArray: number[] = [];
    let timestampArray: string[] = [];

    fitiotData.forEach(element => {
      temperatureArray.push(element.temperature);
      humidityArray.push(element.humidity);
      timestampArray.push(Math.trunc(element.timestamp).toString());
    });

    this.chartData = [
      { data: temperatureArray, label: 'Temperature' },
      { data: humidityArray, label: 'Humidity' }
    ];

    this.chartLabels = timestampArray;
  }
}
