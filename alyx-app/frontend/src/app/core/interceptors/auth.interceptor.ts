import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

/**
 * Endpoints "core" dont un 401 signifie que la session est vraiment expirée.
 * Un 401 sur un endpoint de données (analytics, référentiel externe...) ne doit
 * PAS déclencher un logout — l'endpoint peut simplement ne pas exister.
 */
const CORE_API_PATTERNS = [
  '/api/v1/metadata/',
  '/api/v1/designer/',
];

function isCoreApi(url: string): boolean {
  return CORE_API_PATTERNS.some(p => url.includes(p));
}

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth  = inject(AuthService);
  const token = auth.getToken();

  // Ne pas injecter le token sur les endpoints d'authentification eux-mêmes
  const isAuthEndpoint = req.url.includes('/api/v1/auth/');

  const authReq = (token && !isAuthEndpoint)
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(authReq).pipe(
    catchError((err: HttpErrorResponse) => {
      // Auto-logout uniquement si :
      //  - HTTP 401 (non authentifié)
      //  - Sur un endpoint core de l'application (metadata / designer)
      //  - L'utilisateur était bien connecté (token présent)
      // Ceci évite qu'un 401 sur un endpoint inexistant (données analytics, ...)
      // ne déclenche un logout intempestif à cause du forward /error de Spring Boot.
      if (err.status === 401 && !isAuthEndpoint && isCoreApi(req.url) && auth.isLoggedIn()) {
        auth.logout();
      }
      return throwError(() => err);
    })
  );
};
