import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Color } from 'ng2-charts';
import { DisciplinaService } from '../disciplina.service';
import { KorisnikService } from '../korisnik.service';
import { Disciplina } from '../models/disciplina';
import { Korisnik } from '../models/korisnik';
import { Sport } from '../models/sport';
import { Ucesnik } from '../models/ucesnik';
import { Zemlja } from '../models/zemlja';
import { SportService } from '../sport.service';
import { UcesnikService } from '../ucesnik.service';
import { ZemljaService } from '../zemlja.service';

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.css']
})

export class PocetnaComponent implements OnInit {
  zpage = 1;
  ztableSize = 10;
  mpage = 1;
  mtableSize = 10;
  spage = 1;
  stableSize = 10;
  //count=0;
  constructor(public userService: KorisnikService, private zemljaService: ZemljaService, private ucesnikService: UcesnikService,
    private sportService: SportService, private disciplinaService: DisciplinaService,
    public router: Router) { }

  ngOnInit(): void {
  }
  //login
  korIme: string;
  lozinka: string;
  poruka: String;
  //
  listaZemalja: Zemlja[];
  listaZemalja2: Zemlja[];
  listaZemalja3: Zemlja[];
  listaZemalja4: Zemlja[];
  listaSport: Sport[];
  listaDisciplina: Disciplina[];
  listaUcesnika: Ucesnik[];
  listaUcesnika2: Ucesnik[];
  //
  kor: Korisnik;
  //
  zemljaActive: boolean;
  medaljaActive: boolean;
  doughnutActive: boolean;
  searchActive: boolean;
  //search
  ime: string;
  zemlja: string;
  sport: string;
  disciplina: string;
  pol: string;
  osvajac: boolean;
  //

  toggleZemljaActive() {
    if (this.zemljaActive) this.zemljaActive = false; else {
      this.zemljaActive = true;
      this.medaljaActive = false;
      this.doughnutActive = false;
      this.searchActive = false;

      this.pregledZemalja();
    };
  }
  toggleMedaljaActive() {
    if (this.medaljaActive) this.medaljaActive = false; else {
      this.medaljaActive = true;
      this.zemljaActive = false;
      this.doughnutActive = false;
      this.searchActive = false;
      this.pregledMedalja();
    };
  }
  toggledoughnutActive() {
    if (this.doughnutActive) this.doughnutActive = false; else {
      this.zemljaActive = false;
      this.medaljaActive = false;
      this.searchActive = false;
      this.doughnut();
    };
  }
  toggleSearchActive() {
    if (this.searchActive) this.searchActive = false; else {
      this.searchActive = true;
      this.zemljaActive = false;
      this.medaljaActive = false;
      this.doughnutActive = false;
      this.SearchZemlja();
      this.SearchSport();
      this.SearchDisciplina();
    };
  }

  vratiSe() {
    let trenutni = JSON.parse(localStorage.getItem('ulogovan'));
    if (trenutni.tip == "organizator") {
      this.router.navigate(['organizator']);
    } else if (trenutni.tip == "delegat") {
      this.router.navigate(['delegat']);
    } else {
      this.router.navigate(['vodja']);
    }
  }

  signIn() {

    //this.kor = JSON.parse(localStorage.getItem('ulogovan'));
    //if(!this.kor) alert("n");

    //if(this.korIme!=null)alert("prazno");
    //if(!this.korIme)alert("prazno");
    this.userService.signInService(this.korIme, this.lozinka).subscribe((korisnik: Korisnik) => {
      if (korisnik) {
        this.userService.ulogovan = true;
        localStorage.setItem('ulogovan', JSON.stringify(korisnik)); //cuvanje prijavljenog korisnika 
        localStorage.setItem('pro', 'pro');
        //rutiranje
        //alert('ok');
        if (korisnik.tip == "organizator") {
          this.router.navigate(['organizator']);
        } else if (korisnik.tip == "delegat") {
          this.router.navigate(['delegat']);
        } else {
          this.router.navigate(['vodja']);
        }
      } else {
        alert('pogresno korisnicko ime ili lozinka');
        //this.poruka = "greska";
        this.router.navigate(['']);
      }
    });
  }

  pregledZemalja() {
    this.zemljaService.dohvatiSveZemljeService().subscribe((data: Zemlja[]) => {
      this.listaZemalja = data;
      this.listaZemalja.sort(
        (b, a) =>
          a.brojZ - b.brojZ || a.brojS - b.brojS || a.brojB - b.brojB
      )
    })

  }

  pregledMedalja() {
    this.zemljaService.dohvatiSveZemljeService().subscribe((data: Zemlja[]) => {
      this.listaZemalja2 = data;
    })
    //  alert(this.listaZemalja2[2].ime);

  }




  pretraziUcesnike() {
    this.ucesnikService.pretraziUcesnikeService(this.ime, this.zemlja, this.sport, this.disciplina, this.pol, this.osvajac).subscribe((data: Ucesnik[]) => {
      this.listaUcesnika = data;
      // this.listaUcesnika = this.listaUcesnika2.filter(enough);

    })
  }

  SearchZemlja() {
    this.zemljaService.dohvatiSveZemljeService().subscribe((data: Zemlja[]) => {
      this.listaZemalja4 = data;
      this.listaZemalja4.sort(
        (b, a) =>
          a.ime > b.ime ? -1 : (a.ime > b.ime ? 1 : 0)
      );
    })
  }

  SearchSport() {
    this.sportService.dohvatiSveSportService().subscribe((data: Sport[]) => {
      this.listaSport = data;
      this.listaSport.sort(
        (b, a) => a.naziv > b.naziv ? -1 : (a.naziv > b.naziv ? 1 : 0)
      );
    })
  }

  SearchDisciplina() {
    this.disciplinaService.dohvatiSveDisciplineService().subscribe((data: Disciplina[]) => {
      this.listaDisciplina = data;
      this.listaDisciplina.sort(
        (b, a) => a.naziv > b.naziv ? -1 : (a.naziv > b.naziv ? 1 : 0)
      );
    })

  }






  zonTableDataChange(event) {
    this.zpage = event;
    this.pregledZemalja();
  }
  monTableDataChange(event) {
    this.mpage = event;
    this.pregledMedalja();
  }
  sonTableDataChange(event) {
    this.spage = event;
    this.pretraziUcesnike();
  }

  public doughnutChartLabels = [];
  public doughnutChartData = [];
  public doughnutChartType = 'doughnut';
  public doughnutChartColors: Color[] = [
    {
      backgroundColor: ['red', 'blue', 'green'],
    }
  ];

  doughnut() {
    this.zemljaService.dohvatiSveZemljeService().subscribe((data: Zemlja[]) => {
      this.listaZemalja3 = data;
      this.listaZemalja3.sort(
        (b, a) =>
          (a.brojZ + a.brojS + a.brojB) - (b.brojZ + b.brojS + b.brojB)
      );

      for (let i = 0; i < this.listaZemalja3.length; i++) {
        var str: string = String(this.listaZemalja3[i].ime);
        this.doughnutChartLabels.push(str);
        this.doughnutChartData.push(this.listaZemalja3[i].brojZ + this.listaZemalja3[i].brojS + this.listaZemalja3[i].brojB);
      }
      this.doughnutActive = true;
    });


  }

}

function enough(element: Ucesnik, ime, array) {
  if (ime) return (element.ime == ime);

};