// Core modules
import { Component, OnInit, Input } from '@angular/core';

// components
import { FetchApiDataService } from '../fetch-api-data.service';

// Material modules
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  @Input() userData = {
    name: '',
    lastName: '',
    birthday: '',
    country: '',
    email: '',
    username: '',
    password: '',
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  /**
   * Register a new user and save user information and login credentials to the database
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe(
      () => {
      // Logic for successful user registration needs to be implemented here!
      this.dialogRef.close(); // will close the modal on success
      this.snackBar.open('Welcome, you are now registered. You can now go to login', 'OK', {
        duration: 3000,
      });
    },
    // Login unsuccessful.
    (response) => {
      console.log(response);
      this.snackBar.open(response, 'OK', {
        duration: 3000,
      });
    }
  );
}
}
