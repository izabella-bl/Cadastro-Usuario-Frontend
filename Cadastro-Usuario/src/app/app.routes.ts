import { Routes } from '@angular/router';
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AtualizarComponent } from './pages/atualizar/atualizar.component';
import { AuthGuard } from './auth-guard/auth-guard.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: RegistroComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'atualizar', component: AtualizarComponent,  canActivate: [AuthGuard]},
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
