import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@IonicPage()
@Component({
  selector: 'page-companies',
  templateUrl: 'companies.html',
})
export class CompaniesPage {
  apiSchema: Object;

  selectedEndpoint: string;
  selectedAction: string;
  selectedDescription: string;

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public http: Http,
  ) {}

  private ionViewWillLoad(): void {
    this.loadApiSchema();
  }

  private loadApiSchema(): void {
    this.http.get('../../assets/json/NoMoTS-api_schema.json')
      .toPromise()
      .then( (response: Object) => {
        this.apiSchema = JSON.parse(response['_body'].toString());
      });
  }

  private onEndpointChange(event: string): void {
    this.selectedEndpoint = event;
    this.selectedAction = '';
    this.selectedDescription = '';
  }

  private onActionChange(event: string): void {
    this.selectedAction = event;
    this.selectedDescription = this.apiSchema[this.selectedEndpoint][this.selectedAction]['description'];
  }

}
