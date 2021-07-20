import { EventService } from './services/event.service';
import { AuthGuard } from './guards/auth.guard';
import { ConfigService } from './services/config.service';
import { UserService } from './services/user.service';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpConfigInterceptor } from './interceptor/httpconfig.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MaterialModule } from './themes/material.module';
import { AuthService } from './services/auth.service';

import { StorageServiceModule } from 'ngx-webstorage-service';
import { NavbarComponent } from './navbar/navbar.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from 'angularx-flatpickr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { APP_INITIALIZER } from '@angular/core';

@NgModule({
  declarations: [AppComponent, NavbarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    StorageServiceModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: resourceProviderFactory,
      deps: [ConfigService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true,
    },
    AuthService,
    UserService,
    AuthGuard,
    ConfigService,
    EventService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

// To load config data before any thing else in the app
export function resourceProviderFactory(provider: ConfigService) {
  return () => provider.load();
}
