import { HttpClient } from '@angular/common/http';
import { importExpr } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UcesnikService {

  uri = 'http://localhost:4000';
  constructor(private http: HttpClient) { }

  pretraziUcesnikeService(ime, zemlja, sport, disciplina, pol, osvajac) {
    const data = {
      ime: ime, zemlja: zemlja, sport: sport, disciplina: disciplina, pol: pol, osvajac: osvajac
    }
    return this.http.post(`${this.uri}/ucesnik/pretraziUcesnike`, data);
  }

  unesiUcesnikaService(ime, zemlja, sport, pol) {
    const data = {
      ime: ime, zemlja: zemlja, sport: sport, pol: pol, medalja: 0
    }
    return this.http.post(`${this.uri}/ucesnik/unesiUcesnike`, data);
  }
  dodajDisciplinuService(ime, disciplina) {
    const data = {
      ime: ime, disciplina: disciplina
    }
    return this.http.post(`${this.uri}/ucesnik/dodajDisciplinu`, data);
  }
  dohvatiUcesnikePoNacionalnosti(zemlja) {
    const data = {
      zemlja: zemlja
    }
    return this.http.post(`${this.uri}/ucesnik/dohvatiUcesnikePoNacionalnosti`, data);
  }
  dohvatiUcesnikePoZemljiDisciplini(zemlja, disciplina){
    const data={
      zemlja:zemlja, disciplina:disciplina
    }
    return this.http.post(`${this.uri}/ucesnik/dohvatiUcesnikePoZemljiDisciplini`, data);
  }
  prijavaTakmicenjeZemljaDisciplina(zemlja, sport, disciplina, pol){
    const data = {
      zemlja: zemlja, sport: sport, disciplina: disciplina, pol: pol
    }
    return this.http.post(`${this.uri}/ucesnik/prijavaTakmicenjeZemljaDisciplina`, data);
  }
  dohvatiBrojUcesnika(zemlja){
    const data={
      zemlja:zemlja
    }
    return this.http.post(`${this.uri}/ucesnik/dohvatiBrojUcesnika`, data);
  }
  dohvatiBrojUcesnikaSport(zemlja, sport){
    const data={
      zemlja:zemlja, sport:sport
    }
    return this.http.post(`${this.uri}/ucesnik/dohvatiBrojUcesnikaSport`, data);
  }
  pretraziUcesnikeDisciplina(zemlja, disciplina){
    const data={
      zemlja:zemlja, disciplina:disciplina
    }
    return this.http.post(`${this.uri}/ucesnik/pretraziUcesnikeDisciplina`, data);
  }
  incMedalje(ime){
    const data={
      ime:ime
    }
     return this.http.post(`${this.uri}/ucesnik/incMedalje`, data);
  }
}


