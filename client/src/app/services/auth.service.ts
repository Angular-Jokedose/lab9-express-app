import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'angular-web-storage'
import { map, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, public local: LocalStorageService) { }

  signIn(authData: any){
    return this.http.post<any>('http://localhost:3000/login/signin', authData)
      .pipe(map(data => {
        if(data) {
          this.local.set('user', data, 1, 'w');
          console.log(this.local.get('user'));
        }
        return data;
      }))
  };


  signUp(authData: any) {
    return this.http.post<any>('http://localhost:3000/user/signup', authData)
      .pipe(map(data => {
        if (data) {
          console.log(this.local.get('user'))
        }else {
          console.log('Cannot sign up');
        }
        return data;
      }))

  }
}
