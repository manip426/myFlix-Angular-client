import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserRegistrationService } from '../fetch-api-data.service'
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-synopsis',
  templateUrl: './synopsis.component.html',
  styleUrls: ['./synopsis.component.scss']
})
export class SynopsisComponent implements OnInit {
  id: any = '';
  movie: any = [];
  review: any = { MovieID: this.route.snapshot.paramMap.get("id"), Comment: "", Rating: "" };

  constructor(
    private route: ActivatedRoute,
    public UserRegistration: UserRegistrationService,
    public Router: Router,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id")
    console.log(this.id)
    this.getMovie(this.id)
  }

  /**
  * this function calls getMovieByID to fetch the movie data by Id and adds it to movie const.
  * @param id {string}
  */

  getMovie(id: any): void {
      this.UserRegistration.getMovieByID(id).subscribe((resp: any) => {
        this.movie = resp;
        return this.movie;
      });
    }

  /**
   * This function calls sendReviews to send the data from the object review
   * @param review {object}
   */

   letReview(review: any) {
       this.UserRegistration.sendReview(review).subscribe((resp: any) => {
         this.review = resp;
         //console.log(this.movie._id);
         //console.log("review works")
         this.getMovie(this.id)
         return this.review;

       });
     }

  /**
  * This function navigate to movie view
  */
  goBack(): void {
    this.Router.navigate(['movies']);
  }
}
