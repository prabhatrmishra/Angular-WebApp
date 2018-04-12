import {Injectable} from '@angular/core';
import { Http, Response ,} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {Headers} from '@angular/http';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

import { DataService } from './../dataservices';
import { UrlServices } from './../urlservice';
//import {urlservice} from ''

@Injectable(
  
)
export class ProductService {
    headers: Headers = null;
    productStatData: any = {};

    constructor (
      private _http: Http,
      private DataService: DataService,
     private urlServices : UrlServices
    ) {}
  


  getHeader(): Headers {
      if (this.headers === null) {
        this.headers = new Headers({
          "content-type": "application/json",
          //"username": "user",
          "cache-control": "no-cache",
        });
      }
      return this.headers;
    }
 
    createProduct(product : any) :Promise<any>{
        const headers: Headers = this.getHeader();
        let _url = this.urlServices.urls.baseConfigUrl  + this.urlServices.urls.product.create
         console.log(_url);
         return this._http.post(_url,JSON.stringify(product),{headers} )
         .map((res: Response) =>{
           if(res != null){
             return [{ status: res.status, json: res.json() }]
           }
         }).toPromise()
   }
    


}

 

