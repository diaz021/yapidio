import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonAlert } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false
})
export class LoginComponent implements OnInit {

  @ViewChild(IonAlert) alert!: IonAlert;

  FormLogin: FormGroup;
  alertButtons = ['Aceptar'];
  mensajeError: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authSrv: AuthService // 👈
  ) {
    this.FormLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // 👈 cambia user por email
      pass:  ['', Validators.required]
    });
  }

  ngOnInit() {}

  async iniciarSesion() {
    if (this.FormLogin.valid) {
      try {
        await this.authSrv.iniciarSesion(
          this.FormLogin.value.email,
          this.FormLogin.value.pass
        );
        this.router.navigate(['/pages/dashboard']);
      } catch (error: any) {
        this.mensajeError = error;
        this.alert.present();
        setTimeout(() => this.alert.dismiss(), 5000);
      }
    } else {
      this.FormLogin.markAllAsTouched();
      this.mensajeError = 'Por favor completa todos los campos';
      this.alert.present();
      setTimeout(() => this.alert.dismiss(), 5000);
    }
  }

  irARegistro() {
    this.router.navigate(['/auth/register']);
  }
}