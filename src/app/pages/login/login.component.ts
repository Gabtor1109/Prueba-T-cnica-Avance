import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  hide = true;
  submitted = false;

  form; // ✅ sin inicializar aquí

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private snack: MatSnackBar
  ) {
    // ✅ inicializa aquí, ya existe fb
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      this.snack.open('Revisa los campos', 'OK', { duration: 1800 });
      return;
    }

    const email = this.email?.value ?? '';
    const password = this.password?.value ?? '';

    this.auth.login(email, password);
    this.snack.open('Login correcto ✅', 'OK', { duration: 1600 });

    this.router.navigateByUrl('/home');
  }

  isAllValid(): boolean {
    return !!this.email?.valid && !!this.password?.valid && (this.submitted || this.form.touched);
  }
}
