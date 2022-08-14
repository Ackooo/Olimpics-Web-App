import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EkipaService } from '../ekipa.service';
import { KorisnikService } from '../korisnik.service';
import { Ekipa } from '../models/ekipa';
import { EkipaM } from '../models/ekipaM';
import { EkipaS } from '../models/ekipaS';
import { EkipaT } from '../models/ekipaT';
import { Korisnik } from '../models/korisnik';
import { Takmicenje } from '../models/takmicenje';
import { Ucesnik } from '../models/ucesnik';
import { TakmicenjeService } from '../takmicenje.service';
import { UcesnikService } from '../ucesnik.service';
import { ZemljaService } from '../zemlja.service';

@Component({
  selector: 'app-delegat',
  templateUrl: './delegat.component.html',
  styleUrls: ['./delegat.component.css']
})
export class DelegatComponent implements OnInit {

  constructor(public ruter: Router, public korisnikService: KorisnikService, private takmicenjeService: TakmicenjeService, private ekipaService: EkipaService, private zemljaService: ZemljaService, private ucesnikService: UcesnikService) { }

  ngOnInit(): void {
    this.korisnik = JSON.parse(localStorage.getItem('ulogovan'));
    this.rasporedDohvatiTakmicenja();
    this.rezultatDohvatiTakmicenja();
  }
  korisnik: Korisnik;
  regexDate = "^([0-9]{4}[-]?((0[13-9]|1[012])[-]?(0[1-9]|[12][0-9]|30)|(0[13578]|1[02])[-]?31|02[-/]?(0[1-9]|1[0-9]|2[0-8]))|([0-9]{2}(([2468][048]|[02468][48])|[13579][26])|([13579][26]|[02468][048]|0[0-9]|1[0-6])00)[-/]?02[-/]?29)$";
  regexTime = "^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$";

  //rasp
  unesiRasporedActive: boolean;
  RlistaTakmicenja: Takmicenje[];
  Rtakmicenje: Takmicenje;
  RtakmicenjeFormat: String;

  RprikazG: boolean;
  RprikazQ: boolean;
  RprikazS: boolean;
  RprikazF: boolean;

  RprikazB: boolean;

  datumG: String;
  vremeG: String;
  lokacijaG: String;
  datumQ: String;
  vremeQ: String;
  lokacijaQ: String;
  datumS: String;
  vremeS: String;
  lokacijaS: String;
  datumF: String;
  vremeF: String;
  lokacijaF: String;


  //rez
  unesiRezultatActive: boolean;
  RRlistaTakmicenja: Takmicenje[];
  RRtakmicenje: Takmicenje;

  RRprikazG: boolean;
  RRprikazQ: boolean;
  RRprikazS: boolean;
  RRprikazF: boolean;


  RRtakmicenjeUneto: Number;
  RRlistaEkipa: EkipaT[];
  //



