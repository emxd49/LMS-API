import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.scss',
})
export class UserRegisterComponent {
  snackBar = inject(MatSnackBar);
  constructor(private authService: AuthService) {}
  authRegisterForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  handleSubmit() {
    const { username, password } = this.authRegisterForm.value;
    if (username && password) {
      this.authService.registerUser({
        username: username,
        password: password,
      });
    }
  }

  // PasswordValidator(): ValidatorFn {
  //   return (control: AbstractControl): ValidationErrors | null => {
  //     const value = control.value;

  //     if (!value) {
  //       return null;
  //     }

  //     const regex = new RegExp(
  //       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/
  //     );
  //     return regex.test(value) ?? null || ;
  //   };
  // }
}
