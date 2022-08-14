import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ZemljaService {

  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  dohvatiSveZemljeService() {
    return this.http.get(`${this.uri}/zemlje/dohvatiSveZemlje`);
  }

  incZ(ime) {
    const data = {
      ime
    }
    return this.http.post(`${this.uri}/zemlje/incZ`, data);
  }
  incS(ime) {
    const data = {
      ime
    }
    return this.http.post(`${this.uri}/zemlje/incS`, data);
  }
  incB(ime) {
    const data = {
      ime
    }
    return this.http.post(`${this.uri}/zemlje/incB`, data);
  }
  incU(ime) {
    const data = {
      ime
    }
    return this.http.post(`${this.uri}/zemlje/incU`, data);
  }
}
