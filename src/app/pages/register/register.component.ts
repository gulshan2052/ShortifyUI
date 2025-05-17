import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { RegisterData } from '../../interfaces/registerData.interface';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', []],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
      if (this.registerForm.valid) {
        console.log('Form Submitted', this.registerForm.value);
        const registerData: RegisterData = this.registerForm.value;
        registerData.role = "USER";
  
        this.authService.register(registerData).subscribe(
          (response) => {
            localStorage.setItem('token', response.token);
            alert('Register successful!');
            this.router.navigate(['/home']);
          },
          (error) => {
            console.log(error);
            alert(error.error.message);
          }
        );
      } else {
        alert('Invalid Details');
      }
    }
}
