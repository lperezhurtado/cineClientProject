import { SesionInterface } from './../../../../../model/Sesion-interface';
import { UsuarioInterface } from 'src/app/model/Usuario-interface';
import { Location } from '@angular/common';
import { EntradaInterface } from './../../../../../model/Entrada-interface';
import { EntradaService } from './../../../../../service/entrada.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  templateUrl: './list-entrada.component.html',
  styleUrls: ['./list-entrada.component.css']
})
export class ListEntradaComponent implements OnInit {

  loggedUser!: UsuarioInterface;
  resp!: EntradaInterface[];
  sesion!: SesionInterface;
  id!: number; //id de la sesion
  //entradas:number[] = [];
  //ejex!:number[];
  filas: any[] = [];
  //user! :UsuarioInterface;
  arrayEntradas: EntradaInterface[] = []

  constructor(
    private entradaService: EntradaService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    this.id = activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getList();
    this.loggedUser = JSON.parse( localStorage.getItem("usuario")! );
  }

  back() {
    this.location.back();
  }
  cleanEntradas() {
    this.arrayEntradas = [];
  }

  getList() {
    this.entradaService.getListEntrada(this.id).subscribe({
      next: (resp: EntradaInterface[]) => {
        this.resp = resp;
        this.sesion = resp[0].sesion; //recoge los datos de la sesion
        let i = 0;
        let k = 0;
        let fila: EntradaInterface[] = [];
        resp.forEach( data => {
          if(data.ejeX == i){
            fila.push(data);
          } else {
            i++;
            if(data.ejeX ==  i ){
              this.filas.push(fila);
              fila = [];
              fila.push(data);
            } else {
              this.filas.push(fila);
              fila = [];
            }
          }
          k++;
          if(k == resp.length){
            this.filas.push(fila);
          }

        });
        //console.log(this.filas);
      }
    });
  }

  localStorage(){
    localStorage.setItem("arrayEntradas", JSON.stringify(this.arrayEntradas));
    //localStorage.setItem("entradas", JSON.stringify(this.entradas));
    //localStorage.setItem("datos", JSON.stringify(this.resp[0].sesion));
  }

  idAuxiliar!: number;
  seleccionar(entrada: EntradaInterface) {

   /* if (this.arrayEntradas.includes(entrada)) {
      console.log(this.arrayEntradas);
      var i = this.arrayEntradas.indexOf(entrada);
      this.arrayEntradas.splice(i, 1);
      console.log(this.arrayEntradas);
    }
    else{
      this.arrayEntradas.push(entrada);
      console.log(this.arrayEntradas);
      console.log("entra al else de arrayEntradas");
    }*/

    //if (this.loggedUser.tipousuario.id !=1) { //SOLUCION TEMPORAL NO MUESTRA BOTON DE COMPRAR SI ES ADMIN


    if (!entrada.libre) {
      this.popup2("Butaca ocupada", "warning");
    } else {
      console.log(entrada.id);
      if(this.arrayEntradas.includes(entrada)) {
        var i = this.arrayEntradas.indexOf(entrada);
        this.arrayEntradas.splice(i, 1);
        console.log(this.arrayEntradas);
      } else {
        this.arrayEntradas.push(entrada);
        console.log(this.arrayEntradas);

      }
      /*if (this.entradas.includes(entrada.id)) {
        var index = this.entradas.indexOf(entrada.id);
        this.entradas.splice(index,1);
      } else {
        this.entradas.push(entrada.id);
      }*/
    }
  //}
    /*this.idAuxiliar = entrada.id;
    if (entrada.libre) {
      entrada.libre =false;
    } else {
      entrada.libre =true;
    }*/
  }

  popup() {
    Swal.fire({
      title: "Estás seguro",
      //text: "No se ha seleccionado ninguna imagen",
      icon: 'success',
      showCancelButton:false,
      confirmButtonColor: '#3085d6',
      //cancelButtonColor: '#d33',
      confirmButtonText: "Comprar"
    }).then((result) => {
      if (result.isConfirmed) {
        /*Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )*/
          this.localStorage();
      }
    })
  }

  popup2(message: string, status: string) {
    Swal.fire({
        customClass : {
          title: 'swal2-title',
          cancelButton: 'swal2-cancel',
          confirmButton: 'swal2-confirm',
          input: 'swal2-input'
        },
        icon:<any>status,
        title: message,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1300,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
}
}
