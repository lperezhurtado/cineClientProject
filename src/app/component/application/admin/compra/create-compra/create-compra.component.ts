import { SesionInterface, SesionFormInterface } from './../../../../../model/Sesion-interface';
import { FacturaNewInterface } from './../../../../../model/Factura-interface';
import { FacturaService } from './../../../../../service/factura.service';
import { UsuarioInterface } from 'src/app/model/Usuario-interface';
import { EntradaService } from './../../../../../service/entrada.service';
import { EntradaInterface } from './../../../../../model/Entrada-interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CompraNewInterface, CompraFormInterface, CompraInterface } from './../../../../../model/Compra-interface';
import { Component, Input, OnInit } from '@angular/core';
import { DatePipe, Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { CompraService } from 'src/app/service/compra.service';
import Swal from 'sweetalert2';
import html2canvas from 'html2canvas';
import { environment } from 'src/environments/environment';
declare let jsPDF: any;

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
  totalPrecio!: number;
  fecha!:string;
  dia!: string;
  hora!: string;

  private entityUrl="/pelicula"
  url = "";

  descuentoUsuario!: number;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private compraService: CompraService,
    private facturaService: FacturaService,
    private formBuilder: FormBuilder,
    private entradaService: EntradaService,
    private location: Location
  ) {
    this.url = `${environment.baseURL}${this.entityUrl}`;
  }

  ngOnInit(): void{
    this.getUsuario();
    this.getArrayEntradas();
    this.getSesion();
    this.getEntradas();
    localStorage.removeItem("arrayEntradas");
    console.log(this.totalPrecio);

    this.fecha = this.sesion.fechaHora.toString();
    this.dia = this.fecha.slice(0,10);
    console.log(this.reverse(this.dia));
    //this.reverse(this.dia);

    console.log("dia ", this.dia);
    this.hora = this.fecha.slice(11,16);
    console.log("hora", this.hora);
    console.log("fecha ", this.fecha);
  }

  reverse(dia:string) {
    return dia.split("-").reverse().join("-");
  }

  getURLimage(images: string): string{
    let result =this.url +'/images/'+images;
    return result;
  }

  public downloadPDF(): void {

    let doc = new jsPDF('p', 'mm','a4');

    var altoPagina = 247;
    var anchoPagina = 170;
    var y = 82;

    var img = new Image();
    img.src = this.getURLimage(this.sesion.pelicula.imagen);
    doc.addImage(img, 'jpg', 10, 12, 35, 50);

    doc.setFontSize(23);
    doc.setFont("courier", "bold");
    //doc.text('Hello world!', 10, 10);
    doc.text(this.sesion.pelicula.titulo, 50, 20);
    doc.setFontSize(13);
    doc.text("CineMatriX", 50, 50);
    doc.text(this.reverse(this.hora), 50, 60);
    doc.text(this.reverse(this.dia), 75, 60);

    doc.roundedRect(10, 65, 190, 1, 1, 1, "F");

    doc.setFont("courier", "normal");
    doc.text("Sala "+this.sesion.sala.id, 12, 72);

    //doc.text(this.totalPrecio.toString(), 20, y);

    doc.setFont("courier", "bold");
    doc.text("Fila", 13, y);
    doc.text("Butaca", 53, y);
    doc.text("Tarifa", 103, y);
    doc.text("Precio", 153, y);

    doc.setFont("courier", "normal");
    for (let i = 0; i < this.arrayEntradas.length; i++) {
      y+=10
      doc.text(this.arrayEntradas[i].ejeX.toString(),13, y); //FILA
      doc.text(this.arrayEntradas[i].ejeY.toString(),53, y); //BUTACA
      doc.text(this.sesion.tarifa.nombre,103, y); //TARIFA
      doc.text(this.sesion.tarifa.precio+" €",153, y);
    }

    doc.setFont("courier", "bold");
    doc.text("TOTAL:",123, y+20);
    doc.text(this.sesion.tarifa.precio*this.arrayEntradas.length+" €",153, y+20);
    doc.save('entradas.pdf');
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
    this.totalPrecio = this.tarifa * this.arrayEntradas.length;
    this.descuentoUsuario = this.loggedUsuario? this.loggedUsuario.descuento : 0;
    console.log("descuento usuario ", this.descuentoUsuario);
    let fecha = new Date().toJSON();

    for (let i = 0; i < this.arrayEntradas.length; i++) {
      this.compra = {
        id: undefined,
        precio: this.tarifa,
        fecha: new Date(fecha),
        descuentoUsuario: this.descuentoUsuario,
        entrada: {id: this.arrayEntradas[i].id},
        factura: null
      }
      this.compras.push(this.compra);
    }
  }

  ngOnChange(){
    //this.getEntradaprueba(this.entradaPrueba, this.entradasprueba);
    this.downloadPDF();
    this.updateCompras();
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
          this.popup("Entradas impresas", "Ver", "up");
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
          if (opt === "cr") {
            this.getCompras();
          }
          else if(opt === "up"){
            this.mostrar();
            this.router.navigate(['/home']);
          }
      }

    })
  }
}
