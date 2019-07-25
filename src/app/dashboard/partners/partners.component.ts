import { Component, OnInit } from '@angular/core';
import { PartnersService } from '../../partners.service';
import { Router, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss']
})
export class PartnersComponent implements OnInit {

  partners;

  constructor(
    public partnersService: PartnersService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.getPartnershere();
  }
  getPartnershere() {
    this.partnersService.getPartner()
    .subscribe(res => (this.partners = res));

  }
  editPartner(value) {
    alert(value + ' edit');

  }
  viewPartner(value){
    alert(value + ' view');

  }
  deletePartner(doc_ID){
    this.partnersService.deletePartner(doc_ID)
    .then(res => {

      this.toastr.success('Partner Successfully Deleted !!!','Notification');
      console.log(res);
    }, err => {
      this.toastr.error(err.message, 'Error', {enableHtml :  true });
    });
  }

}
