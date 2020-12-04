import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { 


  }




getCategories(){
  return this.db.list('/categories').snapshotChanges();
} 

/* getCategories() : Observable<any> {
  return this.db.list('/categories', ref => ref.orderByChild('name'))
  .snapshotChanges() as Observable<any>;
} */

}
