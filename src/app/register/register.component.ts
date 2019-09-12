import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  email: string;
  password: string;
  confirmPassword: string;

  constructor(private router: Router, private afAuth: AngularFireAuth) { }

  public register(): void {
    this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.password).then(() => {
      this.afAuth.auth.setPersistence(auth.Auth.Persistence.SESSION).then(() => {
        this.router.navigate(['/']);
      }).catch((error) => {
        console.error(error);
        alert(error.message);
      })
    }).catch((error: any) => {
      console.error(error);
      alert(error.message);
    });
  }

}
