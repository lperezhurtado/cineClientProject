import { CryptoService } from './../../../service/crypto.service';
import { LoginInterface } from './../../../model/login-interface';
import { LoginService } from './../../../service/login.service';
import { UsuarioInterface } from './../../../model/Usuario-interface';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//import * as bcrypt from 'bcryptjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin!: FormGroup<LoginInterface>;
  userSession!: UsuarioInterface;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private activateRoute: ActivatedRoute,
    private loginService: LoginService,
    private cryptoService: CryptoService
  ) {

    if (activateRoute.snapshot.data['message']) {
      localStorage.setItem("usuario", JSON.stringify(activateRoute.snapshot.data['message']));
      router.navigate(['/home']);
    }
    else {
      localStorage.clear();
    }

    this.formLogin = <FormGroup>this.formBuilder.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void { }


  login() {
    console.log("antes de encriptado");
    console.log(this.formLogin.get('login')?.value);
    console.log(this.formLogin.get('password')?.value);

    //const salt = bcrypt.genSaltSync(10);
    //const encryptedPass = bcrypt.hashSync(this.formLogin.get('password')!.value, salt);

    console.log("despues de encriptado");
    console.log(this.formLogin.get('login')?.value);
    console.log(this.cryptoService.getSHA256(this.formLogin.get('password')!.value));

    this.loginService.login( this.formLogin.get('login')!.value, this.cryptoService.getSHA256(this.formLogin.get('password')!.value) )
    .subscribe(data => {
      localStorage.setItem("usuario", JSON.stringify(data));
      //console.log("Está en sesion: ", data);

      if (data != null) {
        this.router.navigate(['/home']);
      } else {
        localStorage.clear();
      }
    });
    return false;
  }


  loginAdmin() {
    this.formLogin.setValue({
      login: "luisp",
      password: "admin1"
    });
  }







}
