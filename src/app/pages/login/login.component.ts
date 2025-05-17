import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { LoginData } from '../../interfaces/loginData.interface';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Form Submitted', this.loginForm.value);
      const loginData: LoginData = this.loginForm.value;

      this.authService.login(loginData).subscribe(
        (response) => {
          localStorage.setItem('token', response.token);
          alert('Login successful!');
          this.router.navigate(['/home']);
        },
        (error) => {
          alert('Invalid credentials');
        }
      );
    } else {
      alert('Invalid Login Details');
    }
  }
}
