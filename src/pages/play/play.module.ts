import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ObjectKeyValuePipe } from './../../pipes/object-key-value.pipe';
import { PlayPage } from './play';


@NgModule({
  declarations: [
    PlayPage,
    ObjectKeyValuePipe,
  ],
  imports: [
    IonicPageModule.forChild(PlayPage),
  ],
  exports: [
    PlayPage,
  ],
})
export class PlayPageModule {}
