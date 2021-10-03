// Core modules
import { Component, OnInit, Input } from '@angular/core';
// custom components
import { FetchDataApiService } from '../fetch-api-data.service';

// Material components
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  @Input() userData = {
    username: '',
    password: '',
  };

  constructor(
    public fetchApiData: FetchDataApiService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {}

  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      // Login successful.
      (response) => {
        // Store current user and token in localStorage.
      localStorage.setItem('username', response.user.username);
      localStorage.setItem('token', response.token);

      this.dialogRef.close();
      this.snackBar.open(`Welcome back, ${response.user.name}!`, 'OK', {
        duration: 3000,
      });
    },
    // Login unsuccessful.
    (response) => {
      this.snackBar.open(response, 'OK', {
        duration: 3000,
      });
    }
  );
}
}
