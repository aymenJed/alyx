import {
  Router
} from "./chunk-JVNL7PXV.js";
import {
  HttpClient,
  computed,
  inject,
  signal,
  tap,
  ɵɵdefineInjectable
} from "./chunk-CMRDFCUM.js";

// src/app/core/services/menu.service.ts
var MenuService = class _MenuService {
  constructor() {
    this.http = inject(HttpClient);
    this.menu = signal([]);
    this.isLoading = signal(false);
    this.isCollapsed = signal(false);
    this.activeCode = signal(null);
    this.flatMenu = computed(() => this.flatten(this.menu()));
  }
  clearMenu() {
    this.menu.set([]);
  }
  /**
   * Charge l'arbre des menus depuis l'API metadata
   * Endpoint: GET /api/metadata/menu/tree
   */
  loadMenu() {
    if (this.menu().length > 0)
      return;
    this.isLoading.set(true);
    this.http.get("/api/v1/metadata/menu/tree").subscribe({
      next: (nodes) => {
        this.menu.set(nodes);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error("Erreur chargement menu:", err);
        this.isLoading.set(false);
      }
    });
  }
  /**
   * Retourne l'arbre des menus (pour GenericRendererComponent)
   */
  getMenuTree() {
    return this.http.get("/api/v1/metadata/menu/tree");
  }
  /**
   * Trouve un menu par son chemin de route
   */
  findByRoute(route) {
    const flat = this.flatMenu();
    return flat.find((m) => m.route === route) || null;
  }
  toggleCollapsed() {
    this.isCollapsed.update((v) => !v);
  }
  setActive(code) {
    this.activeCode.set(code);
  }
  flatten(nodes) {
    return nodes.flatMap((n) => [n, ...this.flatten(n.children)]);
  }
  static {
    this.\u0275fac = function MenuService_Factory(t) {
      return new (t || _MenuService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _MenuService, factory: _MenuService.\u0275fac, providedIn: "root" });
  }
};

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
  MenuService,
  AuthService
};
//# sourceMappingURL=chunk-YXRCPTU6.js.map
