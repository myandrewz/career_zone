import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatButtonModule} from '@angular/material/button'; 
import {MatExpansionModule} from '@angular/material/expansion';
import {MatInputModule} from '@angular/material/input'; 
import {MatProgressBarModule} from '@angular/material/progress-bar'; 
import {MatCardModule} from '@angular/material/card'; 
import {MatIconModule} from '@angular/material/icon'; 


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule, MatToolbarModule,MatExpansionModule,MatInputModule,MatProgressBarModule,MatCardModule,MatIconModule
  ],
  exports:[MatButtonModule, MatToolbarModule,MatExpansionModule,MatInputModule,MatProgressBarModule,MatCardModule,MatIconModule ]
})
export class MaterialModule { }
