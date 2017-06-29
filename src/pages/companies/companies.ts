import { Component } from '@angular/core';
import { Headers, Http, Request, RequestOptions, RequestOptionsArgs } from '@angular/http';
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
    id          : '',
    name        : '',
    address     : '',
    city        : '',
    country     : '',
    email       : '',
    phone       : '',
    benef_owners: [],
  };

  response: { message: JSON, error: Error };

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
        this.apiSchema = JSON.parse(response['_body']);
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
    // Initialize response obj
    this.response = { message: undefined, error: undefined };

    // Construct url
    let url: string = `https://nomots.herokuapp.com/api${this.selectedEndpoint}`;
    url = url.replace(/:id/g, this.selectedActionProps['id']);

    // Construct url params
    let params: URLSearchParams = new URLSearchParams();
    params.set('id', this.selectedActionProps['id']);

    // Construct headers
    let headers: Headers = new Headers();
    headers.append('Content-Type', 'application/json');

    // Compile everything and create the actual request
    let reqOptionsArgs: RequestOptionsArgs = {
      url: url,
      method: this.selectedAction,
      search: params,
      headers: headers,
      body: this.selectedActionProps,
    };
    let reqOptions: RequestOptions = new RequestOptions(reqOptionsArgs);
    let request: Request = new Request(reqOptions);

    // Execute the request and handle the response
    this.http.request(request)
      .toPromise()
      .then( (response: Object) => {
        this.response.message = JSON.parse(response['_body']);
        console.log (this.response); // TODO delete
      })
      .catch((error: Error) => {
        this.response.error = error;
        console.warn (this.response.error); // TODO delete
      });
  }

}
