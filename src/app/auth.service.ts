import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AppUser } from './modals/app-user';
import { UserService } from './user.service';
import { switchMap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth, private route: ActivatedRoute, private userService: UserService) {

    this.user$ = afAuth.user;
  }

  logIn() {

    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logOut() {
    this.afAuth.auth.signOut();

  }

  get appUser$(): Observable<AppUser> {

    return this.user$.pipe(switchMap(user => {
      if (user) { return this.userService.get(user.uid); }
      return of(null);
    }));
  }

  returnUid$() {

    return this.user$.pipe(switchMap((user: any) => {
      if (user) { return user; }
      return of(null);
    }));
  }
}

