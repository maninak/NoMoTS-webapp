import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SuperTabsModule } from 'ionic2-super-tabs';


import { AboutPageModule } from './../about/about.module';
import { PlayPageModule } from './../play/play.module';
import { TabsPage } from './tabs';


@NgModule({
  declarations: [
    TabsPage,
  ],
  imports: [
    PlayPageModule,
    AboutPageModule,
    IonicPageModule.forChild(TabsPage),
    SuperTabsModule.forRoot(),
  ],
  exports: [
    TabsPage,
  ],
})
export class TabsPageModule {}
