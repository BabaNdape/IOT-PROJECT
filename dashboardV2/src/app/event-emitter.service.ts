import { Injectable, EventEmitter } from '@angular/core';    
import { Subscription } from 'rxjs/internal/Subscription'; 

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {
  invokeUpdateFitiotData = new EventEmitter();    
  invokeUpdateRaspyInData = new EventEmitter();    
  invokeUpdateRaspyOutData = new EventEmitter();    
  subsVar: Subscription = new Subscription();    
    
  constructor() { }    
    
  onUpdateFitiotData(fitiotData: any[]) {
    console.log('on event emiter');    
    this.invokeUpdateFitiotData.emit(fitiotData);    
  }    

  onUpdateRaspyInData(raspyData: any[]) {
    console.log('on event emiter');    
    this.invokeUpdateRaspyInData.emit(raspyData);    
  } 

  onUpdateRaspyOutData(raspyData: any[]) {
    console.log('on event emiter');    
    this.invokeUpdateRaspyOutData.emit(raspyData);    
  } 
  
}
