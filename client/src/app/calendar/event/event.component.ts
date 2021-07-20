import { Post } from './../../interfaces/event.interface';
import { SharedService } from './../../services/shared.service';
import { EventModel } from 'src/app/interfaces/event.interface';
import { EventService } from './../../services/event.service';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

import { OnChanges } from '@angular/core';
import EventStatus from 'src/app/enum/event.status';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
})
export class EventComponent implements OnInit, OnChanges {
  @Input() event: EventModel;
  @Output() refresh = new EventEmitter<Boolean>();
  @Output() modelCloser = new EventEmitter<Boolean>();

  postCount = 0;

  updateMode: Boolean = false;

  postForm!: FormGroup;

  currentEvent: EventModel;

  postToBeUpdatedIndex: number = null;

  get title() {
    return this.postForm.get('title');
  }

  get hours() {
    return this.postForm.get('hours');
  }

  get minutes() {
    return this.postForm.get('minutes');
  }

  constructor(
    private eventService: EventService,
    private sharedService: SharedService,
    private formBuilder: FormBuilder
  ) {
    this.createPostForm();
  }

  ngOnInit(): void {
    this.currentEvent = this.event;
    this.postCount = this.event.posts.length;
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

  removePost(index) {
    this.event.posts.splice(index, 1);

    const hoursWithMinutes =
      this.sharedService.getTotalHoursWithRemainingMinutes(this.currentEvent);

    if (hoursWithMinutes.totalHours < this.event.req_hours) {
      this.event.status = EventStatus.PENDING;
    }

    this.event.hour = hoursWithMinutes.totalHours;

    this.eventService
      .updateEvent(this.event, this.event.event_id)
      .then((result) => {
        this.refresh.emit(true);
        if (this.event.posts.length < 1) {
          this.modelCloser.emit(true);
        }
      })
      .catch((error) => {
        console.log('Error', error);
      });
  }

  changeToUpdateMode(post: Post, index: number) {
    if (!post) {
      return;
    }
    this.postToBeUpdatedIndex = index;
    this.updateMode = true;
    this.postForm.get('title').setValue(post.title);
    this.postForm.get('hours').setValue(post.hours);
    this.postForm.get('minutes').setValue(post.minutes);
  }

  updatePost() {
    const hoursWithMinutes =
      this.sharedService.getTotalHoursWithRemainingMinutes(
        this.currentEvent,
        this.postForm.value.hours,
        this.postForm.value.minutes
      );

    if (hoursWithMinutes.totalHours < this.event.req_hours) {
      this.currentEvent.status = EventStatus.PENDING;
    } else {
      this.currentEvent.status = EventStatus.COMPLETE;
    }

    this.currentEvent.hour = hoursWithMinutes.totalHours;

    let post: Post = {
      title: this.postForm.value.title,
      hours: hoursWithMinutes.newPostHours,
      minutes: hoursWithMinutes.newPostMinutes,
    };

    if (this.postToBeUpdatedIndex !== null && this.postToBeUpdatedIndex > -1) {
      this.currentEvent.posts[this.postToBeUpdatedIndex] = post;
    }

    this.eventService
      .updateEvent(this.currentEvent, this.currentEvent.event_id)
      .then((result) => {
        this.postForm.reset();
        this.postToBeUpdatedIndex = null;
        this.updateMode = false;
        this.refresh.emit(true);
      })
      .catch((error) => {
        console.log('Error', error);
      });
  }

  listMode() {
    this.updateMode = false;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.event.currentValue) {
      this.currentEvent = changes.event.currentValue;
      this.postCount = this.currentEvent.posts.length;
      return;
    }

    this.currentEvent = changes.event.previousValue;
    this.postCount = this.currentEvent.posts.length;
  }
}
