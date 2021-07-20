import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { EventModel } from '../interfaces/event.interface';

@Injectable()
export class EventService {
  constructor(private http: HttpClient) {}

  createEvent(data: EventModel): Promise<any> {
    const event: EventModel = {
      status: data.status,
      req_hours: data.req_hours,
      hour: data.hour,
      posts: data.posts,
      date: data.date,
      uid: '',
      title: data.title,
      start: data.start,
    };
    return this.http.post<EventModel>('/event', event).toPromise();
  }

  getUserEvents(params): Observable<any> {
    try {
      return this.http.get<any>('/event', { params });
    } catch (error) {
      throw new Error(error);
    }
  }

  updateEvent(data: any, eventId): Promise<any> {
    return this.http.patch<EventModel>(`/event/${eventId}`, data).toPromise();
  }
}
