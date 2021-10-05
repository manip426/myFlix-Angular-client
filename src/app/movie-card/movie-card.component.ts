import { Component, OnInit } from '@angular/core';
import { ApiDataService } from '../fetch-api-data.service'
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];

  constructor(
    public fetchApiData: ApiDataService,
    public Router: Router,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getMovies();
  }

  /**
  * this function calls getMovies to fetch the movies and adds it to movies const.
  */

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
  * this function calls addToFavorites to add id of favorite movies to favorites
  * @param movieId {string}
  */

  toFavorites(movieId: any): void {
    this.fetchApiData.addToFavorites(movieId).subscribe((resp: any) => {
      console.log(movieId + " added to favorites")
    })

  }

  /**
  * This function navigates to genre view
  */

  goToGenre(genre: any): void {
    this.Router.navigate([genre]);
  }

  /**
  * This function navigates to director view
  */

  goToDirector(director: any): void {
    this.Router.navigate([director]);
  }

  /**
  * This function navigate to Synopsys view
  */

  goToSynopsis(synopsis: any): void {
    this.Router.navigate([synopsis]);
  }

}
