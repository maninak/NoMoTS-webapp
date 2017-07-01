import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { SuperTabsController } from 'ionic2-super-tabs/dist';

import { TabsPage } from './../tabs/tabs';


@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl:  'about.html',
})
export class AboutPage {

  constructor(
    private superTabsCtrl: SuperTabsController,
    private tabsPage: TabsPage,
  ) {}

  private onPlayClick(): void {
    this.superTabsCtrl.slideTo(0);
    this.tabsPage.currentTabIndex = 0;
  }

  private onLearnMoreClick(): void {
    window.open('https://github.com/maninak/NoMoTS-api', '_blank').focus();
  }

}
