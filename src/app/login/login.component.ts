import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  {
  email: string;
  password: string;
  rememberMe: boolean = false;

  constructor(private router: Router, private afAuth: AngularFireAuth) { }

  public login(): void {
    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password).then(() => {
      const persistence = (this.rememberMe ? auth.Auth.Persistence.LOCAL : auth.Auth.Persistence.SESSION);
      this.afAuth.auth.setPersistence(persistence).then(() => {
        this.router.navigate(['/']);
      }).catch((error) => {
        console.error(error);
        alert(error.message);
      })
    }).catch((error) => {
      console.error(error);
      alert(error.message);
    });
  }
}
