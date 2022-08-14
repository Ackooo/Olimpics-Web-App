import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';

@Component({
  selector: 'app-promena',
  templateUrl: './promena.component.html',
  styleUrls: ['./promena.component.css']
})
export class PromenaComponent implements OnInit {

  constructor(public userService: KorisnikService, public ruter: Router) { }

  ngOnInit(): void {
  }
  korIme: String;
  lozinka: String;
  nova1: String;
  nova2: String;

  passPattern ="^(?=.*[0-9].*[0-9])(?=.*[!@#$%^&*].*[!@#$%^&*])(?=(?:[^a-z]*[a-z]){3})(?=.*[A-Z])(?!.*(.)\\1{3})[a-zA-Z].{7,11}$" ;
 // passPattern = "^(?!.*(.)\1\1)(?=.*[A-Z])(?=(.*[a-z]){3})(?=(.*[0-9]){2})(?=(.*[.@#$%^&*-]){2})[a-zA-Z][a-zA-Z0-9.@#$%^&*-]{7,11}$";


  promeniLozinku() {
    if (this.nova1 == this.nova2) {
      if(this.lozinka==this.nova1) {
        alert("nova lozinka ne moze biti ista kao stara")
      }else{
      this.userService.promeniLozinkuService(this.korIme, this.lozinka, this.nova1).subscribe((response) => {
        if (response['poruka'] == 'ok') { alert("lozinka promenjena"); }
        if (response['poruka'] == 'nijeok') { alert("pogresni podaci"); }
      })
    }}
    else alert("ponovljena lozinka nije ista");
  }
}
