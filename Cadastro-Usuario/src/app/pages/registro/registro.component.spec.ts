import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RegistroComponent} from './registro.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';


describe('RegistroComponent', () => {
  let component: RegistroComponent;
  let fixture: ComponentFixture<RegistroComponent>;
  let usuarioServiceSpy: jasmine.SpyObj<UsuarioService>;
  let router: Router;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('UsuarioService', ['registroCompleto']);

    await TestBed.configureTestingModule({
      imports: [
        RegistroComponent,
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

    fixture = TestBed.createComponent(RegistroComponent);
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

  it('deve chamar registroCompleto no submit do formulário válido', fakeAsync(() => {
    const usuarioFake = { id: '1', nome: 'Maria', email: 'maria@gmail.com' };

    usuarioServiceSpy.registroCompleto.and.returnValue(of(usuarioFake));

    component.form.setValue({
      nome: 'Maria',
      email: 'maria@gmail.com',
      senha: 'senha1234',
      confirmacaoSenha: 'senha1234'
    });

    fixture.detectChanges();
    component.onSubmit();
    tick();

    expect(usuarioServiceSpy.registroCompleto).toHaveBeenCalledWith({
      nome: 'Maria',
      email: 'maria@gmail.com',
      senha: 'senha1234',
      confirmacaoSenha: 'senha1234'
    });
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  }));
});
