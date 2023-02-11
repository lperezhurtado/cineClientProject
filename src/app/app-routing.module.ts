import { ViewPeliculaComponent } from './component/application/user/pelicula/view-pelicula/view-pelicula.component';
import { CarteleraComponent } from './component/application/user/cartelera/cartelera.component';
import { CreateCompraComponent } from './component/application/admin/compra/create-compra/create-compra.component';
import { ListEntradaComponent } from './component/application/admin/entrada/list-entrada/list-entrada.component';
import { PlistTipousuarioComponent } from './component/application/admin/tipousuario/plist-tipousuario/plist-tipousuario.component';
import { ListaGeneroComponent } from './component/application/admin/genero/lista-genero/lista-genero.component';
import { GetTiposalaComponent } from './component/application/admin/tiposala/get-tiposala/get-tiposala.component';
import { ListaTiposalaComponent } from './component/application/admin/tiposala/lista-tiposala/lista-tiposala.component';
import { DeleteSesionComponent } from './component/application/admin/sesion/delete-sesion/delete-sesion.component';
import { GetSesionComponent } from './component/application/admin/sesion/get-sesion/get-sesion.component';
import { UpdateSesionComponent } from './component/application/admin/sesion/update-sesion/update-sesion.component';
import { CreateSesionComponent } from './component/application/admin/sesion/create-sesion/create-sesion.component';
import { PlistSesionComponent } from './component/application/admin/sesion/plist-sesion/plist-sesion.component';
import { DeleteTarifaComponent } from './component/application/admin/tarifa/delete-tarifa/delete-tarifa.component';
import { UpdateTarifaComponent } from './component/application/admin/tarifa/update-tarifa/update-tarifa.component';
import { CreateTarifaComponent } from './component/application/admin/tarifa/create-tarifa/create-tarifa.component';
import { PlistTarifaComponent } from './component/application/admin/tarifa/plist-tarifa/plist-tarifa.component';
import { UpdateSalaComponent } from './component/application/admin/sala/update-sala/update-sala.component';
import { DeleteSalaComponent } from './component/application/admin/sala/delete-sala/delete-sala.component';
import { CreateSalaComponent } from './component/application/admin/sala/create-sala/create-sala.component';
import { GetSalaComponent } from './component/application/admin/sala/get-sala/get-sala.component';
import { PlistSalaComponent } from './component/application/admin/sala/plist-sala/plist-sala.component';
import { DeleteTiposalaComponent } from './component/application/admin/tiposala/delete-tiposala/delete-tiposala.component';
import { UpdateTiposalaComponent } from './component/application/admin/tiposala/update-tiposala/update-tiposala.component';
import { CreateTiposalaComponent } from './component/application/admin/tiposala/create-tiposala/create-tiposala.component';
import { PlistTiposalaComponent } from './component/application/admin/tiposala/plist-tiposala/plist-tiposala.component';
import { DeleteGeneroComponent } from './component/application/admin/genero/delete-genero/delete-genero.component';
import { UpdateGeneroComponent } from './component/application/admin/genero/update-genero/update-genero.component';
import { CreateGeneroComponent } from './component/application/admin/genero/create-genero/create-genero.component';
import { UpdatePeliculaComponent } from './component/application/admin/pelicula/update-pelicula/update-pelicula.component';
import { CreatePeliculaComponent } from './component/application/admin/pelicula/create-pelicula/create-pelicula.component';
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
import { NgModule, Component } from '@angular/core';
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
  //TIPOUSUARIO
  {path:'admin/tipousuario/plist', component:PlistTipousuarioComponent},
  //PELICULA
  {path:'admin/pelicula/plist', component: PlistPeliculaComponent},
  {path:'admin/pelicula/view/:id', component: GetPeliculaComponent},
  {path:'admin/pelicula/create', component: CreatePeliculaComponent},
  {path:'admin/pelicula/delete/:id', component:DeletePeliculaComponent},
  {path:'admin/pelicula/update/:id', component: UpdatePeliculaComponent},
  //GENERO
  {path:'admin/genero/plist', component: PlisGeneroComponent},
  {path:'admin/genero/lista', component: ListaGeneroComponent},
  {path:'admin/genero/create', component: CreateGeneroComponent},
  {path:'admin/genero/update/:id', component: UpdateGeneroComponent},
  {path:'admin/genero/delete/:id', component: DeleteGeneroComponent},
  //TIPOSALA
  {path:'admin/tiposala/plist', component: PlistTiposalaComponent},
  {path:'admin/tiposala/list', component: ListaTiposalaComponent},
  {path:'admin/tiposala/create', component: CreateTiposalaComponent},
  {path:'admin/tiposala/update/:id', component: UpdateTiposalaComponent},
  {path:'admin/tiposala/delete/:id', component: DeleteTiposalaComponent},
  {path:'admin/tiposala/view/:id', component: GetTiposalaComponent},
  //SALA
  {path:'admin/sala/plist', component: PlistSalaComponent},
  {path:'admin/sala/view/:id', component: GetSalaComponent},
  {path:'admin/sala/create', component: CreateSalaComponent},
  {path:'admin/sala/delete/:id', component: DeleteSalaComponent},
  {path:'admin/sala/update/:id', component: UpdateSalaComponent},
  //TARIFA
  {path:'admin/tarifa/plist', component: PlistTarifaComponent},
  {path:'admin/tarifa/create', component: CreateTarifaComponent},
  {path:'admin/tarifa/update/:id', component: UpdateTarifaComponent},
  {path:'admin/tarifa/delete/:id', component: DeleteTarifaComponent},
  //SESION
  {path:'admin/sesion/plist', component: PlistSesionComponent},
  {path:'admin/sesion/create', component: CreateSesionComponent},
  {path:'admin/sesion/update/:id', component: UpdateSesionComponent},
  {path:'admin/sesion/view/:id', component: GetSesionComponent},
  {path:'admin/sesion/delete/:id', component: DeleteSesionComponent},
  //ENTRADA
  {path:'admin/entrada/list/:id', component: ListEntradaComponent},
  //COMPRA
  {path:'admin/entrada/create', component: CreateCompraComponent},
  {path:'admin/entrada/create/:entradas[]', component: CreateCompraComponent},
  //======USER======
  //CARTELERA
  {path:'user/cartelera/plist', component: CarteleraComponent},
  {path:'user/pelicula/view/:id', component: ViewPeliculaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
