import {
  ShortcutService
} from "./chunk-H7NGBKNO.js";
import {
  ActivatedRoute,
  MenuService,
  Router
} from "./chunk-Y5NZM7SX.js";
import {
  CheckboxControlValueAccessor,
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  NgControlStatus,
  NgControlStatusGroup,
  NgModel,
  NgSelectOption,
  ReactiveFormsModule,
  SelectControlValueAccessor,
  SelectMultipleControlValueAccessor,
  Validators,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-JFDLM4N4.js";
import {
  HttpClient,
  HttpParams,
  catchError,
  computed,
  forkJoin,
  inject,
  of,
  signal,
  tap,
  ɵsetClassDebugInfo,
  ɵɵNgOnChangesFeature,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate3,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-JFHKQIVQ.js";
import {
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-J4B6MK7R.js";

// src/app/core/services/metadata.service.ts
var MetadataService = class _MetadataService {
  constructor() {
    this.http = inject(HttpClient);
    this.cache = /* @__PURE__ */ new Map();
  }
  getScreenMetadata(code) {
    const cached = this.cache.get(code);
    if (cached)
      return of(cached);
    return this.http.get(`/api/v1/metadata/screens/${code}`).pipe(tap((meta) => this.cache.set(code, meta)));
  }
  /** Invalide le cache d'un écran (ex: après modification admin) */
  invalidate(code) {
    this.cache.delete(code);
  }
  clearCache() {
    this.cache.clear();
  }
  static {
    this.\u0275fac = function MetadataService_Factory(t) {
      return new (t || _MetadataService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _MetadataService, factory: _MetadataService.\u0275fac, providedIn: "root" });
  }
};

// src/app/shared/components/form-generator/form-generator.component.ts
var _forTrack0 = ($index, $item) => $item.fieldKey;
var _forTrack1 = ($index, $item) => $item.value;
var _c0 = () => ["TEXT", "EMAIL", "PASSWORD", "NUMBER", "AMOUNT"];
var _c1 = () => ["DATE", "DATETIME"];
var _c2 = () => ["SELECT", "AUTOCOMPLETE"];
var _c3 = () => ["CHECKBOX", "SWITCH"];
function FormGeneratorComponent_For_5_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 9);
    \u0275\u0275text(1, "*");
    \u0275\u0275elementEnd();
  }
}
function FormGeneratorComponent_For_5_Conditional_4_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 17);
    \u0275\u0275text(1, " FCFA ");
    \u0275\u0275elementEnd();
  }
}
function FormGeneratorComponent_For_5_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275template(1, FormGeneratorComponent_For_5_Conditional_4_Conditional_1_Template, 2, 0, "span", 17);
    \u0275\u0275element(2, "input", 18);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_17_0;
    const comp_r1 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(1, comp_r1.formatPattern === "FCFA" || comp_r1.formatPattern === "XOF" ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275classProp("pl-12", comp_r1.formatPattern === "FCFA" || comp_r1.formatPattern === "XOF")("px-3", comp_r1.formatPattern !== "FCFA" && comp_r1.formatPattern !== "XOF");
    \u0275\u0275property("id", comp_r1.fieldKey)("formControlName", comp_r1.fieldKey)("type", ctx_r1.getInputType(comp_r1.componentType))("placeholder", (tmp_17_0 = comp_r1.placeholder) !== null && tmp_17_0 !== void 0 ? tmp_17_0 : "")("readonly", comp_r1.readonly);
  }
}
function FormGeneratorComponent_For_5_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "input", 11);
  }
  if (rf & 2) {
    const comp_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("id", comp_r1.fieldKey)("formControlName", comp_r1.fieldKey)("type", comp_r1.componentType === "DATETIME" ? "datetime-local" : "date")("readonly", comp_r1.readonly);
  }
}
function FormGeneratorComponent_For_5_Conditional_6_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 20);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const opt_r3 = ctx.$implicit;
    \u0275\u0275property("value", opt_r3.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(opt_r3.label);
  }
}
function FormGeneratorComponent_For_5_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "select", 12)(1, "option", 19);
    \u0275\u0275text(2, "-- Choisir --");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(3, FormGeneratorComponent_For_5_Conditional_6_For_4_Template, 2, 2, "option", 20, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const comp_r1 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("id", comp_r1.fieldKey)("formControlName", comp_r1.fieldKey);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.getOptions(comp_r1));
  }
}
function FormGeneratorComponent_For_5_Conditional_7_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 20);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const opt_r4 = ctx.$implicit;
    \u0275\u0275property("value", opt_r4.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(opt_r4.label);
  }
}
function FormGeneratorComponent_For_5_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "select", 13);
    \u0275\u0275repeaterCreate(1, FormGeneratorComponent_For_5_Conditional_7_For_2_Template, 2, 2, "option", 20, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const comp_r1 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("id", comp_r1.fieldKey)("formControlName", comp_r1.fieldKey);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.getOptions(comp_r1));
  }
}
function FormGeneratorComponent_For_5_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "textarea", 14);
  }
  if (rf & 2) {
    let tmp_13_0;
    const comp_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("id", comp_r1.fieldKey)("formControlName", comp_r1.fieldKey)("placeholder", (tmp_13_0 = comp_r1.placeholder) !== null && tmp_13_0 !== void 0 ? tmp_13_0 : "");
  }
}
function FormGeneratorComponent_For_5_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275element(1, "input", 21);
    \u0275\u0275elementStart(2, "span", 22);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const comp_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("id", comp_r1.fieldKey)("formControlName", comp_r1.fieldKey);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(comp_r1.placeholder);
  }
}
function FormGeneratorComponent_For_5_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 16);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_11_0;
    const comp_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", (tmp_11_0 = comp_r1.validationMsg) !== null && tmp_11_0 !== void 0 ? tmp_11_0 : "Ce champ est requis", " ");
  }
}
function FormGeneratorComponent_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "label", 8);
    \u0275\u0275text(2);
    \u0275\u0275template(3, FormGeneratorComponent_For_5_Conditional_3_Template, 2, 0, "span", 9);
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, FormGeneratorComponent_For_5_Conditional_4_Template, 3, 10, "div", 10)(5, FormGeneratorComponent_For_5_Conditional_5_Template, 1, 4, "input", 11)(6, FormGeneratorComponent_For_5_Conditional_6_Template, 5, 2, "select", 12)(7, FormGeneratorComponent_For_5_Conditional_7_Template, 3, 2, "select", 13)(8, FormGeneratorComponent_For_5_Conditional_8_Template, 1, 3, "textarea", 14)(9, FormGeneratorComponent_For_5_Conditional_9_Template, 4, 3, "div", 15)(10, FormGeneratorComponent_For_5_Conditional_10_Template, 2, 1, "p", 16);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const comp_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classMap(ctx_r1.colSpanClass(comp_r1.gridColSpan));
    \u0275\u0275advance();
    \u0275\u0275property("for", comp_r1.fieldKey);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", comp_r1.label, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(3, comp_r1.required ? 3 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(4, \u0275\u0275pureFunction0(12, _c0).includes(comp_r1.componentType) ? 4 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(5, \u0275\u0275pureFunction0(13, _c1).includes(comp_r1.componentType) ? 5 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(6, \u0275\u0275pureFunction0(14, _c2).includes(comp_r1.componentType) ? 6 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(7, comp_r1.componentType === "MULTISELECT" ? 7 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(8, comp_r1.componentType === "TEXTAREA" ? 8 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(9, \u0275\u0275pureFunction0(15, _c3).includes(comp_r1.componentType) ? 9 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(10, ctx_r1.showError(comp_r1.fieldKey) ? 10 : -1);
  }
}
function FormGeneratorComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Enregistrement... ");
  }
}
function FormGeneratorComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Enregistrer ");
  }
}
var FormGeneratorComponent = class _FormGeneratorComponent {
  constructor() {
    this.fb = inject(FormBuilder);
    this.http = inject(HttpClient);
    this.isSubmitting = signal(false);
    this.visibleComponents = signal([]);
    this.dynamicOptions = /* @__PURE__ */ new Map();
  }
  ngOnInit() {
    this.buildForm();
    this.loadDynamicOptions();
    this.form.valueChanges.subscribe(() => this.refreshVisibility());
  }
  // ─── Form Builder ──────────────────────────────────────────
  buildForm() {
    const controls = {};
    for (const comp of this.metadata.components) {
      const validators = [];
      if (comp.required)
        validators.push(Validators.required);
      if (comp.validationRegex)
        validators.push(Validators.pattern(comp.validationRegex));
      if (comp.componentType === "EMAIL")
        validators.push(Validators.email);
      controls[comp.fieldKey] = this.fb.control({ value: comp.defaultValue ?? "", disabled: comp.readonly }, validators);
    }
    this.form = this.fb.group(controls);
    this.refreshVisibility();
  }
  // ─── Visibilité conditionnelle ─────────────────────────────
  refreshVisibility() {
    const values = this.form.getRawValue();
    const visible = this.metadata.components.filter((comp) => {
      if (!comp.visibilityRule)
        return true;
      const { field, operator, value } = comp.visibilityRule;
      const fieldValue = values[field];
      return this.evaluateRule(fieldValue, operator, value);
    });
    this.visibleComponents.set(visible);
  }
  evaluateRule(fieldValue, operator, ruleValue) {
    switch (operator) {
      case "eq":
        return fieldValue === ruleValue;
      case "neq":
        return fieldValue !== ruleValue;
      case "in":
        return Array.isArray(ruleValue) && ruleValue.includes(fieldValue);
      case "notin":
        return Array.isArray(ruleValue) && !ruleValue.includes(fieldValue);
      case "gt":
        return Number(fieldValue) > Number(ruleValue);
      case "lt":
        return Number(fieldValue) < Number(ruleValue);
      default:
        return true;
    }
  }
  // ─── Options dynamiques ────────────────────────────────────
  loadDynamicOptions() {
    for (const comp of this.metadata.components) {
      if (comp.optionsSource && !comp.options?.length) {
        this.http.get(comp.optionsSource).subscribe((opts) => this.dynamicOptions.set(comp.fieldKey, opts));
      }
    }
  }
  getOptions(comp) {
    return comp.options?.length ? comp.options : this.dynamicOptions.get(comp.fieldKey) ?? [];
  }
  // ─── Helpers template ──────────────────────────────────────
  getInputType(componentType) {
    switch (componentType) {
      case "EMAIL":
        return "email";
      case "PASSWORD":
        return "password";
      case "NUMBER":
      case "AMOUNT":
        return "number";
      default:
        return "text";
    }
  }
  /** Classe CSS Grid selon le span déclaré en BDD (1–12) */
  colSpanClass(span) {
    const map = {
      1: "col-span-1",
      2: "col-span-2",
      3: "col-span-3",
      4: "col-span-4",
      5: "col-span-5",
      6: "col-span-6",
      7: "col-span-7",
      8: "col-span-8",
      9: "col-span-9",
      10: "col-span-10",
      11: "col-span-11",
      12: "col-span-12"
    };
    return map[span] ?? "col-span-6";
  }
  showError(fieldKey) {
    const ctrl = this.form.get(fieldKey);
    return !!(ctrl?.invalid && (ctrl.dirty || ctrl.touched));
  }
  // ─── Actions ───────────────────────────────────────────────
  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isSubmitting.set(true);
    this.http.post(this.metadata.apiBaseUrl, this.form.getRawValue()).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.form.reset();
      },
      error: () => this.isSubmitting.set(false)
    });
  }
  reset() {
    this.form.reset();
  }
  static {
    this.\u0275fac = function FormGeneratorComponent_Factory(t) {
      return new (t || _FormGeneratorComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FormGeneratorComponent, selectors: [["app-form-generator"]], inputs: { metadata: "metadata" }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 12, vars: 3, consts: [[1, "p-6", "max-w-5xl", "mx-auto"], [1, "space-y-6", 3, "ngSubmit", "formGroup"], [1, "bg-white", "rounded-xl", "border", "border-slate-200", "p-6"], [1, "grid", "grid-cols-12", "gap-4"], [3, "class"], [1, "flex", "justify-end", "gap-3"], ["type", "button", 1, "px-4", "py-2", "text-sm", "font-medium", "text-slate-700", "bg-white", "border", "border-slate-300", "rounded-lg", "hover:bg-slate-50", "transition-colors", 3, "click"], ["type", "submit", 1, "px-5", "py-2", "text-sm", "font-medium", "text-white", "bg-blue-600", "rounded-lg", "hover:bg-blue-700", "disabled:opacity-50", "disabled:cursor-not-allowed", "transition-colors", 3, "disabled"], [1, "block", "text-sm", "font-medium", "text-slate-700", "mb-1", 3, "for"], [1, "text-red-500", "ml-0.5"], [1, "relative"], [1, "w-full", "px-3", "border", "border-slate-300", "rounded-lg", "py-2", "text-sm", "text-slate-800", "focus:ring-2", "focus:ring-blue-500", "focus:border-blue-500", "transition-colors", 3, "id", "formControlName", "type", "readonly"], [1, "w-full", "px-3", "border", "border-slate-300", "rounded-lg", "py-2", "text-sm", "text-slate-800", "focus:ring-2", "focus:ring-blue-500", "focus:border-blue-500", "bg-white", "transition-colors", 3, "id", "formControlName"], ["multiple", "", 1, "w-full", "px-3", "border", "border-slate-300", "rounded-lg", "py-2", "text-sm", "text-slate-800", "focus:ring-2", "focus:ring-blue-500", "focus:border-blue-500", "transition-colors", 3, "id", "formControlName"], ["rows", "3", 1, "w-full", "px-3", "py-2", "border", "border-slate-300", "rounded-lg", "text-sm", "text-slate-800", "focus:ring-2", "focus:ring-blue-500", "focus:border-blue-500", "resize-none", "transition-colors", 3, "id", "formControlName", "placeholder"], [1, "flex", "items-center", "h-9"], [1, "mt-1", "text-xs", "text-red-500"], [1, "absolute", "left-3", "top-1/2", "-translate-y-1/2", "text-slate-400", "text-xs", "font-medium"], [1, "w-full", "border", "border-slate-300", "rounded-lg", "py-2", "text-sm", "text-slate-800", "focus:ring-2", "focus:ring-blue-500", "focus:border-blue-500", "disabled:bg-slate-50", "disabled:text-slate-400", "transition-colors", 3, "id", "formControlName", "type", "placeholder", "readonly"], ["value", ""], [3, "value"], ["type", "checkbox", 1, "w-4", "h-4", "text-blue-600", "border-slate-300", "rounded", "focus:ring-blue-500", 3, "id", "formControlName"], [1, "ml-2", "text-sm", "text-slate-600"]], template: function FormGeneratorComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "form", 1);
        \u0275\u0275listener("ngSubmit", function FormGeneratorComponent_Template_form_ngSubmit_1_listener() {
          return ctx.onSubmit();
        });
        \u0275\u0275elementStart(2, "div", 2)(3, "div", 3);
        \u0275\u0275repeaterCreate(4, FormGeneratorComponent_For_5_Template, 11, 16, "div", 4, _forTrack0);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(6, "div", 5)(7, "button", 6);
        \u0275\u0275listener("click", function FormGeneratorComponent_Template_button_click_7_listener() {
          return ctx.reset();
        });
        \u0275\u0275text(8, " Annuler ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "button", 7);
        \u0275\u0275template(10, FormGeneratorComponent_Conditional_10_Template, 1, 0)(11, FormGeneratorComponent_Conditional_11_Template, 1, 0);
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance();
        \u0275\u0275property("formGroup", ctx.form);
        \u0275\u0275advance(3);
        \u0275\u0275repeater(ctx.visibleComponents());
        \u0275\u0275advance(5);
        \u0275\u0275property("disabled", ctx.form.invalid || ctx.isSubmitting());
        \u0275\u0275advance();
        \u0275\u0275conditional(10, ctx.isSubmitting() ? 10 : 11);
      }
    }, dependencies: [ReactiveFormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, CheckboxControlValueAccessor, SelectControlValueAccessor, SelectMultipleControlValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FormGeneratorComponent, { className: "FormGeneratorComponent", filePath: "src\\app\\shared\\components\\form-generator\\form-generator.component.ts", lineNumber: 171 });
})();

