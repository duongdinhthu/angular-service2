import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  baseURL = environment.baseUrl;

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    // Các yêu cầu không cần Authorization (ví dụ: đăng ký bệnh nhân)
    const noAuthRequiredUrls = [
      '/register/patient',
      '/login',
      '/change-password',
      ''
    ];

    // Kiểm tra nếu URL yêu cầu không cần Authorization thì bỏ qua bước thêm token
    if (noAuthRequiredUrls.some(url => request.url.includes(url))) {
      return next.handle(request); // Không thêm Authorization cho những yêu cầu này
    }

    // Lấy token mỗi lần intercept để đảm bảo giá trị mới nhất
    const token = localStorage.getItem('token');
    let modifiedRequest = request;

    if (token) {
      modifiedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        },
      });
    }

    return next.handle(modifiedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      }),
    );
  }
}
