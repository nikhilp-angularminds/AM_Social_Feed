import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './authguard/auth.guard';
import { EditComponent } from './edit/edit.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  {path:'',redirectTo:'sign-up',pathMatch:'full'},
  { path:'sign-up',component:SignUpComponent },
  { path:'login',component:LoginComponent },
  { path:'feed',component:HomeComponent ,canActivate:[AuthGuard]},
  { path:'edit-profile',component:EditComponent },

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
