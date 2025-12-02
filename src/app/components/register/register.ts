import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../modal/modal';
import { AuthService, RegisterRequest } from '../../services/auth';
import { Subscriber } from 'rxjs';


@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, ModalComponent],
  templateUrl: './register.html',
  styleUrl: './register.css',
})

export class RegisterComponent{
  @Input() isOpen: boolean = false;
  @Output() closeModal = new EventEmitter<void>();
  @Output() switchRegister = new EventEmitter<void>();

  isLoading: boolean = false;
  errorMessage: string = '';
 
constructor(private authService: AuthService){}

registerData: RegisterRequest = {
  email: '',
  password: '',
  nome: '',
  }

  open(): void {
    this.isOpen = true;
    this.resetForm();
  }

  close(): void {
    this.isOpen = false;
    this.closeModal.emit();
    this.resetForm();
  }

onSubmit(): void {
    if(!this.registerData.email || !this.registerData.password || !this.registerData.nome){
      console.log('Registrou')
      this.errorMessage = "Por favor, preencha todos os campos.";
      return;
    }


    this.isLoading = true;
    this.errorMessage = '';

    this.authService.register(this.registerData).subscribe({
      next: (response) => {
        this.authService.setAuthData(response);
        console.log(response);
        this.isLoading = false;
        this.close();
      },
      error: (errorResponse) => {
        alert(errorResponse.error.message);
        this.isLoading = false;
      }
    })


  }


  resetForm(): void {
    this.errorMessage = '';
    this.isLoading = false;
    this.registerData = {
      email: '',
      password: '',
      nome:'',      
    }
  }
}











