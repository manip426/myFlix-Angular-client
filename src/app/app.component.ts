import { Component } from '@angular/core';
// import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
// import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MatDialog } from '@angular/material/dialog';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'myFlix-Angular-client';

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    public Router: Router) { }

  openMoviesDialog(): void {
    this.dialog.open(MovieCardComponent, { width: '500px' });
  }

  goToProfile(): void {
    this.Router.navigate(['profile']);
  }

  logOut(): void {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    this.Router.navigate(['welcome']);


  }

}
