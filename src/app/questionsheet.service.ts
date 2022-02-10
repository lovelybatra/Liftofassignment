import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, of} from 'rxjs';
declare const getquestionlist: any;
@Injectable({
  providedIn: 'root'
})
export class QuestionsheetService {

  constructor(private http : HttpClient) { }

  getdata() : Observable<any>
  {
   
    return of(getquestionlist()).pipe();
  }


}


