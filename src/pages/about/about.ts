import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl:  'about.html',
})
export class AboutPage {
  conferenceDate: string = '2047-05-17';

  constructor(
      private navCtrl    : NavController,
  ) {}

}
