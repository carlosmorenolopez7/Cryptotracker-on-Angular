import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private auth:AuthService, private router:Router) { }
  email = '';
  password = '';
  iniciarSesion() {
    this.auth.iniciarSesionEmail(this.email, this.password);
  }
  registrarse() {
    this.auth.registrarse(this.email, this.password);
  }
  iniciarSesionGoogle() {
    this.auth.iniciarSesionGoogle();
  }
}
