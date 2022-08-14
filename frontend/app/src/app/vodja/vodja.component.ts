import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DisciplinaService } from '../disciplina.service';
import { EkipaService } from '../ekipa.service';
import { KorisnikService } from '../korisnik.service';
import { Disciplina } from '../models/disciplina';
import { Ekipa } from '../models/ekipa';
import { Korisnik } from '../models/korisnik';
import { Sport } from '../models/sport';
import { Takmicenje } from '../models/takmicenje';
import { Ucesnik } from '../models/ucesnik';
import { Zemlja } from '../models/zemlja';
import { SportService } from '../sport.service';
import { TakmicenjeService } from '../takmicenje.service';
import { UcesnikService } from '../ucesnik.service';
import { ZemljaService } from '../zemlja.service';

@Component({
  selector: 'app-vodja',
  templateUrl: './vodja.component.html',
  styleUrls: ['./vodja.component.css']
})
export class VodjaComponent implements OnInit {

  constructor(public ruter: Router, public korisnikService: KorisnikService, private sportService: SportService, private disciplinaService: DisciplinaService,
    private ucesnikService: UcesnikService, private zemljaService: ZemljaService, private ekipaService: EkipaService, private takmicenjeService: TakmicenjeService) { }

  ngOnInit(): void {
    this.korisnik = JSON.parse(localStorage.getItem('ulogovan'));
    this.nacionalonst = this.korisnik.nacionalnost;
    this.ucesnikSport();
    this.ekipaSport();
    this.ekipaDohvatiSve();
    this.prijavaDohvatiTakmicenja;
    this.dohvatiBrojClanova();

  }
  korisnik: Korisnik;

  nacionalonst: String;
  zemlja: Zemlja;

  broj: Number;

  dsport: Sport;
  //ucesnik
  ulistaSport: Sport[];
  ulistaZemlja: Zemlja[];
  uime: String;
  usport: Sport;
  udisciplina: String;
  upol: String;

  ulistaUcesnika: Ucesnik[];
  ulistaDisciplina: Disciplina[];
  dime: Ucesnik;
  ddisciplina: Disciplina;
  //ekipa
  elistaSport: Sport[];
  enaziv: String;
  eucesnik: String;
  epol: String;
  esport: Sport;
  edisciplina: Disciplina;
  umin: Number;
  umax: Number;

  elistaDisciplina: Disciplina[];
  elistaEkipa: Ekipa[];
  elistaUcesnika: Ucesnik[];
  eUcesnik: Ucesnik;

  enaziv2: Ekipa;
  //prijava
  plistaTakmicenja: Takmicenje[];
  plistaEkipa: Ekipa[];
  plistaUcesnika: Ucesnik[];
  pTakmicenje: Takmicenje;
  pEkipa: Ekipa;
  pEkipaIme: String;
  pUcesnikIme: String;
  pUcesnik: Ucesnik;

  pBoolUc: boolean;
  pBoolEk: boolean;
  //
  unesiUcesnikActive: boolean;
  unesiEkipaActive: boolean;
  prijavaEkipaActive: boolean;
  pregledActive: boolean;

  listaUcesnika: Ucesnik[];
  listaSport: Sport[];
  listaDisciplina: Disciplina[];