// src/app/shared/components/data-grid/data-grid.component.ts
var _forTrack02 = ($index, $item) => $item.fieldKey;
var _forTrack12 = ($index, $item) => $item.key;
function DataGridComponent_Conditional_7_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 22);
    \u0275\u0275listener("click", function DataGridComponent_Conditional_7_For_2_Template_button_click_0_listener() {
      const fmt_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.exportData(fmt_r2));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 23);
    \u0275\u0275element(2, "path", 24);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const fmt_r2 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", fmt_r2, " ");
  }
}
function DataGridComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275repeaterCreate(1, DataGridComponent_Conditional_7_For_2_Template, 4, 1, "button", 21, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.metadata.gridConfig.exportFormats);
  }
}
function DataGridComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 25);
    \u0275\u0275listener("click", function DataGridComponent_Conditional_8_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openNew());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 26);
    \u0275\u0275element(2, "path", 27);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Nouveau ");
    \u0275\u0275elementEnd();
  }
}
function DataGridComponent_For_15_Conditional_3_Conditional_1_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u2191 ");
  }
}
function DataGridComponent_For_15_Conditional_3_Conditional_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u2193 ");
  }
}
function DataGridComponent_For_15_Conditional_3_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, DataGridComponent_For_15_Conditional_3_Conditional_1_Conditional_0_Template, 1, 0)(1, DataGridComponent_For_15_Conditional_3_Conditional_1_Conditional_1_Template, 1, 0);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275conditional(0, ctx_r2.currentSort().direction === "asc" ? 0 : 1);
  }
}
function DataGridComponent_For_15_Conditional_3_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u2195 ");
  }
}
function DataGridComponent_For_15_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 30);
    \u0275\u0275template(1, DataGridComponent_For_15_Conditional_3_Conditional_1_Template, 2, 1)(2, DataGridComponent_For_15_Conditional_3_Conditional_2_Template, 1, 0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const col_r6 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(1, ctx_r2.currentSort().field === col_r6.fieldKey ? 1 : 2);
  }
}
function DataGridComponent_For_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "th", 28);
    \u0275\u0275listener("click", function DataGridComponent_For_15_Template_th_click_0_listener() {
      const col_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(col_r6.sortable && ctx_r2.sort(col_r6.fieldKey));
    });
    \u0275\u0275elementStart(1, "div", 29);
    \u0275\u0275text(2);
    \u0275\u0275template(3, DataGridComponent_For_15_Conditional_3_Template, 3, 1, "span", 30);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const col_r6 = ctx.$implicit;
    \u0275\u0275classProp("cursor-pointer", col_r6.sortable)("hover:bg-slate-100", col_r6.sortable);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", col_r6.label, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(3, col_r6.sortable ? 3 : -1);
  }
}
function DataGridComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 14);
    \u0275\u0275text(1, " Actions ");
    \u0275\u0275elementEnd();
  }
}
function DataGridComponent_Conditional_18_For_1_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 31);
    \u0275\u0275element(1, "div", 32);
    \u0275\u0275elementEnd();
  }
}
function DataGridComponent_Conditional_18_For_1_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 31);
    \u0275\u0275element(1, "div", 33);
    \u0275\u0275elementEnd();
  }
}
function DataGridComponent_Conditional_18_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr");
    \u0275\u0275repeaterCreate(1, DataGridComponent_Conditional_18_For_1_For_2_Template, 2, 0, "td", 31, _forTrack02);
    \u0275\u0275template(3, DataGridComponent_Conditional_18_For_1_Conditional_3_Template, 2, 0, "td", 31);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.gridColumns());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(3, (ctx_r2.metadata.gridConfig == null ? null : ctx_r2.metadata.gridConfig.actions == null ? null : ctx_r2.metadata.gridConfig.actions.length) ? 3 : -1);
  }
}
function DataGridComponent_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, DataGridComponent_Conditional_18_For_1_Template, 4, 1, "tr", null, \u0275\u0275repeaterTrackByIndex);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275repeater(ctx_r2.skeletonRows);
  }
}
function DataGridComponent_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 34);
    \u0275\u0275text(2, " Aucune donn\xE9e disponible ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275attribute("colspan", ctx_r2.gridColumns().length + 1);
  }
}
function DataGridComponent_Conditional_20_For_1_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 36);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const col_r7 = ctx.$implicit;
    const row_r8 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.formatCell(row_r8[col_r7.fieldKey], col_r7), " ");
  }
}
function DataGridComponent_Conditional_20_For_1_Conditional_3_For_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 39);
    \u0275\u0275listener("click", function DataGridComponent_Conditional_20_For_1_Conditional_3_For_3_Template_button_click_0_listener() {
      const action_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const row_r8 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.handleAction(action_r10.key, row_r8));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const action_r10 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275classMap(ctx_r2.getActionClass(action_r10.color));
    \u0275\u0275property("title", action_r10.label);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", action_r10.label, " ");
  }
}
function DataGridComponent_Conditional_20_For_1_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 31)(1, "div", 37);
    \u0275\u0275repeaterCreate(2, DataGridComponent_Conditional_20_For_1_Conditional_3_For_3_Template, 2, 4, "button", 38, _forTrack12);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.metadata.gridConfig.actions);
  }
}
function DataGridComponent_Conditional_20_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 35);
    \u0275\u0275repeaterCreate(1, DataGridComponent_Conditional_20_For_1_For_2_Template, 2, 1, "td", 36, _forTrack02);
    \u0275\u0275template(3, DataGridComponent_Conditional_20_For_1_Conditional_3_Template, 4, 0, "td", 31);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.gridColumns());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(3, (ctx_r2.metadata.gridConfig == null ? null : ctx_r2.metadata.gridConfig.actions == null ? null : ctx_r2.metadata.gridConfig.actions.length) ? 3 : -1);
  }
}
function DataGridComponent_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, DataGridComponent_Conditional_20_For_1_Template, 4, 1, "tr", 35, \u0275\u0275repeaterTrackByIndex);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275repeater(ctx_r2.rows());
  }
}
function DataGridComponent_For_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 40);
    \u0275\u0275listener("click", function DataGridComponent_For_28_Template_button_click_0_listener() {
      const p_r12 = \u0275\u0275restoreView(_r11).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.goToPage(p_r12));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r12 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classMap(p_r12 === ctx_r2.currentPage() ? "bg-blue-600 text-white border-blue-600" : "bg-white text-slate-600 border-slate-300 hover:bg-slate-50");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", p_r12 + 1, " ");
  }
}
var DataGridComponent = class _DataGridComponent {
  constructor() {
    this.http = inject(HttpClient);
    this.rows = signal([]);
    this.isLoading = signal(false);
    this.currentPage = signal(0);
    this.totalElements = signal(0);
    this.totalPages = signal(0);
    this.currentSort = signal({ field: "", direction: "asc" });
    this.searchTerm = "";
    this.gridColumns = computed(() => this.metadata.components.filter((c) => c.gridColumn));
    this.pageNumbers = computed(() => Array.from({ length: Math.min(this.totalPages(), 5) }, (_, i) => i));
    this.skeletonRows = Array(5);
  }
  ngOnInit() {
    const cfg = this.metadata.gridConfig;
    this.currentSort.set({
      field: cfg?.defaultSort ?? "",
      direction: cfg?.defaultSortDir ?? "desc"
    });
    this.loadData();
  }
  loadData() {
    this.isLoading.set(true);
    const cfg = this.metadata.gridConfig;
    const sort = this.currentSort();
    let params = new HttpParams().set("page", this.currentPage()).set("size", cfg?.pageSize ?? 20);
    if (sort.field)
      params = params.set("sort", `${sort.field},${sort.direction}`);
    if (this.searchTerm)
      params = params.set("search", this.searchTerm);
    this.http.get(this.metadata.apiBaseUrl, { params }).subscribe({
      next: (res) => {
        this.rows.set(res.content);
        this.totalElements.set(res.totalElements);
        this.totalPages.set(res.totalPages);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false)
    });
  }
  sort(field) {
    this.currentSort.update((s) => ({
      field,
      direction: s.field === field && s.direction === "asc" ? "desc" : "asc"
    }));
    this.currentPage.set(0);
    this.loadData();
  }
  goToPage(page) {
    this.currentPage.set(page);
    this.loadData();
  }
  onSearch() {
    this.currentPage.set(0);
    this.loadData();
  }
  handleAction(actionKey, row) {
    console.log(`Action: ${actionKey}`, row);
  }
  openNew() {
    console.log("Ouvrir formulaire de cr\xE9ation");
  }
  exportData(format) {
    window.open(`${this.metadata.apiBaseUrl}/export?format=${format}`, "_blank");
  }
  formatCell(value, col) {
    if (value == null)
      return "\u2014";
    if (col.formatPattern === "FCFA" || col.formatPattern === "XOF") {
      return new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "XOF",
        minimumFractionDigits: 0
      }).format(Number(value));
    }
    if (col.formatPattern === "%")
      return `${value} %`;
    if (col.componentType === "DATE" && typeof value === "string") {
      return new Date(value).toLocaleDateString("fr-FR");
    }
    if (col.componentType === "BADGE" && col.options) {
      const opt = col.options.find((o) => o.value === String(value));
      return opt?.label ?? String(value);
    }
    return String(value);
  }
  canWrite() {
    return true;
  }
  getActionClass(color) {
    const map = {
      blue: "bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100",
      amber: "bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100",
      red: "bg-red-50 text-red-700 border border-red-200 hover:bg-red-100",
      green: "bg-green-50 text-green-700 border border-green-200 hover:bg-green-100",
      gray: "bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100"
    };
    return map[color ?? "gray"];
  }
  static {
    this.\u0275fac = function DataGridComponent_Factory(t) {
      return new (t || _DataGridComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DataGridComponent, selectors: [["app-data-grid"]], inputs: { metadata: "metadata" }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 31, vars: 10, consts: [[1, "p-6", "flex", "flex-col", "gap-4"], [1, "flex", "items-center", "justify-between", "gap-3", "flex-wrap"], [1, "relative"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "absolute", "left-3", "top-1/2", "-translate-y-1/2", "w-4", "h-4", "text-slate-400"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0"], ["type", "text", "placeholder", "Rechercher...", 1, "pl-9", "pr-4", "py-2", "border", "border-slate-300", "rounded-lg", "text-sm", "focus:ring-2", "focus:ring-blue-500", "w-64", 3, "ngModelChange", "ngModel"], [1, "flex", "items-center", "gap-2"], [1, "flex", "gap-1"], [1, "px-4", "py-2", "text-sm", "font-medium", "text-white", "bg-blue-600", "rounded-lg", "hover:bg-blue-700", "transition-colors", "flex", "items-center", "gap-2"], [1, "bg-white", "rounded-xl", "border", "border-slate-200", "overflow-hidden"], [1, "overflow-x-auto"], [1, "w-full", "text-sm"], [1, "bg-slate-50", "border-b", "border-slate-200"], [1, "px-4", "py-3", "text-left", "text-xs", "font-semibold", "text-slate-600", "uppercase", "tracking-wide", "whitespace-nowrap", 3, "cursor-pointer", "hover:bg-slate-100"], [1, "px-4", "py-3", "text-right", "text-xs", "font-semibold", "text-slate-600", "uppercase", "tracking-wide"], [1, "divide-y", "divide-slate-100"], [1, "flex", "items-center", "justify-between", "px-4", "py-3", "border-t", "border-slate-200", "bg-slate-50"], [1, "text-xs", "text-slate-500"], [1, "flex", "items-center", "gap-1"], [1, "px-2.5", "py-1.5", "text-xs", "rounded-md", "border", "border-slate-300", "bg-white", "text-slate-600", "hover:bg-slate-50", "disabled:opacity-40", "disabled:cursor-not-allowed", "transition-colors", 3, "click", "disabled"], [1, "w-8", "h-8", "text-xs", "rounded-md", "border", "transition-colors", 3, "class"], [1, "px-3", "py-2", "text-xs", "font-medium", "text-slate-600", "bg-white", "border", "border-slate-300", "rounded-lg", "hover:bg-slate-50", "transition-colors", "flex", "items-center", "gap-1"], [1, "px-3", "py-2", "text-xs", "font-medium", "text-slate-600", "bg-white", "border", "border-slate-300", "rounded-lg", "hover:bg-slate-50", "transition-colors", "flex", "items-center", "gap-1", 3, "click"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", "stroke-width", "2", 1, "w-3.5", "h-3.5"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"], [1, "px-4", "py-2", "text-sm", "font-medium", "text-white", "bg-blue-600", "rounded-lg", "hover:bg-blue-700", "transition-colors", "flex", "items-center", "gap-2", 3, "click"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", "stroke-width", "2", 1, "w-4", "h-4"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M12 4v16m8-8H4"], [1, "px-4", "py-3", "text-left", "text-xs", "font-semibold", "text-slate-600", "uppercase", "tracking-wide", "whitespace-nowrap", 3, "click"], [1, "flex", "items-center", "gap-1.5"], [1, "text-slate-300"], [1, "px-4", "py-3"], [1, "h-4", "bg-slate-100", "rounded", "animate-pulse"], [1, "h-4", "w-20", "bg-slate-100", "rounded", "animate-pulse", "ml-auto"], [1, "px-4", "py-12", "text-center", "text-slate-400"], [1, "hover:bg-slate-50", "transition-colors"], [1, "px-4", "py-3", "text-slate-700"], [1, "flex", "justify-end", "gap-1"], [1, "px-2.5", "py-1.5", "text-xs", "font-medium", "rounded-md", "transition-colors", "flex", "items-center", "gap-1", 3, "class", "title"], [1, "px-2.5", "py-1.5", "text-xs", "font-medium", "rounded-md", "transition-colors", "flex", "items-center", "gap-1", 3, "click", "title"], [1, "w-8", "h-8", "text-xs", "rounded-md", "border", "transition-colors", 3, "click"]], template: function DataGridComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(3, "svg", 3);
        \u0275\u0275element(4, "path", 4);
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(5, "input", 5);
        \u0275\u0275twoWayListener("ngModelChange", function DataGridComponent_Template_input_ngModelChange_5_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.searchTerm, $event) || (ctx.searchTerm = $event);
          return $event;
        });
        \u0275\u0275listener("ngModelChange", function DataGridComponent_Template_input_ngModelChange_5_listener() {
          return ctx.onSearch();
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(6, "div", 6);
        \u0275\u0275template(7, DataGridComponent_Conditional_7_Template, 3, 0, "div", 7)(8, DataGridComponent_Conditional_8_Template, 4, 0, "button", 8);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(9, "div", 9)(10, "div", 10)(11, "table", 11)(12, "thead")(13, "tr", 12);
        \u0275\u0275repeaterCreate(14, DataGridComponent_For_15_Template, 4, 6, "th", 13, _forTrack02);
        \u0275\u0275template(16, DataGridComponent_Conditional_16_Template, 2, 0, "th", 14);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(17, "tbody", 15);
        \u0275\u0275template(18, DataGridComponent_Conditional_18_Template, 2, 0)(19, DataGridComponent_Conditional_19_Template, 3, 1)(20, DataGridComponent_Conditional_20_Template, 2, 0);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(21, "div", 16)(22, "p", 17);
        \u0275\u0275text(23);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(24, "div", 18)(25, "button", 19);
        \u0275\u0275listener("click", function DataGridComponent_Template_button_click_25_listener() {
          return ctx.goToPage(ctx.currentPage() - 1);
        });
        \u0275\u0275text(26, " Pr\xE9c\xE9dent ");
        \u0275\u0275elementEnd();
        \u0275\u0275repeaterCreate(27, DataGridComponent_For_28_Template, 2, 3, "button", 20, \u0275\u0275repeaterTrackByIdentity);
        \u0275\u0275elementStart(29, "button", 19);
        \u0275\u0275listener("click", function DataGridComponent_Template_button_click_29_listener() {
          return ctx.goToPage(ctx.currentPage() + 1);
        });
        \u0275\u0275text(30, " Suivant ");
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(5);
        \u0275\u0275twoWayProperty("ngModel", ctx.searchTerm);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(7, (ctx.metadata.gridConfig == null ? null : ctx.metadata.gridConfig.exportFormats == null ? null : ctx.metadata.gridConfig.exportFormats.length) ? 7 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(8, ctx.canWrite() ? 8 : -1);
        \u0275\u0275advance(6);
        \u0275\u0275repeater(ctx.gridColumns());
        \u0275\u0275advance(2);
        \u0275\u0275conditional(16, (ctx.metadata.gridConfig == null ? null : ctx.metadata.gridConfig.actions == null ? null : ctx.metadata.gridConfig.actions.length) ? 16 : -1);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(18, ctx.isLoading() ? 18 : ctx.rows().length === 0 ? 19 : 20);
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate3(" ", ctx.totalElements(), " r\xE9sultat(s) \u2014 Page ", ctx.currentPage() + 1, " / ", ctx.totalPages(), " ");
        \u0275\u0275advance(2);
        \u0275\u0275property("disabled", ctx.currentPage() === 0);
        \u0275\u0275advance(2);
        \u0275\u0275repeater(ctx.pageNumbers());
        \u0275\u0275advance(2);
        \u0275\u0275property("disabled", ctx.currentPage() === ctx.totalPages() - 1);
      }
    }, dependencies: [FormsModule, DefaultValueAccessor, NgControlStatus, NgModel], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DataGridComponent, { className: "DataGridComponent", filePath: "src\\app\\shared\\components\\data-grid\\data-grid.component.ts", lineNumber: 202 });
})();

// src/app/shared/components/master-detail/master-detail.component.ts
var _c02 = () => [1, 2, 3, 4, 5];
function MasterDetailComponent_Conditional_13_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18);
    \u0275\u0275element(1, "div", 19)(2, "div", 20);
    \u0275\u0275elementEnd();
  }
}
function MasterDetailComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, MasterDetailComponent_Conditional_13_For_1_Template, 3, 0, "div", 18, \u0275\u0275repeaterTrackByIndex);
  }
  if (rf & 2) {
    \u0275\u0275repeater(\u0275\u0275pureFunction0(0, _c02));
  }
}
function MasterDetailComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21);
    \u0275\u0275text(1, "Aucun enregistrement");
    \u0275\u0275elementEnd();
  }
}
function MasterDetailComponent_Conditional_15_For_1_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 25);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.getCellValue(row_r2, 1), " ");
  }
}
function MasterDetailComponent_Conditional_15_For_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 23);
    \u0275\u0275listener("click", function MasterDetailComponent_Conditional_15_For_1_Template_button_click_0_listener() {
      const row_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.selectRow(row_r2));
    });
    \u0275\u0275elementStart(1, "p", 24);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, MasterDetailComponent_Conditional_15_For_1_Conditional_3_Template, 2, 1, "p", 25);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("bg-blue-50", ctx_r2.selectedRow() === row_r2)("border-l-2", ctx_r2.selectedRow() === row_r2)("border-blue-600", ctx_r2.selectedRow() === row_r2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r2.getCellValue(row_r2, 0), " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(3, ctx_r2.masterColumns()[1] ? 3 : -1);
  }
}
function MasterDetailComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, MasterDetailComponent_Conditional_15_For_1_Template, 4, 8, "button", 22, \u0275\u0275repeaterTrackByIndex);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275repeater(ctx_r2.rows());
  }
}
function MasterDetailComponent_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17)(1, "div", 26)(2, "h2", 27);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(4, "app-form-generator", 28);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r2.isCreating() ? "Nouvel enregistrement" : "Modification", " ");
    \u0275\u0275advance();
    \u0275\u0275property("metadata", ctx_r2.detailMetadata());
  }
}
function MasterDetailComponent_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 29);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 30);
    \u0275\u0275element(2, "path", 31);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(3, "p", 32);
    \u0275\u0275text(4, "S\xE9lectionner un \xE9l\xE9ment dans la liste");
    \u0275\u0275elementEnd()();
  }
}
var MasterDetailComponent = class _MasterDetailComponent {
  constructor() {
    this.http = inject(HttpClient);
    this.rows = signal([]);
    this.isLoading = signal(false);
    this.selectedRow = signal(null);
    this.isCreating = signal(false);
    this.currentPage = signal(0);
    this.totalElements = signal(0);
    this.totalPages = signal(0);
    this.searchTerm = "";
    this.masterColumns = () => this.metadata.components.filter((c) => c.gridColumn).slice(0, 3);
  }
  /** Accès typé à une valeur de cellule — évite l'indexation par undefined */
  getCellValue(row, colIndex) {
    const col = this.masterColumns()[colIndex];
    if (!col)
      return "";
    return String(row[col.fieldKey] ?? (colIndex === 0 ? "\u2014" : ""));
  }
  /**
   * Métadonnée adaptée pour le formulaire Detail :
   * tous les composants (avec ou sans IS_GRID_COLUMN)
   * et l'URL pointant sur la ressource sélectionnée.
   */
  detailMetadata() {
    const selected = this.selectedRow();
    const id = selected ? selected["id"] ?? selected["screenId"] : null;
    return __spreadProps(__spreadValues({}, this.metadata), {
      apiBaseUrl: id ? `${this.metadata.apiBaseUrl}/${id}` : this.metadata.apiBaseUrl
    });
  }
  ngOnInit() {
    this.loadData();
  }
  loadData() {
    this.isLoading.set(true);
    const params = new HttpParams().set("page", this.currentPage()).set("size", this.metadata.gridConfig?.pageSize ?? 15).set("search", this.searchTerm);
    this.http.get(this.metadata.apiBaseUrl, { params }).subscribe({
      next: (res) => {
        this.rows.set(res.content);
        this.totalElements.set(res.totalElements);
        this.totalPages.set(res.totalPages);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false)
    });
  }
  selectRow(row) {
    this.selectedRow.set(row);
    this.isCreating.set(false);
  }
  newRecord() {
    this.selectedRow.set(null);
    this.isCreating.set(true);
  }
  onSearch(event) {
    this.searchTerm = event.target.value;
    this.currentPage.set(0);
    this.loadData();
  }
  prevPage() {
    this.currentPage.update((p) => p - 1);
    this.loadData();
  }
  nextPage() {
    this.currentPage.update((p) => p + 1);
    this.loadData();
  }
  static {
    this.\u0275fac = function MasterDetailComponent_Factory(t) {
      return new (t || _MasterDetailComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MasterDetailComponent, selectors: [["app-master-detail"]], hostAttrs: [1, "flex", "h-full", "overflow-hidden"], inputs: { metadata: "metadata" }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 27, vars: 6, consts: [[1, "flex", "h-full", "overflow-hidden"], [1, "w-80", "flex-shrink-0", "border-r", "border-slate-200", "bg-white", "flex", "flex-col"], [1, "p-3", "border-b", "border-slate-100"], [1, "relative"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "absolute", "left-2.5", "top-1/2", "-translate-y-1/2", "w-4", "h-4", "text-slate-400"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0"], ["type", "text", "placeholder", "Filtrer...", 1, "w-full", "pl-8", "pr-3", "py-1.5", "text-sm", "border", "border-slate-300", "rounded-lg", "focus:ring-2", "focus:ring-blue-500", "focus:outline-none", 3, "input", "value"], [1, "px-3", "py-2", "border-b", "border-slate-100"], [1, "w-full", "flex", "items-center", "justify-center", "gap-2", "py-1.5", "px-3", "text-sm", "font-medium", "text-blue-600", "border", "border-blue-200", "rounded-lg", "hover:bg-blue-50", "transition-colors", 3, "click"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", "stroke-width", "2", 1, "w-4", "h-4"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M12 4v16m8-8H4"], [1, "flex-1", "overflow-y-auto", "divide-y", "divide-slate-50"], [1, "border-t", "border-slate-200", "px-3", "py-2", "flex", "items-center", "justify-between"], [1, "text-xs", "text-slate-400"], [1, "flex", "gap-1"], [1, "px-2", "py-1", "text-xs", "border", "border-slate-300", "rounded", "hover:bg-slate-50", "disabled:opacity-40", "disabled:cursor-not-allowed", 3, "click", "disabled"], [1, "flex-1", "overflow-y-auto", "bg-slate-50"], [1, "p-6"], [1, "px-4", "py-3", "space-y-1.5"], [1, "h-4", "bg-slate-100", "rounded", "animate-pulse", "w-3/4"], [1, "h-3", "bg-slate-100", "rounded", "animate-pulse", "w-1/2"], [1, "px-4", "py-8", "text-center", "text-slate-400", "text-sm"], [1, "w-full", "text-left", "px-4", "py-3", "hover:bg-slate-50", "transition-colors", 3, "bg-blue-50", "border-l-2", "border-blue-600"], [1, "w-full", "text-left", "px-4", "py-3", "hover:bg-slate-50", "transition-colors", 3, "click"], [1, "text-sm", "font-medium", "text-slate-800", "truncate"], [1, "text-xs", "text-slate-500", "mt-0.5", "truncate"], [1, "mb-4", "pb-4", "border-b", "border-slate-200"], [1, "text-base", "font-semibold", "text-slate-800"], [3, "metadata"], [1, "flex", "flex-col", "items-center", "justify-center", "h-full", "gap-3", "text-slate-400"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-16", "h-16", "text-slate-200"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "1", "d", "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"], [1, "text-sm"]], template: function MasterDetailComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(4, "svg", 4);
        \u0275\u0275element(5, "path", 5);
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(6, "input", 6);
        \u0275\u0275listener("input", function MasterDetailComponent_Template_input_input_6_listener($event) {
          return ctx.onSearch($event);
        });
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(7, "div", 7)(8, "button", 8);
        \u0275\u0275listener("click", function MasterDetailComponent_Template_button_click_8_listener() {
          return ctx.newRecord();
        });
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(9, "svg", 9);
        \u0275\u0275element(10, "path", 10);
        \u0275\u0275elementEnd();
        \u0275\u0275text(11, " Nouveau ");
        \u0275\u0275elementEnd()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(12, "div", 11);
        \u0275\u0275template(13, MasterDetailComponent_Conditional_13_Template, 2, 1)(14, MasterDetailComponent_Conditional_14_Template, 2, 0)(15, MasterDetailComponent_Conditional_15_Template, 2, 0);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "div", 12)(17, "span", 13);
        \u0275\u0275text(18);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(19, "div", 14)(20, "button", 15);
        \u0275\u0275listener("click", function MasterDetailComponent_Template_button_click_20_listener() {
          return ctx.prevPage();
        });
        \u0275\u0275text(21, " \u2039 ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(22, "button", 15);
        \u0275\u0275listener("click", function MasterDetailComponent_Template_button_click_22_listener() {
          return ctx.nextPage();
        });
        \u0275\u0275text(23, " \u203A ");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(24, "div", 16);
        \u0275\u0275template(25, MasterDetailComponent_Conditional_25_Template, 5, 2, "div", 17)(26, MasterDetailComponent_Conditional_26_Template, 5, 0);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(6);
        \u0275\u0275property("value", ctx.searchTerm);
        \u0275\u0275advance(7);
        \u0275\u0275conditional(13, ctx.isLoading() ? 13 : ctx.rows().length === 0 ? 14 : 15);
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate1("", ctx.totalElements(), " \xE9l\xE9ments");
        \u0275\u0275advance(2);
        \u0275\u0275property("disabled", ctx.currentPage() === 0);
        \u0275\u0275advance(2);
        \u0275\u0275property("disabled", ctx.currentPage() >= ctx.totalPages() - 1);
        \u0275\u0275advance(3);
        \u0275\u0275conditional(25, ctx.selectedRow() || ctx.isCreating() ? 25 : 26);
      }
    }, dependencies: [FormGeneratorComponent], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MasterDetailComponent, { className: "MasterDetailComponent", filePath: "src\\app\\shared\\components\\master-detail\\master-detail.component.ts", lineNumber: 148 });
})();

