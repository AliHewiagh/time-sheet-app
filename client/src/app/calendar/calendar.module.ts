import { CalendarRoutingModule } from './calendar-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarSheetComponent } from './calendar-sheet/calendar-sheet.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from 'angularx-flatpickr';

import { EventComponent } from './event/event.component';
import { PostFormComponent } from './post-form/post-form.component';
import { CalendarHeaderComponent } from './calendar-header/calendar-header.component';
import { ConfigurationComponent } from './configuration/configuration.component';

@NgModule({
  declarations: [
    CalendarSheetComponent,
    EventComponent,
    PostFormComponent,
    CalendarHeaderComponent,
    ConfigurationComponent,
  ],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule,

    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
})
export class CalendarSheetModule {}
