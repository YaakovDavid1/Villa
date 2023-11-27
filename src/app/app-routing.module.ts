import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { PersonalAreaComponent } from './personal-area/personal-area.component';
import { AuthGuard } from './guards/auth.guard';
import { InfoVilaComponent } from './info-vila/info-vila.component';

const routes: Routes = [
  {path:'',component:MenuComponent},
  {path:'UserRegistration',component:UserRegistrationComponent},
  {path:'login', component:LoginComponent},
  {path:'signup', component:SignupComponent},
  {path:'personalArea', component:PersonalAreaComponent, canActivate:[AuthGuard]},
  { path:'info-vila/:id', component: InfoVilaComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
