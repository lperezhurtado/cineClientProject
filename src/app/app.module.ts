import { SelectPlistTarifaComponent } from './component/application/admin/tarifa/Auxiliar/select-plist/select-plist-tarifa.component';
import { CryptoService } from './service/crypto.service';
import { UsuarioService } from './service/usuario.service';
import { LoginService } from './service/login.service';
import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
registerLocaleData(localeEs);
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
import { PlistTiposalaComponent } from './component/application/admin/tiposala/plist-tiposala/plist-tiposala.component';
import { CreateTiposalaComponent } from './component/application/admin/tiposala/create-tiposala/create-tiposala.component';
import { UpdateTiposalaComponent } from './component/application/admin/tiposala/update-tiposala/update-tiposala.component';
import { DeleteTiposalaComponent } from './component/application/admin/tiposala/delete-tiposala/delete-tiposala.component';
import { PlistSalaComponent } from './component/application/admin/sala/plist-sala/plist-sala.component';
import { GetSalaComponent } from './component/application/admin/sala/get-sala/get-sala.component';
import { CreateSalaComponent } from './component/application/admin/sala/create-sala/create-sala.component';
import { DeleteSalaComponent } from './component/application/admin/sala/delete-sala/delete-sala.component';
import { DataTableSalaComponent } from './component/application/admin/sala/auxiliar/data-table-sala/data-table-sala.component';
import { UpdateSalaComponent } from './component/application/admin/sala/update-sala/update-sala.component';
import { PlistTarifaComponent } from './component/application/admin/tarifa/plist-tarifa/plist-tarifa.component';
import { GetTarifaComponent } from './component/application/admin/tarifa/get-tarifa/get-tarifa.component';
import { CreateTarifaComponent } from './component/application/admin/tarifa/create-tarifa/create-tarifa.component';
import { UpdateTarifaComponent } from './component/application/admin/tarifa/update-tarifa/update-tarifa.component';
import { DeleteTarifaComponent } from './component/application/admin/tarifa/delete-tarifa/delete-tarifa.component';
import { PlistSesionComponent } from './component/application/admin/sesion/plist-sesion/plist-sesion.component';
import { CreateSesionComponent } from './component/application/admin/sesion/create-sesion/create-sesion.component';
import { SelectPlistComponent } from './component/application/admin/sala/auxiliar/select-plist/select-plist.component';
import { SelectPlistPeliculaComponent } from './component/application/admin/pelicula/auxiliar/select-plist/select-plist-pelicula/select-plist-pelicula.component';
import { UpdateSesionComponent } from './component/application/admin/sesion/update-sesion/update-sesion.component';
import { GetSesionComponent } from './component/application/admin/sesion/get-sesion/get-sesion.component';
import { DeleteSesionComponent } from './component/application/admin/sesion/delete-sesion/delete-sesion.component';
import { DataTableSesionComponent } from './component/application/admin/sesion/Auxiliar/data-table-sesion/data-table-sesion.component';
import { ListaTiposalaComponent } from './component/application/admin/tiposala/lista-tiposala/lista-tiposala.component';
import { GetTiposalaComponent } from './component/application/admin/tiposala/get-tiposala/get-tiposala.component';
import { ListaGeneroComponent } from './component/application/admin/genero/lista-genero/lista-genero.component';
import { ListEntradaComponent } from './component/application/admin/entrada/list-entrada/list-entrada.component';
import { FormatDatePipe } from './pipe/FormatDate.pipe';
import { CreateCompraComponent } from './component/application/admin/compra/create-compra/create-compra.component';
import { PreviewEntradaComponent } from './component/application/admin/entrada/auxiliar/preview-entrada/preview-entrada.component';
import { FooterComponent } from './component/shared/footer/footer.component';

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
    DeleteGeneroComponent,
    PlistTiposalaComponent,
    CreateTiposalaComponent,
    UpdateTiposalaComponent,
    DeleteTiposalaComponent,
    PlistSalaComponent,
    GetSalaComponent,
    CreateSalaComponent,
    DeleteSalaComponent,
    DataTableSalaComponent,
    UpdateSalaComponent,
    PlistTarifaComponent,
    GetTarifaComponent,
    CreateTarifaComponent,
    UpdateTarifaComponent,
    DeleteTarifaComponent,
    PlistSesionComponent,
    CreateSesionComponent,
    SelectPlistComponent,
    SelectPlistTarifaComponent,
    SelectPlistPeliculaComponent,
    UpdateSesionComponent,
    GetSesionComponent,
    DeleteSesionComponent,
    DataTableSesionComponent,
    ListaTiposalaComponent,
    GetTiposalaComponent,
    ListaGeneroComponent,
    ListEntradaComponent,
    FormatDatePipe,
    CreateCompraComponent,
    PreviewEntradaComponent,
    FooterComponent
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
    UsuarioService,
    { provide: LOCALE_ID, useValue: 'es-ES' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
