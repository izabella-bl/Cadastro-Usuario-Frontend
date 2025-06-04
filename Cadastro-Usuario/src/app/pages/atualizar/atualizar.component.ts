import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';


@Component({
  selector: 'app-atualizar',
  standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './atualizar.component.html',
  styleUrl: './atualizar.component.scss'
})
export class AtualizarComponent {

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

    ngOnInit(): void {
    const id = localStorage.getItem('id');
    if (id) {
      this.usuarioService.buscarPorId(id).subscribe({
        next: (usuario) => {
          this.form.patchValue({
            nome: usuario.nome,
            email: usuario.email
          });
        },
        error: (erro) => {
          console.error('Erro ao buscar usuário por ID:', erro);
        }
      });
    }
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
    if (this.form.valid && this.senhasConferem()) {
      const id = localStorage.getItem('id');
      if (id) {
        const { nome, email, senha, confirmacaoSenha } = this.form.value;
        this.usuarioService.atualizarUsuario(id, { nome, email, senha, confirmacaoSenha }).subscribe({
          next: () => {
            alert('Usuário atualizado com sucesso!');
            this.router.navigate(['/home']);
          },
          error: (erro) => {
            console.error('Erro ao atualizar usuário:', erro);
          }
        });
      }
    }
  }

}
