import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore} from "angularfire2/firestore";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService implements OnInit{
  //value: any;

  constructor(
    private db: AngularFirestore) { }

    ngOnInit() {
      //this.createUser()

    }

   /* 
  adds new user to firebase
  createUser(value){
    return this.db.collection('User').add({
      name: value.full_name,
      campus: value.campus,
      age: parseInt(value.age)
    });
  }
  */
}

