import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RekordService {

  uri = 'http://localhost:4000';
  constructor(private http: HttpClient) { }

  dohvatiRekordeService(){
    return this.http.get(`${this.uri}/rekordi/dohvatiRekorde`);
  }
}
