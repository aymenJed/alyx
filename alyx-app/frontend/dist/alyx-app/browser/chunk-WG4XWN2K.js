import {
  MenuService,
  Router
} from "./chunk-Y5NZM7SX.js";
import {
  HttpClient,
  computed,
  inject,
  signal,
  tap,
  ɵɵdefineInjectable
} from "./chunk-JFHKQIVQ.js";

// src/app/core/services/auth.service.ts
var TOKEN_KEY = "alyx_token";
var USER_KEY = "alyx_user";
var AuthService = class _AuthService {
  constructor() {
    this.http = inject(HttpClient);
    this.router = inject(Router);
    this.menuService = inject(MenuService);
    this._user = signal(this.loadStoredUser());
    this.user = this._user.asReadonly();
    this.isLoggedIn = computed(() => this._user() !== null);
    this.isAdmin = computed(() => this._user()?.roles.includes("ROLE_ADMIN") ?? false);
  }
  login(username, password) {
    return this.http.post("/api/v1/auth/login", { username, password }).pipe(tap((res) => {
      localStorage.setItem(TOKEN_KEY, res.token);
      const user = {
        username: res.username,
        fullName: res.fullName,
        roles: res.roles
      };
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      this._user.set(user);
    }));
  }
  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this._user.set(null);
    this.menuService.clearMenu();
    this.router.navigate(["/login"]);
  }
  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  }
  loadStoredUser() {
    try {
      const raw = localStorage.getItem(USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }
  static {
    this.\u0275fac = function AuthService_Factory(t) {
      return new (t || _AuthService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuthService, factory: _AuthService.\u0275fac, providedIn: "root" });
  }
};

export {
  AuthService
};
//# sourceMappingURL=chunk-WG4XWN2K.js.map
