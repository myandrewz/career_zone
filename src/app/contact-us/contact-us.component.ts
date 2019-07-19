import { Component, OnInit } from '@angular/core';
import { MapsService } from '../maps.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  lat: string ='';
  lng: string ='';

location:object;
  constructor(private maps:MapsService) { }

  ngOnInit() {
    this.maps.getlocation().subscribe(data =>{
      console.log(data);
      this.lat = data.latitude;
      this.lng = data.longitude;
    })
  }
  }
