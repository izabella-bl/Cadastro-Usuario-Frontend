import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let usuarioServiceSpy: jasmine.SpyObj<UsuarioService>;
  let router: Router;
  let alertSpy: jasmine.Spy;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('UsuarioService', ['login', 'salvarToken']);

    await TestBed.configureTestingModule({
      imports: [
        LoginComponent, // standalone component import
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
      ],
      providers: [
        { provide: UsuarioService, useValue: spy }
      ]
    }).compileComponents();

    usuarioServiceSpy = TestBed.inject(UsuarioService) as jasmine.SpyObj<UsuarioService>;
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    alertSpy = spyOn(window, 'alert');

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve inicializar o formulário com controles email e senha vazios e inválidos', () => {
    expect(component.formLogin).toBeDefined();
    const emailControl = component.formLogin.get('email');
    const senhaControl = component.formLogin.get('senha');
    expect(emailControl).toBeTruthy();
    expect(senhaControl).toBeTruthy();
    expect(emailControl?.value).toBe('');
    expect(senhaControl?.value).toBe('');
    expect(component.formLogin.valid).toBeFalse();
  });

  it('deve alternar o estado mostrarSenha ao chamar toggleMostrarSenha', () => {
    expect(component.mostrarSenha).toBeFalse();
    component.toggleMostrarSenha();
    expect(component.mostrarSenha).toBeTrue();
    component.toggleMostrarSenha();
    expect(component.mostrarSenha).toBeFalse();
  });

  it('não deve chamar login se o formulário for inválido', () => {
    component.formLogin.setValue({ email: '', senha: '' }); // inválido
    component.onLogin();
    expect(usuarioServiceSpy.login).not.toHaveBeenCalled();
  });

  it('deve chamar login e navegar para /home ao submeter formulário válido', fakeAsync(() => {
    const respostaFake = { token: 'token123' };

    component.formLogin.setValue({ email: 'teste@teste.com', senha: '123456' });
    usuarioServiceSpy.login.and.returnValue(of(respostaFake));

    component.onLogin();
    tick();

    expect(usuarioServiceSpy.login).toHaveBeenCalledWith('teste@teste.com', '123456');
    expect(usuarioServiceSpy.salvarToken).toHaveBeenCalledWith(respostaFake);
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  }));

  it('deve exibir alerta em caso de erro no login', fakeAsync(() => {
    component.formLogin.setValue({ email: 'teste@teste.com', senha: '123456' });
    usuarioServiceSpy.login.and.returnValue(throwError(() => new Error('Erro no login')));

    component.onLogin();
    tick();

    expect(usuarioServiceSpy.login).toHaveBeenCalled();
    expect(alertSpy).toHaveBeenCalledWith('Falha no login. Verifique suas credenciais.');
    expect(router.navigate).not.toHaveBeenCalled();
  }));
});
