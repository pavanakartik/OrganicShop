import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent  {

  user: firebase.default.User;

  constructor(private afAuth: AngularFireAuth) { 

    afAuth.authState.subscribe(x=>this.user=x);
  }

  logout(){

    this.afAuth.signOut();

  }

}
