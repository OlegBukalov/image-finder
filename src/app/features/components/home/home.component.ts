import { IFlickrPhoto } from './../../../core/interfaces/photo';
import { Component, ViewChild } from '@angular/core';
import { FlickrService } from './../../../core/services/flickr.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  images: IFlickrPhoto[] = [];
  text = '';
  buttonName = 'Bookmark it!';
  homePage = true;
  lowValue = 0;
  highValue = 12;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor( private flickrService: FlickrService ) { }

  search(text: string): void {
    text = text.trim().toLowerCase();
    if (text && text.length>0) {
      this.flickrService.search(this.text)
        .subscribe((images) => {
          this.images = images;
        })
    }
  }

  handlePage(event: PageEvent): PageEvent {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    return event;
  }

}
