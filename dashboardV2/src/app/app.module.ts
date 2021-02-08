import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashComponent } from './dash/dash.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CardComponent } from './card/card.component';
import { FitiotDataComponent } from './charts/fitiot-data/fitiot-data.component';
import { EventEmitterService } from './event-emitter.service';
import { RaspiInDataComponent } from './charts/raspi-in-data/raspi-in-data.component';
import { RaspiOutDataComponent } from './charts/raspi-out-data/raspi-out-data.component';

@NgModule({
  declarations: [
    AppComponent,
    DashComponent,
    CardComponent,
    FitiotDataComponent,
    RaspiInDataComponent,
    RaspiOutDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [EventEmitterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
