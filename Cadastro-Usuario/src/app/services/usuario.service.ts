import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
 private apiUrl = 'http://localhost:8099/api/usuarios';

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, senha: string) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { email, senha });
  }

  registroCompleto(dados: {
  nome: string;
  email: string;
  senha: string;
  confirmacaoSenha: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/registro`, dados);
  }

  salvarToken(res:any) {
    localStorage.setItem('token', res.token);
    localStorage.setItem('id', res.id);
  }

  obterToken(): string | null {
    return localStorage.getItem('token');
  }

  obterId(): string | null {
    return localStorage.getItem('id');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    this.router.navigate(['/login']);
  }

  estaAutenticado(): boolean {
    return !!this.obterToken();
  }

   private criarHeaders(): HttpHeaders {
    const token = this.obterToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

   buscarPorId(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, { headers: this.criarHeaders() });
  }

  listarUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.criarHeaders() });
  }

  atualizarUsuario(id: string, dados: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, dados, { headers: this.criarHeaders() });
  }

  deletarUsuario(id: string): Observable<void> {
  const headers = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('token')}`
  });

  return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
}
}
