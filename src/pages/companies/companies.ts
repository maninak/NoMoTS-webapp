import { Component } from '@angular/core';
import { Headers, Http } from '@angular/http';
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
    let headers: Headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.http.get(`https://nomots.herokuapp.com/api${this.selectedEndpoint}`, { headers: headers })
      .toPromise()
      .then( (response: Object) => {
        console.log (JSON.parse(response['_body'].toString()));
      });
  }

}
