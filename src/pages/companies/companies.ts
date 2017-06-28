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
  endpoints: [string];
  actions: [string];

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public http: Http,
  ) {}

  onEndpointChange(event: string): void {
    let actionsObj: Object = this.apiSchema[event];

    let isDirty: boolean = true;
    // iterate through api request schema and configure actions
    for (let action in actionsObj) {
      if ((this.actions !== undefined) && isDirty) {
        this.actions.length = 0; // empty array to erase possible old entries from older endpoint selection
        isDirty = false;
      }
      if (this.actions === undefined) {
        // if array is undefined then instantiate it
        this.actions = [action.toUpperCase()];
      } else {
        this.actions.push(action.toUpperCase());
      }
    }
  }

  private ionViewWillLoad(): void {
    this.loadApiSchema();
  }

  private loadApiSchema(): void {
    this.http.get('../../assets/json/NoMoTS-api_schema.json')
      .toPromise()
      .then( (response: Object) => {
        this.apiSchema = JSON.parse(response['_body'].toString());

        // iterate through api request schema and configure endpoints
        for (let endpoint in this.apiSchema) {
          if (this.endpoints === undefined) {
            // if array is undefined then instantiate it
            this.endpoints = [endpoint];
          } else {
            this.endpoints.push(endpoint);
          }
        }
      });
  }

}
