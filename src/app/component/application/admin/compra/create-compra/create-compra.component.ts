import { SesionInterface } from './../../../../../model/Sesion-interface';
import { FacturaNewInterface } from './../../../../../model/Factura-interface';
import { FacturaService } from './../../../../../service/factura.service';
import { UsuarioInterface } from 'src/app/model/Usuario-interface';
import { EntradaService } from './../../../../../service/entrada.service';
import { EntradaInterface } from './../../../../../model/Entrada-interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CompraNewInterface, CompraFormInterface, CompraInterface } from './../../../../../model/Compra-interface';
import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { CompraService } from 'src/app/service/compra.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-admin-compra',
  templateUrl: './create-compra.component.html',
  styleUrls: ['./create-compra.component.css']
})
export class CreateCompraComponent implements OnInit {

  loggedUsuario!: UsuarioInterface;
  compra!: CompraNewInterface;
  updatedCompra!: CompraNewInterface;
  compras: CompraNewInterface[] = [];
  arrayCompras: CompraInterface[] = [];
  sesion!: SesionInterface;
  factura!: FacturaNewInterface;
  idFactura!: number;
  error = "";
  id!: number;
  form!: FormGroup<CompraFormInterface>;
  entrada!: EntradaInterface;
  arrayEntradas: EntradaInterface[] = []; //EL ARRAY QUE COGE LAS ENTRADAS DE LOCALSTORAGE
  entradas!:number[];
  totalComprasID: number[] = [];
  idEntrada!: number;
  tarifa!: number;

  descuentoUsuario!: number;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private compraService: CompraService,
    private facturaService: FacturaService,
    private formBuilder: FormBuilder,
    private entradaService: EntradaService,
    private location: Location
  ) { }

  ngOnInit(): void{
    this.getUsuario();
    this.getArrayEntradas();
    this.getSesion();
    this.getEntradas();
    localStorage.removeItem("arrayEntradas");
  }

  getUsuario() {
    this.loggedUsuario = JSON.parse( localStorage.getItem("usuario")! );
  }

  getArrayEntradas() {
    this.arrayEntradas = JSON.parse( localStorage.getItem("arrayEntradas")! );
  }

  getSesion() {
    this.sesion = this.arrayEntradas[0].sesion;
  }

  back() {
    this.location.back();
  }

  getEntradas(){
    this.tarifa = this.sesion.tarifa.precio;
    this.descuentoUsuario = this.loggedUsuario.descuento;
    let fecha = new Date().toJSON();

    for (let i = 0; i < this.arrayEntradas.length; i++) {
      this.compra = {
        id: undefined,
        precio: this.tarifa,
        fecha: new Date(fecha),
        descuentoUsuario:this.descuentoUsuario,
        entrada: {id: this.arrayEntradas[i].id},
        factura: null
      }
      this.compras.push(this.compra);
    }
  }

  ngOnChange(){
    //this.getEntradaprueba(this.entradaPrueba, this.entradasprueba);
  }

  //1
  createCompra() {

    for (let i = 0; i < this.compras.length; i++) {
      this.compraService.createCompra(this.compras[i]).subscribe ({
        next: (resp: number) => {
        this.totalComprasID.push(resp);
        }
      });
    }
    //prueba de setTimeOut para ver como queda
    setTimeout( () => {
      this.popup("Se ha realizado tu compra", "De acuerdo","cr");
    }, 500)

    this.createFactura();
  }
  //3
  createFactura() {
    let precioTotal = this.arrayEntradas[0].sesion.tarifa.precio * this.arrayEntradas.length;
    //se crea objeto factura
    this.factura = {
      fecha:   new Date(),
      iva:     21,
      total:   precioTotal,
      usuario: {id: this.loggedUsuario.id}
    }

    this.facturaService.createFactura(this.factura).subscribe({
      next: (resp: number) => {
        this.idFactura = resp;
        console.log("FACTURA ID: ", this.idFactura);
      }
    });
  }
  //2
  getCompras() {
    console.log("totalComprasID ", this.totalComprasID);
    this.totalComprasID.forEach( data => {
      this.compraService.getCompra(data).subscribe({
        next: (resp2: CompraInterface) => {
          this.arrayCompras.push(resp2); //guarda los objetos compra en un array
        }
      });
    })
    /*for (let i = 0; i < this.totalComprasID.length; i++) {
      this.compraService.getCompra(this.totalComprasID[i]).subscribe({
        next: (resp2: CompraInterface) => {
          this.arrayCompras.push(resp2);
        }
      })
    }*/
  }

  //4
  updateCompras() {
    console.log("arrayCompra", this.arrayCompras);

    for (let i = 0; i < this.arrayCompras.length; i++) {
      //crea el objeto compra JUNTO con el ID de la factura creada
      this.updatedCompra = {
        id: this.arrayCompras[i].id,
        precio:this.arrayCompras[i].precio,
        fecha:this.arrayCompras[i].fecha,
        descuentoUsuario:this.arrayCompras[i].descuentoUsuario,
        entrada: {id: this.arrayCompras[i].entrada.id},
        factura: {id: this.idFactura}
      }
      console.log("UPDATECOMPRA "+i,this.updatedCompra);

      this.compraService.updateCompraFactura(this.updatedCompra).subscribe({
        next: (resp3: number) => {
          console.log("updated compra ", resp3);
          this.popup("Factura generada", "Ver", "up");
        }
      });
    }
  }

  mostrar() {
    console.log("mostrar factura");
  }


  popup(msg:string, btnMsg: string, opt: string) {
    Swal.fire({
      title: msg,
      //text: "No se ha seleccionado ninguna imagen",
      icon: 'success',
      showCancelButton:false,
      confirmButtonColor: '#3085d6',
      //cancelButtonColor: '#d33',
      confirmButtonText: btnMsg
    }).then((result) => {
      if (result.isConfirmed) {
        /*Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )*/
        //this.createPelicula();
          //this.createFactura();
          //this.updateCompras();
          if (opt === "cr") {
            this.getCompras();
          }
          else if(opt === "up"){
            this.mostrar();
          }
      }

    })
  }
}
