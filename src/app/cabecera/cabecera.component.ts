import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent {
  emailUsuario = '';
  constructor(public auth:AuthService) {
  }
  ngOnInit() {
    this.auth.comprobarSiEstaLogeado();
    if (this.auth.isLoged!=null) {
      
      this.emailUsuario = this.auth.isLoged.email;
    }
  }
}
