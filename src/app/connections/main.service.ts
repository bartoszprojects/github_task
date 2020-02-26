import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import 'rxjs';
import {interval, Subject} from 'rxjs';
import {switchMap, map, tap, share, shareReplay, flatMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  constructor(private http: HttpClient) {}

  getDataFromBackend(url) {
    const httpOptions = {
      headers: new HttpHeaders({
/*        'Authorization': 'Token YOU HAVE TO PROVIDE YOUR GITHUB TOKEN TO EXTEND LIMIT OF CONNECTIONS'*/
      })
    };
    return this.http.get(url, httpOptions)
  }
}
