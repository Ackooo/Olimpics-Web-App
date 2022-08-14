import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DelegatComponent } from './delegat/delegat.component';
import { OrganizatorComponent } from './organizator/organizator.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { PromenaComponent } from './promena/promena.component';
import { RegisterComponent } from './register/register.component';
import { VodjaComponent } from './vodja/vodja.component';

const routes: Routes = [
{path:'', component: PocetnaComponent},
{path:'poc', component: PocetnaComponent},
{path:'organizator', component: OrganizatorComponent},
{path:'delegat', component: DelegatComponent},
{path:'vodja', component: VodjaComponent},
{path:'promena', component: PromenaComponent},
{path:'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
