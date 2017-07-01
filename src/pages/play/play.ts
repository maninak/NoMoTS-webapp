import { Component } from '@angular/core';
import { Headers, Http, Request, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@IonicPage()
@Component({
  selector: 'page-play',
  templateUrl: 'play.html',
})
export class PlayPage {
  apiSchema: Object;

  selectedEndpoint: string;
  selectedMethod: string;
  selectedDescription: string;
  selectedMethodProps: Object = {
    id          : '',
    name        : '',
    address     : '',
    city        : '',
    country     : '',
    email       : '',
    phone       : '',
    benef_owners: [],
  };
  benefCount: number;

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

    // if the selected endpoint has only one method, selected automatically for better UX
    let availableMethods: string[] = Object.keys(this.apiSchema[this.selectedEndpoint]);
    if (availableMethods.length === 1) {
      this.selectedMethod = availableMethods[0];
      this.selectedDescription = this.apiSchema[this.selectedEndpoint][this.selectedMethod]['description'];
    } else {
      this.selectedMethod = '';
      this.selectedDescription = '';
    }

    this.benefCount = undefined;
  }

  private onMethodChange(selectedMethod: string): void {
    this.selectedMethod = selectedMethod;
    this.selectedDescription = this.apiSchema[this.selectedEndpoint][this.selectedMethod]['description'];
  }

  private onSendRequest(): void {
    // Initialize response obj
    this.response = { message: undefined, error: undefined };

    // Construct url
    let url: string = `https://nomots.herokuapp.com/api${this.selectedEndpoint}`;
    url = url.replace(/:id/g, this.selectedMethodProps['id']);

    // Construct url params
    let params: URLSearchParams = new URLSearchParams();
    params.set('id', this.selectedMethodProps['id']);

    // Construct headers
    let headers: Headers = new Headers();
    headers.append('Content-Type', 'application/json');

    // Compile everything and create the actual request
    let reqOptionsArgs: RequestOptionsArgs = {
      url: url,
      method: this.selectedMethod,
      search: params,
      headers: headers,
      body: this.selectedMethodProps,
    };
    let reqOptions: RequestOptions = new RequestOptions(reqOptionsArgs);
    let request: Request = new Request(reqOptions);

    // Execute the request and handle the response
    this.http.request(request)
      .toPromise()
      .then( (response: Object) => {
        this.response.message = JSON.parse(response['_body']);
      })
      .catch((error: Error) => {
        this.response.error = error;
      });
  }

  private getArrayOfSize(size: number): [number] {
    // an array of <size> numbers [0, 1, 2, 3, ..., size-1]
    let array: [number] = Array.apply(undefined, {length: size}).map(Number.call, Number);
    return array;
  }

}
