import { Injectable } from '@angular/core';
import { AngularFirestore} from "angularfire2/firestore";

@Injectable({
  providedIn: 'root'
})
export class AuditTrailService {

  constructor( private db: AngularFirestore) { }

  createAuditTrailLog(_audit_trail_data){
    
    this.db.collection('audit-trail').add(_audit_trail_data).then(

      res=>{
        console.log(res)
      },

      err=>{
        console.log(err)
      }
    )
  }
}
