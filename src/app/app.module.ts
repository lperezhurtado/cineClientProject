import { CryptoService } from './service/crypto.service';
import { UsuarioService } from './service/usuario.service';
import { LoginService } from './service/login.service';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/shared/home/home.component';
import { LoginComponent } from './component/shared/login/login.component';
import { MenuComponent } from './component/shared/menu/menu.component';
import { LogoutComponent } from './component/shared/logout/logout.component';
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
    PlistTipousuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    CryptoService,
    LoginService,
    UsuarioService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
