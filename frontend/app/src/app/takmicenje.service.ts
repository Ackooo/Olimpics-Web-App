import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TakmicenjeService {
  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  unesiTakmicenjeService(sport, disciplina, pol, datPoc, datKraj, tip, delegat, format, forma) {
    let uneto;
    if (format == "g") uneto = 0;
    if (format == "qf") uneto = 5;
    if (format == "sf") uneto = 6;
    if (format == "f") uneto = 7;

    const data = {
      sport: sport, disciplina: disciplina, pol: pol, datPoc: datPoc, datKraj: datKraj, tip: tip, delegat: delegat, formirano: 0, format: format, uneto: uneto, forma: forma
    }
    return this.http.post(`${this.uri}/takmicenje/unesiTakmicenje`, data);
  }

  formirajTakmicenjeService(sport, disciplina, pol) {
    const data = {
      sport: sport, disciplina: disciplina, pol: pol
    }
    return this.http.post(`${this.uri}/takmicenje/formirajTakmicenje`, data);
  }

  dohvatiSvaTakmicenjaFormiranje() {
    return this.http.get(`${this.uri}/takmicenje/dohvatiSveFormiranje`);
  }

  dohvatiSvaTakmicenjaDelegat(korIme) {
    const data = {
      delegat: korIme
    }
    return this.http.post(`${this.uri}/takmicenje/dohvatiSveDelegat`, data);
  }

  unesiEkipu(ime, sport, disciplina, pol, form, brojId) {
    const data = {
      ime: ime, sport: sport, disciplina: disciplina, pol: pol, form: form, brojId:brojId
    }
    return this.http.post(`${this.uri}/takmicenje/unesiEkipu`, data);
  }

  odbaciEkipu(ime, sport, pol, disciplina) {
    const data = {
      ime, sport, pol, disciplina
    }
    console.log(data)
    return this.http.post(`${this.uri}/takmicenje/odbaciEkipu`, data);
  }
  unesiRaspored(format, datum, vreme, lokacija, sport, disciplina, pol) {
    const data = {
      format: format, datum: datum, vreme: vreme, lokacija: lokacija, sport: sport, disciplina: disciplina, pol: pol
    }
    return this.http.post(`${this.uri}/takmicenje/unesiRaspored`, data);
  }
  pokreniAlgoritam(sport, disciplina, pol, format) {
    const data = {
      format: format, sport: sport, disciplina: disciplina, pol: pol
    }
    console.log(data);
    return this.http.post(`${this.uri}/takmicenje/pokreniAlgoritam`, data);
  }

  unesiRezG(e1, e2, e3, e4, e5, e6, e7, e8, e9, e10, e11, e12, r1, r2, r3, r4, r5, r6, r7, r8, r9, r10, r11, r12, sport, pol, disciplina, uneto) {
    const data = {
      nizIme: [e1, e2, e3, e4, e5, e6, e7, e8, e9, e10, e11, e12], nizRez: [r1, r2, r3, r4, r5, r6, r7, r8, r9, r10, r11, r12], sport, pol, disciplina, uneto
    }
    return this.http.post(`${this.uri}/takmicenje/unesiRezG`, data);
  }
  unesiRezQ(e1, e2, e3, e4, e5, e6, e7, e8, r1, r2, r3, r4, r5, r6, r7, r8, sport, pol, disciplina, uneto) {
    const data = {
      nizIme: [e1, e2, e3, e4, e5, e6, e7, e8], nizRez: [r1, r2, r3, r4, r5, r6, r7, r8], sport, pol, disciplina, uneto
    }
    console.log(data);
    return this.http.post(`${this.uri}/takmicenje/unesiRezQ`, data);
  }
  unesiRezS(e1, e2, e3, e4, r1, r2, r3, r4, sport, pol, disciplina, uneto) {
    const data = {
      nizIme: [e1, e2, e3, e4], nizRez: [r1, r2, r3, r4], sport, pol, disciplina, uneto
    }
    return this.http.post(`${this.uri}/takmicenje/unesiRezS`, data);
  }
  unesiRezF(e1, r1, sport, pol, disciplina, uneto) {
    const data = {
      e1, r1, sport, pol, disciplina, uneto
    }
    return this.http.post(`${this.uri}/takmicenje/unesiRezF`, data);
  }

  promoteG(sport, pol, disciplina, ime1, ime2, ime3, ime4, ime5, ime6, ime7, ime8, ime10, ime11, ime12, ime13) {
    const data = {
      sport, pol, disciplina, nizIme: [ime1, ime2, ime3, ime4, ime5, ime6, ime7, ime8], nizIme2: [ime10, ime11, ime12, ime13]
    }
    return this.http.post(`${this.uri}/takmicenje/promoteG`, data);
  }
  promoteQ(sport, pol, disciplina, maxqf1, maxqf2, maxqf3, maxqf4) {
    const data = {
      sport, pol, disciplina, maxqf1, maxqf2, maxqf3, maxqf4
    }
    return this.http.post(`${this.uri}/takmicenje/promoteQ`, data);
  }
  promoteS(sport, pol, disciplina, maxqf1, maxqf2, minqf1, minqf2) {
    const data = {
      sport, pol, disciplina, maxqf1, maxqf2, minqf1, minqf2
    }
    return this.http.post(`${this.uri}/takmicenje/promoteS`, data);
  }
  updateRezGrupaQ(sport, pol, disciplina) {
    const data = {
      sport, pol, disciplina
    }
    return this.http.post(`${this.uri}/takmicenje/updateRezGrupaQ`, data);
  }
  updateRezQS(sport, pol, disciplina) {
    const data = {
      sport, pol, disciplina
    }
    return this.http.post(`${this.uri}/takmicenje/updateRezQS`, data);
  }

  dohvatiTakmicenje(sport, pol, disciplina) {
    const data = {
      sport, pol, disciplina
    }
    return this.http.post(`${this.uri}/takmicenje/dohvatiTakmicenje`, data);
  }
  takm10(sport, pol, disciplina) {
    const data = {
      sport, pol, disciplina
    }
    return this.http.post(`${this.uri}/takmicenje/takm10`, data);
  }
}
