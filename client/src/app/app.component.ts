import { AuthService } from './services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'client';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
      this.authService.logout();
    }

    this.authService.storeUserToLocalStorage(user);
  }
}
