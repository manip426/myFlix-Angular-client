import { Component, OnInit, Input } from '@angular/core';
// this is used to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// This brings in the API calls
import { ApiDataService } from '../fetch-api-data.service';
// this is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
//this is to navigate between the pages
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: ApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public Router: Router) { }

  ngOnInit(): void {
  }


  /**
   * This is the function responsible for sending the form inputs to the backend
   */

  loginUser(): void {
    this.fetchApiData.userLogin(this.userData.Username, this.userData.Password).subscribe((result) => {
      localStorage.setItem('token', result.token)
      localStorage.setItem('user', result.user.Username)

      this.dialogRef.close(); // This will close the modal on success!
      this.snackBar.open(result.user.Username, 'OK', {
        duration: 2000
      })
      this.Router.navigate(['movies']);// Dont know if this goes here
    }, (result) => {
      this.snackBar.open(result.user.Username, 'OK', {
        duration: 2000
      });
    });

  }

}
