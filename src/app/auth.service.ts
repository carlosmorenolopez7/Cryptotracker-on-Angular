import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, onAuthStateChanged } from "@angular/fire/auth";
import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword  } from 'firebase/auth';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoged: any;
  usuario: any;
  constructor(private auth:Auth, private router:Router, private http: HttpClient) { }
  iniciarSesionGoogle() {
    signInWithPopup(this.auth, new GoogleAuthProvider()).then((userCredential) => {
      const user = userCredential.user;
      this.router.navigate(['/portafolio']);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  }
  registrarse(email: any, password: any) {
    if (email == '' || password == '') {
      return;
    }
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        this.router.navigate(['/portafolio']);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }
  iniciarSesionEmail(email: any, password: any) {
    if (email == '' || password == '') {
      return;
    }
    signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        this.router.navigate(['/portafolio']);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }
  comprobarSiEstaLogeado() {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.isLoged = user;
        this.usuario = user;
      } else {
        this.isLoged = false;
        this.usuario = null;
      }
    });
  }
  ngOnInit() {
    this.comprobarSiEstaLogeado();
  }
  cerrarSesion() {
    this.auth.signOut();
  }
  getInfoCrypto(moneda:any) {
    return this.http.get('https://api.coingecko.com/api/v3/coins/'+moneda)
  }
  getInfoPrimeras(){
    return this.http.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=50&page=1&sparkline=false')
  } 
}
