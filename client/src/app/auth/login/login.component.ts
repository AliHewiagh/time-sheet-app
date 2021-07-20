import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from '../../interfaces/auth.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  error = '';
  form!: FormGroup;

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: [0, [Validators.required, Validators.minLength(6)]],
    });
  }

  onLogin() {
    const loginDetails: Login = {
      email: this.form.value.email,
      password: this.form.value.password,
    };

    this.authService
      .login(loginDetails)
      .then((user) => {
        this.error = '';

        this.router.navigate(['calendar-sheet']);
      })
      .catch((error) => {
        console.log('Error:', error);
        this.error = error.message;
      });
  }
}
