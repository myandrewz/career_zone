import { Component, ViewEncapsulation } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
  
})
export class AppComponent {
  title = 'angulartoastr';
  items: Observable<any[]>;
  constructor(private toastr: ToastrService, db: AngularFirestore) {}
  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!',
    {timeOut: 2000});;
  }
  

  
}
