import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  is_auth!: Observable<boolean>;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.is_auth = this.authService.isAuth;
  }

  onLogout() {
    this.authService.logout();
  }
}
