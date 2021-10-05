import { Component, OnInit } from '@angular/core';
// this is used to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// This brings in the API calls
import { ApiDataService } from '../fetch-api-data.service';
// this is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-userdata',
  templateUrl: './update-userdata.component.html',
  styleUrls: ['./update-userdata.component.scss']
})
export class UpdateUserdataComponent implements OnInit {

  userData = { NewUsername: '' };


  constructor(
    public fetchApiData: ApiDataService,
    public dialogRef: MatDialogRef<UpdateUserdataComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  /**
  * this function calls updateUsername and updates the username
  */
  updateData(): void {

    this.fetchApiData.updateUsername(this.userData.NewUsername).subscribe((result) => {
      console.log('Username updated')
      this.dialogRef.close(); // This will close the modal on success!
      localStorage.setItem('user', this.userData.NewUsername)
      this.snackBar.open(result, 'OK', {
        duration: 2000
      })

    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });

  }
}
