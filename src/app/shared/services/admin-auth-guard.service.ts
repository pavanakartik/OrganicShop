import { AuthService } from 'shared/services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { UserService } from 'shared/services/user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router, private userService: UserService) { }

  canActivate(): Observable<boolean> {

    return this.auth.appUser$
      .pipe(map(appUser => appUser.isAdmin));

  }
}


