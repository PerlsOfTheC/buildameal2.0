import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import {HomeComponent} from "./components/home/home.component";
// import {RegisterComponent} from "./components/register/register.component";
// import {LoginComponent} from "./components/login/login.component";
// import {ProfileComponent} from "./components/profile/profile.component";
// import {NavbarComponent} from "./components/navbar/navbar.component";

const routes: Routes = [
  // {path:'',component: HomeComponent}, //homepage
  // {path:'register',component: RegisterComponent}, //register page
  // {path:'login',component: LoginComponent}, //login page
  // {path:'profile',component: ProfileComponent}, //profile page
  // {path:'navbar',component: NavbarComponent}, //navbar page test


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
