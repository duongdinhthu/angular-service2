import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import {environment} from '../../environments/environment.development';
import {ApiHandlerService} from '../service/api/api-handler.service';
// import {UserInfoService} from '../service/app/user-info.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private apiHandlerService: ApiHandlerService,
        // private userInfoService: UserInfoService,
    ) {}

    baseURL = environment.baseURL;

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler,
    ): Observable<HttpEvent<unknown>> {
        let modifiedRequest = request;

        const { url } = request;

        modifiedRequest = request.clone({
            setHeaders: {
                Authorization: `Bearer ${environment.accessToken}`,
                Tenant: environment.tenant,
                'Accept-Language': 'vi',
            },
        });

        return next.handle(modifiedRequest).pipe(
            catchError((error: HttpErrorResponse) => {
                const hideToastList: any[] = [];

                // Handle the error here
                let showToast = true;

                for (const item of hideToastList) {
                    if (url.includes(item)) showToast = false;
                }

                if (showToast) {
                    this.apiHandlerService.handleError(error);
                }

                return throwError(() => error);
            }),
        );
    }
}
