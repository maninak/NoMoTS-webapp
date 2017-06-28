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

  private onEndpointChange(event: string): void {
    this.selectedEndpoint = event;

    let actionsObj: Object = this.apiSchema[event];
    let isDirty: boolean = true;

    if (this.selectedAction !== undefined) {
      // this.mitsos.nativeElement.options[this.mitsos.nativeElement.selectedIndex].value = '';
    }
    // iterate through api request schema and configure actions
    for (let action in actionsObj) {
      if (isDirty || (this.actions === undefined)) {
        // if array is dirty or undefined then reset any previous selections
        this.selectedAction = '';
        this.selectedDescription = '';
        this.actions = [action];
        isDirty = false;
      } else {
        this.actions.push(action);
      }
    }
  }

  private onActionChange(event: string): void {
    this.selectedAction = event;
    this.selectedDescription = this.apiSchema[this.selectedEndpoint][this.selectedAction]['description'];
  }

}
