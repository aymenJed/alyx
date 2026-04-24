import {
  AuthService
} from "./chunk-YXRCPTU6.js";
import {
  Router
} from "./chunk-JVNL7PXV.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule,
  Validators,
  ɵNgNoValidate
} from "./chunk-LM3PESKF.js";
import {
  inject,
  signal,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-CMRDFCUM.js";
import "./chunk-J4B6MK7R.js";

// src/app/features/auth/login/login.component.ts
function LoginComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 20);
    \u0275\u0275element(2, "path", 21);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.errorMsg(), " ");
  }
}
function LoginComponent_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 22);
    \u0275\u0275element(1, "circle", 23)(2, "path", 24);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Connexion en cours... ");
  }
}
function LoginComponent_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Se connecter ");
  }
}
var LoginComponent = class _LoginComponent {
  constructor() {
    this.fb = inject(FormBuilder);
    this.auth = inject(AuthService);
    this.router = inject(Router);
    this.year = (/* @__PURE__ */ new Date()).getFullYear();
    this.isLoading = signal(false);
    this.errorMsg = signal(null);
    this.form = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }
  onSubmit() {
    if (this.form.invalid)
      return;
    this.isLoading.set(true);
    this.errorMsg.set(null);
    const { username, password } = this.form.value;
    this.auth.login(username, password).subscribe({
      next: () => this.router.navigate(["/"]),
      error: () => {
        this.errorMsg.set("Identifiants incorrects. Veuillez r\xE9essayer.");
        this.isLoading.set(false);
      }
    });
  }
  static {
    this.\u0275fac = function LoginComponent_Factory(t) {
      return new (t || _LoginComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoginComponent, selectors: [["app-login"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 40, vars: 5, consts: [[1, "min-h-screen", "bg-gradient-to-br", "from-slate-900", "via-blue-950", "to-slate-900", "flex", "items-center", "justify-center", "p-4"], [1, "w-full", "max-w-md"], [1, "text-center", "mb-8"], [1, "inline-flex", "items-center", "justify-center", "w-14", "h-14", "bg-blue-600", "rounded-2xl", "shadow-lg", "shadow-blue-500/30", "mb-4"], [1, "text-2xl", "font-bold", "text-white"], [1, "text-slate-400", "text-sm", "mt-1"], [1, "bg-white/5", "backdrop-blur-md", "border", "border-white/10", "rounded-2xl", "p-8", "shadow-2xl"], [1, "space-y-5", 3, "ngSubmit", "formGroup"], [1, "bg-red-500/10", "border", "border-red-500/30", "text-red-400", "text-sm", "px-4", "py-3", "rounded-lg", "flex", "items-center", "gap-2"], [1, "block", "text-sm", "font-medium", "text-slate-300", "mb-1.5"], ["formControlName", "username", "type", "text", "placeholder", "Votre login", "autocomplete", "username", 1, "w-full", "px-4", "py-2.5", "bg-white/10", "border", "border-white/20", "rounded-lg", "text-white", "placeholder-slate-500", "focus:ring-2", "focus:ring-blue-500", "focus:border-transparent", "text-sm", "transition-all", "outline-none"], ["formControlName", "password", "type", "password", "placeholder", "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", "autocomplete", "current-password", 1, "w-full", "px-4", "py-2.5", "bg-white/10", "border", "border-white/20", "rounded-lg", "text-white", "placeholder-slate-500", "focus:ring-2", "focus:ring-blue-500", "focus:border-transparent", "text-sm", "transition-all", "outline-none"], ["type", "submit", 1, "w-full", "py-2.5", "px-4", "bg-blue-600", "hover:bg-blue-700", "text-white", "font-medium", "rounded-lg", "text-sm", "transition-colors", "disabled:opacity-50", "disabled:cursor-not-allowed", "flex", "items-center", "justify-center", "gap-2", "mt-2", 3, "disabled"], [1, "mt-4", "bg-white/3", "border", "border-white/10", "rounded-xl", "p-4", "text-xs", "text-slate-500"], [1, "font-medium", "text-slate-400", "mb-2"], [1, "space-y-1"], [1, "flex", "justify-between"], [1, "text-slate-400"], [1, "text-blue-400"], [1, "text-center", "text-slate-600", "text-xs", "mt-4"], ["fill", "currentColor", "viewBox", "0 0 20 20", 1, "w-4", "h-4", "flex-shrink-0"], ["fill-rule", "evenodd", "d", "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z", "clip-rule", "evenodd"], ["fill", "none", "viewBox", "0 0 24 24", 1, "w-4", "h-4", "animate-spin"], ["cx", "12", "cy", "12", "r", "10", "stroke", "currentColor", "stroke-width", "4", 1, "opacity-25"], ["fill", "currentColor", "d", "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z", 1, "opacity-75"]], template: function LoginComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "span", 4);
        \u0275\u0275text(5, "A");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(6, "h1", 4);
        \u0275\u0275text(7, "Alyx App");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "p", 5);
        \u0275\u0275text(9, "March\xE9s Financiers UMOA / BRVM");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(10, "div", 6)(11, "form", 7);
        \u0275\u0275listener("ngSubmit", function LoginComponent_Template_form_ngSubmit_11_listener() {
          return ctx.onSubmit();
        });
        \u0275\u0275template(12, LoginComponent_Conditional_12_Template, 4, 1, "div", 8);
        \u0275\u0275elementStart(13, "div")(14, "label", 9);
        \u0275\u0275text(15, " Identifiant ");
        \u0275\u0275elementEnd();
        \u0275\u0275element(16, "input", 10);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(17, "div")(18, "label", 9);
        \u0275\u0275text(19, " Mot de passe ");
        \u0275\u0275elementEnd();
        \u0275\u0275element(20, "input", 11);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(21, "button", 12);
        \u0275\u0275template(22, LoginComponent_Conditional_22_Template, 4, 0)(23, LoginComponent_Conditional_23_Template, 1, 0);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(24, "div", 13)(25, "p", 14);
        \u0275\u0275text(26, "Comptes de d\xE9monstration");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(27, "div", 15)(28, "div", 16)(29, "span", 17);
        \u0275\u0275text(30, "admin / admin123");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(31, "span", 18);
        \u0275\u0275text(32, "ADMIN + USER");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(33, "div", 16)(34, "span", 17);
        \u0275\u0275text(35, "trader / user123");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(36, "span", 17);
        \u0275\u0275text(37, "USER");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(38, "p", 19);
        \u0275\u0275text(39);
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(11);
        \u0275\u0275property("formGroup", ctx.form);
        \u0275\u0275advance();
        \u0275\u0275conditional(12, ctx.errorMsg() ? 12 : -1);
        \u0275\u0275advance(9);
        \u0275\u0275property("disabled", ctx.form.invalid || ctx.isLoading());
        \u0275\u0275advance();
        \u0275\u0275conditional(22, ctx.isLoading() ? 22 : 23);
        \u0275\u0275advance(17);
        \u0275\u0275textInterpolate1(" \xA9 ", ctx.year, " Alyx Bonds \u2014 Plateforme March\xE9s Bonds ");
      }
    }, dependencies: [ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoginComponent, { className: "LoginComponent", filePath: "src\\app\\features\\auth\\login\\login.component.ts", lineNumber: 111 });
})();
export {
  LoginComponent
};
//# sourceMappingURL=login.component-77KLYDOQ.js.map
