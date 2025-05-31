import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { AlreadyLoggedInGuard } from './guards/already-logged-in.guard';
import { RedirectComponent } from './components/redirect/redirect.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent, canActivate: [AlreadyLoggedInGuard] },
    { path: 'register', component: RegisterComponent, canActivate: [AlreadyLoggedInGuard] },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: ':alias', component: RedirectComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];