  toggleRaspActive() {
    if (this.unesiRasporedActive) this.unesiRasporedActive = false; else {

      this.unesiRasporedActive = true;
      this.unesiRezultatActive = false;
      this.rasporedDohvatiTakmicenja();
      this.RprikazF = false;
      this.RprikazG = false;
      this.RprikazQ = false;
      this.RprikazS = false;
      this.RprikazB = false;
    };
  }
  toggleRezActive() {
    if (this.unesiRezultatActive) this.unesiRezultatActive = false; else {

      this.unesiRezultatActive = true;
      this.unesiRasporedActive = false;
      this.rezultatDohvatiTakmicenja();
      this.RRprikazF = false;
      this.RRprikazG = false;
      this.RRprikazQ = false;
      this.RRprikazS = false;

    };
  }
  rasporedDohvatiTakmicenja() {
    this.takmicenjeService.dohvatiSvaTakmicenjaDelegat(this.korisnik.korIme).subscribe((data: Takmicenje[]) => {
      this.RlistaTakmicenja = data;
      this.RlistaTakmicenja.sort(
        (b, a) => a.sport > b.sport ? -1 : (a.sport > b.sport ? 1 : 0)
      )
    })
  }
  rezultatDohvatiTakmicenja() {
    this.takmicenjeService.dohvatiSvaTakmicenjaDelegat(this.korisnik.korIme).subscribe((data: Takmicenje[]) => {
      this.RRlistaTakmicenja = data;
      this.RRlistaTakmicenja.sort(
        (b, a) => a.sport > b.sport ? -1 : (a.sport > b.sport ? 1 : 0)
      );

    })
  }
  inicRaspored() {
    this.RtakmicenjeFormat = this.Rtakmicenje.format;
    if (this.Rtakmicenje.uneto == 0 || this.Rtakmicenje.uneto == 5 || this.Rtakmicenje.uneto == 6 || this.Rtakmicenje.uneto == 7) { this.RprikazB = true; } else { this.RprikazB = false }
    if (this.RtakmicenjeFormat == "g") { this.RprikazG = true; this.RprikazQ = true; this.RprikazS = true; this.RprikazF = true; }
    if (this.RtakmicenjeFormat == "qf") { this.RprikazG = false; this.RprikazQ = true; this.RprikazS = true; this.RprikazF = true; }
    if (this.RtakmicenjeFormat == "sf") { this.RprikazG = false; this.RprikazQ = false; this.RprikazS = true; this.RprikazF = true; }
    if (this.RtakmicenjeFormat == "f") { this.RprikazG = false; this.RprikazQ = false; this.RprikazS = false; this.RprikazF = true; }
  }
  inicRezultat() {
    this.RRtakmicenjeUneto = this.RRtakmicenje.uneto;
    this.RRlistaEkipa = this.RRtakmicenje.ekipe;
    this.finaleButton = false;
    //  this.RRlistaEkipa.filter()
    if (this.RRtakmicenjeUneto < 5) { this.RRprikazG = true; this.RRprikazQ = false; this.RRprikazS = false; this.RRprikazF = false; }
    if (this.RRtakmicenjeUneto == 5) { this.RRprikazG = false; this.RRprikazQ = true; this.RRprikazS = false; this.RRprikazF = false; }
    if (this.RRtakmicenjeUneto == 6) { this.RRprikazG = false; this.RRprikazQ = false; this.RRprikazS = true; this.RRprikazF = false; }
    if (this.RRtakmicenjeUneto == 7) { this.RRprikazG = false; this.RRprikazQ = false; this.RRprikazS = false; this.RRprikazF = true; }
  }
  unesiRasporedG() {
    if (this.datumG && this.vremeG && this.lokacijaG) {
      this.takmicenjeService.unesiRaspored("g", this.datumG, this.vremeG, this.lokacijaG, this.Rtakmicenje.sport, this.Rtakmicenje.disciplina, this.Rtakmicenje.pol).subscribe(response => {
        if (response['poruka'] == 'vecima') { alert("lokacija zauzeta"); this.RprikazG = true; }
        if (response['poruka'] == 'rasDodat') { alert("raspored za grupnu fazu unet"); this.RprikazG = false; }
        if (response['poruka'] == 'vecpopunio') { alert("vec popunjeno"); this.RprikazG = true; }

      });
    } else alert("popuniti sve podatke")

  }
  unesiRasporedQ() {
    if (this.datumQ && this.vremeQ && this.lokacijaQ) {
      this.takmicenjeService.unesiRaspored("qf", this.datumQ, this.vremeQ, this.lokacijaQ, this.Rtakmicenje.sport, this.Rtakmicenje.disciplina, this.Rtakmicenje.pol).subscribe(response => {
        if (response['poruka'] == 'vecima') { alert("lokacija zauzeta"); this.RprikazQ = true; }
        if (response['poruka'] == 'rasDodat') { alert("raspored za cetvrtfinale unet"); this.RprikazQ = false; }
        if (response['poruka'] == 'vecpopunio') { alert("vec popunjeno"); this.RprikazQ = true; }
      });
    }else alert("popuniti sve podatke")
  }
  unesiRasporedS() {
    if (this.datumS && this.vremeS && this.lokacijaS) {
      this.takmicenjeService.unesiRaspored("sf", this.datumS, this.vremeS, this.lokacijaS, this.Rtakmicenje.sport, this.Rtakmicenje.disciplina, this.Rtakmicenje.pol).subscribe(response => {
        if (response['poruka'] == 'vecima') { alert("lokacija zauzeta"); this.RprikazS = true; }
        if (response['poruka'] == 'rasDodat') { alert("raspored za polufinale unet"); this.RprikazS = false; }
        if (response['poruka'] == 'vecpopunio') { alert("vec popunjeno"); this.RprikazS = true; }
      });
    }else alert("popuniti sve podatke")
  }
  unesiRasporedF() {
    if (this.datumF && this.vremeF && this.lokacijaF) {
      this.takmicenjeService.unesiRaspored("f", this.datumF, this.vremeF, this.lokacijaF, this.Rtakmicenje.sport, this.Rtakmicenje.disciplina, this.Rtakmicenje.pol).subscribe(response => {
        if (response['poruka'] == 'vecima') { alert("lokacija zauzeta"); this.RprikazF = true; }
        if (response['poruka'] == 'rasDodat') { alert("raspored za finale unet"); this.RprikazF = false; }
        if (response['poruka'] == 'vecpopunio') { alert("vec popunjeno"); this.RprikazF = true; }
      });
    }else alert("popuniti sve podatke")
  }
  pokreniAlgoritam() {
    this.takmicenjeService.pokreniAlgoritam(this.Rtakmicenje.sport, this.Rtakmicenje.disciplina, this.Rtakmicenje.pol, this.RtakmicenjeFormat).subscribe(response => {
      //if (response['poruka'] == 'takmPostoji') alert("takmicenje vec postoji");
    });
  }

