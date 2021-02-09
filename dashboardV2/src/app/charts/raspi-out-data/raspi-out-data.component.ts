import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { EventEmitterService } from '../../event-emitter.service'; 

@Component({
  selector: 'app-raspi-out-data',
  templateUrl: './raspi-out-data.component.html',
  styleUrls: ['./raspi-out-data.component.css']
})
export class RaspiOutDataComponent implements OnInit {

  chartOptions = {
    responsive: true
  };
  chartData = [
    { data: [0], label: 'Temperature' },
    { data: [0], label: 'Humidity' },
    { data: [0], label: 'Pressure' }
  ];
  chartLabels = ['0'];
  constructor(private eventEmitterService: EventEmitterService) { }

  ngOnInit() { 
    this.eventEmitterService.subsVar = this.eventEmitterService.    
    invokeUpdateRaspyOutData.subscribe((raspyData:any[]) => {
      console.log('allo')    
      this.updateData(raspyData);    
    });  
  }

  updateData(raspyData: any[]){
    console.log('on raspy out');
    console.log(raspyData);
    let temperatureOutArray: number[] = [];
    let humidityOutArray: number[] = [];
    let pressureOutArray: number[] = [];
    let timestampArray: string[] = [];

    raspyData.forEach(element => {
      temperatureOutArray.push(element.temperatureOut);
      humidityOutArray.push(element.humidityOut);
      pressureOutArray.push(element.pressureOut);
      timestampArray.push(Math.trunc(element.timestamp).toString());
    });

    this.chartData = [
      { data: temperatureOutArray, label: 'Temperature' },
      { data: humidityOutArray, label: 'Humidity' },
      { data: pressureOutArray, label: 'Pressure' }
    ];

    this.chartLabels = timestampArray;
  }

}
