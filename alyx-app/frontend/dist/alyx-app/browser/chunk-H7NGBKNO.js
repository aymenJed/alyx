import {
  HttpClient,
  catchError,
  computed,
  inject,
  of,
  signal,
  ɵɵdefineInjectable
} from "./chunk-JFHKQIVQ.js";

// src/app/core/services/shortcut.service.ts
var ShortcutService = class _ShortcutService {
  constructor() {
    this.http = inject(HttpClient);
    this.shortcuts = signal([]);
    this.shortcutCodes = computed(() => new Set(this.shortcuts().map((s) => s.screenCode)));
  }
  loadShortcuts() {
    this.http.get("/api/v1/metadata/shortcuts").pipe(catchError(() => of([]))).subscribe((items) => this.shortcuts.set(items));
  }
  isShortcut(screenCode) {
    return this.shortcutCodes().has(screenCode);
  }
  addShortcut(screenCode) {
    this.http.post(`/api/v1/metadata/shortcuts/${screenCode}`, {}).subscribe(() => this.loadShortcuts());
  }
  removeShortcut(screenCode) {
    this.http.delete(`/api/v1/metadata/shortcuts/${screenCode}`).subscribe(() => {
      this.shortcuts.update((items) => items.filter((i) => i.screenCode !== screenCode));
    });
  }
  toggleShortcut(screenCode) {
    if (this.isShortcut(screenCode)) {
      this.removeShortcut(screenCode);
    } else {
      this.addShortcut(screenCode);
    }
  }
  static {
    this.\u0275fac = function ShortcutService_Factory(t) {
      return new (t || _ShortcutService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ShortcutService, factory: _ShortcutService.\u0275fac, providedIn: "root" });
  }
};

export {
  ShortcutService
};
//# sourceMappingURL=chunk-H7NGBKNO.js.map
