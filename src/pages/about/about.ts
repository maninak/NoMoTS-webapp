import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { CompaniesPage } from './../companies/companies';


@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl:  'about.html',
})
export class AboutPage {

  constructor(
      private navCtrl: NavController,
  ) {}

  private onPlayClick(): void {
    this.navCtrl.setRoot(CompaniesPage);
  }

  private onLearnMoreClick(): void {
    window.open('https://github.com/maninak/NoMoTS-api', '_blank').focus();
  }

}
