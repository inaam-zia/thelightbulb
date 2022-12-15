import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FetchDataService {
  constructor(private http: HttpClient) {}
  url: any = 'https://ml.thelightbulb.ai/api/employees';
  getDetail() {
    return this.http.get(this.url);
  }
  addUser(data: any) {
    return this.http.post(this.url, data);
  }
  updateUser(data: any, id: any) {
    return this.http.put(this.url + '/' + id, data);
  }
  recordById(id: any) {
    return this.http.get(this.url + '/' + id);
  }
}
