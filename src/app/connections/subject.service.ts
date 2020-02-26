import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
    stored_url;
    private subject = new Subject<any>();

    createNext(url) {
      this.stored_url = url;
        this.subject.next(url);
        console.log(url)
    }

    getData() {
        return this.subject;
    }

    storeUrl(url) {
      this.stored_url = url
    }

    getUrl() {
      return this.stored_url
    }
    complete() {
      return this.subject.complete()
    }

    error() {
      return this.subject.error('Er')
    }
}
