import { LoginService } from './../../../service/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private location: Location
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.loginService.logout()
    .subscribe({
      next: (data: any) => {
        console.log("logout");
        if (data == null) {
          this.router.navigate(['/home']);
          localStorage.clear();
        }
        else {
          localStorage.clear();
        }

      }
    });
  }

  volver() {
    this.location.back();
  }

}