  nizekipa1: EkipaT[];
  nizekipa2: EkipaT[];
  nizekipa3: EkipaT[];

  ekipa1: EkipaT;
  ekipa2: EkipaT;
  ekipa3: EkipaT;

  niz1: any;
  niz2: any;
  nizf: any;

  rezultat1: String;
  rezultat2: String;
  rezultatf: String;


  metodaG() {
    this.takmicenjeService.unesiRezG(this.ekipag1, this.ekipag2, this.ekipag3, this.ekipag4, this.ekipag5, this.ekipag6, this.ekipag7, this.ekipag8, this.ekipag9, this.ekipag10, this.ekipag11, this.ekipag12,
      this.rezultatG1, this.rezultatG2, this.rezultatG3, this.rezultatG4, this.rezultatG5, this.rezultatG6, this.rezultatG7, this.rezultatG8, this.rezultatG9, this.rezultatG10, this.rezultatG11, this.rezultatG12,
      this.RRtakmicenje.sport, this.RRtakmicenje.pol, this.RRtakmicenje.disciplina, this.RRtakmicenje.uneto).subscribe(response => {    //(data: Takmicenje) => {
        if (response['poruka'] == 'ok4') {
         // alert("ok4")
          this.takmicenjeService.dohvatiTakmicenje(this.RRtakmicenje.sport, this.RRtakmicenje.pol, this.RRtakmicenje.disciplina).subscribe((data: Takmicenje) => {
            let takmicenjeGrupa: Takmicenje;
            takmicenjeGrupa = data;

            let listaEkipa: EkipaT[] = [];
            listaEkipa = takmicenjeGrupa.ekipe;

            let listaEkipa1: EkipaT[] = [];
            let listaEkipa2: EkipaT[] = [];


            let i = 12;
            while (i--) {
              if (listaEkipa[i].grupa == "g1") listaEkipa1.push(listaEkipa[i]);
              if (listaEkipa[i].grupa == "g2") listaEkipa2.push(listaEkipa[i]);
            }
            listaEkipa1.sort(function (a, b) {
              if (a.rezultat > b.rezultat) return -1;
              if (a.rezultat < b.rezultat) return 1;
              if (a.razlika >= b.razlika) return -1;
              if (a.razlika < b.razlika) return 1;
              return 0;
            }
            );
            listaEkipa2.sort(function (a, b) {
              if (a.rezultat > b.rezultat) return -1;
              if (a.rezultat < b.rezultat) return 1;
              if (a.razlika >= b.razlika) return -1;
              if (a.razlika < b.razlika) return 1;
              return 0;
            }
            );
            let ime1 = listaEkipa1[0].ime;
            let ime2 = listaEkipa1[1].ime;
            let ime3 = listaEkipa1[2].ime;
            let ime4 = listaEkipa1[3].ime;

            let ime5 = listaEkipa2[0].ime;
            let ime6 = listaEkipa2[1].ime;
            let ime7 = listaEkipa2[2].ime;
            let ime8 = listaEkipa2[3].ime;

            let ime10 = listaEkipa1[4].ime;
            let ime11 = listaEkipa1[5].ime;
            let ime12 = listaEkipa2[4].ime;
            let ime13 = listaEkipa2[5].ime;

            this.takmicenjeService.promoteG(this.RRtakmicenje.sport, this.RRtakmicenje.pol, this.RRtakmicenje.disciplina, ime1, ime2, ime3, ime4, ime5, ime6, ime7, ime8, ime10, ime11, ime12, ime13)
              .subscribe(reponse => {
                //if (response['poruka'] == 'ok') {
                this.takmicenjeService.updateRezGrupaQ(this.RRtakmicenje.sport, this.RRtakmicenje.pol, this.RRtakmicenje.disciplina).subscribe(responose => {
                  if (response['poruka'] == 'ok') { alert("uspelo"); this.unesiRezultatActive = false; }

                })
                //}

              })//endUpdate

          })//endDohvati
        }//endif
       
      })
      this.unesiRezultatActive = false;
      this.RRprikazG = false; this.RRprikazQ = false; this.RRprikazS = false; this.RRprikazF = false; 
  }
  metodaQ() {
    this.takmicenjeService.unesiRezQ(this.ekipaq1, this.ekipaq2, this.ekipaq3, this.ekipaq4, this.ekipaq5, this.ekipaq6, this.ekipaq7, this.ekipaq8,
      this.rezultatQ1, this.rezultatQ2, this.rezultatQ3, this.rezultatQ4, this.rezultatQ5, this.rezultatQ6, this.rezultatQ7, this.rezultatQ8,
      this.RRtakmicenje.sport, this.RRtakmicenje.pol, this.RRtakmicenje.disciplina, this.RRtakmicenje.uneto).subscribe(response => {
        let maxqf1 = response['maxqf1'];
        let maxqf2 = response['maxqf2'];
        let maxqf3 = response['maxqf3'];
        let maxqf4 = response['maxqf4'];

        this.takmicenjeService.promoteQ(this.RRtakmicenje.sport, this.RRtakmicenje.pol, this.RRtakmicenje.disciplina, maxqf1, maxqf2, maxqf3, maxqf4).subscribe(responose => {
          if (response['poruka'] == 'ok') {
            this.takmicenjeService.updateRezQS(this.RRtakmicenje.sport, this.RRtakmicenje.pol, this.RRtakmicenje.disciplina).subscribe(response => {
              if (response['poruka'] == 'ok') { alert("uneto"); this.unesiRezultatActive = false; }
            })
          }
        })
      })
  }
  metodaS() {
    this.takmicenjeService.unesiRezS(this.ekipas1, this.ekipas2, this.ekipas3, this.ekipas4,
      this.rezultatS1, this.rezultatS2, this.rezultatS3, this.rezultatS4,
      this.RRtakmicenje.sport, this.RRtakmicenje.pol, this.RRtakmicenje.disciplina, this.RRtakmicenje.uneto).subscribe(response => {
        let maxqf1 = response['maxqf1'];
        let maxqf2 = response['maxqf2'];
        let minqf1 = response['minqf1'];
        let minqf2 = response['minqf2'];

        this.takmicenjeService.promoteS(this.RRtakmicenje.sport, this.RRtakmicenje.pol, this.RRtakmicenje.disciplina, maxqf1, maxqf2, minqf1, minqf2).subscribe(reponse => {
          if (response['poruka'] == 'ok') { alert("uneto"); this.unesiRezultatActive = false; }
        })
      })
  }

