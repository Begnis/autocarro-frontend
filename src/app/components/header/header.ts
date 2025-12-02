import { Component, ViewChild } from '@angular/core';
import { LoginComponent,  } from '../login/login';
import { RegisterComponent } from '../register/register';
import { CommonModule } from '@angular/common';
import { AuthService, User } from '../../services/auth';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, LoginComponent, RegisterComponent],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  @ViewChild('loginModal') loginModal!: LoginComponent;
  @ViewChild('registerModal') registerModal!: RegisterComponent;
  constructor(public authService: AuthService){}

  logout(){
    this.authService.logout();
  }

  openLoginModal(){
    this.loginModal.open();
  }

  openRegisterModal(){
   this.registerModal.open();
  }

  onSwitchToLogin(): void {
    setTimeout(() => this.loginModal.open(), 100);
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  get userName(): string | null {
    const user = this.authService.getCurrentUser();
    return user?.name ?? null;
  }

}
