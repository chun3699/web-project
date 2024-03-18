import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { MainComponent } from './main/main.component';
import { VoteComponent } from './vote/vote.component';
import { RankingComponent } from './ranking/ranking.component'; 

export const routes: Routes = [
    {path:'login',component:LoginComponent},
    {path:'regis',component:RegistrationComponent},
    {path:'main',component:MainComponent},
    {path:'vote',component:VoteComponent},
    {path:'rank',component:RankingComponent}
];
