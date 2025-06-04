import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { UsuarioService } from '../../services/usuario.service';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let usuarioServiceSpy: jasmine.SpyObj<UsuarioService>;

  beforeEach(async () => {
    const usuarioServiceMock = jasmine.createSpyObj('UsuarioService', [
      'listarUsuarios',
      'obterId',
      'buscarPorId'
    ]);

    const activatedRouteMock = {
      snapshot: {
        paramMap: {
          get: () => 'algumId'
        }
      }
    };

    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        { provide: UsuarioService, useValue: usuarioServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    usuarioServiceSpy = TestBed.inject(UsuarioService) as jasmine.SpyObj<UsuarioService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve carregar usuários no ngOnInit', fakeAsync(() => {
    const usuariosFake = [
      { id: '1', nome: 'João' },
      { id: '2', nome: 'Maria' }
    ];

    const usuarioLogado = { id: '1', nome: 'João' };

    usuarioServiceSpy.obterId.and.returnValue('1');
    usuarioServiceSpy.listarUsuarios.and.returnValue(of(usuariosFake));
    usuarioServiceSpy.buscarPorId.and.returnValue(of(usuarioLogado));

    component.ngOnInit();
    tick();
    fixture.detectChanges();

    expect(usuarioServiceSpy.obterId).toHaveBeenCalled();
    expect(usuarioServiceSpy.listarUsuarios).toHaveBeenCalled();
    expect(usuarioServiceSpy.buscarPorId).toHaveBeenCalledWith('1');
    expect(component.usuarios.length).toBe(2);
  }));
});
