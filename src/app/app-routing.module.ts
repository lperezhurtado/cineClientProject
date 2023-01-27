import { DeletePeliculaComponent } from './component/application/admin/pelicula/delete-pelicula/delete-pelicula.component';
import { GetPeliculaComponent } from './component/application/admin/pelicula/get-pelicula/get-pelicula.component';
import { PlisGeneroComponent } from './component/application/admin/genero/plis-genero/plis-genero.component';
import { PlistPeliculaComponent } from './component/application/admin/pelicula/plist-pelicula/plist-pelicula.component';
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
  //USUARIO
  {path:'admin/usuario/plist', component: PlistUsuarioComponent},
  {path:'admin/usuario/view/:id', component: GetUsuarioComponent},
  {path:'admin/usuario/create', component: CreateUsuarioComponent},
  {path:'admin/usuario/update/:id', component: UpdateUsuarioComponent},
  {path:'admin/usuario/delete/:id', component:DeleteUsuarioComponent},
  //PELICULA
  {path:'admin/pelicula/plist', component: PlistPeliculaComponent},
  {path:'admin/pelicula/view:id', component: GetPeliculaComponent},
  {path:'admin/pelicula/delete/:id', component:DeletePeliculaComponent},
  {path:'admin/genero/plist', component: PlisGeneroComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
