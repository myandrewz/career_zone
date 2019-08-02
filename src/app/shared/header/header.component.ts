import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @HostListener('window:scroll', ['$event'])
    onWindowScroll(e) {
       if (window.pageYOffset > 60) {
         let element = document.getElementById('navbar');
         element.classList.add('sticky');
       } else {
        let element = document.getElementById('navbar');
          element.classList.remove('sticky'); 
       }
    }

}
