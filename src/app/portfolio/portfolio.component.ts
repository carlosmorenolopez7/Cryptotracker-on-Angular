import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Firestore, collectionData, collection, query, where } from '@angular/fire/firestore';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent {
  sesionIniciada : string = this.auth.isLoged;
  isLoged:any;
  arrayBuscar$: Observable<any>;
  emailUsuario = '';
  constructor(firestore: Firestore, private auth:AuthService, private router:Router, private http: HttpClient) {
    this.auth.comprobarSiEstaLogeado()
      if (this.auth.isLoged != null) {
        this.emailUsuario = this.auth.isLoged.email;
        const collectionBD = collection(firestore, 'items');
        this.arrayBuscar$ = collectionData(query(collectionBD, where("nombre", "==", this.emailUsuario)));
        this.verInfoCrypto();
      }
    const collectionBD = collection(firestore, 'items');
    this.arrayBuscar$ = collectionData(query(collectionBD, where("nombre", "==", this.emailUsuario)));
  }
  ngOnInit() {
    if (this.auth.isLoged == false) {
      this.router.navigate(['/login']);
    }
  }
  crypto = new Array<any>();

  verInfoCrypto() {
    this.arrayBuscar$.forEach((element:any) => {
      this.crypto = [];
      for (let i = 0; i < element.length; i++) {
      this.auth.getInfoCrypto(element[i].moneda).subscribe(
      (json:any) => {
        if(this.crypto.find((crypto:any) => crypto.id == json.id)){
          return;
        }
        this.crypto.push(json);
      });
    }
    });
  }
}