// src/app/shared/components/analytics-dashboard/analytics-dashboard.component.ts
var _forTrack03 = ($index, $item) => $item.config.key;
var _forTrack13 = ($index, $item) => $item.key;
function AnalyticsDashboardComponent_Conditional_1_For_2_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 8);
  }
}
function AnalyticsDashboardComponent_Conditional_1_For_2_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 9);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const kpi_r1 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.formatKpi(kpi_r1.value, kpi_r1.config.format), " ");
  }
}
function AnalyticsDashboardComponent_Conditional_1_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3)(1, "div", 4);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 5);
    \u0275\u0275element(3, "path", 6);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(4, "div")(5, "p", 7);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275template(7, AnalyticsDashboardComponent_Conditional_1_For_2_Conditional_7_Template, 1, 0, "div", 8)(8, AnalyticsDashboardComponent_Conditional_1_For_2_Conditional_8_Template, 2, 1);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const kpi_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r1.getKpiBg(kpi_r1.config.color));
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r1.getKpiText(kpi_r1.config.color));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(kpi_r1.config.label);
    \u0275\u0275advance();
    \u0275\u0275conditional(7, kpi_r1.loading ? 7 : 8);
  }
}
function AnalyticsDashboardComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275repeaterCreate(1, AnalyticsDashboardComponent_Conditional_1_For_2_Template, 9, 6, "div", 3, _forTrack03);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.kpis());
  }
}
function AnalyticsDashboardComponent_Conditional_2_For_2_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275element(1, "div", 16);
    \u0275\u0275elementEnd();
  }
}
function AnalyticsDashboardComponent_Conditional_2_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11)(1, "h3", 12);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 13);
    \u0275\u0275element(4, "canvas", 14);
    \u0275\u0275template(5, AnalyticsDashboardComponent_Conditional_2_For_2_Conditional_5_Template, 2, 0, "div", 15);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_11_0;
    const chart_r3 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap("col-span-12 lg:col-span-" + ((tmp_11_0 = chart_r3.colSpan) !== null && tmp_11_0 !== void 0 ? tmp_11_0 : 6));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(chart_r3.title);
    \u0275\u0275advance(2);
    \u0275\u0275property("id", "chart-" + chart_r3.key);
    \u0275\u0275advance();
    \u0275\u0275conditional(5, ctx_r1.chartLoading() ? 5 : -1);
  }
}
function AnalyticsDashboardComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275repeaterCreate(1, AnalyticsDashboardComponent_Conditional_2_For_2_Template, 6, 5, "div", 10, _forTrack13);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.charts());
  }
}
var AnalyticsDashboardComponent = class _AnalyticsDashboardComponent {
  constructor() {
    this.http = inject(HttpClient);
    this.kpis = signal([]);
    this.charts = signal([]);
    this.chartLoading = signal(true);
    this.chartInstances = [];
  }
  ngOnInit() {
    const cfg = this.metadata.analyticsConfig;
    if (!cfg)
      return;
    if (cfg.kpis) {
      this.kpis.set(cfg.kpis.map((k) => ({ config: k, value: null, loading: true })));
      this.loadKpis(cfg.kpis);
    }
    if (cfg.charts) {
      this.charts.set(cfg.charts);
    }
  }
  ngAfterViewInit() {
    const cfg = this.metadata.analyticsConfig;
    if (cfg?.charts?.length) {
      this.loadCharts(cfg.charts);
    }
  }
  loadKpis(kpiConfigs) {
    const requests = kpiConfigs.map((k) => this.http.get(k.dataEndpoint).pipe(catchError(() => of({ value: null }))));
    forkJoin(requests).subscribe((results) => {
      this.kpis.update((kpis) => kpis.map((kpi, i) => __spreadProps(__spreadValues({}, kpi), {
        value: results[i]?.value ?? null,
        loading: false
      })));
    });
  }
  loadCharts(chartConfigs) {
    return __async(this, null, function* () {
      const { Chart, registerables } = yield import("./chart-TU3R6LGK.js");
      Chart.register(...registerables);
      const dataRequests = chartConfigs.map((c) => this.http.get(c.dataEndpoint).pipe(catchError(() => of({ labels: [], datasets: [] }))));
      forkJoin(dataRequests).subscribe((results) => {
        chartConfigs.forEach((cfg, i) => {
          const canvas = document.getElementById(`chart-${cfg.key}`);
          if (!canvas)
            return;
          const data = results[i];
          const mergedDatasets = data.datasets.map((ds) => __spreadProps(__spreadValues({}, ds), {
            borderWidth: 2,
            borderRadius: cfg.type === "bar" ? 4 : 0
          }));
          const instance = new Chart(canvas, {
            type: cfg.type,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            data: { labels: data.labels, datasets: mergedDatasets },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: "bottom",
                  labels: { font: { size: 11 }, padding: 16 }
                }
              },
              scales: cfg.type === "pie" || cfg.type === "doughnut" ? {} : {
                x: { grid: { color: "#f1f5f9" } },
                y: { grid: { color: "#f1f5f9" }, beginAtZero: true }
              }
            }
          });
          this.chartInstances.push(instance);
        });
        this.chartLoading.set(false);
      });
    });
  }
  formatKpi(value, format) {
    if (value == null)
      return "\u2014";
    if (format === "FCFA" || format === "XOF") {
      return new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "XOF",
        minimumFractionDigits: 0,
        notation: "compact",
        compactDisplay: "short"
      }).format(Number(value));
    }
    if (format === "points")
      return `${Number(value).toLocaleString("fr-FR")} pts`;
    if (format === "%")
      return `${value} %`;
    return String(value);
  }
  getKpiBg(color) {
    const map = {
      blue: "bg-blue-50",
      green: "bg-green-50",
      amber: "bg-amber-50",
      purple: "bg-purple-50"
    };
    return map[color ?? "blue"];
  }
  getKpiText(color) {
    const map = {
      blue: "text-blue-600",
      green: "text-green-600",
      amber: "text-amber-600",
      purple: "text-purple-600"
    };
    return map[color ?? "blue"];
  }
  static {
    this.\u0275fac = function AnalyticsDashboardComponent_Factory(t) {
      return new (t || _AnalyticsDashboardComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AnalyticsDashboardComponent, selectors: [["app-analytics-dashboard"]], inputs: { metadata: "metadata" }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 3, vars: 2, consts: [[1, "p-6", "space-y-6"], [1, "grid", "grid-cols-1", "sm:grid-cols-2", "lg:grid-cols-4", "gap-4"], [1, "grid", "grid-cols-12", "gap-4"], [1, "bg-white", "rounded-xl", "border", "border-slate-200", "p-5", "flex", "items-start", "gap-4"], [1, "flex-shrink-0", "w-10", "h-10", "rounded-lg", "flex", "items-center", "justify-center"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", "stroke-width", "2", 1, "w-5", "h-5"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22"], [1, "text-xs", "font-medium", "text-slate-500"], [1, "h-7", "w-28", "bg-slate-100", "rounded", "animate-pulse", "mt-1"], [1, "text-xl", "font-bold", "text-slate-800", "mt-0.5"], [1, "bg-white", "rounded-xl", "border", "border-slate-200", "p-5", 3, "class"], [1, "bg-white", "rounded-xl", "border", "border-slate-200", "p-5"], [1, "text-sm", "font-semibold", "text-slate-700", "mb-4"], [1, "relative", 2, "height", "280px"], [3, "id"], [1, "absolute", "inset-0", "flex", "items-center", "justify-center", "bg-white/80"], [1, "w-6", "h-6", "border-2", "border-blue-600", "border-t-transparent", "rounded-full", "animate-spin"]], template: function AnalyticsDashboardComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275template(1, AnalyticsDashboardComponent_Conditional_1_Template, 3, 0, "div", 1)(2, AnalyticsDashboardComponent_Conditional_2_Template, 3, 0, "div", 2);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance();
        \u0275\u0275conditional(1, ctx.kpis().length > 0 ? 1 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(2, ctx.charts().length > 0 ? 2 : -1);
      }
    }, encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AnalyticsDashboardComponent, { className: "AnalyticsDashboardComponent", filePath: "src\\app\\shared\\components\\analytics-dashboard\\analytics-dashboard.component.ts", lineNumber: 85 });
})();

