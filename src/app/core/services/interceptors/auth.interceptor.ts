import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { StorageService } from '../storage/storage.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';
import { LoginRefreshRequest } from '../../../model/login/login-refres-request.dto';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const storageService = inject(StorageService);
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = storageService.getAccessToken();
  

  let cloned = req;

  if (token) {
    cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(cloned).pipe(

    catchError((error) => {

      if (error.status === 401 || error.status === 403) {

        const refreshToken = storageService.getRefreshToken();

        if (!refreshToken) {
          router.navigate(['/login']);
          return throwError(() => error);
        }

        const request: LoginRefreshRequest = {
          refreshToken: refreshToken
        };

        return authService.loginWithRefresh(request).pipe(

          switchMap((response: any) => {

            storageService.setAuthData(response);

            const retryReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${response.accessToken}`
              }
            });

            return next(retryReq);

          }),

          catchError((refreshError) => {

            storageService.clear();
            router.navigate(['/login']);

            return throwError(() => refreshError);

          })

        );

      }

      return throwError(() => error);

    })

  );

};
