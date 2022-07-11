import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { ExamplesModule } from 'src/assets/examples/examples.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MglTimelineModule } from 'angular-mgl-timeline';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { IMqttMessage, MqttModule, IMqttServiceOptions } from "ngx-mqtt";
import { environment } from 'src/environments/environment';
import { NgVerticalTimelineModule  } from 'ng-vertical-timeline';
const MQTT_SERVICE_OPTIONS: any = environment.mqttConfig;
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    SharedModule,
    HttpClientModule,
    MatDialogModule,
    MqttModule,
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS),
    MglTimelineModule,
    NgVerticalTimelineModule,
    ExamplesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
