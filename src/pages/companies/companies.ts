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
  selectedActionProps: Object = {
    id: '',
    name: '',
    address: '',
    city: '',
    country: '',
    email: '',
    phone: '',
    benef_owners: '',
  };

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

  private onEndpointChange(selectedEndpoint: string): void {
    this.selectedEndpoint = selectedEndpoint;
    this.selectedAction = '';
    this.selectedDescription = '';
  }

  private onActionChange(selectedAction: string): void {
    this.selectedAction = selectedAction;
    this.selectedDescription = this.apiSchema[this.selectedEndpoint][this.selectedAction]['description'];
  }

  private onSendRequest(): void {

    // to get the id param do propertiesForm['value'].id;
    // TODO implement
  }

}
