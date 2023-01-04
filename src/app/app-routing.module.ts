import { DeleteUsuarioComponent } from './component/application/admin/usuario/delete-usuario/delete-usuario.component';
import { UpdateUsuarioComponent } from './component/application/admin/usuario/update-usuario/update-usuario.component';
import { CreateUsuarioComponent } from './component/application/admin/usuario/create-usuario/create-usuario.component';
import { GetUsuarioComponent } from './component/application/admin/usuario/get-usuario/get-usuario.component';
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
  {path:'admin/usuario/plist', component: PlistUsuarioComponent},
  {path:'admin/usuario/view/:id', component: GetUsuarioComponent},
  {path:'admin/usuario/create', component: CreateUsuarioComponent},
  {path:'admin/usuario/update/:id', component: UpdateUsuarioComponent},
  {path:'admin/usuario/delete/:id', component:DeleteUsuarioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
