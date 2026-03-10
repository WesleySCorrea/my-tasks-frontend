import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../core/services/storage/storage.service';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const storage = inject(StorageService);
  
  const token = storage.getAccessToken();

  const publicRoutes = ['/login', '/register', '/forgot-password', '/reset-password', 'reset-password/*'];

  const isPublic = publicRoutes.includes(state.url) || state.url.startsWith('/reset-password');

  if (isPublic) {
    if (token) {
      router.navigate(['/']);
      return false;
    }
    return true;
  }

  // Qualquer outra página protegida
  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};