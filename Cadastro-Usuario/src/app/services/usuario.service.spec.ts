import { TestBed } from '@angular/core/testing';
import { UsuarioService } from './usuario.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';

describe('UsuarioService', () => {
  let service: UsuarioService;
  let httpMock: HttpTestingController;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UsuarioService,
        { provide: Router, useValue: spy }
      ]
    });

    service = TestBed.inject(UsuarioService);
    httpMock = TestBed.inject(HttpTestingController);
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve fazer login e retornar token', () => {
    const mockResponse = { token: 'abc123' };
    const email = 'test@test.com';
    const senha = '123456';

    service.login(email, senha).subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ email, senha });
    req.flush(mockResponse);
  });

  it('deve fazer registro completo', () => {
    const dadosRegistro = {
      nome: 'João',
      email: 'joao@test.com',
      senha: '12345678',
      confirmacaoSenha: '12345678'
    };

    service.registroCompleto(dadosRegistro).subscribe(res => {
      expect(res).toEqual({ success: true });
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/registro`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(dadosRegistro);
    req.flush({ success: true });
  });

  it('deve salvar e obter token e id do localStorage', () => {
    const res = { token: 'token123', id: 'id123' };
    service.salvarToken(res);

    expect(localStorage.getItem('token')).toBe('token123');
    expect(localStorage.getItem('id')).toBe('id123');

    expect(service.obterToken()).toBe('token123');
    expect(service.obterId()).toBe('id123');
  });

  it('deve retornar true para estaAutenticado quando token existir', () => {
    localStorage.setItem('token', 'token123');
    expect(service.estaAutenticado()).toBeTrue();
  });

  it('deve retornar false para estaAutenticado quando token não existir', () => {
    expect(service.estaAutenticado()).toBeFalse();
  });

  it('deve fazer logout, limpar localStorage e navegar para /login', () => {
    localStorage.setItem('token', 'token123');
    localStorage.setItem('id', 'id123');

    service.logout();

    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('id')).toBeNull();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('deve criar headers com token', () => {
    localStorage.setItem('token', 'token123');
    const headers = (service as any).criarHeaders();
    expect(headers.get('Authorization')).toBe('Bearer token123');
  });

  it('deve buscar usuário por id com headers', () => {
    localStorage.setItem('token', 'token123');
    const id = '1';

    service.buscarPorId(id).subscribe(res => {
      expect(res).toEqual({ nome: 'Usuário 1' });
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/${id}`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer token123');
    req.flush({ nome: 'Usuário 1' });
  });

  it('deve listar usuários com headers', () => {
    localStorage.setItem('token', 'token123');

    service.listarUsuarios().subscribe(res => {
      expect(res.length).toBe(2);
      expect(res[0].nome).toBe('Usuário 1');
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer token123');
    req.flush([{ nome: 'Usuário 1' }, { nome: 'Usuário 2' }]);
  });

  it('deve atualizar usuário com headers', () => {
    localStorage.setItem('token', 'token123');
    const id = '1';
    const dados = { nome: 'Usuário Atualizado' };

    service.atualizarUsuario(id, dados).subscribe(res => {
      expect(res).toEqual({ success: true });
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/${id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(dados);
    expect(req.request.headers.get('Authorization')).toBe('Bearer token123');
    req.flush({ success: true });
  });

  it('deve deletar usuário com headers', () => {
    localStorage.setItem('token', 'token123');
    const id = '1';

    service.deletarUsuario(id).subscribe(res => {
      expect(res).toBeNull(); // <- corrigido aqui
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/${id}`);
    expect(req.request.method).toBe('DELETE');
    expect(req.request.headers.get('Authorization')).toBe('Bearer token123');
    req.flush(null);
  });

});
