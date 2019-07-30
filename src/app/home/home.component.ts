import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

@NgModule({
  imports: [
  BrowserModule, 
  NgbModule
],
  //declarations: [NgbdCarouselBasic],
  //exports: [NgbdCarouselBasic],
  //bootstrap: [NgbdCarouselBasic]
})
export class HomeComponent {

  images = [1, 2, 3].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);

}
