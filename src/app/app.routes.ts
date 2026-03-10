import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { TaskComponent } from './pages/task/task.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CadastroComponent } from './pages/cadastro/cadastro/cadastro.component';
import { ForgotPasswordComponent } from './pages/cadastro/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/cadastro/reset-password/reset-password/reset-password.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [authGuard]},
    { path: 'register-task', component: RegisterComponent, canActivate: [authGuard]},
    { path: 'tasks/:id', component: TaskComponent, canActivate: [authGuard] },
    { path: 'login', component: LoginComponent, canActivate: [authGuard] },
    { path: 'register', component: CadastroComponent, canActivate: [authGuard] },
    { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [authGuard] },
    { path: 'reset-password/:token', component: ResetPasswordComponent, canActivate: [authGuard] },
    { path: '**', redirectTo: '' }
];
