import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-registro',
  standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {

  form: FormGroup;

  mostrarSenha = false;
  mostrarConfirmacaoSenha = false;

  constructor(private fb: FormBuilder, private router: Router, private usuarioService: UsuarioService) {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      confirmacaoSenha: ['', Validators.required],
    });
  }


  toggleMostrarSenha() {
    this.mostrarSenha = !this.mostrarSenha;
  }

  toggleMostrarConfirmacaoSenha() {
    this.mostrarConfirmacaoSenha = !this.mostrarConfirmacaoSenha;
  }

  senhasConferem(): boolean {
    return this.form.get('senha')?.value === this.form.get('confirmacaoSenha')?.value;
  }

 onSubmit() {
  if (this.form.invalid || !this.senhasConferem()) return;

  const dados = this.form.value;

  this.usuarioService.registroCompleto(dados).subscribe({
    next: () => {
      alert('Registro realizado com sucesso!');
      this.router.navigate(['/login']);
    },
    error: err => {
      console.error('Erro ao registrar:', err);
      alert('Erro ao registrar. Verifique os dados e tente novamente.');
    }
  });
}

}
