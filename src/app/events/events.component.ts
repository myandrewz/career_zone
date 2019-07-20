import { Component, OnInit } from '@angular/core';
import { EventsService } from '../events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  // events: Array<any>;
  events;

  constructor(
    public eventsService:EventsService,
  ) { }

  ngOnInit() {
    // this.eventsService.getEvent()
    //  .subscribe(result => {
    //    this.events = result;
    //  });
     this.getEventshere();
    // console.log("this.events");
  }
  getEventshere = () =>
      this.eventsService.getEvent()
      .subscribe(res =>(this.events = res));
}
