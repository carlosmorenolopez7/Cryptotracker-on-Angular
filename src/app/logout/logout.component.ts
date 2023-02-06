import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {
  constructor(private auth:AuthService, private router:Router) {}
  ngOnInit() {
    this.auth.cerrarSesion();
    this.router.navigate(['/']);
  }
}
