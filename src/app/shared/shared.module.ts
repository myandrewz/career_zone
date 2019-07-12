import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms'
import { MaterialModule } from '../material.module';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [NavbarComponent],
  imports: [
    
    CommonModule,FormsModule,RouterModule,
    MaterialModule
  ],
  exports:[
    CommonModule,
    FormsModule,
    MaterialModule, RouterModule,
    NavbarComponent
  ]
 

})
export class SharedModule { }
