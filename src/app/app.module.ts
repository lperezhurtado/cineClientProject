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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    MenuComponent,
    LogoutComponent,
    PlistUsuarioComponent
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
