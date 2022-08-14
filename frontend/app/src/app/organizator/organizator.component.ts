import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DisciplinaService } from '../disciplina.service';
import { KorisnikService } from '../korisnik.service';
import { Disciplina } from '../models/disciplina';
import { EkipaT } from '../models/ekipaT';
import { Korisnik } from '../models/korisnik';
import { Rekord } from '../models/rekord';
import { Sport } from '../models/sport';
import { Takmicenje } from '../models/takmicenje';
import { RekordService } from '../rekord.service';
import { SportService } from '../sport.service';
import { TakmicenjeService } from '../takmicenje.service';

@Component({
  selector: 'app-organizator',
  templateUrl: './organizator.component.html',
  styleUrls: ['./organizator.component.css']
})
export class OrganizatorComponent implements OnInit {

  constructor(private rekordService: RekordService, public korisnikService: KorisnikService, private disciplinaService: DisciplinaService,
    private sportService: SportService, private takmicenjeService: TakmicenjeService, public ruter: Router) { }

  ngOnInit(): void {
    this.korisnik = JSON.parse(localStorage.getItem('ulogovan'));
    //alert(this.korisnik.ime);
    // this.unesiSportActive=false;
    this.discSport();
  }

  regexDate = "^([0-9]{4}[-]?((0[13-9]|1[012])[-]?(0[1-9]|[12][0-9]|30)|(0[13578]|1[02])[-]?31|02[-/]?(0[1-9]|1[0-9]|2[0-8]))|([0-9]{2}(([2468][048]|[02468][48])|[13579][26])|([13579][26]|[02468][048]|0[0-9]|1[0-6])00)[-/]?02[-/]?29)$";

  korisnik: Korisnik;
  //disciplina unos
  naziv: String;
  sport: Sport;
  vrsta: String;
  format: String;
  dlistaSport: Sport[];
  //sport unos
  snaziv: String;

  listaKorisnika: Korisnik[];

  listaRekorda: Rekord[];
  //listaRekorda2: Rekord[];

  unesiSportActive: boolean;
  odobriActive: boolean;
  unesiDiscActive: boolean;
  unesiTakmActive: boolean;
  unesiRekordtActive: boolean;
  formirajActive: boolean;

  unesiDisciplinu() {
    if (this.naziv) {
      if (this.sport) {
        if (this.vrsta) {
          if (this.format) {
            this.disciplinaService.unesiDisciplinuService(this.naziv, this.sport, this.vrsta, this.format).subscribe(response => {
              if (response['message'] == 'disciplina dodata') alert("disciplina uneta");
              if (response['message'] == 'disciplinaPostoji') alert("disciplina vec postoji");
            })
          } else {
            alert("izabrati format");
          }
        } else {
          alert("izabrati vrstu");
        }
      } else {
        alert("izabrati sport");
      }
    } else {
      alert("unesti naziv");
    }



  }
  unesiSport() {
    if (this.snaziv) {
      this.sportService.unesiSportService(this.snaziv).subscribe(response => {
        if (response['poruka'] == 'sportDodat') alert("sport unet");
        if (response['poruka'] == 'sportPostoji') alert("sport vec postoji");
      })
    } else {
      alert("uneti naziv");
    }
  }
  dohvatiSveKorisnike() {
    this.korisnikService.dohvatiSveKorisnikeService().subscribe((data: Korisnik[]) => {
      this.listaKorisnika = data;
    })
  }
  odobriKorisnika(korIme) {
    this.korisnikService.odobriKorisnikaService(korIme).subscribe(response => {
      if (response['poruka'] == 'ok') {
        alert("zahtev odobren");
        this.korisnikService.dohvatiSveKorisnikeService().subscribe((data: Korisnik[]) => {
          this.listaKorisnika = data;
        })
      }
    })
  }
  odbaciKorisnika(korIme) {
    this.korisnikService.obrisiKorisnikaService(korIme).subscribe(response => {
      if (response['poruka'] == 'ok') {
        alert("zahtev odbacen");
        this.korisnikService.dohvatiSveKorisnikeService().subscribe((data: Korisnik[]) => {
          this.listaKorisnika = data;
        })
      }
    })
  }
  toggleSportActive() {
    if (this.unesiSportActive) this.unesiSportActive = false; else {
      this.unesiSportActive = true
      this.unesiDiscActive = false;
      this.unesiTakmActive = false;
      this.odobriActive = false;
      this.unesiRekordtActive = false;
      this.formirajActive = false;
    };
  }
  toggleDiscActive() {
    if (this.unesiDiscActive) this.unesiDiscActive = false; else {
      this.unesiDiscActive = true
      this.unesiSportActive = false;
      this.unesiTakmActive = false;
      this.odobriActive = false;
      this.unesiRekordtActive = false;
      this.formirajActive = false;
    };
  }
  toggleTakmActive() {
    if (this.unesiTakmActive) this.unesiTakmActive = false; else {
      this.unesiTakmActive = true;
      this.unesiSportActive = false;
      this.unesiDiscActive = false;
      this.odobriActive = false;
      this.unesiRekordtActive = false;
      this.formirajActive = false;
      this.takmSport();
      this.takmDisciplina();
      this.takmDelegat();
    };
  }
  toggleOdobriActive() {
    if (this.odobriActive) this.odobriActive = false; else {
      this.odobriActive = true;
      this.unesiSportActive = false;
      this.unesiDiscActive = false;
      this.unesiTakmActive = false;
      this.unesiRekordtActive = false;
      this.formirajActive = false;
      this.dohvatiSveKorisnike();
    };
  }
  toggleRekordActive() {
    if (this.unesiRekordtActive) this.unesiRekordtActive = false; else {
      this.unesiRekordtActive = true;
      this.unesiSportActive = false;
      this.unesiDiscActive = false;
      this.unesiTakmActive = false;
      this.odobriActive = false;
      this.formirajActive = false;
      this.dohvatiRekorde();
    };
  }
  toggleFormirajActive() {
    if (this.formirajActive) this.formirajActive = false; else {
      this.formirajActive = true;
      this.unesiSportActive = false;
      this.unesiDiscActive = false;
      this.unesiTakmActive = false;
      this.odobriActive = false;
      this.unesiRekordtActive = false;
      this.EkipeFormiranjeBool=false;
      this.dohvatiSveTakmFormiranje();
      this.dohvatiEkipeFormiranje();
    };
  }
  dohvatiRekorde() {
    this.rekordService.dohvatiRekordeService().subscribe((data: Rekord[]) => {
      this.listaRekorda = data;
      //this.listaRekorda2=data;
      //this.listaRekorda2=this.listaRekorda.filter(e => e.godina>2010);

    })
  }
  //takmicenje
  listaSport: Sport[];
  listaDisciplina: Disciplina[];
  listaTakmicenjaZaFormiranje: Takmicenje[];
  listaDelegat: Korisnik[];

EkipeFormiranjeBool:boolean;

