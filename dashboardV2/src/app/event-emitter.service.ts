import { Injectable, EventEmitter } from '@angular/core';    
import { Subscription } from 'rxjs/internal/Subscription'; 

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {
  invokeUpdateFitiotData = new EventEmitter();    
  subsVar: Subscription = new Subscription();    
    
  constructor() { }    
    
  onUpdateData(fitiotData: any[]) {
    console.log('on event emiter');    
    this.invokeUpdateFitiotData.emit(fitiotData);    
  }    
}
