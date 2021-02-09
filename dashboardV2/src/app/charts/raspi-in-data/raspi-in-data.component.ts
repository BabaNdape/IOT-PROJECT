import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { EventEmitterService } from '../../event-emitter.service'; 

@Component({
  selector: 'app-raspi-in-data',
  templateUrl: './raspi-in-data.component.html',
  styleUrls: ['./raspi-in-data.component.css']
})
export class RaspiInDataComponent implements OnInit {

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
    invokeUpdateRaspyInData.subscribe((raspyData:any[]) => { 
      this.updateData(raspyData);    
    });  
  }

  updateData(raspyData: any[]){
    console.log('on raspy in');
    console.log(raspyData)
    let temperatureInArray: number[] = [];
    let humidityInArray: number[] = [];
    let pressureInArray: number[] = [];
    let timestampArray: string[] = [];

    raspyData.forEach(element => {
      temperatureInArray.push(element.temperatureIn);
      humidityInArray.push(element.humidityIn);
      pressureInArray.push(element.pressureIn);
      timestampArray.push(Math.trunc(element.timestamp).toString());
    });

    this.chartData = [
      { data: temperatureInArray, label: 'Temperature' },
      { data: humidityInArray, label: 'Humidity' },
      { data: pressureInArray, label: 'Pressure' }
    ];

    this.chartLabels = timestampArray;
  }

}
