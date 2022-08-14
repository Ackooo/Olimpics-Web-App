import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SportService {


uri = 'http://localhost:4000';
constructor(private http: HttpClient) { }

dohvatiSveSportService() {
 
  return this.http.get(`${this.uri}/sport/dohvatiSveSport`);
}



unesiSportService(naziv) {
  const data = {
    naziv: naziv
  }
  return this.http.post(`${this.uri}/sport/unesiSport`, data);
}

}