import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';
import { Zemlja } from '../models/zemlja';
import { ZemljaService } from '../zemlja.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public userService: KorisnikService, public ruter: Router, private zemljaService: ZemljaService) { }

  ngOnInit(): void {
    this.dohvatiSveNac();
  }
  passPattern = "^(?=.*[0-9].*[0-9])(?=.*[!@#$%^&*].*[!@#$%^&*])(?=(?:[^a-z]*[a-z]){3})(?=.*[A-Z])(?!.*(.)\\1{3})[a-zA-Z].{7,11}$";
  //passPattern = "^(?!.*(.)\1\1)(?=.*[A-Z])(?=(.*[a-z]){3})(?=(.*[0-9]){2})(?=(.*[.@#$%^&*-]){2})[a-zA-Z][a-zA-Z0-9.@#$%^&*-]{7,11}$";

  korIme: String;
  lozinka: String;
  ime: String;
  prezime: String;
  nacionalnost: Number;
  Eadresa: String;
  tip: String;

  listanacionalnost: Zemlja[];

  dohvatiSveNac() {
    this.zemljaService.dohvatiSveZemljeService().subscribe((data: Zemlja[]) => {
      this.listanacionalnost = data;
    })
  }
  register() {
    if (this.korIme) {
      if (this.lozinka) {
        if (this.ime) {
          if (this.prezime) {
            if (this.nacionalnost) {
              if (this.Eadresa) {
                if (this.tip) {
                  this.userService.registerUserService(this.korIme, this.lozinka, this.ime, this.prezime,
                    this.nacionalnost, this.Eadresa, this.tip).subscribe(response => {
                      if (response['poruka'] == 'korisnik dodat') alert("korisnik unet");
                      if (response['poruka'] == 'korisnikPostoji') alert("korisnicko ime vec postoji");
                      if (response['poruka'] == 'vodjaNe') alert("vodja nacionalne delegacije vec postoji");
                      if (response['poruka'] == 'vodjaDodat') alert("vodja unet");
                      if (response['poruka'] == 'orgNe') alert("organizator vec postoji");
                      if (response['poruka'] == 'orgDodat') alert("organizator unet");
                      if (response['poruka'] == 'delegatDodat') alert("delegat unet");
                      if (response['poruka'] == 'podNe') alert("losi podaci");
                    })
                } else alert("izabrati tip");
              } else alert("uneti adresu elektronske poste");
            } else alert("izabrati nacionalnost");
          } else alert("uneti prezime");
        } else alert("uneti ime");
      } else alert("uneti lozinku");
    } else alert("uneti korisnicko ime");
  }

}
