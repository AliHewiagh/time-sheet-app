import { SharedService } from './../../services/shared.service';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import { EventModel } from 'src/app/interfaces/event.interface';
import { EventService } from './../../services/event.service';
import { Post } from './../../interfaces/event.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import EventStatus from 'src/app/enum/event.status';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css'],
})
export class PostFormComponent implements OnInit, OnChanges {
  @Input() event: EventModel;
  @Output() refresh = new EventEmitter<Boolean>();
  @Output() eventId = new EventEmitter<String>();

  postForm!: FormGroup;

  message: String = '';

  get title() {
    return this.postForm.get('title');
  }

  get hours() {
    return this.postForm.get('hours');
  }

  get minutes() {
    return this.postForm.get('minutes');
  }

  currentEvent: EventModel;
  constructor(
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.currentEvent = this.event;
    this.createPostForm();
  }

  createPostForm() {
    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      hours: [
        0,
        [Validators.required, , Validators.min(1), Validators.max(24)],
      ],
      minutes: [0, [Validators.required, Validators.min(0)]],
    });
  }

  addPosts() {
    const hoursWithMinutes =
      this.sharedService.getTotalHoursWithRemainingMinutes(
        this.currentEvent,
        this.postForm.value.hours,
        this.postForm.value.minutes
      );

    if (hoursWithMinutes.totalHours > 24) {
      this.message = 'Post total hours must be less than or equal 24 hours';
      return;
    }

    this.message = '';

    let post: Post = {
      title: this.postForm.value.title,
      hours: hoursWithMinutes.newPostHours,
      minutes: hoursWithMinutes.newPostMinutes,
    };

    this.currentEvent.hour = hoursWithMinutes.totalHours;

    if (this.currentEvent.hour >= this.event.req_hours) {
      this.currentEvent.status = EventStatus.COMPLETE;
    } else {
      this.currentEvent.status = EventStatus.PENDING;
    }

    this.currentEvent.posts.push(post);

    if (this.currentEvent.posts.length < 2) {
      this.eventService.createEvent(this.currentEvent).then((result) => {
        if (result.code === '0000') {
          this.eventId.emit(result.data.event_id);
          this.refresh.emit(true);
          this.postForm.reset();
        }
      });
    } else {
      const eventProps = {
        posts: this.currentEvent.posts,
        hour: hoursWithMinutes.totalHours,
        status: this.currentEvent.status,
      };

      this.eventService
        .updateEvent(eventProps, this.currentEvent.event_id)
        .then((result) => {
          this.postForm.reset();
          this.refresh.emit(true);
        })
        .catch((error) => {
          console.log('Error', error);
          this.currentEvent.posts.pop();
        });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.event.currentValue) {
      this.currentEvent = changes.event.currentValue;

      return;
    }
    this.currentEvent = changes.event.previousValue;
  }
}
