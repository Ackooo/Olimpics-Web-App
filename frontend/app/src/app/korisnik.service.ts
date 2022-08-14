import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class KorisnikService {
  ulogovan: boolean;
  uri = 'http://localhost:4000'
  constructor(private http: HttpClient, private ruter: Router) {
    let korisnik = JSON.parse(localStorage.getItem('ulogovan'));
    if (korisnik) { this.ulogovan = true };
  }

  signInService(korIme, lozinka) {
    const data = {
      korIme: korIme, lozinka: lozinka, odobren: 1
    }
    return this.http.post(`${this.uri}/korisnik/login`, data);
  }

  registerUserService(korIme, lozinka, ime, prezime, nacionalnost, Eadresa, tip) {
    let odobren:Number;
    if (tip == "organizator") odobren = 1; else odobren = 0;
    const data = {
      korIme: korIme, lozinka: lozinka, ime: ime, prezime: prezime,
      nacionalnost: nacionalnost, Eadresa: Eadresa, tip: tip, odobren: odobren, brojd: 0
    }
    return this.http.post(`${this.uri}/korisnik/register`, data);
    //saljemo post zahtev ka localhost i prosledjujemo podatke
  }

  odobriKorisnikaService(korIme) {
    const data = {
      korIme: korIme
    }
    return this.http.post(`${this.uri}/korisnik/odobriKorisnika`, data);
  }
  obrisiKorisnikaService(korIme) {
    const data = {
      korIme: korIme
    }
    return this.http.post(`${this.uri}/korisnik/obrisiKorisnika`, data);
  }

  dohvatiSveKorisnikeService() {
    return this.http.get(`${this.uri}/korisnik/dohvatiSveKorisnike`);
  }

  promeniLozinkuService(korIme, lozinka, nova1) {
    const data = {
      korIme: korIme, lozinka: lozinka, nova1: nova1
    }
    return this.http.post(`${this.uri}/korisnik/promeniLozinku`, data);
  }

  dohvatiSveDelegate() {
    return this.http.get(`${this.uri}/korisnik/dohvatiSveDelegate`);
  }
  delegatTakmicenje(korIme) {
    const data = {
      korIme: korIme
    }
    return this.http.post(`${this.uri}/korisnik/delegatTakmicenje`, data);
  }

  odjaviSe() {
    localStorage.clear();
    this.ulogovan = false;
    this.ruter.navigate(['']);
  }




}
