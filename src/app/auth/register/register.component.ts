import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth';

function confirmarPassword(control: AbstractControl): ValidationErrors | null {
  const pass = control.get('pass');
  const confirmPass = control.get('confirmPass');
  if (pass && confirmPass && pass.value !== confirmPass.value) {
    return { passwordsNoCoinciden: true };
  }
  return null;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: false
})
export class RegisterComponent implements OnInit {

  FormRegistro: FormGroup;
  mensajeError: string = '';
  cargando: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authSrv: AuthService
  ) {
    this.FormRegistro = this.fb.group({
      nombre:      ['', Validators.required],
      email:       ['', [Validators.required, Validators.email]],
      pass:        ['', [Validators.required, Validators.minLength(6)]],
      confirmPass: ['', Validators.required]
    }, { validators: confirmarPassword });
  }

  ngOnInit() {}

  async registrarse() {
    if (this.FormRegistro.valid) {
      this.cargando = true;
      try {
        await this.authSrv.registrarse(
          this.FormRegistro.value.email,
          this.FormRegistro.value.pass,
          this.FormRegistro.value.nombre // 👈 pasa el nombre
        );
        this.router.navigate(['/pages/dashboard']);
      } catch (error: any) {
        this.mensajeError = error;
        this.cargando = false;
      }
    } else {
      this.FormRegistro.markAllAsTouched();
    }
  }

  irALogin() {
    this.router.navigate(['/auth/login']);
  }
}