import { SharedService } from './../../services/shared.service';
import { EventService } from './../../services/event.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EventModel } from 'src/app/interfaces/event.interface';
import EventStatus from 'src/app/enum/event.status';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css'],
})
export class ConfigurationComponent implements OnInit {
  @Input() event: EventModel;
  @Output() refresh = new EventEmitter<Boolean>();
  @Output() modelCloser = new EventEmitter<Boolean>();

  currentEvent: EventModel;

  isLoading: Boolean = false;
  constructor(
    private eventService: EventService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.currentEvent = this.event;
  }

  updateHalfDay() {
    this.currentEvent.req_hours = 4;

    const hoursWithMinutes =
      this.sharedService.getTotalHoursWithRemainingMinutes(this.currentEvent);

    if (hoursWithMinutes.totalHours < this.event.req_hours) {
      this.event.status = EventStatus.PENDING;
    } else {
      this.event.status = EventStatus.COMPLETE;
    }

    this.isLoading = true;
    this.eventService
      .updateEvent(this.currentEvent, this.currentEvent.event_id)
      .then((result) => {
        this.isLoading = false;
        this.refresh.emit(true);
      })
      .catch((error) => {
        this.isLoading = false;
        console.log('Error', error);
      });
  }

  closeModel() {
    this.modelCloser.emit(true);
  }
}
