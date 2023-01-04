import { PlistUsuarioComponent } from './component/application/admin/usuario/plist-usuario/plist-usuario.component';
import { LogoutComponent } from './component/shared/logout/logout.component';
import { LoginComponent } from './component/shared/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/shared/home/home.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'home', component: HomeComponent},
  {path:'login', component: LoginComponent},
  {path:'logout', component: LogoutComponent},
  {path:'admin/usuario/plist', component: PlistUsuarioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
