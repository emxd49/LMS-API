import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { AuthRoutingModule } from './auth-routing.module';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    UserLoginComponent,
    UserRegisterComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class AuthModule { }
