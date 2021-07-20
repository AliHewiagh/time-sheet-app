import { CalendarEvent } from 'angular-calendar';

export interface EventModel extends CalendarEvent {
  event_id?: string;
  status: string;
  req_hours: number;
  hour: number;
  posts: Post[];
  uid: String;
  date: Date;
}

export class Post {
  title: string;
  hours: number;
  minutes: number;

  constructor(title: string, hours: number, minutes: number) {
    this.title = title;
    this.hours = hours;
    this.minutes = minutes;
  }
}
