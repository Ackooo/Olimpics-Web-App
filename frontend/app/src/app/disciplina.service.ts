import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DisciplinaService {

  uri = 'http://localhost:4000'

  constructor(private http: HttpClient) { }

  unesiDisciplinuService(naziv, sport, vrsta,  format) {
    const data = {
      naziv: naziv, sport: sport, vrsta: vrsta, format: format
    }
    return this.http.post(`${this.uri}/disciplina/unesiDisciplinu`, data);
  }

  pretraziDisciplinuService(ime, zemlja, sport, disciplina, pol, osvajac) {
    const data = {
      ime: ime, zemlja: zemlja, sport: sport, disciplina: disciplina, pol: pol, osvajac: osvajac
    }
    return this.http.get(`${this.uri}/disciplina/pretraziDisciplinu`);
  }

  dohvatiSveDisciplineService(){
    return this.http.get(`${this.uri}/disciplina/dohvatiSveDiscipline`);
  }
  dohvatiSveDisciplineImeService(sport){
    return this.http.post(`${this.uri}/disciplina/dohvatiSveDisciplineIme/`, {sport:sport});
  }

}