  metodaF() {
    this.takmicenjeService.unesiRezF(this.ekipaf, this.rezultatF, this.RRtakmicenje.sport, this.RRtakmicenje.pol, this.RRtakmicenje.disciplina, this.RRtakmicenje.uneto).subscribe(response => {
      if (response['poruka'] == 'vecUneto') alert("vec uneto za ovu ekipu");
      if (response['poruka'] == 'ok') { alert("uneto"); this.unesiRezultatActive = false; }
      if (response['poruka'] == 'gotovo') {
        this.finaleSport = this.RRtakmicenje.sport;
        this.finaleDisc = this.RRtakmicenje.disciplina;
        this.finalePol = this.RRtakmicenje.pol;
        this.finaleButton = true;
      }
    })
  }




  finaleButton: boolean;
  finaleSport: String;
  finaleDisc: String;
  finalePol: String;

  finalize() {
    this.takmicenjeService.dohvatiTakmicenje(this.finaleSport, this.finalePol, this.finaleDisc).subscribe((data: Takmicenje) => {

      let takmicenjeFinale: Takmicenje;
      takmicenjeFinale = data;
      let listaEkipa: EkipaT[];
      listaEkipa = takmicenjeFinale.ekipe;
      if (takmicenjeFinale.forma == "b") {
        //bodovi   
        //postoji i trece mesto
        let listaEkipa1: EkipaT[] = [];
        let listaEkipa2: EkipaT[] = [];

        let i = listaEkipa.length;
        while (i--) {
          if (listaEkipa[i].grupa == "3f") listaEkipa1.push(listaEkipa[i]);
          if (listaEkipa[i].grupa == "f") listaEkipa2.push(listaEkipa[i]);
        }
        i = listaEkipa1.length;
        while (i--) {
          listaEkipa1[i].rezultat = parseInt(listaEkipa1[i].finalno);
        }
        i = listaEkipa2.length;
        while (i--) {
          listaEkipa2[i].rezultat = parseInt(listaEkipa2[i].finalno);
        }

        listaEkipa1.sort(function (a, b) {
          if (a.rezultat > b.rezultat) return -1;
          if (a.rezultat < b.rezultat) return 1;
          return 0;
        });
        listaEkipa2.sort(function (a, b) {
          if (a.rezultat > b.rezultat) return -1;
          if (a.rezultat < b.rezultat) return 1;
          return 0;
        });
        let ime1 = listaEkipa2[0].ime;
        let ime2 = listaEkipa2[1].ime;
        let ime3 = listaEkipa1[0].ime;

        //zlato
        this.ekipaService.dohvatiEkipuPoImenu(ime1).subscribe(response => {
          if (response['poruka'] == 'ekNema') {
            this.ucesnikService.incMedalje(ime1).subscribe((data: Ucesnik) => {
              //individua++   zemlja++
              let ucesnik: Ucesnik;
              ucesnik = data;
              let nac1 = ucesnik.zemlja;
              this.zemljaService.incZ(nac1).subscribe(response => {
                if (response['poruka'] == 'ok') {
                } else alert("greska incZ")
              })
            })
          } else if (response['poruka'] == "ok") {
            let ekipa: Ekipa = new Ekipa();
            ekipa = response['nac'];
            let nac1: String;
            nac1 = ekipa.nacionalnost;
            this.zemljaService.incZ(nac1).subscribe(response => {
              if (response['poruka'] == 'ok') {
                let ucesnici = ekipa.ucesnik;
                let i = ucesnici.length;
                while (i--) {
                  this.ucesnikService.incMedalje(ucesnici[i].ime).subscribe(response => {
                  })
                }
              } else alert("greska incZ")
            })
          } else {
            alert("greska inc")
          }
        });
        //srebro
        this.ekipaService.dohvatiEkipuPoImenu(ime2).subscribe(response => {
          if (response['poruka'] == 'ekNema') {
            this.ucesnikService.incMedalje(ime2).subscribe((data: Ucesnik) => {
              //individua++   zemlja++
              let ucesnik: Ucesnik;
              ucesnik = data;
              let nac2 = ucesnik.zemlja;
              this.zemljaService.incS(nac2).subscribe(response => {
                if (response['poruka'] == 'ok') {
                }
              })
            })
          } else if (response['poruka'] == "ok") {
            let ekipa: Ekipa = new Ekipa();
            ekipa = response['nac'];
            let nac2: String;
            nac2 = ekipa.nacionalnost;
            this.zemljaService.incS(nac2).subscribe(response => {
              if (response['poruka'] == 'ok') {
                let ucesnici = ekipa.ucesnik;
                let i = ucesnici.length;
                while (i--) {
                  this.ucesnikService.incMedalje(ucesnici[i].ime).subscribe(response => {
                  })
                }
              }
            })
          } else {
            alert("greska inc")
          }
        });
        //bronza
        this.ekipaService.dohvatiEkipuPoImenu(ime3).subscribe(response => {
          if (response['poruka'] == 'ekNema') {
            this.ucesnikService.incMedalje(ime3).subscribe((data: Ucesnik) => {
              //individua++   zemlja++
              let ucesnik: Ucesnik;
              ucesnik = data;
              let nac3 = ucesnik.zemlja;
              this.zemljaService.incB(nac3).subscribe(response => {
                if (response['poruka'] == 'ok') {
                  alert("incB");
                }
              })
            })
          } else if (response['poruka'] == "ok") {
            let ekipa: Ekipa = new Ekipa();
            ekipa = response['nac'];
            let nac3: String;
            nac3 = ekipa.nacionalnost;
            this.zemljaService.incB(nac3).subscribe(response => {
              if (response['poruka'] == 'ok') {
                let ucesnici = ekipa.ucesnik;
                let i = ucesnici.length;
                while (i--) {
                  this.ucesnikService.incMedalje(ucesnici[i].ime).subscribe(response => {
                  })
                }
              }
            })
          } else {
            alert("greska inc")
          }
        });
        //set takm 10
        this.takmicenjeService.takm10(this.finaleSport, this.finalePol, this.finaleDisc).subscribe(response => {
          if (response['poruka'] == 'ok') { alert("takm10"); this.unesiRezultatActive = false; }
        });


      }
      if (takmicenjeFinale.forma == "s") {
        //ss:tt
        let listaEkipa1: EkipaS[] = [];
        let i = listaEkipa.length;
        while (i--) {
          let pom: EkipaS = new EkipaS();
          pom.ime = listaEkipa[i].ime;
          let splits = listaEkipa[i].finalno.split(':');
          pom.s = parseInt(splits[0]);
          pom.t = parseInt(splits[1]);
          listaEkipa1.push(pom);
        }


        console.log(listaEkipa1)

        listaEkipa1.sort(function (b, a) {
          if (a.s > b.s) return -1;
          if (a.s < b.s) return 1;
          if (a.t > b.t) return -1;
          if (a.t < b.t) return 1;
          return 0;
        });
        let ime1 = listaEkipa1[0].ime;
        let ime2 = listaEkipa1[1].ime;
        let ime3 = listaEkipa1[2].ime;

        //zlato
        this.ekipaService.dohvatiEkipuPoImenu(ime1).subscribe(response => {
          if (response['poruka'] == 'ekNema') {
            this.ucesnikService.incMedalje(ime1).subscribe((data: Ucesnik) => {
              //individua++   zemlja++
              let ucesnik: Ucesnik;
              ucesnik = data;
              let nac1 = ucesnik.zemlja;
              this.zemljaService.incZ(nac1).subscribe(response => {
                if (response['poruka'] == 'ok') {

                }
              })
            })
          } else if (response['poruka'] == "ok") {

            let ekipa: Ekipa = new Ekipa();
            ekipa = response['nac'];
            let nac1: String;
            nac1 = ekipa.nacionalnost;
            this.zemljaService.incZ(nac1).subscribe(response => {
              if (response['poruka'] == 'ok') {
                let ucesnici = ekipa.ucesnik;
                let i = ucesnici.length;
                while (i--) {
                  this.ucesnikService.incMedalje(ucesnici[i].ime).subscribe(response => {
                  })
                }
              }
            })

          } else {
            alert("greska inc")
          }
        });
        //srebro
        this.ekipaService.dohvatiEkipuPoImenu(ime2).subscribe(response => {
          if (response['poruka'] == 'ekNema') {
            this.ucesnikService.incMedalje(ime2).subscribe((data: Ucesnik) => {
              //individua++   zemlja++
              let ucesnik: Ucesnik;
              ucesnik = data;
              let nac2 = ucesnik.zemlja;
              this.zemljaService.incS(nac2).subscribe(response => {
                if (response['poruka'] == 'ok') {
                  alert("incS");
                }
              })
            })
          } else if (response['poruka'] == "ok") {

            let ekipa: Ekipa = new Ekipa();
            ekipa = response['nac'];
            let nac2: String;
            nac2 = ekipa.nacionalnost;
            this.zemljaService.incS(nac2).subscribe(response => {
              if (response['poruka'] == 'ok') {
                let ucesnici = ekipa.ucesnik;
                let i = ucesnici.length;
                while (i--) {
                  this.ucesnikService.incMedalje(ucesnici[i].ime).subscribe(response => {
                  })
                }
              }
            })

          } else {
            alert("greska inc")
          }
        });
        //bronza
        this.ekipaService.dohvatiEkipuPoImenu(ime3).subscribe(response => {
          if (response['poruka'] == 'ekNema') {
            this.ucesnikService.incMedalje(ime3).subscribe((data: Ucesnik) => {
              //individua++   zemlja++
              let ucesnik: Ucesnik;
              ucesnik = data;
              let nac3 = ucesnik.zemlja;
              this.zemljaService.incB(nac3).subscribe(response => {
                if (response['poruka'] == 'ok') {
                  alert("incB");
                }
              })
            })
          } else if (response['poruka'] == "ok") {

            let ekipa: Ekipa = new Ekipa();
            ekipa = response['nac'];
            let nac3: String;
            nac3 = ekipa.nacionalnost;
            this.zemljaService.incB(nac3).subscribe(response => {
              if (response['poruka'] == 'ok') {
                let ucesnici = ekipa.ucesnik;
                let i = ucesnici.length;
                while (i--) {
                  this.ucesnikService.incMedalje(ucesnici[i].ime).subscribe(response => {
                  })
                }
              }
            })

          } else {
            alert("greska inc")
          }
        });
        //set takm 10
        this.takmicenjeService.takm10(this.finaleSport, this.finalePol, this.finaleDisc).subscribe(response => {
          if (response['poruka'] == 'ok') { alert("takm10"); this.unesiRezultatActive = false; }
        });

      }
      if (takmicenjeFinale.forma == "m") {
        //mm:ss::tt
        let listaEkipa1: EkipaM[] = [];

        let i = listaEkipa.length;
        while (i--) {
          let pom: EkipaM = new EkipaM();
          pom.ime = listaEkipa[i].ime;
          let splits = listaEkipa[i].finalno.split(':');
          pom.m = parseInt(splits[0]);
          pom.s = parseInt(splits[1]);
          pom.t = parseInt(splits[2]);
          listaEkipa1.push(pom);
        }

        listaEkipa1.sort(function (b, a) {
          if (a.m > b.m) return -1;
          if (a.m < b.m) return 1;
          if (a.s > b.s) return -1;
          if (a.s < b.s) return 1;
          if (a.t > b.t) return -1;
          if (a.t < b.t) return 1;
          return 0;
        });
        let ime1 = listaEkipa1[0].ime;
        let ime2 = listaEkipa1[1].ime;
        let ime3 = listaEkipa1[2].ime;

        //zlato
        this.ekipaService.dohvatiEkipuPoImenu(ime1).subscribe(response => {
          if (response['poruka'] == 'ekNema') {
            this.ucesnikService.incMedalje(ime1).subscribe((data: Ucesnik) => {
              //individua++   zemlja++
              let ucesnik: Ucesnik;
              ucesnik = data;
              let nac1 = ucesnik.zemlja;
              this.zemljaService.incZ(nac1).subscribe(response => {
                if (response['poruka'] == 'ok') {
                  alert("incZ");
                }
              })
            })
          } else if (response['poruka'] == "ok") {
            let ekipa: Ekipa = new Ekipa();
            ekipa = response['nac'];
            let nac1: String;
            nac1 = ekipa.nacionalnost;
            this.zemljaService.incZ(nac1).subscribe(response => {
              if (response['poruka'] == 'ok') {
                let ucesnici = ekipa.ucesnik;
                let i = ucesnici.length;
                while (i--) {
                  this.ucesnikService.incMedalje(ucesnici[i].ime).subscribe(response => {
                  })
                }
              }
            })
          } else {
            alert("greska inc")
          }
        });
        //srebro
        this.ekipaService.dohvatiEkipuPoImenu(ime2).subscribe(response => {
          if (response['poruka'] == 'ekNema') {
            this.ucesnikService.incMedalje(ime2).subscribe((data: Ucesnik) => {
              //individua++   zemlja++
              let ucesnik: Ucesnik;
              ucesnik = data;
              let nac2 = ucesnik.zemlja;
              this.zemljaService.incS(nac2).subscribe(response => {
                if (response['poruka'] == 'ok') {
                  alert("incS");
                }
              })
            })
          } else if (response['poruka'] == "ok") {
            let ekipa: Ekipa = new Ekipa();
            ekipa = response['nac'];
            let nac2: String;
            nac2 = ekipa.nacionalnost;
            this.zemljaService.incS(nac2).subscribe(response => {
              if (response['poruka'] == 'ok') {
                let ucesnici = ekipa.ucesnik;
                let i = ucesnici.length;
                while (i--) {
                  this.ucesnikService.incMedalje(ucesnici[i].ime).subscribe(response => {
                  })
                }
              }
            })
          } else {
            alert("greska inc")
          }
        });
        //bronza
        this.ekipaService.dohvatiEkipuPoImenu(ime3).subscribe(response => {
          if (response['poruka'] == 'ekNema') {
            this.ucesnikService.incMedalje(ime3).subscribe((data: Ucesnik) => {
              //individua++   zemlja++
              let ucesnik: Ucesnik;
              ucesnik = data;
              let nac3 = ucesnik.zemlja;
              this.zemljaService.incB(nac3).subscribe(response => {
                if (response['poruka'] == 'ok') {
                  alert("incB");
                }
              })
            })
          } else if (response['poruka'] == "ok") {

            let ekipa: Ekipa = new Ekipa();
            ekipa = response['nac'];
            let nac3: String;
            nac3 = ekipa.nacionalnost;
            this.zemljaService.incB(nac3).subscribe(response => {
              if (response['poruka'] == 'ok') {
                let ucesnici = ekipa.ucesnik;
                let i = ucesnici.length;
                while (i--) {
                  this.ucesnikService.incMedalje(ucesnici[i].ime).subscribe(response => {
                  })
                }
              }
            })
          } else {
            alert("greska inc")
          }
        });
        //set takm 10
        this.takmicenjeService.takm10(this.finaleSport, this.finalePol, this.finaleDisc).subscribe(response => {
          if (response['poruka'] == 'ok') { alert("takm10"); this.unesiRezultatActive = false; }
        });

      }
    })
    alert("zavrseno")
    this.finaleButton = false;
  }
  //grupa
  ekipag1: String;
  ekipag2: String;
  ekipag3: String;
  ekipag4: String;
  ekipag5: String;
  ekipag6: String;
  ekipag7: String;
  ekipag8: String;
  ekipag9: String;
  ekipag10: String;
  ekipag11: String;
  ekipag12: String;
  rezultatG1: String;
  rezultatG2: String;
  rezultatG3: String;
  rezultatG4: String;
  rezultatG5: String;
  rezultatG6: String;
  rezultatG7: String;
  rezultatG8: String;
  rezultatG9: String;
  rezultatG10: String;
  rezultatG11: String;
  rezultatG12: String;
  //qf
  ekipaq1: String;
  ekipaq2: String;
  ekipaq3: String;
  ekipaq4: String;
  ekipaq5: String;
  ekipaq6: String;
  ekipaq7: String;
  ekipaq8: String;
  rezultatQ1: String;
  rezultatQ2: String;
  rezultatQ3: String;
  rezultatQ4: String;
  rezultatQ5: String;
  rezultatQ6: String;
  rezultatQ7: String;
  rezultatQ8: String;
  //sf
  ekipas1: String;
  ekipas2: String;
  ekipas3: String;
  ekipas4: String;
  rezultatS1: String;
  rezultatS2: String;
  rezultatS3: String;
  rezultatS4: String;
  //f
  ekipaf: String;
  rezultatF: String;
  //f?
  ekipaf1: String;
  ekipaf2: String;
  ekipaf3: String;
  ekipaf4: String;
  ekipaf5: String;
  ekipaf6: String;
  ekipaf7: String;
  ekipaf8: String;
  rezultatF1: String;
  rezultatF2: String;
  rezultatF3: String;
  rezultatF4: String;
  rezultatF5: String;
  rezultatF6: String;
  rezultatF7: String;
  rezultatF8: String;


}