  toggleUcesnikActive() {
    if (this.unesiUcesnikActive) this.unesiUcesnikActive = false; else {
      this.unesiUcesnikActive = true;
      this.unesiEkipaActive = false;
      this.prijavaEkipaActive = false;
      this.pregledActive = false;

      this.dohvatiUcesnike();

    };
  }
  toggleEkipactive() {
    if (this.unesiEkipaActive) this.unesiEkipaActive = false; else {
      this.unesiEkipaActive = true;
      this.unesiUcesnikActive = false;
      this.prijavaEkipaActive = false;
      this.pregledActive = false;
      this.ekipaDohvatiSve();
      this.ekipaDohvatiUcesnike();
    };
  }
  togglePrijavactive() {
    if (this.prijavaEkipaActive) this.prijavaEkipaActive = false; else {
      this.prijavaEkipaActive = true;
      this.unesiUcesnikActive = false;
      this.unesiEkipaActive = false;
      this.pregledActive = false;
      this.prijavaDohvatiTakmicenja();
    };
  }
  togglePregledctive() {
    if (this.pregledActive) this.pregledActive = false; else {
      this.unesiUcesnikActive = false;
      this.unesiEkipaActive = false;
      this.prijavaEkipaActive = false;
      this.pregledActive = false;
      this.SearchSport();
    };
  }
  ucesnikSport() {
    this.sportService.dohvatiSveSportService().subscribe((data: Sport[]) => {

      this.ulistaSport = data;
      this.ulistaSport.sort(
        (b, a) => a.naziv > b.naziv ? -1 : (a.naziv > b.naziv ? 1 : 0)
      );
    })
  }
  ekipaSport() {
    this.sportService.dohvatiSveSportService().subscribe((data: Sport[]) => {

      this.elistaSport = data;
      this.elistaSport.sort(
        (b, a) => a.naziv > b.naziv ? -1 : (a.naziv > b.naziv ? 1 : 0)
      );
    })
  }
  ekipaDisciplina() {
    if (this.esport) {
      this.disciplinaService.dohvatiSveDisciplineImeService(this.esport.naziv).subscribe((data: Disciplina[]) => {
        this.elistaDisciplina = data;
        this.elistaDisciplina.sort(
          (b, a) => a.naziv > b.naziv ? -1 : (a.naziv > b.naziv ? 1 : 0)
        );
      })
    }
  }
  ekipaDohvatiUcesnike() {
    this.ucesnikService.dohvatiUcesnikePoZemljiDisciplini(this.nacionalonst, this.enaziv2.disciplina).subscribe((data: Ucesnik[]) => {
      this.elistaUcesnika = data;
      this.elistaUcesnika.sort(
        (b, a) => a.ime > b.ime ? -1 : (a.ime > b.ime ? 1 : 0)
      )
    })
  }
  ekipaDohvatiSve() {
    this.ekipaService.dohvatiEkipePoNacionalnosti(this.nacionalonst).subscribe((data: Ekipa[]) => {
      this.elistaEkipa = data;
      this.elistaEkipa.sort(
        (b, a) => a.naziv > b.naziv ? -1 : (a.naziv > b.naziv ? 1 : 0)
      )
    })
  }
  unesiEkipu() {
    if (this.enaziv) {
      if (this.epol) {
        if (this.esport) {
          if (this.edisciplina) {

            if (this.edisciplina.format == "5/12") {
              this.umin = 5;
              this.umax = 12;
            } else if (this.edisciplina.format == "6/12") {
              this.umin = 6;
              this.umax = 12;
            } else if (this.edisciplina.format == "6/13") {
              this.umin = 6;
              this.umax = 13;
            } else if (this.edisciplina.format == "tacno2") {
              this.umin = 2;
              this.umax = 2;
            } else if (this.edisciplina.format == "tacno4") {
              this.umin = 4;
              this.umax = 4;
            } else if (this.edisciplina.format == "nema") {
              this.umin = 1;
              this.umax = 50;
            } else {
              alert("los format");
              this.umin = 1;
              this.umax = 50;
            }
            this.ekipaService.unesiEkipuService(this.enaziv, this.epol, this.esport.naziv, this.edisciplina.naziv, this.nacionalonst, this.umin, this.umax).subscribe(response => {
              if (response['poruka'] == 'ekPostoji') alert("ekipa vec postoji");
              if (response['poruka'] == 'ekDodata') {
                alert("ekipa napravljena dodati ucesnike");
                this.ekipaDohvatiSve();
              }
            })
          } else { alert("izabrati disciplinu") }
        } else { alert("izabrati sport") }
      } else { alert("uneti pol") }
    } else { alert("uneti naziv ekipe") }


  }
  unesiUcesnikaEkipi() {
    if (this.enaziv2) {
     // alert(this.enaziv2.naziv)
      if (this.eUcesnik) {
        this.ekipaService.dohvatiEkipuPoImenu(this.enaziv2.naziv).subscribe(response => {
            let ekipa: Ekipa = new Ekipa();
            ekipa = response['nac'];;
            //console.log(ekipa)
            let brojUc = ekipa.ucesnik.length;
            if (brojUc == ekipa.umax) alert("ekipa popunjena"); else {
              this.ekipaService.dodajUcesnikaService(this.eUcesnik.ime, this.enaziv2.naziv).subscribe(response => {
                if (response['poruka'] == 'ucesDodat') alert("ucesnik dodat");
                if (response['poruka'] == 'vecima') alert("ucesnik vec u ekipi");
              })
            }
          

        })
      } else { alert("izaberi ucesnika") }
    } else { alert("izabrati ekipu") }
  }

