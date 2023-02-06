import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Firestore, collectionData, collection, query, where, setDoc, doc, getFirestore, deleteDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-primeras',
  templateUrl: './primeras.component.html',
  styleUrls: ['./primeras.component.css']
})
export class PrimerasComponent {
  db = getFirestore();
  sesionIniciada : string = this.auth.isLoged;
  isLoged:any;
  arrayBuscar$: Observable<any>;
  emailUsuario = '';
  favorita: boolean = false;
  constructor(firestore: Firestore, private auth:AuthService, private router:Router, private http: HttpClient) {
    this.auth.comprobarSiEstaLogeado()
      if (this.auth.isLoged != null) {
        this.verInfoPrimeras();
      }
    const collectionBD = collection(firestore, 'items');
    this.arrayBuscar$ = collectionData(query(collectionBD, where("nombre", "==", this.emailUsuario)));
  }
  ngOnInit() {
    if (this.auth.isLoged == false) {
      this.router.navigate(['/login']);
    }
    else{
      this.verInfoPrimeras();
    }
  }
  primeras = new Array<any>();

  verInfoPrimeras() {
    this.auth.getInfoPrimeras().subscribe(
      (json:any) => {
      this.emailUsuario = this.auth.isLoged.email;
      const collectionBD = collection(this.db, 'items');
      this.arrayBuscar$ = collectionData(query(collectionBD, where("nombre", "==", this.emailUsuario)));
      this.arrayBuscar$.subscribe(
        (json2:any) => {
          for (let i = 0; i < json2.length; i++) {
            for (let j = 0; j < json.length; j++) {
              if (json[j].id == json2[i].moneda) {
                json[j].favorita = true;
              }
            }
          }
        });
        this.primeras = json;
      }
    );
  }

  cambiarIcono(id:string){
    for (let i = 0; i < this.primeras.length; i++) {
      if (this.primeras[i].id == id) {
        this.primeras[i].favorita = !this.primeras[i].favorita;
      }
    }
  }

  guardarFavorito(id:string){
    setDoc(doc(this.db, "items", id+this.auth.isLoged.email), {
      moneda: id,
      nombre: this.auth.isLoged.email,
      favorita: true
    });
    this.cambiarIcono(id);
  }

  borrarFavorito(id:string){
    deleteDoc(doc(this.db, "items", id+this.auth.isLoged.email));
    this.cambiarIcono(id);
  }
} 
