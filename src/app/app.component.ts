import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, ActivatedRoute, RoutesRecognized } from '@angular/router';
import { UserService } from './user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  showLoading = true;
  Url;
  navBg;

  constructor(private auth: AuthService, private route: Router,

    private userService: UserService) {
    auth.user$.subscribe(user => {
      if (user) {
        this.userService.save(user);
        const url = localStorage.getItem('returnUrl');
        this.route.navigateByUrl(url);
      }
    });

    this.route.events.subscribe(event => {
      if (event instanceof RoutesRecognized) {
        console.log('navigated to:', event.url);
        console.log('route state', event.state);
        console.log('');
        this.Url = event.url;
        // tslint:disable-next-line:triple-equals
        this.navBg = event.url == '/' ? true : false;
      }

    });

  }

}

