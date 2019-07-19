import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import { NgModule } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
//import { MatIconModule} form


@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatToolbarModule,
     MatIconModule, MatMenuModule, MatStepperModule,MatFormFieldModule],
  exports: [MatButtonModule, MatCheckboxModule, MatToolbarModule, 
    MatIconModule, MatMenuModule, MatStepperModule, MatFormFieldModule],
})
export class MaterialModule { }