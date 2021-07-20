import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login, SignUp } from '../interfaces/auth.interface';
import { User } from '../interfaces/user.interface';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';

interface SignedUp {
  id: number;
  status: string;
}

@Injectable()
export class AuthService {
  isAuth = new BehaviorSubject(false);

  private onSubject = new Subject<{ key: string; value: any }>();

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(SESSION_STORAGE) private storage: StorageService
  ) {}

  async signup(signParams: SignUp): Promise<User> {
    try {
      const response: any = await this.http
        .post('/signup', signParams)
        .toPromise();

      if (response.code !== '0000') {
        throw response;
      }

      let user = new User(
        response.data.uid,
        response.data.email,
        response.data.token,
        response.data.refresh_token
      );

      this.storeUserToLocalStorage(user);

      return Promise.resolve(user);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async login(loginParams: Login): Promise<User> {
    try {
      const response: any = await this.http
        .post('/login', loginParams)
        .toPromise();

      if (response.code !== '0000') {
        throw response;
      }

      let user = new User(
        response.data.uid,
        response.data.email,
        response.data.token,
        response.data.refresh_token
      );

      this.storeUserToLocalStorage(user);

      return Promise.resolve(user);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async logout() {
    this.storage.remove('user');
    this.clearDataFromLocalStorage('user');
    this.clearDataFromLocalStorage('x-auth');
    this.isAuth.next(false);
    this.router.navigate(['auth/login']);
  }

  public storeUserToLocalStorage(user: any): void {
    if (!user) {
      this.isAuth.next(false);
      return;
    }

    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('x-auth', JSON.stringify(user.token));

    this.isAuth.next(true);
  }

  public clearDataFromLocalStorage(key: string) {
    localStorage.removeItem(key);
    // the local application doesn't seem to catch changes to localStorage...
    this.onSubject.next({ key: key, value: null });
  }
}
