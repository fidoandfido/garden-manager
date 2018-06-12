import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './/app-routing.module';
import { MainAppModule } from './main-app/main-app.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { DataService } from './main-app/data.service';
import { AccountModule } from './account/account.module';
import { LogMessageService } from './shared/services/log-message.service';
import { LoginComponent } from './account/login/login.component';
import { AuthGuard } from './auth.gaurd';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MainAppModule,
    AccountModule,
    AppRoutingModule,
    HttpClientModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
     HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
     )

  ],
  providers: [
    DataService,
    LogMessageService,
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
