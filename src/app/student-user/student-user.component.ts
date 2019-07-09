import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-student-user',
  templateUrl: './student-user.component.html',
  styleUrls: ['./student-user.component.scss']
})
export class StudentUserComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

/*var userRef = firebase.database().ref("User").orderByKey();
userRef.once("value").then(function(snapshot) {
snapshot.forEach(function(childSnapshot) {
  var key = childSnapshot.key;
  var childData = childSnapshot.val();              

  var first_name = childSnapshot.val().firstname;
  var last_name = childSnapshot.val().lastname;

  $("#firstname").append(first_name);
  $("#lastname").append(last_name);

  });
}
*/