  tsport: String;
  tdisciplina: Disciplina;
  tpol: String;
  tdatp: String;
  tdatKraj: String;
 // ttip: String;
  tdelegat: Korisnik;
  tformat: String;
  tforma: String;

  discSport() {
    this.sportService.dohvatiSveSportService().subscribe((data: Sport[]) => {
      this.dlistaSport = data;
      this.dlistaSport.sort(
        (b, a) => a.naziv > b.naziv ? -1 : (a.naziv > b.naziv ? 1 : 0)
      );
    })
  }
  takmSport() {
    this.sportService.dohvatiSveSportService().subscribe((data: Sport[]) => {
      this.listaSport = data;
      this.listaSport.sort(
        (b, a) => a.naziv > b.naziv ? -1 : (a.naziv > b.naziv ? 1 : 0)
      );
    })
  }
  takmDisciplina() {
    if (this.tsport) {
      this.disciplinaService.dohvatiSveDisciplineImeService(this.tsport).subscribe((data: Disciplina[]) => {
        this.listaDisciplina = data;
        this.listaDisciplina.sort(
          (b, a) => a.naziv > b.naziv ? -1 : (a.naziv > b.naziv ? 1 : 0)
        );
      })
    }

  }
  takmDelegat() {
    this.korisnikService.dohvatiSveDelegate().subscribe((data: Korisnik[]) => {
      this.listaDelegat = data;
      this.listaDelegat.sort(
        (b, a) => a.ime > b.ime ? -1 : (a.ime > b.ime ? 1 : 0)
      );
    })
  }
  fTakmicenje: Takmicenje;
  listaEkipaZaFormiranje: EkipaT[];
  dohvatiSveTakmFormiranje() {
    this.takmicenjeService.dohvatiSvaTakmicenjaFormiranje().subscribe((data: Takmicenje[]) => {
      this.listaTakmicenjaZaFormiranje = data;
      this.EkipeFormiranjeBool=false;
    })
  }
  dohvatiEkipeFormiranje() {
    this.listaEkipaZaFormiranje = this.fTakmicenje.ekipe;
    this.EkipeFormiranjeBool =true;
  }
  odbaciEkipu(ime) {
    this.takmicenjeService.odbaciEkipu(ime, this.fTakmicenje.sport, this.fTakmicenje.pol, this.fTakmicenje.disciplina).subscribe(response => {
      if (response['poruka'] == 'ok') {
        this.dohvatiSveTakmFormiranje();
        this.dohvatiEkipeFormiranje();

      } else {
        alert("greska")
      }
    })
  }

  formirajTakmicenje(/*sport, disciplina, pol*/) {
    this.takmicenjeService.formirajTakmicenjeService(this.fTakmicenje.sport, this.fTakmicenje.disciplina, this.fTakmicenje.pol).subscribe(response => {
      if (response['poruka'] == 'ok') {
        alert("takmicenje formirano");
        this.takmicenjeService.dohvatiSvaTakmicenjaFormiranje().subscribe((data: Takmicenje[]) => {
          this.listaTakmicenjaZaFormiranje = data;
          this.EkipeFormiranjeBool=false;
        })
      }
    })
  }
  unesiTakmicenje() {
    if (this.tsport) {
      if (this.tdisciplina) {
        if (this.tpol) {
          if (this.tdatp) {
            if (this.tdatKraj) {
                if (this.tdelegat) {
                  if (this.tformat) {
                    if (this.tforma) {
                      this.takmicenjeService.unesiTakmicenjeService(this.tsport, this.tdisciplina.naziv, this.tpol, this.tdatp, this.tdatKraj,
                        this.tdisciplina.vrsta, this.tdelegat.korIme, this.tformat, this.tforma).subscribe(response => {
                          if (response['poruka'] == 'takmPostoji') alert("takmicenje vec postoji");
                          if (response['poruka'] == 'takmDodato') {
                            this.korisnikService.delegatTakmicenje(this.tdelegat.korIme).subscribe(response => {
                              alert("takmicenje uneto");
                              this.takmDelegat();
                            })
                          }
                        })
                    } else { alert("uneti format") }
                  } else { alert("uneti pocetak") }
                } else { alert("izabrati delegata") }
            } else { alert("uneti datum kraja") }
          } else { alert("uneti datum pocetka") }
        } else { alert("izabrati pol"); }
      } else { alert("izabrati disciplinu"); }
    } else { alert("izabrati sport"); }

  }


}
