import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EkipaService {

  uri = 'http://localhost:4000';
  constructor(private http: HttpClient) { }

  unesiEkipuService(naziv, pol, sport, disciplina, nacionalnost, umin, umax) {
    const data = {
      naziv: naziv, pol: pol, sport: sport, disciplina: disciplina, nacionalnost: nacionalnost, umin: umin, umax: umax
    }
    return this.http.post(`${this.uri}/ekipa/unesiEkipu`, data);
  }
  dodajDisciplinuService(naziv, disciplina) {
    const data = {
      naziv: naziv, disciplina: disciplina
    }
    return this.http.post(`${this.uri}/ekipa/dodajDisciplinu`, data);
  }
  dodajUcesnikaService(ucesnik, naziv) {
    const data = {
      ucesnik: ucesnik, naziv: naziv
    }
    return this.http.post(`${this.uri}/ekipa/dodajUcesnika`, data);
  }

  dohvatiEkipePoNacionalnosti(nacionalnost) {
    const data = {
      nacionalnost: nacionalnost

    }
    return this.http.post(`${this.uri}/ekipa/dohvatiEkipePoNacionalnosti`, data);
  }
  prijavaTakmicenjeZemljaDisciplina(zemlja, sport, disciplina, pol) {
    const data = {
      nacionalnost: zemlja, sport: sport, disciplina: disciplina, pol: pol
    }
    return this.http.post(`${this.uri}/ekipa/prijavaTakmicenjeZemljaDisciplina`, data);
  }
  dohvatiEkipuPoImenu(naziv){
    const data={
      naziv
    }
    return this.http.post(`${this.uri}/ekipa/dohvatiEkipuPoImenu`, data);
  }

}
