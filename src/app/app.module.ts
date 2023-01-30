import { CryptoService } from './service/crypto.service';
import { UsuarioService } from './service/usuario.service';
import { LoginService } from './service/login.service';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'primeng/calendar'; //CALENDAR PRIME NG

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/shared/home/home.component';
import { LoginComponent } from './component/shared/login/login.component';
import { MenuComponent } from './component/shared/menu/menu.component';
import { LogoutComponent } from './component/shared/logout/logout.component';
// USUARIO ADMIN
import { PlistUsuarioComponent } from './component/application/admin/usuario/plist-usuario/plist-usuario.component';
import { CreateUsuarioComponent } from './component/application/admin/usuario/create-usuario/create-usuario.component';
import { GetUsuarioComponent } from './component/application/admin/usuario/get-usuario/get-usuario.component';
import { DeleteUsuarioComponent } from './component/application/admin/usuario/delete-usuario/delete-usuario.component';
import { UpdateUsuarioComponent } from './component/application/admin/usuario/update-usuario/update-usuario.component';
import { PaginationComponent } from './component/shared/unrouted/pagination/pagination.component';
import { SearchUnroutedComponent } from './component/shared/unrouted/search-unrouted/search-unrouted.component';
import { PaginationUnroutedComponent } from './component/shared/unrouted/pagination-unrouted/pagination-unrouted.component';
import { DropdownRegisterPageComponent } from './component/shared/unrouted/dropdown-register-page/dropdown-register-page.component';
import { DataTableUsuarioComponent } from './component/application/admin/usuario/auxiliar/data-table-usuario/data-table-usuario.component';
import { PlistTipousuarioComponent } from './component/application/admin/tipousuario/plist-tipousuario/plist-tipousuario.component';
import { GenerateUsuarioComponent } from './component/application/admin/usuario/auxiliar/generate-usuario/generate-usuario.component';
// PELICULA ADMIN
import { PlistPeliculaComponent } from './component/application/admin/pelicula/plist-pelicula/plist-pelicula.component';
import { PlisGeneroComponent } from './component/application/admin/genero/plis-genero/plis-genero.component';
import { GetPeliculaComponent } from './component/application/admin/pelicula/get-pelicula/get-pelicula.component';
import { DeletePeliculaComponent } from './component/application/admin/pelicula/delete-pelicula/delete-pelicula.component';
import { DataTablePeliculaComponent } from './component/application/admin/pelicula/auxiliar/data-table-pelicula/data-table-pelicula.component';
import { CreatePeliculaComponent } from './component/application/admin/pelicula/create-pelicula/create-pelicula.component';
import { UpdatePeliculaComponent } from './component/application/admin/pelicula/update-pelicula/update-pelicula.component';
import { CreateGeneroComponent } from './component/application/admin/genero/create-genero/create-genero.component';
import { UpdateGeneroComponent } from './component/application/admin/genero/update-genero/update-genero.component';
import { DeleteGeneroComponent } from './component/application/admin/genero/delete-genero/delete-genero.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    MenuComponent,
    LogoutComponent,
    PlistUsuarioComponent,
    CreateUsuarioComponent,
    GetUsuarioComponent,
    DeleteUsuarioComponent,
    UpdateUsuarioComponent,
    PaginationComponent,
    SearchUnroutedComponent,
    PaginationUnroutedComponent,
    DropdownRegisterPageComponent,
    DataTableUsuarioComponent,
    PlistTipousuarioComponent,
    GenerateUsuarioComponent,
    PlistPeliculaComponent,
    PlisGeneroComponent,
    GetPeliculaComponent,
    DeletePeliculaComponent,
    DataTablePeliculaComponent,
    CreatePeliculaComponent,
    UpdatePeliculaComponent,
    CreateGeneroComponent,
    UpdateGeneroComponent,
    DeleteGeneroComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CalendarModule
  ],
  providers: [
    CryptoService,
    LoginService,
    UsuarioService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
