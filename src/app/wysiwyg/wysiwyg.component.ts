import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-wysiwyg',
  templateUrl: './wysiwyg.component.html',
  styleUrls: ['./wysiwyg.component.scss']
})
export class WysiwygComponent implements OnInit {
  editorForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.editorForm = new FormGroup({
      'editor' : new FormControl (null)
    })

  }

  onSubmit(){
    console.log(this.editorForm.get('editor').value);
  }

}
