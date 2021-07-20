import { HttpParams } from '@angular/common/http';
import { EventModel } from 'src/app/interfaces/event.interface';
import { EventService } from './../../services/event.service';
import {
  Component,
  ViewChild,
  TemplateRef,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarMonthViewBeforeRenderEvent,
  CalendarView,
} from 'angular-calendar';
import { map } from 'rxjs/operators';

import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  startOfDay,
  endOfDay,
  format,
} from 'date-fns';
import EventStatus from 'src/app/enum/event.status';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  green: {
    primary: '##28a745',
    secondary: '##28a745',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-calendar-sheet',
  templateUrl: './calendar-sheet.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./calendar-sheet.component.css'],
})
export class CalendarSheetComponent implements OnInit {
  @ViewChild('dayModel', { static: true }) dayModel!: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  events$: Observable<CalendarEvent<{ eventModel: EventModel }>[]>;

  selectedDayTasks: EventModel;

  refresh: Subject<any> = new Subject();

  currentChosenEventId: String = '';

  constructor(private modal: NgbModal, private eventService: EventService) {}

  ngOnInit(): void {
    this.fetchEvents();
  }

  dayClicked(events: any): void {
    if (events.events.length > 0) {
      this.selectedDayTasks = events.events[0];
    } else {
      let date = new Date(events.date);
      date.setHours(1, 0, 0, 0);
      const defaultEvent: EventModel = {
        status: EventStatus.PENDING,
        req_hours: 8,
        hour: 0,
        date: date,
        posts: [],
        title: '',
        event_id: '',
        uid: '',
        start: new Date(date),
      };
      this.selectedDayTasks = defaultEvent;
    }
    this.modal.open(this.dayModel, { size: 'lg' });
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  fetchEvents(): void {
    const getStart: any = {
      month: startOfMonth,
      week: startOfWeek,
      day: startOfDay,
    }[this.view];

    const getEnd: any = {
      month: endOfMonth,
      week: endOfWeek,
      day: endOfDay,
    }[this.view];

    const params = new HttpParams()
      .set('date_from', format(getStart(this.viewDate), 'yyyy-MM-dd'))
      .set('date_to', format(getEnd(this.viewDate), 'yyyy-MM-dd'));

    this.events$ = this.eventService.getUserEvents(params).pipe(
      map(({ data }: { data: EventModel[] }) => {
        return data.map((eventModel: EventModel) => {
          if (
            this.selectedDayTasks &&
            eventModel.event_id === this.currentChosenEventId
          ) {
            this.selectedDayTasks = eventModel;
          }
          return {
            title: '',
            start: new Date(eventModel.date),
            color: colors.yellow,
            allDay: true,
            status: eventModel.status,
            req_hours: eventModel.req_hours,
            hour: eventModel.hour,
            posts: eventModel.posts,
            event_id: eventModel.event_id,
            date: eventModel.date,
            meta: {
              eventModel,
            },
          };
        });
      })
    );
  }

  setCurrentChosenEvent(eventId) {
    if (eventId) {
      this.currentChosenEventId = eventId;
    }
  }

  beforeMonthViewRender(renderEvent: CalendarMonthViewBeforeRenderEvent): void {
    renderEvent.body.forEach((day) => {
      if (
        day.events.length > 0 &&
        day.events[0].meta.eventModel.status == EventStatus.COMPLETE
      ) {
        day.cssClass = 'bg-green';
      } else if (
        day.events.length > 0 &&
        day.events[0].meta.eventModel.status == EventStatus.PENDING
      ) {
        day.cssClass = 'bg-yellow';
      }
    });
  }
}
