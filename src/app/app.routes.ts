import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ListadoComponent } from './pages/listado/listado.component';
import { SkillsComponent } from './pages/skills/skills.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'listado', component: ListadoComponent },
  { path: 'skills', component: SkillsComponent },
  { path: '**', redirectTo: '' },
];