  SearchSport() {
    this.sportService.dohvatiSveSportService().subscribe((data: Sport[]) => {
      this.pregledActive = true;
      this.listaSport = data;
      this.listaSport.sort(
        (b, a) => a.naziv > b.naziv ? -1 : (a.naziv > b.naziv ? 1 : 0)
      );
    })
  }

  SearchDisciplina() {
    if (this.dsport) {
      this.disciplinaService.dohvatiSveDisciplineImeService(this.dsport.naziv).subscribe((data: Disciplina[]) => {
        this.listaDisciplina = data;
        this.listaDisciplina.sort(
          (b, a) => a.naziv > b.naziv ? -1 : (a.naziv > b.naziv ? 1 : 0)
        );
      })
    }
  }
  unesiUcesnika() {
    if (this.uime) {
      if (this.usport) {
        if (this.upol) {
          this.ucesnikService.unesiUcesnikaService(this.uime, this.nacionalonst, this.usport.naziv, this.upol).subscribe(response => {
            if (response['poruka'] == 'ucPostoji') alert("ucesnik vec postoji");
            if (response['poruka'] == 'ucDodat') {

              this.zemljaService.incU(this.nacionalonst).subscribe(response => {
                if (response['poruka'] == 'ok') {
                  alert("ucesnik unet");
                }
              })


              this.dohvatiUcesnike();
              this.dohvatiBrojClanova();
            }
          })
        } else { alert("izabrati pol") }
      } else { alert("izabrati sport") }
    } else { alert("uneti ime") }
  }

  dohvatiUcesnike() {
    this.ucesnikService.dohvatiUcesnikePoNacionalnosti(this.nacionalonst).subscribe((data: Ucesnik[]) => {
      this.ulistaUcesnika = data;
      this.ulistaUcesnika.sort(
        (b, a) => a.ime > b.ime ? -1 : (a.ime > b.ime ? 1 : 0)
      )
    })
  }
  unesiUcesnikDisciplina() {
    if (this.dime) {
      if (this.ddisciplina) {
        this.ucesnikService.dodajDisciplinuService(this.dime.ime, this.ddisciplina.naziv).subscribe((response => {
          if (response['poruka'] == 'discDodata') alert("disciplina dodata");
          if (response['poruka'] == 'vecima') alert("ucesnik vec ima disciplinu");
          if (response['poruka'] == 'ucNema') alert("ucesnik nije pronadjen");
        }))
      } else { alert("izabrati disciplinu") }
    } else { alert("izabrati ucesnika") }

  }
  ucesnikDisciplina() {
    if (this.dime.sport) {
      this.disciplinaService.dohvatiSveDisciplineImeService(this.dime.sport).subscribe((data: Disciplina[]) => {
        this.ulistaDisciplina = data;
        this.ulistaDisciplina.sort(
          (b, a) => a.naziv > b.naziv ? -1 : (a.naziv > b.naziv ? 1 : 0)
        );
      })
    }
  }

