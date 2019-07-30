import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  imageDetailList:any;

  constructor(
    public firebase: AngularFirestore) { }

  getImageDetailList() {
    this.imageDetailList = this.firebase.collection('image-details');
  }

  insertImageDetails(imageDetails) {
    this.imageDetailList.push(imageDetails);
  }

}
