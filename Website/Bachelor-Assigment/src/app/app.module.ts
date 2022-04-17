import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from "../environments/environment";
import { SocketIoConfig, SocketIoModule } from "ngx-socket-io";
import { MainPageComponent } from './main-page/main-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxsModule } from "@ngxs/store";
import { StatisticsState } from "./shared/states/statistics/statistics.state";
import { NgxsStoragePluginModule } from "@ngxs/storage-plugin";
import { LoginViewComponent } from './login-view/login-view.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { GunStatsComponent } from './gun-stats/gun-stats.component';
import { MapStatsComponent } from './map-stats/map-stats.component';

const config: SocketIoConfig = {
  url: environment.socketUrl, // socket server url;
  options: {
    transports: ['websocket']
  }
}

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    LoginViewComponent,
    GunStatsComponent,
    MapStatsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    NgxsModule.forRoot([StatisticsState], {
      developmentMode: !environment.production
    }),
    NgxsStoragePluginModule.forRoot({
      key: ['stats']
    }),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
