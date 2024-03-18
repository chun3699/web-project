import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { MainComponent } from './main/main.component';

export const routes: Routes = [
    {path:'login',component:LoginComponent},
    {path:'regis',component:RegistrationComponent},
    {path:'main',component:MainComponent}
];
