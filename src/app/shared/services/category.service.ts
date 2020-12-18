import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) {


  }




  getAll<T>() {
    // return this.db.list('/categories').snapshotChanges();

    return this.db.list<T>('/categories').snapshotChanges().pipe(
      map(a =>
        a.map(p => {
          const value = <any>Object.assign({}, p.payload.val());
          value.key = p.key;
          return <T>value;
        }

        ))
    );
  }

  /* getCategories() : Observable<any> {
    return this.db.list('/categories', ref => ref.orderByChild('name'))
    .snapshotChanges() as Observable<any>;
  } */

}