// src/app/shared/components/generic-renderer/generic-renderer.component.ts
function GenericRendererComponent_Conditional_0_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 4);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.metadata().description);
  }
}
function GenericRendererComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 0)(1, "div")(2, "h1", 3);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, GenericRendererComponent_Conditional_0_Conditional_4_Template, 2, 1, "p", 4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 5)(6, "button", 6);
    \u0275\u0275listener("click", function GenericRendererComponent_Conditional_0_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.shortcutService.toggleShortcut(ctx_r1.metadata().code));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(7, "svg", 7);
    \u0275\u0275element(8, "path", 8);
    \u0275\u0275elementEnd();
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.metadata().title);
    \u0275\u0275advance();
    \u0275\u0275conditional(4, ctx_r1.metadata().description ? 4 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r1.shortcutService.isShortcut(ctx_r1.metadata().code) ? "bg-amber-50 text-amber-700 border-amber-300 hover:bg-amber-100" : "bg-white text-slate-600 border-slate-300 hover:bg-slate-50");
    \u0275\u0275property("title", ctx_r1.shortcutService.isShortcut(ctx_r1.metadata().code) ? "Retirer des favoris" : "Ajouter aux favoris");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.shortcutService.isShortcut(ctx_r1.metadata().code) ? "Favori" : "Ajouter", " ");
  }
}
function GenericRendererComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275element(1, "div", 9)(2, "div", 10);
    \u0275\u0275elementEnd();
  }
}
function GenericRendererComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11)(1, "div", 12);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 13);
    \u0275\u0275element(3, "path", 14);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(4, "p", 15);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.error());
  }
}
function GenericRendererComponent_Conditional_4_Case_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-form-generator", 16);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("metadata", ctx_r1.metadata());
  }
}
function GenericRendererComponent_Conditional_4_Case_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-data-grid", 16);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("metadata", ctx_r1.metadata());
  }
}
function GenericRendererComponent_Conditional_4_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-master-detail", 16);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("metadata", ctx_r1.metadata());
  }
}
function GenericRendererComponent_Conditional_4_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-analytics-dashboard", 16);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("metadata", ctx_r1.metadata());
  }
}
function GenericRendererComponent_Conditional_4_Case_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 17);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Template inconnu: ", ctx_r1.metadata().templateType, "");
  }
}
function GenericRendererComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, GenericRendererComponent_Conditional_4_Case_0_Template, 1, 1)(1, GenericRendererComponent_Conditional_4_Case_1_Template, 1, 1)(2, GenericRendererComponent_Conditional_4_Case_2_Template, 1, 1)(3, GenericRendererComponent_Conditional_4_Case_3_Template, 1, 1)(4, GenericRendererComponent_Conditional_4_Case_4_Template, 2, 1);
  }
  if (rf & 2) {
    let tmp_1_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275conditional(0, (tmp_1_0 = ctx_r1.metadata().templateType) === "FORM" ? 0 : tmp_1_0 === "GRID" ? 1 : tmp_1_0 === "MASTER_DETAIL" ? 2 : tmp_1_0 === "ANALYTICS" ? 3 : 4);
  }
}
var GenericRendererComponent = class _GenericRendererComponent {
  constructor() {
    this.shortcutService = inject(ShortcutService);
    this.metadataService = inject(MetadataService);
    this.menuService = inject(MenuService);
    this.route = inject(ActivatedRoute);
    this.router = inject(Router);
    this.metadata = signal(null);
    this.isLoading = signal(false);
    this.error = signal(null);
  }
  ngOnInit() {
    this.loadFromRoute();
  }
  ngOnChanges() {
    if (this.screenCode) {
      this.load(this.screenCode);
    } else {
      this.loadFromRoute();
    }
  }
  /**
   * Charge l'écran depuis le chemin de route (URL)
   * Ex: /admin/roles → trouve le menu avec route=/admin/roles → charge SCR_ROLES
   */
  loadFromRoute() {
    const routePath = this.router.url.replace(/^\//, "");
    if (!routePath) {
      this.error.set("Aucun \xE9cran sp\xE9cifi\xE9");
      return;
    }
    this.isLoading.set(true);
    this.error.set(null);
    this.menuService.getMenuTree().subscribe({
      next: (menuTree) => {
        const menuItem = this.findMenuByRoute(menuTree, "/" + routePath);
        if (menuItem && menuItem.screenCode) {
          this.load(menuItem.screenCode);
        } else if (menuItem) {
          this.isLoading.set(false);
          this.error.set(`Le menu "${menuItem.label}" n'est pas li\xE9 \xE0 un \xE9cran. Veuillez s\xE9lectionner un sous-menu.`);
        } else {
          this.isLoading.set(false);
          this.error.set(`\xC9cran introuvable pour le chemin: ${routePath}`);
        }
      },
      error: (err) => {
        this.isLoading.set(false);
        this.error.set("Erreur lors du chargement du menu");
        console.error("Menu load error:", err);
      }
    });
  }
  /**
   * Recherche récursive d'un menu par route
   */
  findMenuByRoute(menus, route) {
    for (const menu of menus) {
      if (menu.route === route) {
        return menu;
      }
      if (menu.children && menu.children.length > 0) {
        const found = this.findMenuByRoute(menu.children, route);
        if (found)
          return found;
      }
    }
    return null;
  }
  /**
   * Charge les métadonnées d'un écran par son code
   */
  load(code) {
    this.isLoading.set(true);
    this.error.set(null);
    this.metadataService.getScreenMetadata(code).subscribe({
      next: (meta) => {
        this.metadata.set(meta);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.error.set(`L'\xE9cran "${code}" est introuvable ou inaccessible.`);
        console.error("Metadata load error:", err);
      }
    });
  }
  static {
    this.\u0275fac = function GenericRendererComponent_Factory(t) {
      return new (t || _GenericRendererComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _GenericRendererComponent, selectors: [["app-generic-renderer"]], hostAttrs: [1, "flex", "flex-col", "h-full"], inputs: { screenCode: "screenCode" }, standalone: true, features: [\u0275\u0275NgOnChangesFeature, \u0275\u0275StandaloneFeature], decls: 5, vars: 2, consts: [[1, "flex", "items-center", "justify-between", "px-6", "py-4", "bg-white", "border-b", "border-slate-200"], [1, "flex-1", "overflow-auto", "bg-slate-50"], [1, "p-6", "space-y-4"], [1, "text-lg", "font-semibold", "text-slate-800"], [1, "text-xs", "text-slate-500", "mt-0.5"], [1, "flex", "items-center", "gap-2"], [1, "flex", "items-center", "gap-1.5", "px-3", "py-1.5", "rounded-lg", "text-sm", "border", "transition-all", 3, "click", "title"], ["fill", "currentColor", "viewBox", "0 0 24 24", 1, "w-4", "h-4"], ["d", "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"], [1, "h-10", "bg-slate-200", "rounded-lg", "animate-pulse", "w-1/3"], [1, "h-64", "bg-slate-200", "rounded-lg", "animate-pulse"], [1, "flex", "flex-col", "items-center", "justify-center", "h-64", "gap-4"], [1, "w-12", "h-12", "rounded-full", "bg-red-100", "flex", "items-center", "justify-center"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-6", "h-6", "text-red-500"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.999L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16.001c-.77 1.332.192 2.999 1.732 2.999z"], [1, "text-slate-600", "font-medium"], [3, "metadata"], [1, "p-6", "text-red-500"]], template: function GenericRendererComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, GenericRendererComponent_Conditional_0_Template, 10, 6, "div", 0);
        \u0275\u0275elementStart(1, "div", 1);
        \u0275\u0275template(2, GenericRendererComponent_Conditional_2_Template, 3, 0, "div", 2)(3, GenericRendererComponent_Conditional_3_Template, 6, 1)(4, GenericRendererComponent_Conditional_4_Template, 5, 1);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275conditional(0, ctx.metadata() ? 0 : -1);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(2, ctx.isLoading() ? 2 : ctx.error() ? 3 : ctx.metadata() ? 4 : -1);
      }
    }, dependencies: [
      FormGeneratorComponent,
      DataGridComponent,
      MasterDetailComponent,
      AnalyticsDashboardComponent
    ], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(GenericRendererComponent, { className: "GenericRendererComponent", filePath: "src\\app\\shared\\components\\generic-renderer\\generic-renderer.component.ts", lineNumber: 105 });
})();
export {
  GenericRendererComponent
};
//# sourceMappingURL=generic-renderer.component-B4HJ34VE.js.map
