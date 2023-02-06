import { Component } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Firestore } from '@angular/fire/firestore';
import { setDoc, deleteDoc, doc } from 'firebase/firestore';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cuerpo',
  templateUrl: './cuerpo.component.html',
  styleUrls: ['./cuerpo.component.css']
})
export class CuerpoComponent {
  isLoged:any;
  sesionIniciada : string = this.auth.isLoged;
  firebase: any;
  emailUsuario = '';
  constructor(firestore: Firestore,private http: HttpClient, private auth:AuthService, private router:Router) {
    this.firebase = firestore;
    this.auth.comprobarSiEstaLogeado()
      if (this.auth.isLoged != null) {
        this.emailUsuario = this.auth.isLoged.email;
      }
  }
  @Input() crypto = new Array<any>();

  @Output() borrar = new EventEmitter<any>();
  listaMonedas = new Array<any>();
  arrayFiltrado = new Array<any>();
  palabra_filtrar = '';
  @Output() nuevaCrypto = new EventEmitter<any>();


  lanzaPeticionAjax() {
    this.http.get('https://api.coingecko.com/api/v3/coins/').subscribe(
      (json:any) => {
          this.listaMonedas = json;
      }
    );
  }
  ngOnInit() {
    this.lanzaPeticionAjax();
  }
  filtrarPorNombre() {
    this.arrayFiltrado = this.listaMonedas.filter((moneda) => moneda.name.toLowerCase().includes(this.palabra_filtrar.toLowerCase()));
  }
  verDetalle(id:any) {
    this.router.navigate(['/detalle/' + id]);
  }
  borrarDiv(id:any){
    deleteDoc(doc(this.firebase, "items", id+this.auth.isLoged.email));
  }
  async anadirParaBuscar(moneda:any) {
    if (moneda == 'cerrarLista') {
      this.palabra_filtrar = '';
      this.arrayFiltrado = [];
      return;
    }

    for(let i = 0; i < this.crypto.length; i++){
      if(this.crypto[i].id == moneda+this.auth.isLoged.email){
        this.palabra_filtrar = '';
        this.arrayFiltrado = [];
        return;
      }
    }
    await setDoc(doc(this.firebase, "items", moneda+this.auth.isLoged.email), {
      moneda: moneda,
      nombre: this.emailUsuario
    });
    this.palabra_filtrar = '';
    this.arrayFiltrado = [];
  }
}
