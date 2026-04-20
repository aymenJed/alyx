import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { MenuService } from './menu.service';

export interface AuthUser {
  username: string;
  fullName: string;
  roles: string[];
}

interface LoginResponse {
  token: string;
  username: string;
  fullName: string;
  roles: string[];
}

const TOKEN_KEY = 'alyx_token';
const USER_KEY  = 'alyx_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http        = inject(HttpClient);
  private readonly router      = inject(Router);
  private readonly menuService = inject(MenuService);

  private readonly _user = signal<AuthUser | null>(this.loadStoredUser());

  readonly user       = this._user.asReadonly();
  readonly isLoggedIn = computed(() => this._user() !== null);
  readonly isAdmin    = computed(() =>
    this._user()?.roles.includes('ROLE_ADMIN') ?? false
  );

  login(username: string, password: string) {
    return this.http
      .post<LoginResponse>('/api/v1/auth/login', { username, password })
      .pipe(
        tap(res => {
          localStorage.setItem(TOKEN_KEY, res.token);
          const user: AuthUser = {
            username: res.username,
            fullName: res.fullName,
            roles:    res.roles,
          };
          localStorage.setItem(USER_KEY, JSON.stringify(user));
          this._user.set(user);
        })
      );
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this._user.set(null);
    this.menuService.clearMenu();   // reset pour la prochaine session
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  private loadStoredUser(): AuthUser | null {
    try {
      const raw = localStorage.getItem(USER_KEY);
      return raw ? (JSON.parse(raw) as AuthUser) : null;
    } catch {
      return null;
    }
  }
}
