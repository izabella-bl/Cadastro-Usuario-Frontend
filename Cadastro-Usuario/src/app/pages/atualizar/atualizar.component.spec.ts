import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AtualizarComponent } from './atualizar.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('AtualizarComponent', () => {
  let component: AtualizarComponent;
  let fixture: ComponentFixture<AtualizarComponent>;
  let usuarioServiceSpy: jasmine.SpyObj<UsuarioService>;
  let router: Router;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('UsuarioService', ['atualizarUsuario', 'obterId']);

    await TestBed.configureTestingModule({
      imports: [
        AtualizarComponent, 
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

    fixture = TestBed.createComponent(AtualizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve inicializar o formulário vazio ou com dados padrão', () => {
    expect(component.form).toBeDefined();
    expect(component.form.valid).toBeFalse();
  });

  it('deve chamar atualizarUsuario no submit do formulário válido', fakeAsync(() => {
    const usuarioFake = { id: '1', nome: 'João', email: 'joao@gmail.com' };

    spyOn(localStorage, 'getItem').and.returnValue('1');
    usuarioServiceSpy.atualizarUsuario.and.returnValue(of(usuarioFake));

    component.form.setValue({
      nome: 'João',
      email: 'joao@gmail.com',
      senha: '12345678',
      confirmacaoSenha: '12345678'
    });

    fixture.detectChanges();
    component.onSubmit();
    tick();

    expect(usuarioServiceSpy.atualizarUsuario).toHaveBeenCalledWith('1', {
      nome: 'João',
      email: 'joao@gmail.com',
      senha: '12345678',
      confirmacaoSenha: '12345678'
    });
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  }));
});
