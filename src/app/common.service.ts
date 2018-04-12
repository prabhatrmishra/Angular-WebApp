import { Injectable, Inject } from '@angular/core';
import { Subject } from 'rxjs/Subject';
@Injectable()
export class CommonService {

  private notify = new Subject<any>();
  notifyObservable$ = this.notify.asObservable();

  private notifyEntityAdded = new Subject<any>();
  notifyEntityAdded$ = this.notifyEntityAdded.asObservable();

  private notifySessionIdExpired = new Subject<any>();
  notifySessionIdExpired$ = this.notifySessionIdExpired.asObservable();

  constructor() { }

  notifyOther(data: any) {
    if (data) {
      this.notify.next(data);
    }
  }

  notifyEntityAddedOther(data: any) {
    if (data) {
      this.notifyEntityAdded.next(data);
    }
  }

  notifySessionIdExpiredOther(data: any) {
    if (data) {
      this.notifySessionIdExpired.next(data);
    }
  }
}
