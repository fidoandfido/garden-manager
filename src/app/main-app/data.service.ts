import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Data } from './model/data';

@Injectable({
  // Create just one of these at the root level
  providedIn: 'root',
})

export class DataService {

  private dataUrl = 'api/data';  // URL to web api

  constructor(private http: HttpClient) { }

  /** GET data from the server */
  getData(): Observable<Data[]> {
    return this.http.get<Data[]>(this.dataUrl);
  }
}
