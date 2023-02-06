import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent {
  nombreMoneda = '';
  urlTree:any;
  moneda:any;
    constructor(private router:Router, private auth:AuthService) {
      this.urlTree = this.router.parseUrl(this.router.url);
      this.nombreMoneda = this.urlTree.root.children['primary'].segments[1].path;
      this.auth.getInfoCrypto(this.nombreMoneda).subscribe(
        (json:any) => {
          this.moneda = json;
        }
      );
     }
  
}
