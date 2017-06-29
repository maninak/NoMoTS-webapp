import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ObjectKeyValuePipe } from './../../pipes/object-key-value.pipe';
import { CompaniesPage } from './companies';


@NgModule({
  declarations: [
    CompaniesPage,
    ObjectKeyValuePipe,
  ],
  imports: [
    IonicPageModule.forChild(CompaniesPage),
  ],
  exports: [
    CompaniesPage,
  ],
})
export class CompaniesPageModule {}
