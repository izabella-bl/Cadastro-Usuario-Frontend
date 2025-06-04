import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  usuarios: any[] = [];
  paginaAtual = 1;
  itensPorPagina = 5;
  mostrarPopup = false;
  usuario: any;

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  ngOnInit(): void {
    this.usuarioService.listarUsuarios().subscribe({
      next: (data) => this.usuarios = data,
      error: (err) => {
        console.error('Erro ao listar usuários:', err);
        if (err.status === 403) this.router.navigate(['/login']);
      }
    });

    const id = this.usuarioService.obterId();
    if (id) {
      this.usuarioService.buscarPorId(id).subscribe({
        next: (user) => this.usuario = user,
        error: (err) => console.error('Erro ao buscar usuário por ID:', err)
      });
    }
  }

  get totalPaginas() {
    return Math.ceil(this.usuarios.length / this.itensPorPagina);
  }

  get usuariosPaginados() {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    return this.usuarios.slice(inicio, inicio + this.itensPorPagina);
  }

  paginaAnterior() {
    if (this.paginaAtual > 1) this.paginaAtual--;
  }

  proximaPagina() {
    if (this.paginaAtual < this.totalPaginas) this.paginaAtual++;
  }

  sair() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

  confirmarExclusaoConta() {
    this.mostrarPopup = true;
  }

  excluirConta() {
  const id = localStorage.getItem('id');
  if (id) {
    this.usuarioService.deletarUsuario(id).subscribe({
      next: () => {
        alert('Conta excluída com sucesso!');
        localStorage.clear();
        this.router.navigate(['/']);
      },
      error: (erro) => {
        console.error('Erro ao excluir conta:', erro);
        alert('Erro ao excluir conta. Tente novamente.');
      }
    });
  }
}
}
