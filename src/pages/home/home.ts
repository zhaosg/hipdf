import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  pdfSrc: string = 'assets/1.pdf';
  page: number = 1;
  zoom: number = 0.95;
  showAll: boolean = true;

  constructor(public navCtrl: NavController) {
    PDFJS.cMapUrl = "assets/cmaps/";
    PDFJS.cMapPacked = true;
  }

  back() {
    if (this.page > 1)
      this.page = this.page - 1;
  }

  next() {
    this.page = this.page + 1;
  }
}
