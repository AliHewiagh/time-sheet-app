import { Injectable } from '@angular/core';
import { EventModel } from '../interfaces/event.interface';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor() {}

  getTotalHoursWithRemainingMinutes(
    event: EventModel,
    inputHours: number = 0,
    inputMinutes: number = 0
  ) {
    let totalEventHours = 0;
    let totalEventMinutes = 0;
    event.posts.forEach((element) => {
      totalEventMinutes += element.minutes;
      totalEventHours += element.hours;
    });
    let num = inputMinutes + totalEventMinutes;
    let hours = num / 60;
    let rhours = Math.floor(hours);
    let minutes = (hours - rhours) * 60;
    let rminutes = Math.round(minutes);

    return {
      newPostHours: rhours + inputHours,
      newPostMinutes: rminutes,
      totalHours: rhours + inputHours + totalEventHours,
      totalMinutes: rminutes,
    };
  }
}
