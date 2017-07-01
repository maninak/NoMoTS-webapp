import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';

import { AboutPage } from './../pages/about/about';
import { PlayPage } from './../pages/play/play';

@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: {} = AboutPage;

  pages: Array<{title: string, component: {}}>;

  constructor(public platform: Platform) {

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'About', component: AboutPage },
      { title: 'Play', component: PlayPage },
    ];

  }

  openPage(page: {title: string, component: {}}): void {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
