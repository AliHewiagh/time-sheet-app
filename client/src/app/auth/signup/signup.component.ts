import { AuthService } from './../../services/auth.service';
import { SignUp } from './../../interfaces/auth.interface';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  error: String = '';

  isLoading: Boolean = false;

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createSignupForm();
  }

  createSignupForm() {
    this.signupForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: [0, [Validators.required, Validators.minLength(6)]],
    });
  }

  onSignup() {
    const signParams: SignUp = {
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
    };

    this.isLoading = true;

    this.authService
      .signup(signParams)
      .then((result) => {
        this.error = '';
        this.isLoading = false;
        this.router.navigate(['calendar-sheet']);
      })
      .catch((error) => {
        this.isLoading = false;
        this.error = error.message;
      });
  }
}
