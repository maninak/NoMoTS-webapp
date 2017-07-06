import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { AboutPage } from './../about/about';
import { PlayPage } from './../play/play';


@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  play: Component = PlayPage;
  about: Component = AboutPage;

  currentTabIndex: number = 0;
  headerTitles: string[] = [
    'Play with NoMoTS API',
    'About',
  ];

  constructor() {}

  private onTabSelect(selectedTabIndex: number): void {
    this.currentTabIndex = selectedTabIndex;
  }
}
