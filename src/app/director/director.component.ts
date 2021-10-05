import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiDataService } from '../fetch-api-data.service'
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.scss']
})
export class DirectorComponent implements OnInit {
  name: any = '';
  director: any = '';


  constructor(
    private route: ActivatedRoute,
    public fetchApiData: ApiDataService,
    public Router: Router,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.name = this.route.snapshot.paramMap.get("name");
    console.log(this.name);
    this.getDirector(this.name);
  }

  /**
   * this function calls getDirector to fetch the director data by Id and adds it to director const.
   * @param id {string} director id
   * @returns director data
   */

  getDirector(id: any): void {
    this.fetchApiData.getDirector(id).subscribe((resp: any) => {
      this.director = resp;
      console.log(this.director.Name);
      return this.director;
    });
  }

  /**
   * This function navigate to movie view
   */
  goBack(): void {
    this.Router.navigate(['movies']);
  }
}