  prijavaDohvatiTakmicenja() {
    this.takmicenjeService.dohvatiSvaTakmicenjaFormiranje().subscribe((data: Takmicenje[]) => {
      this.plistaTakmicenja = data;
      this.plistaTakmicenja.sort(
        (b, a) => a.sport > b.sport ? -1 : (a.sport > b.sport ? 1 : 0)
      )
    })
  }
  prijavaDohvatiEkipe() {
    if (this.pTakmicenje) {
      if (this.pTakmicenje.tip == "ekipno") {
        this.pBoolUc = false;
        this.pBoolEk = true;
        this.ekipaService.prijavaTakmicenjeZemljaDisciplina(this.nacionalonst, this.pTakmicenje.sport, this.pTakmicenje.disciplina, this.pTakmicenje.pol).subscribe((data: Ekipa[]) => {
          this.plistaEkipa = data;
          this.plistaEkipa.sort(
            (b, a) => a.naziv > b.naziv ? -1 : (a.naziv > b.naziv ? 1 : 0)
          )
        })
      } else {
        this.pBoolEk = false;
        this.pBoolUc = true;

        this.ucesnikService.prijavaTakmicenjeZemljaDisciplina(this.nacionalonst, this.pTakmicenje.sport, this.pTakmicenje.disciplina, this.pTakmicenje.pol).subscribe((data: Ucesnik[]) => {
          this.plistaUcesnika = data;
          this.plistaUcesnika.sort(
            (b, a) => a.ime > b.ime ? -1 : (a.ime > b.ime ? 1 : 0)
          )
        })
      }
    } else { alert("izabrati takmicenje") }
  }
  prijavaEkipa: Ekipa;
  prijavaEkipaZaTakmicenje() {
    if (this.pTakmicenje) {
      if (this.pTakmicenje.tip == "ekipno") {
        if (this.pEkipa) {
          this.ekipaService.dohvatiEkipuPoImenu(this.pEkipa.naziv).subscribe( response => {

              let ekipa: Ekipa = new Ekipa();
              ekipa = response['nac'];
              console.log(ekipa)
              let brojCl = ekipa.ucesnik.length;
              if (brojCl < ekipa.umin) alert("ekipa nema dovoljno clanova"); else {
                this.takmicenjeService.dohvatiTakmicenje(this.pTakmicenje.sport, this.pTakmicenje.pol, this.pTakmicenje.disciplina).subscribe((data: Takmicenje) => {
                  let tak: Takmicenje;
                  tak = data;
                  let brojUC = tak.ekipe.length;
                  this.takmicenjeService.unesiEkipu(this.pEkipa.naziv, this.pTakmicenje.sport, this.pTakmicenje.disciplina, this.pTakmicenje.pol, this.pTakmicenje.format, brojUC).subscribe(response => {
                    if (response['poruka'] == 'ekipaDodata') alert("ekipa dodata");
                    if (response['poruka'] == 'ekVecDodata') alert("ekipa vec dodata");
                  })
                })
              }


          })
        } else { alert("izabrati ekipu") }
      } else if (this.pUcesnik) {
        this.takmicenjeService.dohvatiTakmicenje(this.pTakmicenje.sport, this.pTakmicenje.pol, this.pTakmicenje.disciplina).subscribe((data: Takmicenje) => {
          let tak: Takmicenje;
          tak = data;
          let brojUC = tak.ekipe.length;
          this.takmicenjeService.unesiEkipu(this.pUcesnik.ime, this.pTakmicenje.sport, this.pTakmicenje.disciplina, this.pTakmicenje.pol, this.pTakmicenje.format, brojUC).subscribe(response => {
            if (response['poruka'] == 'ekipaDodata') alert("takmicar dodat");
            if (response['poruka'] == 'ekVecDodata') alert("takmicar vec dodat");
          })
        })

      } else { alert("izabrati ucesnike") }
    } else { alert("izabrati takmicenje") }
  }

  dohvatiBrojClanova() {
    this.ucesnikService.dohvatiBrojUcesnika(this.nacionalonst).subscribe((data: Number) => {
      this.broj = data;
    })
  }
  broj2: Number;
  dohvatiBrojClanovaSport() {
    this.ucesnikService.dohvatiBrojUcesnikaSport(this.nacionalonst, this.dsport.naziv).subscribe((data: Number) => {
      this.broj2 = data;
    })
  }
  listaUcesnikaDisciplina: Ucesnik[];
  listaUcesnikaBool: boolean;
  pretraziUcesnikeDisciplina() {
    this.ucesnikService.pretraziUcesnikeDisciplina(this.nacionalonst, this.ddisciplina).subscribe((data: Ucesnik[]) => {
      this.listaUcesnikaDisciplina = data;
      this.listaUcesnikaDisciplina.sort(
        (b, a) => a.ime > b.ime ? -1 : (a.ime > b.ime ? 1 : 0)
      )
      this.listaUcesnikaBool = true;
    })
  }

}
