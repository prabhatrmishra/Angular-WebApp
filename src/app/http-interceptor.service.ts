import { CommonService } from './common.service';
import { Injectable } from '@angular/core';
import { Request, XHRBackend, RequestOptions, Response, Http, RequestOptionsArgs, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class HttpInterceptorService extends Http {

  constructor(
    backend: XHRBackend,
    defaultOptions: RequestOptions,
    private commonService: CommonService,
  ) {
    super(backend, defaultOptions);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    // do whatever
    if (typeof url === 'string') {
      if (!options) {
        options = { headers: new Headers() };
      }
      this.setHeaders(options);
    } else {
      this.setHeaders(url);
    }

    return super.request(url, options).catch(this.catchErrors());
  }

  private catchErrors() {
    return (res: Response) => {
      if (res.status === 511) {
        // handle authorization errors
        // in this example I am navigating to logout route which brings the login screen
        console.log('----------------error from interceptor--------------------------');
        this.commonService.notifySessionIdExpiredOther( { session: 'expired' } );
      }
      return Observable.throw(res);
    };
  }

  private setHeaders(objectToSetHeadersTo: Request | RequestOptionsArgs) {
    // add whatever header that you need to every request
    // in this example I add header token by using authService that I've created
    // objectToSetHeadersTo.headers.set('Token', this.authService.getToken());
  }
}
