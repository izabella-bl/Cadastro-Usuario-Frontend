import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
    formLogin!: FormGroup;
    mostrarSenha = false;

    constructor(private fb: FormBuilder, private router: Router,private usuarioService: UsuarioService) {}

    ngOnInit(): void {
      this.formLogin = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        senha: ['', [Validators.required, Validators.minLength(6)]]
      });
    }

    toggleMostrarSenha() {
      this.mostrarSenha = !this.mostrarSenha;
    }

    onLogin() {
    if (this.formLogin.invalid) return;

    const { email, senha } = this.formLogin.value;

    this.usuarioService.login(email, senha).subscribe({
      next: (res) => {
        this.usuarioService.salvarToken(res);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Erro no login:', err);
        alert('Falha no login. Verifique suas credenciais.');
      }
    });
  }

}
