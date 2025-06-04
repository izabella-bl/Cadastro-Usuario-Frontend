import { TestBed } from '@angular/core/testing';
import { TokenInterceptor } from './token.interceptor';
import { HttpRequest, HttpHandler, HttpResponse, HttpEvent } from '@angular/common/http';
import { of, Observable } from 'rxjs';

describe('TokenInterceptor', () => {
  let interceptor: TokenInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TokenInterceptor],
    });
    interceptor = TestBed.inject(TokenInterceptor);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('deve adicionar header Authorization se token existir e url não for /login ou /cadastro', (done) => {
    localStorage.setItem('token', 'fake-token');

    const httpRequest = new HttpRequest('GET', '/api/data');
    const httpHandler: HttpHandler = {
      handle: (req: HttpRequest<any>): Observable<HttpEvent<any>> => {
        expect(req.headers.has('Authorization')).toBeTrue();
        expect(req.headers.get('Authorization')).toBe('Bearer fake-token');
        return of(new HttpResponse({ status: 200 }));
      }
    };

    interceptor.intercept(httpRequest, httpHandler).subscribe(() => done());
  });

  it('não deve adicionar header Authorization se não houver token', (done) => {
    const httpRequest = new HttpRequest('GET', '/api/data');
    const httpHandler: HttpHandler = {
      handle: (req: HttpRequest<any>): Observable<HttpEvent<any>> => {
        expect(req.headers.has('Authorization')).toBeFalse();
        return of(new HttpResponse({ status: 200 }));
      }
    };

    interceptor.intercept(httpRequest, httpHandler).subscribe(() => done());
  });

  it('não deve adicionar header Authorization se url incluir /login', (done) => {
    localStorage.setItem('token', 'fake-token');

    const httpRequest = new HttpRequest('GET', '/login');
    const httpHandler: HttpHandler = {
      handle: (req: HttpRequest<any>): Observable<HttpEvent<any>> => {
        expect(req.headers.has('Authorization')).toBeFalse();
        return of(new HttpResponse({ status: 200 }));
      }
    };

    interceptor.intercept(httpRequest, httpHandler).subscribe(() => done());
  });

  it('não deve adicionar header Authorization se url incluir /cadastro', (done) => {
    localStorage.setItem('token', 'fake-token');

    const httpRequest = new HttpRequest('GET', '/cadastro');
    const httpHandler: HttpHandler = {
      handle: (req: HttpRequest<any>): Observable<HttpEvent<any>> => {
        expect(req.headers.has('Authorization')).toBeFalse();
        return of(new HttpResponse({ status: 200 }));
      }
    };

    interceptor.intercept(httpRequest, httpHandler).subscribe(() => done());
  });
});
