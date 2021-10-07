import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service'
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UpdateUserdataComponent } from '../update-userdata/update-userdata.component'

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit {
  userData: any = '';
  movies: any = [];
  favoriteMovies: any;
  favMoviesName: any = [];

  constructor(
    public fetchApiData: UserRegistrationService,
    public Router: Router,
    public dialog: MatDialog
  ) {

  }

  ngOnInit(): void {
    this.getUser()
  }


  /**
   * this function calls getUser to fetch userData and  adds the favoriteMovies to this.FavoriteMovies Array
  */
  getUser(): void {
    let userName = localStorage.getItem('user')
    this.fetchApiData.getUser(userName).subscribe((resp: any) => {
      this.userData = resp;
      this.favoriteMovies = resp.FavoriteMovies
      console.log(this.favoriteMovies);
      this.getMovies()
      return this.userData;
    });
  }

  /**
  * this function calls getMovies to fetch the movies and adds it to movies const. and calls getFavoritesMoviesName
  */

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies)
      this.getFavoriteMoviesName()
      return this.movies
    })
  }

  /**
   * this function search in this.movies each favorite movie by Id and creates the favMoviesName array with names and  movie_Id
  */
  getFavoriteMoviesName(): void {
    let favMovies: any = this.favoriteMovies
    console.log(favMovies)

    favMovies.map((X: any) => {
      let pelis = this.movies
      let movieId = X
      console.log(movieId)
      let found = pelis.find((element: any) => element._id === movieId)
      console.log(found)
      this.favMoviesName.push(found)
    })
    console.log(this.favMoviesName)
  }

  /**
   * this functions opens the update user data dialog
  */

  openUserUpdateDialog(): void {
    this.dialog.open(UpdateUserdataComponent, { width: '280px' })
  }

  /**
   *  this function calls removeMovie endpoint to remove the movie by ID
   * @param id {string}
   * @param index {number}
   */
  deleteMovie(id: any, index: any): void {
    this.fetchApiData.removeMovie(id).subscribe((resp: any) => {
      console.log(this.favMoviesName)
      this.favMoviesName.splice(index, 1)
      console.log(this.favMoviesName)
    })
  }

  /**
* This function navigate to movie view
*/

  goBack(): void {
    this.Router.navigate(['movies']);
  }
}
