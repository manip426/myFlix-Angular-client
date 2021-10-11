import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://manpreet-movieapi.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
  // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }
 // Making the api call for the user registration endpoint


 /**
   * Register New User
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  //-------movie review------/
    /**
     * Send Movie review and ratings
     * @param id {object} director id
     * @returns nothing
    */
    public sendReview(reviewDetails: any): Observable<any> {
      console.log(reviewDetails);
      const token = localStorage.getItem('token')
      return this.http.post(
        apiUrl + 'movies/' + reviewDetails.MovieID + '/reviews',
        reviewDetails,
        {
          headers: new HttpHeaders(
            {
              Authorization: 'Bearer ' + token,
            })
        }).pipe(
          catchError(this.handleError)
        );
    }
    
  //-----login
    /**
     * Send a log in request
     * @param {string} username
     * @param {string} password
     * @returns Token and username
     */
    public userLogin(username: any, password: any): Observable<any> {
      return this.http.post('https://manpreet-movieapi.herokuapp.com/login', {
        Username: username,
        Password: password
      }).pipe(catchError(this.handleError)
      );
    }

    //----get movies
  /**
   * this function get all the movies
   * @returns Movies array
   */
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  //------- get Movie by title
  /**
   * this function get a movie by title
   * @param {string} title title of the movie
   * @returns Movie data
   */
  public getMovieByTitle(title: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/' + title, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(map(this.extractResponseData),
      catchError(this.handleError))

  }
  //------- get Movie by id
    /**
     * this function get a movie by id
     * @param {string} _id id of hte movie
     * @returns Movie data
     */
    public getMovieByID(_id: any): Observable<any> {
      const token = localStorage.getItem('token');
      return this.http.get(apiUrl + 'movie/' + 'id/' + _id, {
        headers: new HttpHeaders(
          {
            Authorization: 'Bearer ' + token,
          })
      }).pipe(map(this.extractResponseData),
        catchError(this.handleError))

    }

    //-----add movie to favorites
  /**
   * this function add movie id to favorites
   * @param {string} movieId id of the movie
   */
  public addToFavorites(movieId: any): Observable<any> {
    const token = localStorage.getItem('token');
    console.log(movieId);
    return this.http.post(apiUrl + 'users/movies/' + localStorage.getItem('user') + '/' + movieId, {}, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }),
    }).pipe(
      catchError(this.handleError)
    );
  }

  //-----remove movie from favorites,
  /**
   *
   * @param {string} movieId id of the movie
   * @returns post request
   */
  public removeMovie(movieId: any): Observable<any> {
    const token = localStorage.getItem('token');
    console.log(movieId)
    let user = localStorage.user
    return this.http.post(apiUrl + 'users/movies/' + user + '/' + movieId + '/remove', {}, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }),
    },
    ).pipe(catchError(this.handleError))
  }

  //------Get director
 /**
  * this function get a director by name
  * @param {string} directors directors name
  * @returns directors array with name and bio
  */
 public getDirector(director: string): Observable<any> {
   const token = localStorage.getItem('token');
   return this.http.get(apiUrl + 'director/' + director, {
     headers: new HttpHeaders(
       {
         Authorization: 'Bearer ' + token,
       })
   }).pipe(
     map(this.extractResponseData),
     catchError(this.handleError)
   );
 }

 //------Get genre
  /**
   * get the information about a genre
   * @param genre genre of the movie
   * @returns movie genre Data
   */
  public getGenre(genre: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/' + genre + "/genre", {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }


  //-------Get user
    /**
     * gets the user data
     * @param userName
     * @returns user data
     */
    public getUser(userName: any): Observable<any> {
      const token = localStorage.getItem('token');
      return this.http.get(apiUrl + 'users/' + userName, {
        headers: new HttpHeaders(
          {
            Authorization: 'Bearer ' + token,
          })
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }
    //------ Delete user and
      /**
       * delete user by username
       * @param userName username
       * @returns delete request
       */
      public deleteUser(userName: string): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.delete(apiUrl + '/user/' + userName, {
          headers: new HttpHeaders(
            {
              Authorization: 'Bearer ' + token,
            })
        }).pipe(
          map(this.extractResponseData),
          catchError(this.handleError)
        );
      }

      //------- Edit user
 /**
  * this function update the username
  * @param newUsername
  * @returns put request
  */
 public updateUsername(newUsername: string): Observable<any> {
   const token = localStorage.getItem('token');
   const user = localStorage.getItem('user')
   return this.http.put(apiUrl + 'users/' + user, { Username: newUsername }, {
     headers: new HttpHeaders(
       {
         Authorization: 'Bearer ' + token,
       })
   }).pipe(
     map(this.extractResponseData),
     catchError(this.handleError),

   );
 }
 // Non-typed response extraction
 private extractResponseData(res: Object): any {
   const body = res;
   return body || {};
 }

private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
    'Something bad happened; please try again later.');
  }
}