/*







            <tr>
                <td>prva ekipa:</td>
                <td>
                    <select name="ekipa" [(ngModel)]='ekipa1' style="width: 100%;" (change)="prijavaDohvatiEkipe()">
                        <option value="">Sva takmicenja</option>
                        <option *ngFor='let ek of RRtakmicenje.ekipe' [ngValue]="ek.ime"> {{ek.ime}} </option>
                    </select>
                </td>
                <td>rezultat:</td>
                <td>
                    <input type="text" name="rez1" [(ngModel)]='rezultat1'>
                </td>
            </tr>
            <tr>
                <td>druga ekipa:</td>
                <td>
                    <select name="ekipa" [(ngModel)]='ekipa2' style="width: 100%;" (change)="prijavaDohvatiEkipe()">
                        <option value="">Sva takmicenja</option>
                        <option *ngFor='let takm of RRlistaTakmicenja' [ngValue]="takm"> {{takm.sport}} -
                            {{takm.disciplina}}
                            - {{takm.pol}} - {{takm.tip}}</option>
                    </select>
                </td>
                <td>rezultat:</td>
                <td>
                    <input type="text" name="rez1" [(ngModel)]='rezultat2'>
                </td>
            </tr>
            <tr>
                <td>finalni rezultat:</td>
                <td>
                    <select name="takmicenje" [(ngModel)]='RRtakmicenje' style="width: 100%;"
                        (change)="prijavaDohvatiEkipe()">
                        <option value="">Sva takmicenja</option>
                        <option *ngFor='let takm of RRlistaTakmicenja' [ngValue]="takm"> {{takm.sport}} -
                            {{takm.disciplina}}
                            - {{takm.pol}} - {{takm.tip}}</option>
                    </select>
                </td>
                <td>rezultat:</td>
                <td>
                    <input type="text" name="rez1" [(ngModel)]='rezultatF'>
                </td>
                <td>
                    <button (click)="metoda()">pokreni algoritam</button>
                </td>
            </tr>
            */