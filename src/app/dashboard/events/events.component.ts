import {
  Component,
  OnInit
} from '@angular/core';
import {
  EventsService
} from '../../services/events/events.service';
import {
  Router,
  Params
} from '@angular/router';
import {
  ToastrService
} from 'ngx-toastr';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  // events: Array<any>;
  events;

  constructor(
    public eventsService: EventsService,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  ngOnInit() {
    // this.eventsService.getEvent()
    //  .subscribe(result => {
    //    this.events = result;
    //  });
    this.getEventshere();
    // console.log('this.events');
  }
  getEventshere = () =>
    this.eventsService.getEvent()
    .subscribe(res => (this.events = res));

  editEvent(doc_ID) {
    alert(doc_ID + ' edit');

  }
  viewEvent(doc_ID) {
    alert(doc_ID + ' view');

  }
  deleteEvent(doc_ID) {
    this.eventsService.deleteEvent(doc_ID)
      .then(res => {

        this.toastr.success('Events Successfully Deleted !!!', 'Notification');
        console.log(res);
      }, err => {
        this.toastr.error(err.message, 'Error', {
          enableHtml: true
        });
      });
  }
}
