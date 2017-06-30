import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { PlayPage } from './../play/play';


@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl:  'about.html',
})
export class AboutPage {

  constructor(private navCtrl: NavController) {}

  private onPlayClick(): void {
    this.navCtrl.setRoot(PlayPage);
  }

  private onLearnMoreClick(): void {
    window.open('https://github.com/maninak/NoMoTS-api', '_blank').focus();
  }

}
