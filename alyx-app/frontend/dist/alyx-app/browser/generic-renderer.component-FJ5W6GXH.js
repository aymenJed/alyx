import {
  ShortcutService
} from "./chunk-R5QWPLDC.js";
import {
  AuthService,
  MenuService
} from "./chunk-YXRCPTU6.js";
import {
  ActivatedRoute,
  NavigationEnd,
  Router
} from "./chunk-JVNL7PXV.js";
import {
  CheckboxControlValueAccessor,
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  NgControlStatus,
  NgControlStatusGroup,
  NgSelectOption,
  ReactiveFormsModule,
  SelectControlValueAccessor,
  SelectMultipleControlValueAccessor,
  Validators,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-LM3PESKF.js";
import {
  HttpClient,
  HttpParams,
  catchError,
  computed,
  filter,
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
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-CMRDFCUM.js";
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

// src/app/core/models/screen-metadata.model.ts
function evaluateExp(expression, data) {
  if (!expression)
    return true;
  try {
    return new Function("data", `"use strict"; return (${expression})`)(data);
  } catch {
    return true;
  }
}

// src/app/shared/components/form-generator/form-generator.component.ts
var _forTrack0 = ($index, $item) => $item.actionId;
var _forTrack1 = ($index, $item) => $item.key;
var _forTrack2 = ($index, $item) => $item.fieldKey;
var _forTrack3 = ($index, $item) => $item.value;
var _c0 = () => ["TEXT", "EMAIL", "PASSWORD", "NUMBER", "AMOUNT", "CURRENCY"];
var _c1 = () => ["DATE", "DATETIME"];
var _c2 = () => ["SELECT", "AUTOCOMPLETE"];
var _c3 = () => ["CHECKBOX", "SWITCH"];
function FormGeneratorComponent_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "button", 3);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const action_r1 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", action_r1.label, " ");
  }
}
function FormGeneratorComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 6);
    \u0275\u0275text(1, "\u21BB");
    \u0275\u0275elementEnd();
  }
}
function FormGeneratorComponent_For_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 8);
    \u0275\u0275listener("click", function FormGeneratorComponent_For_11_Template_button_click_0_listener() {
      const action_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.handleMainAction(action_r3.code));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const action_r3 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275classMap(ctx_r3.getActionBtnClass(action_r3.color));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(action_r3.label);
  }
}
function FormGeneratorComponent_For_19_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 14);
    \u0275\u0275listener("click", function FormGeneratorComponent_For_19_Conditional_0_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const section_r6 = \u0275\u0275nextContext().$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.toggleSection(section_r6.key));
    });
    \u0275\u0275elementStart(1, "span", 15);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 16);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const section_r6 = \u0275\u0275nextContext().$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r3.collapsedSections().has(section_r6.key) ? "\u2295" : "\u2296", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", section_r6.label, " : ");
  }
}
function FormGeneratorComponent_For_19_Conditional_1_For_3_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 21);
    \u0275\u0275text(1, "*");
    \u0275\u0275elementEnd();
  }
}
function FormGeneratorComponent_For_19_Conditional_1_For_3_Conditional_4_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 30);
    \u0275\u0275text(1, "FCFA");
    \u0275\u0275elementEnd();
  }
}
function FormGeneratorComponent_For_19_Conditional_1_For_3_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 22);
    \u0275\u0275template(1, FormGeneratorComponent_For_19_Conditional_1_For_3_Conditional_4_Conditional_1_Template, 2, 0, "span", 30);
    \u0275\u0275element(2, "input", 31);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_28_0;
    const comp_r7 = \u0275\u0275nextContext().$implicit;
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275conditional(1, comp_r7.formatPattern === "FCFA" || comp_r7.formatPattern === "XOF" ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275classProp("pl-10", comp_r7.formatPattern === "FCFA" || comp_r7.formatPattern === "XOF")("border-red-400", ctx_r3.showError(comp_r7.fieldKey));
    \u0275\u0275property("id", comp_r7.fieldKey)("formControlName", comp_r7.fieldKey)("type", ctx_r3.getInputType(comp_r7.componentType))("placeholder", (tmp_28_0 = comp_r7.placeholder) !== null && tmp_28_0 !== void 0 ? tmp_28_0 : "")("readonly", comp_r7.readonly);
  }
}
function FormGeneratorComponent_For_19_Conditional_1_For_3_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "input", 32);
  }
  if (rf & 2) {
    const comp_r7 = \u0275\u0275nextContext().$implicit;
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("border-red-400", ctx_r3.showError(comp_r7.fieldKey));
    \u0275\u0275property("id", comp_r7.fieldKey)("formControlName", comp_r7.fieldKey)("type", comp_r7.componentType === "DATETIME" ? "datetime-local" : "date")("readonly", comp_r7.readonly);
  }
}
function FormGeneratorComponent_For_19_Conditional_1_For_3_Conditional_6_For_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 35);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const opt_r8 = ctx.$implicit;
    \u0275\u0275property("value", opt_r8.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(opt_r8.label);
  }
}
function FormGeneratorComponent_For_19_Conditional_1_For_3_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "select", 33);
    \u0275\u0275element(1, "option", 34);
    \u0275\u0275repeaterCreate(2, FormGeneratorComponent_For_19_Conditional_1_For_3_Conditional_6_For_3_Template, 2, 2, "option", 35, _forTrack3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const comp_r7 = \u0275\u0275nextContext().$implicit;
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("border-red-400", ctx_r3.showError(comp_r7.fieldKey));
    \u0275\u0275property("id", comp_r7.fieldKey)("formControlName", comp_r7.fieldKey);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r3.getOptions(comp_r7));
  }
}
function FormGeneratorComponent_For_19_Conditional_1_For_3_Conditional_7_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 35);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const opt_r9 = ctx.$implicit;
    \u0275\u0275property("value", opt_r9.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(opt_r9.label);
  }
}
function FormGeneratorComponent_For_19_Conditional_1_For_3_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "select", 36);
    \u0275\u0275repeaterCreate(1, FormGeneratorComponent_For_19_Conditional_1_For_3_Conditional_7_For_2_Template, 2, 2, "option", 35, _forTrack3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const comp_r7 = \u0275\u0275nextContext().$implicit;
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("border-red-400", ctx_r3.showError(comp_r7.fieldKey));
    \u0275\u0275property("id", comp_r7.fieldKey)("formControlName", comp_r7.fieldKey);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r3.getOptions(comp_r7));
  }
}
function FormGeneratorComponent_For_19_Conditional_1_For_3_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "textarea", 37);
  }
  if (rf & 2) {
    let tmp_25_0;
    let tmp_26_0;
    const comp_r7 = \u0275\u0275nextContext().$implicit;
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("border-red-400", ctx_r3.showError(comp_r7.fieldKey));
    \u0275\u0275property("id", comp_r7.fieldKey)("formControlName", comp_r7.fieldKey)("placeholder", (tmp_25_0 = comp_r7.placeholder) !== null && tmp_25_0 !== void 0 ? tmp_25_0 : "")("rows", (tmp_26_0 = comp_r7.nbLines) !== null && tmp_26_0 !== void 0 ? tmp_26_0 : 3);
  }
}
function FormGeneratorComponent_For_19_Conditional_1_For_3_Conditional_9_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 39);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const comp_r7 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(comp_r7.placeholder);
  }
}
function FormGeneratorComponent_For_19_Conditional_1_For_3_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 27);
    \u0275\u0275element(1, "input", 38);
    \u0275\u0275template(2, FormGeneratorComponent_For_19_Conditional_1_For_3_Conditional_9_Conditional_2_Template, 2, 1, "span", 39);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const comp_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("id", comp_r7.fieldKey)("formControlName", comp_r7.fieldKey);
    \u0275\u0275advance();
    \u0275\u0275conditional(2, comp_r7.placeholder ? 2 : -1);
  }
}
function FormGeneratorComponent_For_19_Conditional_1_For_3_Conditional_10_Conditional_1_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 41);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const opt_r10 = ctx;
    const ctx_r3 = \u0275\u0275nextContext(6);
    \u0275\u0275classMap(ctx_r3.badgeClass(opt_r10.color));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", opt_r10.label, " ");
  }
}
function FormGeneratorComponent_For_19_Conditional_1_For_3_Conditional_10_Conditional_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 42);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const val_r11 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(val_r11);
  }
}
function FormGeneratorComponent_For_19_Conditional_1_For_3_Conditional_10_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, FormGeneratorComponent_For_19_Conditional_1_For_3_Conditional_10_Conditional_1_Conditional_0_Template, 2, 3, "span", 40)(1, FormGeneratorComponent_For_19_Conditional_1_For_3_Conditional_10_Conditional_1_Conditional_1_Template, 2, 1);
  }
  if (rf & 2) {
    let tmp_24_0;
    const comp_r7 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275conditional(0, (tmp_24_0 = ctx_r3.getBadgeOpt(comp_r7, ctx)) ? 0 : 1, tmp_24_0);
  }
}
function FormGeneratorComponent_For_19_Conditional_1_For_3_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28);
    \u0275\u0275template(1, FormGeneratorComponent_For_19_Conditional_1_For_3_Conditional_10_Conditional_1_Template, 2, 1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_22_0;
    const comp_r7 = \u0275\u0275nextContext().$implicit;
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275conditional(1, (tmp_22_0 = (tmp_22_0 = ctx_r3.form.get(comp_r7.fieldKey)) == null ? null : tmp_22_0.value) ? 1 : -1, tmp_22_0);
  }
}
function FormGeneratorComponent_For_19_Conditional_1_For_3_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 29);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_22_0;
    const comp_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", (tmp_22_0 = comp_r7.validationMsg) !== null && tmp_22_0 !== void 0 ? tmp_22_0 : "Champ requis", " ");
  }
}
function FormGeneratorComponent_For_19_Conditional_1_For_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19)(1, "label", 20);
    \u0275\u0275text(2);
    \u0275\u0275template(3, FormGeneratorComponent_For_19_Conditional_1_For_3_Conditional_3_Template, 2, 0, "span", 21);
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, FormGeneratorComponent_For_19_Conditional_1_For_3_Conditional_4_Template, 3, 10, "div", 22)(5, FormGeneratorComponent_For_19_Conditional_1_For_3_Conditional_5_Template, 1, 6, "input", 23)(6, FormGeneratorComponent_For_19_Conditional_1_For_3_Conditional_6_Template, 4, 4, "select", 24)(7, FormGeneratorComponent_For_19_Conditional_1_For_3_Conditional_7_Template, 3, 4, "select", 25)(8, FormGeneratorComponent_For_19_Conditional_1_For_3_Conditional_8_Template, 1, 6, "textarea", 26)(9, FormGeneratorComponent_For_19_Conditional_1_For_3_Conditional_9_Template, 3, 3, "div", 27)(10, FormGeneratorComponent_For_19_Conditional_1_For_3_Conditional_10_Template, 2, 1, "div", 28)(11, FormGeneratorComponent_For_19_Conditional_1_For_3_Conditional_11_Template, 2, 1, "p", 29);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const comp_r7 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275classMap(ctx_r3.colSpanClass(comp_r7.gridColSpan));
    \u0275\u0275advance();
    \u0275\u0275property("for", comp_r7.fieldKey);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", comp_r7.label, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(3, comp_r7.required ? 3 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(4, \u0275\u0275pureFunction0(13, _c0).includes(comp_r7.componentType) ? 4 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(5, \u0275\u0275pureFunction0(14, _c1).includes(comp_r7.componentType) ? 5 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(6, \u0275\u0275pureFunction0(15, _c2).includes(comp_r7.componentType) ? 6 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(7, comp_r7.componentType === "MULTISELECT" ? 7 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(8, comp_r7.componentType === "TEXTAREA" ? 8 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(9, \u0275\u0275pureFunction0(16, _c3).includes(comp_r7.componentType) ? 9 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(10, comp_r7.componentType === "BADGE" ? 10 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(11, ctx_r3.showError(comp_r7.fieldKey) ? 11 : -1);
  }
}
function FormGeneratorComponent_For_19_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13)(1, "div", 17);
    \u0275\u0275repeaterCreate(2, FormGeneratorComponent_For_19_Conditional_1_For_3_Template, 12, 17, "div", 18, _forTrack2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const section_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275repeater(section_r6.fields);
  }
}
function FormGeneratorComponent_For_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, FormGeneratorComponent_For_19_Conditional_0_Template, 5, 2, "div", 12)(1, FormGeneratorComponent_For_19_Conditional_1_Template, 4, 0, "div", 13);
  }
  if (rf & 2) {
    const section_r6 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275conditional(0, section_r6.label ? 0 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(1, !ctx_r3.collapsedSections().has(section_r6.key) ? 1 : -1);
  }
}
var COL_SPAN = {
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
var FormGeneratorComponent = class _FormGeneratorComponent {
  constructor() {
    this.fb = inject(FormBuilder);
    this.http = inject(HttpClient);
    this.isSubmitting = signal(false);
    this.visibleComponents = signal([]);
    this.collapsedSections = signal(/* @__PURE__ */ new Set());
    this.dynamicOptions = /* @__PURE__ */ new Map();
    this.sections = computed(() => {
      const sorted = [...this.visibleComponents()].sort((a, b) => a.displayOrder - b.displayOrder);
      const result = [];
      let current = { key: "__root__", label: "", fields: [] };
      for (const comp of sorted) {
        if (comp.componentType === "GROUP") {
          if (current.fields.length > 0 || current.key !== "__root__") {
            result.push(current);
          }
          current = { key: comp.fieldKey, label: comp.label, fields: [] };
        } else if (comp.componentType !== "SEPARATOR") {
          current.fields.push(comp);
        }
      }
      if (current.fields.length > 0)
        result.push(current);
      return result;
    });
    this.mainActions = computed(() => this.metadata.actions.filter((a) => a.actionType === "MAIN" && a.isEnabled && a.code !== "new").sort((a, b) => a.displayOrder - b.displayOrder));
    this.subviewActions = computed(() => this.metadata.actions.filter((a) => a.actionType === "SUBVIEW" && a.isEnabled).sort((a, b) => a.displayOrder - b.displayOrder));
  }
  ngOnInit() {
    this.buildForm();
    this.loadDynamicOptions();
    this.form.valueChanges.subscribe(() => this.refreshVisibility());
  }
  // ── Form builder ────────────────────────────────────────────
  buildForm() {
    const controls = {};
    for (const comp of this.metadata.components) {
      if (comp.componentType === "GROUP" || comp.componentType === "SEPARATOR")
        continue;
      const v = [];
      if (comp.required)
        v.push(Validators.required);
      if (comp.validationRegex)
        v.push(Validators.pattern(comp.validationRegex));
      if (comp.componentType === "EMAIL")
        v.push(Validators.email);
      controls[comp.fieldKey] = this.fb.control({ value: comp.defaultValue ?? "", disabled: comp.readonly }, v);
    }
    this.form = this.fb.group(controls);
    this.refreshVisibility();
  }
  refreshVisibility() {
    const values = this.form.getRawValue();
    this.visibleComponents.set(this.metadata.components.filter((c) => evaluateExp(c.visibilityExp, values)));
  }
  loadDynamicOptions() {
    for (const comp of this.metadata.components) {
      if (comp.optionsSource && !comp.options?.length) {
        this.http.get(comp.optionsSource).subscribe((opts) => this.dynamicOptions.set(comp.fieldKey, opts));
      }
    }
  }
  // ── Helpers template ────────────────────────────────────────
  getOptions(comp) {
    return comp.options?.length ? comp.options : this.dynamicOptions.get(comp.fieldKey) ?? [];
  }
  getBadgeOpt(comp, value) {
    return comp.options?.find((o) => o.value === String(value));
  }
  badgeClass(color) {
    const m = {
      green: "bg-emerald-100 text-emerald-700",
      red: "bg-red-100 text-red-700",
      amber: "bg-amber-100 text-amber-700",
      blue: "bg-blue-100 text-blue-700",
      gray: "bg-slate-100 text-slate-600"
    };
    return m[color ?? "gray"] ?? m["gray"];
  }
  getInputType(t) {
    const m = {
      EMAIL: "email",
      PASSWORD: "password",
      NUMBER: "number",
      AMOUNT: "number"
    };
    return m[t] ?? "text";
  }
  colSpanClass(span) {
    return COL_SPAN[span] ?? "col-span-3";
  }
  showError(key) {
    const c = this.form.get(key);
    return !!(c?.invalid && (c.dirty || c.touched));
  }
  toggleSection(key) {
    this.collapsedSections.update((s) => {
      const n = new Set(s);
      n.has(key) ? n.delete(key) : n.add(key);
      return n;
    });
  }
  getActionBtnClass(color) {
    const m = {
      blue: "crt-btn-primary",
      indigo: "crt-btn-primary",
      green: "bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700",
      amber: "bg-amber-500 text-white border-amber-500 hover:bg-amber-600",
      red: "crt-btn-danger",
      gray: ""
    };
    return m[color ?? "gray"] ?? "";
  }
  handleMainAction(code) {
    const action = this.metadata.actions.find((a) => a.code === code);
    if (!action?.endpoint || !action.httpMethod)
      return;
    this.http.request(action.httpMethod, action.endpoint, {
      body: this.form.getRawValue()
    }).subscribe({ next: () => this.loadDynamicOptions() });
  }
  // ── Submit / Reset ──────────────────────────────────────────
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
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FormGeneratorComponent, selectors: [["app-form-generator"]], inputs: { metadata: "metadata" }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 20, vars: 3, consts: [[1, "flex", "flex-col", "h-full", "bg-[#f0f0f0]"], [1, "flex", "bg-[#dde8f0]", "border-b", "border-gray-300", "shrink-0"], [1, "px-4", "py-1.5", "text-xs", "font-semibold", "bg-white", "border-r", "border-gray-300", "text-gray-800", "-mb-px", "border-b", "border-b-white"], [1, "px-4", "py-1.5", "text-xs", "text-gray-600", "border-r", "border-gray-300", "hover:bg-[#ccd8e8]", "transition-colors"], [1, "flex", "items-center", "gap-1", "px-2", "py-1.5", "bg-white", "border-b", "border-gray-300", "shrink-0", "flex-wrap"], ["type", "submit", "form", "main-form", 1, "crt-btn", "crt-btn-primary", 3, "disabled"], [1, "animate-spin", "mr-1"], ["type", "button", 1, "crt-btn", 3, "class"], ["type", "button", 1, "crt-btn", 3, "click"], ["type", "button", 1, "crt-btn", "crt-btn-danger", 3, "click"], [1, "flex-1", "overflow-auto"], ["id", "main-form", 1, "p-3", "space-y-0", 3, "ngSubmit", "formGroup"], [1, "flex", "items-center", "gap-1", "pt-2", "pb-1", "cursor-pointer", "select-none", "group"], [1, "bg-white", "border", "border-gray-200", "p-2", "mb-2"], [1, "flex", "items-center", "gap-1", "pt-2", "pb-1", "cursor-pointer", "select-none", "group", 3, "click"], [1, "text-sm", "font-bold", "text-gray-500", "w-4", "text-center", "leading-none"], [1, "text-xs", "font-semibold", "text-gray-700", "group-hover:text-gray-900", "transition-colors"], [1, "grid", "grid-cols-12", "gap-x-3", "gap-y-1.5"], [1, "flex", "flex-col", "gap-0.5", 3, "class"], [1, "flex", "flex-col", "gap-0.5"], [1, "text-xs", "text-gray-600", "leading-tight", 3, "for"], [1, "text-red-500", "ml-0.5"], [1, "relative"], [1, "w-full", "h-7", "px-2", "text-xs", "text-gray-800", "bg-white", "border", "border-gray-300", "focus:outline-none", "focus:border-blue-400", "read-only:bg-gray-100", "disabled:bg-gray-100", 3, "id", "formControlName", "type", "readonly", "border-red-400"], [1, "w-full", "h-7", "px-2", "text-xs", "text-gray-800", "bg-white", "border", "border-gray-300", "focus:outline-none", "focus:border-blue-400", "disabled:bg-gray-100", "cursor-pointer", 3, "id", "formControlName", "border-red-400"], ["multiple", "", 1, "w-full", "px-2", "py-1", "text-xs", "text-gray-800", "bg-white", "border", "border-gray-300", "focus:outline-none", "focus:border-blue-400", "cursor-pointer", 3, "id", "formControlName", "border-red-400"], [1, "w-full", "px-2", "py-1", "text-xs", "text-gray-800", "bg-white", "border", "border-gray-300", "focus:outline-none", "focus:border-blue-400", "resize-none", "placeholder:text-gray-400", 3, "id", "formControlName", "placeholder", "rows", "border-red-400"], [1, "flex", "items-center", "gap-2", "h-7"], [1, "h-7", "flex", "items-center"], [1, "text-xs", "text-red-500", "leading-none"], [1, "absolute", "left-1.5", "top-1/2", "-translate-y-1/2", "text-gray-400", "text-xs", "pointer-events-none"], [1, "w-full", "h-7", "px-2", "text-xs", "text-gray-800", "bg-white", "border", "border-gray-300", "focus:outline-none", "focus:border-blue-400", "read-only:bg-gray-100", "read-only:text-gray-500", "disabled:bg-gray-100", "disabled:text-gray-400", "placeholder:text-gray-400", 3, "id", "formControlName", "type", "placeholder", "readonly"], [1, "w-full", "h-7", "px-2", "text-xs", "text-gray-800", "bg-white", "border", "border-gray-300", "focus:outline-none", "focus:border-blue-400", "read-only:bg-gray-100", "disabled:bg-gray-100", 3, "id", "formControlName", "type", "readonly"], [1, "w-full", "h-7", "px-2", "text-xs", "text-gray-800", "bg-white", "border", "border-gray-300", "focus:outline-none", "focus:border-blue-400", "disabled:bg-gray-100", "cursor-pointer", 3, "id", "formControlName"], ["value", ""], [3, "value"], ["multiple", "", 1, "w-full", "px-2", "py-1", "text-xs", "text-gray-800", "bg-white", "border", "border-gray-300", "focus:outline-none", "focus:border-blue-400", "cursor-pointer", 3, "id", "formControlName"], [1, "w-full", "px-2", "py-1", "text-xs", "text-gray-800", "bg-white", "border", "border-gray-300", "focus:outline-none", "focus:border-blue-400", "resize-none", "placeholder:text-gray-400", 3, "id", "formControlName", "placeholder", "rows"], ["type", "checkbox", 1, "w-3.5", "h-3.5", "text-blue-600", "border-gray-300", "cursor-pointer", 3, "id", "formControlName"], [1, "text-xs", "text-gray-600"], [1, "inline-flex", "items-center", "px-2", "py-0.5", "rounded", "text-xs", "font-medium", 3, "class"], [1, "inline-flex", "items-center", "px-2", "py-0.5", "rounded", "text-xs", "font-medium"], [1, "text-xs", "text-gray-700"]], template: function FormGeneratorComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "button", 2);
        \u0275\u0275text(3, " G\xE9n\xE9ral ");
        \u0275\u0275elementEnd();
        \u0275\u0275repeaterCreate(4, FormGeneratorComponent_For_5_Template, 2, 1, "button", 3, _forTrack0);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "div", 4)(7, "button", 5);
        \u0275\u0275template(8, FormGeneratorComponent_Conditional_8_Template, 2, 0, "span", 6);
        \u0275\u0275text(9, " Enregistrer ");
        \u0275\u0275elementEnd();
        \u0275\u0275repeaterCreate(10, FormGeneratorComponent_For_11_Template, 2, 3, "button", 7, _forTrack0);
        \u0275\u0275elementStart(12, "button", 8);
        \u0275\u0275listener("click", function FormGeneratorComponent_Template_button_click_12_listener() {
          return ctx.reset();
        });
        \u0275\u0275text(13, "Initialiser");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(14, "button", 9);
        \u0275\u0275listener("click", function FormGeneratorComponent_Template_button_click_14_listener() {
          return ctx.reset();
        });
        \u0275\u0275text(15, "Fermer");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(16, "div", 10)(17, "form", 11);
        \u0275\u0275listener("ngSubmit", function FormGeneratorComponent_Template_form_ngSubmit_17_listener() {
          return ctx.onSubmit();
        });
        \u0275\u0275repeaterCreate(18, FormGeneratorComponent_For_19_Template, 2, 2, null, null, _forTrack1);
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(4);
        \u0275\u0275repeater(ctx.subviewActions());
        \u0275\u0275advance(3);
        \u0275\u0275property("disabled", ctx.form.invalid || ctx.isSubmitting());
        \u0275\u0275advance();
        \u0275\u0275conditional(8, ctx.isSubmitting() ? 8 : -1);
        \u0275\u0275advance(2);
        \u0275\u0275repeater(ctx.mainActions());
        \u0275\u0275advance(7);
        \u0275\u0275property("formGroup", ctx.form);
        \u0275\u0275advance();
        \u0275\u0275repeater(ctx.sections());
      }
    }, dependencies: [ReactiveFormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, CheckboxControlValueAccessor, SelectControlValueAccessor, SelectMultipleControlValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FormGeneratorComponent, { className: "FormGeneratorComponent", filePath: "src\\app\\shared\\components\\form-generator\\form-generator.component.ts", lineNumber: 233 });
})();

// src/app/shared/components/data-grid/data-grid.component.ts
var _forTrack02 = ($index, $item) => $item.actionId;
var _forTrack12 = ($index, $item) => $item.fieldKey;
var _forTrack22 = ($index, $item) => $item.value;
function DataGridComponent_Conditional_1_For_3_For_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 46);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const op_r4 = ctx.$implicit;
    \u0275\u0275property("value", op_r4.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(op_r4.label);
  }
}
function DataGridComponent_Conditional_1_For_3_Conditional_7_For_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 46);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const opt_r6 = ctx.$implicit;
    \u0275\u0275property("value", opt_r6.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(opt_r6.label);
  }
}
function DataGridComponent_Conditional_1_For_3_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "select", 48);
    \u0275\u0275listener("change", function DataGridComponent_Conditional_1_For_3_Conditional_7_Template_select_change_0_listener($event) {
      \u0275\u0275restoreView(_r5);
      const f_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.setFilterValue(f_r2.fieldKey, $event.target.value));
    });
    \u0275\u0275element(1, "option", 49);
    \u0275\u0275repeaterCreate(2, DataGridComponent_Conditional_1_For_3_Conditional_7_For_3_Template, 2, 2, "option", 46, _forTrack22);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_12_0;
    const f_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("value", (tmp_12_0 = ctx_r2.filterValues()[f_r2.fieldKey]) !== null && tmp_12_0 !== void 0 ? tmp_12_0 : "");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(f_r2.options);
  }
}
function DataGridComponent_Conditional_1_For_3_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "input", 50);
    \u0275\u0275listener("input", function DataGridComponent_Conditional_1_For_3_Conditional_8_Template_input_input_0_listener($event) {
      \u0275\u0275restoreView(_r7);
      const f_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.setFilterValue(f_r2.fieldKey, $event.target.value));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_13_0;
    const f_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("type", f_r2.componentType === "DATE" ? "date" : "datetime-local")("value", (tmp_13_0 = ctx_r2.filterValues()[f_r2.fieldKey]) !== null && tmp_13_0 !== void 0 ? tmp_13_0 : "");
  }
}
function DataGridComponent_Conditional_1_For_3_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "input", 51);
    \u0275\u0275listener("input", function DataGridComponent_Conditional_1_For_3_Conditional_9_Template_input_input_0_listener($event) {
      \u0275\u0275restoreView(_r8);
      const f_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.setFilterValue(f_r2.fieldKey, $event.target.value));
    })("keydown.enter", function DataGridComponent_Conditional_1_For_3_Conditional_9_Template_input_keydown_enter_0_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.onSearch());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_12_0;
    const f_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("value", (tmp_12_0 = ctx_r2.filterValues()[f_r2.fieldKey]) !== null && tmp_12_0 !== void 0 ? tmp_12_0 : "");
  }
}
function DataGridComponent_Conditional_1_For_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 42)(1, "label", 43);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 44)(4, "select", 45);
    \u0275\u0275listener("change", function DataGridComponent_Conditional_1_For_3_Template_select_change_4_listener($event) {
      const f_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.setFilterOp(f_r2.fieldKey, $event.target.value));
    });
    \u0275\u0275repeaterCreate(5, DataGridComponent_Conditional_1_For_3_For_6_Template, 2, 2, "option", 46, _forTrack22);
    \u0275\u0275elementEnd();
    \u0275\u0275template(7, DataGridComponent_Conditional_1_For_3_Conditional_7_Template, 4, 1, "select", 47)(8, DataGridComponent_Conditional_1_For_3_Conditional_8_Template, 1, 2)(9, DataGridComponent_Conditional_1_For_3_Conditional_9_Template, 1, 1);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_12_0;
    const f_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(f_r2.label);
    \u0275\u0275advance(2);
    \u0275\u0275property("value", (tmp_12_0 = ctx_r2.filterOps()[f_r2.fieldKey]) !== null && tmp_12_0 !== void 0 ? tmp_12_0 : "=");
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.operators);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(7, f_r2.componentType === "SELECT" || f_r2.componentType === "BADGE" ? 7 : f_r2.componentType === "DATE" || f_r2.componentType === "DATETIME" ? 8 : 9);
  }
}
function DataGridComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1)(1, "div", 41);
    \u0275\u0275repeaterCreate(2, DataGridComponent_Conditional_1_For_3_Template, 10, 3, "div", 42, _forTrack12);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.filterFields());
  }
}
function DataGridComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 3);
    \u0275\u0275listener("click", function DataGridComponent_Conditional_7_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggleCriteria());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 4);
    \u0275\u0275element(2, "path", 52);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Crit\xE8res ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("crt-btn-active", ctx_r2.showCriteria());
  }
}
function DataGridComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 53);
    \u0275\u0275listener("click", function DataGridComponent_Conditional_9_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openNew());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 54);
    \u0275\u0275element(2, "path", 55);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Nouveau ");
    \u0275\u0275elementEnd();
  }
}
function DataGridComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 3);
    \u0275\u0275listener("click", function DataGridComponent_Conditional_10_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.exportData("CSV"));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 4);
    \u0275\u0275element(2, "path", 56);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Exporter ");
    \u0275\u0275elementEnd();
  }
}
function DataGridComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 57);
    \u0275\u0275listener("click", function DataGridComponent_Conditional_11_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.deleteSelected());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 4);
    \u0275\u0275element(2, "path", 58);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Supprimer ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("disabled", ctx_r2.selectedRow() === null);
  }
}
function DataGridComponent_For_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 59);
    \u0275\u0275listener("click", function DataGridComponent_For_13_Template_button_click_0_listener() {
      const action_r14 = \u0275\u0275restoreView(_r13).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.handleMainAction(action_r14));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const action_r14 = ctx.$implicit;
    \u0275\u0275property("disabled", !action_r14.isEnabled);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(action_r14.label);
  }
}
function DataGridComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13);
    \u0275\u0275text(1, " R\xE9sultat : ");
    \u0275\u0275elementStart(2, "span", 60);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.totalElements());
  }
}
function DataGridComponent_For_23_Conditional_3_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275textInterpolate1(" ", ctx_r2.currentSort().direction === "asc" ? "\u25B2" : "\u25BC", " ");
  }
}
function DataGridComponent_For_23_Conditional_3_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u21C5 ");
  }
}
function DataGridComponent_For_23_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 64);
    \u0275\u0275template(1, DataGridComponent_For_23_Conditional_3_Conditional_1_Template, 1, 1)(2, DataGridComponent_For_23_Conditional_3_Conditional_2_Template, 1, 0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const col_r16 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("text-blue-600", ctx_r2.currentSort().field === col_r16.fieldKey);
    \u0275\u0275advance();
    \u0275\u0275conditional(1, ctx_r2.currentSort().field === col_r16.fieldKey ? 1 : 2);
  }
}
function DataGridComponent_For_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "th", 61);
    \u0275\u0275listener("click", function DataGridComponent_For_23_Template_th_click_0_listener() {
      const col_r16 = \u0275\u0275restoreView(_r15).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(col_r16.sortable && ctx_r2.sort(col_r16.fieldKey));
    });
    \u0275\u0275elementStart(1, "div", 62);
    \u0275\u0275text(2);
    \u0275\u0275template(3, DataGridComponent_For_23_Conditional_3_Template, 3, 3, "span", 63);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const col_r16 = ctx.$implicit;
    \u0275\u0275classProp("cursor-pointer", col_r16.sortable);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", col_r16.label, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(3, col_r16.sortable ? 3 : -1);
  }
}
function DataGridComponent_Conditional_25_For_1_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 68);
    \u0275\u0275element(1, "div", 67);
    \u0275\u0275elementEnd();
  }
}
function DataGridComponent_Conditional_25_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 65)(1, "td", 66);
    \u0275\u0275element(2, "div", 67);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(3, DataGridComponent_Conditional_25_For_1_For_4_Template, 2, 0, "td", 68, _forTrack12);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r2.gridColumns());
  }
}
function DataGridComponent_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, DataGridComponent_Conditional_25_For_1_Template, 5, 0, "tr", 65, \u0275\u0275repeaterTrackByIndex);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275repeater(ctx_r2.skeletonRows);
  }
}
function DataGridComponent_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 69);
    \u0275\u0275text(2, " Aucune donn\xE9e disponible ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275attribute("colspan", ctx_r2.gridColumns().length + 1);
  }
}
function DataGridComponent_Conditional_27_For_1_For_10_Conditional_1_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 79);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_25_0;
    const opt_r20 = ctx;
    const col_r21 = \u0275\u0275nextContext(2).$implicit;
    const row_r19 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(ctx_r2.getBadgeClass(opt_r20 == null ? null : opt_r20.color));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", (tmp_25_0 = opt_r20 == null ? null : opt_r20.label) !== null && tmp_25_0 !== void 0 ? tmp_25_0 : row_r19[col_r21.fieldKey], " ");
  }
}
function DataGridComponent_Conditional_27_For_1_For_10_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, DataGridComponent_Conditional_27_For_1_For_10_Conditional_1_Conditional_0_Template, 2, 3, "span", 78);
  }
  if (rf & 2) {
    let tmp_22_0;
    const col_r21 = \u0275\u0275nextContext().$implicit;
    const row_r19 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional(0, (tmp_22_0 = ctx_r2.getBadgeOption(col_r21, row_r19[col_r21.fieldKey])) ? 0 : -1, tmp_22_0);
  }
}
function DataGridComponent_Conditional_27_For_1_For_10_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const col_r21 = \u0275\u0275nextContext().$implicit;
    const row_r19 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275textInterpolate1(" ", ctx_r2.formatCell(row_r19[col_r21.fieldKey], col_r21), " ");
  }
}
function DataGridComponent_Conditional_27_For_1_For_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 77);
    \u0275\u0275template(1, DataGridComponent_Conditional_27_For_1_For_10_Conditional_1_Template, 1, 1)(2, DataGridComponent_Conditional_27_For_1_For_10_Conditional_2_Template, 1, 1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const col_r21 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional(1, col_r21.componentType === "BADGE" && col_r21.options ? 1 : 2);
  }
}
function DataGridComponent_Conditional_27_For_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 71);
    \u0275\u0275listener("click", function DataGridComponent_Conditional_27_For_1_Template_tr_click_0_listener() {
      const $index_r18 = \u0275\u0275restoreView(_r17).$index;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.selectedRow.set($index_r18));
    })("dblclick", function DataGridComponent_Conditional_27_For_1_Template_tr_dblclick_0_listener() {
      const row_r19 = \u0275\u0275restoreView(_r17).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.openEdit(row_r19));
    });
    \u0275\u0275elementStart(1, "td", 72)(2, "div", 73)(3, "button", 74);
    \u0275\u0275listener("click", function DataGridComponent_Conditional_27_For_1_Template_button_click_3_listener($event) {
      const row_r19 = \u0275\u0275restoreView(_r17).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      $event.stopPropagation();
      return \u0275\u0275resetView(ctx_r2.openEdit(row_r19));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(4, "svg", 4);
    \u0275\u0275element(5, "path", 75);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(6, "button", 76);
    \u0275\u0275listener("click", function DataGridComponent_Conditional_27_For_1_Template_button_click_6_listener($event) {
      const $index_r18 = \u0275\u0275restoreView(_r17).$index;
      const ctx_r2 = \u0275\u0275nextContext(2);
      $event.stopPropagation();
      return \u0275\u0275resetView(ctx_r2.selectedRow.set($index_r18));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(7, "svg", 4);
    \u0275\u0275element(8, "path", 5);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275repeaterCreate(9, DataGridComponent_Conditional_27_For_1_For_10_Template, 3, 1, "td", 77, _forTrack12);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const $index_r18 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("bg-[#cce0f5]", ctx_r2.selectedRow() === $index_r18)("hover:bg-[#eef4fb]", ctx_r2.selectedRow() !== $index_r18);
    \u0275\u0275advance(9);
    \u0275\u0275repeater(ctx_r2.gridColumns());
  }
}
function DataGridComponent_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, DataGridComponent_Conditional_27_For_1_Template, 11, 4, "tr", 70, \u0275\u0275repeaterTrackByIndex);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275repeater(ctx_r2.rows());
  }
}
function DataGridComponent_Conditional_64_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 88);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.formError(), " ");
  }
}
function DataGridComponent_Conditional_64_For_15_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 94);
    \u0275\u0275text(1, "*");
    \u0275\u0275elementEnd();
  }
}
function DataGridComponent_Conditional_64_For_15_Conditional_4_For_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 46);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const opt_r25 = ctx.$implicit;
    \u0275\u0275property("value", opt_r25.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(opt_r25.label);
  }
}
function DataGridComponent_Conditional_64_For_15_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "select", 96);
    \u0275\u0275listener("change", function DataGridComponent_Conditional_64_For_15_Conditional_4_Template_select_change_0_listener($event) {
      \u0275\u0275restoreView(_r23);
      const field_r24 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.setField(field_r24.fieldKey, $event.target.value));
    });
    \u0275\u0275element(1, "option", 49);
    \u0275\u0275repeaterCreate(2, DataGridComponent_Conditional_64_For_15_Conditional_4_For_3_Template, 2, 2, "option", 46, _forTrack22);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_12_0;
    const field_r24 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("value", (tmp_12_0 = (tmp_12_0 = ctx_r2.formData()[field_r24.fieldKey]) !== null && tmp_12_0 !== void 0 ? tmp_12_0 : field_r24.defaultValue) !== null && tmp_12_0 !== void 0 ? tmp_12_0 : "");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(field_r24.options);
  }
}
function DataGridComponent_Conditional_64_For_15_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r26 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "textarea", 97);
    \u0275\u0275listener("input", function DataGridComponent_Conditional_64_For_15_Conditional_5_Template_textarea_input_0_listener($event) {
      \u0275\u0275restoreView(_r26);
      const field_r24 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.setField(field_r24.fieldKey, $event.target.value));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_12_0;
    let tmp_13_0;
    const field_r24 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("placeholder", (tmp_12_0 = field_r24.placeholder) !== null && tmp_12_0 !== void 0 ? tmp_12_0 : "")("value", (tmp_13_0 = (tmp_13_0 = ctx_r2.formData()[field_r24.fieldKey]) !== null && tmp_13_0 !== void 0 ? tmp_13_0 : field_r24.defaultValue) !== null && tmp_13_0 !== void 0 ? tmp_13_0 : "");
  }
}
function DataGridComponent_Conditional_64_For_15_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r27 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "input", 98);
    \u0275\u0275listener("input", function DataGridComponent_Conditional_64_For_15_Conditional_6_Template_input_input_0_listener($event) {
      \u0275\u0275restoreView(_r27);
      const field_r24 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.setField(field_r24.fieldKey, $event.target.value));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_14_0;
    let tmp_15_0;
    const field_r24 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("bg-gray-100", field_r24.readonly);
    \u0275\u0275property("type", ctx_r2.getInputType(field_r24.componentType))("placeholder", field_r24.fieldKey === "password" && ctx_r2.formMode() === "edit" ? "Laisser vide pour ne pas modifier" : (tmp_14_0 = field_r24.placeholder) !== null && tmp_14_0 !== void 0 ? tmp_14_0 : "")("value", (tmp_15_0 = (tmp_15_0 = ctx_r2.formData()[field_r24.fieldKey]) !== null && tmp_15_0 !== void 0 ? tmp_15_0 : field_r24.defaultValue) !== null && tmp_15_0 !== void 0 ? tmp_15_0 : "")("readonly", field_r24.readonly || ctx_r2.formMode() === "edit" && field_r24.fieldKey === "username");
  }
}
function DataGridComponent_Conditional_64_For_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 42)(1, "label", 93);
    \u0275\u0275text(2);
    \u0275\u0275template(3, DataGridComponent_Conditional_64_For_15_Conditional_3_Template, 2, 0, "span", 94);
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, DataGridComponent_Conditional_64_For_15_Conditional_4_Template, 4, 1, "select", 95)(5, DataGridComponent_Conditional_64_For_15_Conditional_5_Template, 1, 2)(6, DataGridComponent_Conditional_64_For_15_Conditional_6_Template, 1, 6);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const field_r24 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", field_r24.label, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(3, field_r24.required ? 3 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(4, field_r24.componentType === "SELECT" || field_r24.componentType === "BADGE" ? 4 : field_r24.componentType === "TEXTAREA" ? 5 : 6);
  }
}
function DataGridComponent_Conditional_64_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 92);
    \u0275\u0275text(1, "\u21BB");
    \u0275\u0275elementEnd();
  }
}
function DataGridComponent_Conditional_64_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 40)(1, "div", 80)(2, "div", 81)(3, "span", 82);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 83);
    \u0275\u0275listener("click", function DataGridComponent_Conditional_64_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r22);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closeModal());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(6, "svg", 84);
    \u0275\u0275element(7, "path", 85);
    \u0275\u0275elementEnd()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(8, "div", 86)(9, "button", 87);
    \u0275\u0275text(10, " G\xE9n\xE9ral ");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(11, DataGridComponent_Conditional_64_Conditional_11_Template, 2, 1, "div", 88);
    \u0275\u0275elementStart(12, "div", 89)(13, "div", 41);
    \u0275\u0275repeaterCreate(14, DataGridComponent_Conditional_64_For_15_Template, 7, 3, "div", 42, _forTrack12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 90)(17, "button", 91);
    \u0275\u0275listener("click", function DataGridComponent_Conditional_64_Template_button_click_17_listener() {
      \u0275\u0275restoreView(_r22);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.submitForm());
    });
    \u0275\u0275template(18, DataGridComponent_Conditional_64_Conditional_18_Template, 2, 0, "span", 92);
    \u0275\u0275text(19, " Enregistrer ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "button", 59);
    \u0275\u0275listener("click", function DataGridComponent_Conditional_64_Template_button_click_20_listener() {
      \u0275\u0275restoreView(_r22);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closeModal());
    });
    \u0275\u0275text(21, "Fermer");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "button", 3);
    \u0275\u0275listener("click", function DataGridComponent_Conditional_64_Template_button_click_22_listener() {
      \u0275\u0275restoreView(_r22);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.formData.set({}));
    });
    \u0275\u0275text(23, "Initialiser");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2(" ", ctx_r2.formMode() === "create" ? "Nouveau \u2014 " : "Modifier \u2014 ", "", ctx_r2.metadata.title, " ");
    \u0275\u0275advance(7);
    \u0275\u0275conditional(11, ctx_r2.formError() ? 11 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r2.formFields());
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r2.isSaving());
    \u0275\u0275advance();
    \u0275\u0275conditional(18, ctx_r2.isSaving() ? 18 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r2.isSaving());
  }
}
function DataGridComponent_Conditional_65_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 92);
    \u0275\u0275text(1, "\u21BB");
    \u0275\u0275elementEnd();
  }
}
function DataGridComponent_Conditional_65_Template(rf, ctx) {
  if (rf & 1) {
    const _r28 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 40)(1, "div", 99)(2, "div", 100);
    \u0275\u0275text(3, "Confirmer la suppression");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 101);
    \u0275\u0275text(5, "Cette action est irr\xE9versible et permanente.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 102)(7, "button", 3);
    \u0275\u0275listener("click", function DataGridComponent_Conditional_65_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r28);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.deleteTarget.set(null));
    });
    \u0275\u0275text(8, "Annuler");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 57);
    \u0275\u0275listener("click", function DataGridComponent_Conditional_65_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r28);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.confirmDelete());
    });
    \u0275\u0275template(10, DataGridComponent_Conditional_65_Conditional_10_Template, 2, 0, "span", 92);
    \u0275\u0275text(11, " Supprimer ");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275property("disabled", ctx_r2.isSaving());
    \u0275\u0275advance();
    \u0275\u0275conditional(10, ctx_r2.isSaving() ? 10 : -1);
  }
}
var OPERATORS = [
  { value: "=", label: "=" },
  { value: "!=", label: "\u2260" },
  { value: ">", label: ">" },
  { value: ">=", label: "\u2265" },
  { value: "<", label: "<" },
  { value: "<=", label: "\u2264" },
  { value: "LIKE", label: "~" }
];
var DataGridComponent = class _DataGridComponent {
  constructor() {
    this.http = inject(HttpClient);
    this.operators = OPERATORS;
    this.rows = signal([]);
    this.isLoading = signal(false);
    this.currentPage = signal(0);
    this.totalElements = signal(0);
    this.totalPages = signal(0);
    this.currentSort = signal({ field: "", direction: "asc" });
    this.selectedRow = signal(null);
    this.pageSize = signal(20);
    this.filterValues = signal({});
    this.filterOps = signal({});
    this.showModal = signal(false);
    this.showCriteria = signal(true);
    this.formMode = signal("create");
    this.formData = signal({});
    this.formError = signal(null);
    this.isSaving = signal(false);
    this.deleteTarget = signal(null);
    this.editingId = null;
    this.gridColumns = computed(() => this.metadata.components.filter((c) => c.gridColumn).sort((a, b) => a.displayOrder - b.displayOrder));
    this.filterFields = computed(() => this.metadata.components.filter((c) => c.filterable).sort((a, b) => a.displayOrder - b.displayOrder));
    this.mainActions = computed(() => this.metadata.actions.filter((a) => a.actionType === "MAIN" && a.isEnabled).sort((a, b) => a.displayOrder - b.displayOrder));
    this.gridRowActions = computed(() => this.metadata.actions.filter((a) => a.actionType === "GRID").sort((a, b) => a.displayOrder - b.displayOrder));
    this.formFields = computed(() => [...this.metadata.components].filter((c) => c.visible).sort((a, b) => a.displayOrder - b.displayOrder));
    this.visiblePages = computed(() => {
      const total = this.totalPages();
      const current = this.currentPage();
      if (total <= 7)
        return Array.from({ length: total }, (_, i) => i);
      const pages = [];
      pages.push(0);
      if (current > 2)
        pages.push(-1);
      for (let i = Math.max(1, current - 1); i <= Math.min(total - 2, current + 1); i++)
        pages.push(i);
      if (current < total - 3)
        pages.push(-1);
      pages.push(total - 1);
      return pages;
    });
    this.skeletonRows = Array(5);
  }
  ngOnInit() {
    const orderByParts = (this.metadata.orderBy ?? "").trim().split(/\s+/);
    const defaultField = orderByParts[0]?.replace(/^o\./, "") ?? "";
    const defaultDir = orderByParts[1]?.toLowerCase() === "desc" ? "desc" : "asc";
    this.currentSort.set({ field: defaultField, direction: defaultDir });
    this.pageSize.set(this.metadata.pageSize ?? 20);
    this.loadData();
  }
  loadData() {
    this.isLoading.set(true);
    const sort = this.currentSort();
    let params = new HttpParams().set("page", this.currentPage()).set("size", this.pageSize());
    if (sort.field)
      params = params.set("sort", `${sort.field},${sort.direction}`);
    const fv = this.filterValues();
    const fo = this.filterOps();
    for (const [key, val] of Object.entries(fv)) {
      if (val?.trim()) {
        params = params.set(key, val.trim());
        const op = fo[key] ?? "=";
        if (op !== "=")
          params = params.set(`${key}_op`, op);
      }
    }
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
  quickSort(direction) {
    const field = this.currentSort().field || (this.gridColumns()[0]?.fieldKey ?? "");
    if (field) {
      this.currentSort.set({ field, direction });
      this.currentPage.set(0);
      this.loadData();
    }
  }
  goToPage(page) {
    if (page < 0 || this.totalPages() > 0 && page >= this.totalPages())
      return;
    this.currentPage.set(page);
    this.loadData();
  }
  setPageSize(size) {
    if (size > 0) {
      this.pageSize.set(size);
      this.currentPage.set(0);
      this.loadData();
    }
  }
  onSearch() {
    this.currentPage.set(0);
    this.loadData();
  }
  setFilterValue(key, value) {
    this.filterValues.update((v) => __spreadProps(__spreadValues({}, v), { [key]: value }));
  }
  setFilterOp(key, op) {
    this.filterOps.update((o) => __spreadProps(__spreadValues({}, o), { [key]: op }));
  }
  handleMainAction(action) {
    if (action.code === "new" || action.code === "nouveau") {
      this.openNew();
    } else if (action.endpoint && action.httpMethod) {
      const row = this.selectedRow() !== null ? this.rows()[this.selectedRow()] : null;
      const url = row ? action.endpoint.replace("{id}", String(row["id"] ?? "")) : action.endpoint;
      this.http.request(action.httpMethod, url, { body: row }).subscribe({
        next: () => this.loadData(),
        error: (err) => console.error("Action error", err)
      });
    }
  }
  // ── CRUD actions ─────────────────────────────────────────────
  handleAction(actionKey, row) {
    if (actionKey === "edit") {
      this.openEdit(row);
    } else if (actionKey === "delete") {
      this.deleteTarget.set(row);
    } else if (actionKey === "toggle") {
      const id = row["id"];
      this.http.patch(`${this.metadata.apiBaseUrl}/${id}/toggle`, {}).subscribe({
        next: () => this.loadData(),
        error: (err) => console.error("Toggle failed", err)
      });
    }
  }
  openNew() {
    this.formMode.set("create");
    this.editingId = null;
    const defaults = {};
    this.formFields().forEach((f) => {
      if (f.defaultValue != null)
        defaults[f.fieldKey] = f.defaultValue;
    });
    this.formData.set(defaults);
    this.formError.set(null);
    this.showModal.set(true);
  }
  openEdit(row) {
    this.formMode.set("edit");
    this.editingId = row["id"];
    this.formData.set(__spreadValues({}, row));
    this.formError.set(null);
    this.showModal.set(true);
  }
  closeModal() {
    this.showModal.set(false);
    this.formError.set(null);
  }
  setField(key, value) {
    this.formData.update((d) => __spreadProps(__spreadValues({}, d), { [key]: value }));
  }
  submitForm() {
    for (const field of this.formFields()) {
      const val = this.formData()[field.fieldKey];
      const isOptionalPassword = field.fieldKey === "password" && this.formMode() === "edit";
      if (field.required && !isOptionalPassword && (val == null || String(val).trim() === "")) {
        this.formError.set(`Le champ \xAB ${field.label} \xBB est obligatoire.`);
        return;
      }
    }
    this.formError.set(null);
    this.isSaving.set(true);
    const raw = __spreadValues({}, this.formData());
    if (this.formMode() === "edit" && "password" in raw) {
      if (raw["password"])
        raw["newPassword"] = raw["password"];
      delete raw["password"];
    }
    const payload = raw;
    if (this.formMode() === "create") {
      this.http.post(this.metadata.apiBaseUrl, payload).subscribe({
        next: () => {
          this.isSaving.set(false);
          this.closeModal();
          this.loadData();
        },
        error: (err) => {
          this.isSaving.set(false);
          this.formError.set(this.extractError(err));
        }
      });
    } else {
      this.http.put(`${this.metadata.apiBaseUrl}/${this.editingId}`, payload).subscribe({
        next: () => {
          this.isSaving.set(false);
          this.closeModal();
          this.loadData();
        },
        error: (err) => {
          this.isSaving.set(false);
          this.formError.set(this.extractError(err));
        }
      });
    }
  }
  confirmDelete() {
    const row = this.deleteTarget();
    if (!row)
      return;
    const id = row["id"];
    this.isSaving.set(true);
    this.http.delete(`${this.metadata.apiBaseUrl}/${id}`).subscribe({
      next: () => {
        this.isSaving.set(false);
        this.deleteTarget.set(null);
        this.loadData();
      },
      error: (err) => {
        this.isSaving.set(false);
        console.error("Delete failed", err);
      }
    });
  }
  exportData(format) {
    window.open(`${this.metadata.apiBaseUrl}/export?format=${format}`, "_blank");
  }
  // ── Helpers ──────────────────────────────────────────────────
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
    return String(value);
  }
  getBadgeOption(col, value) {
    return col.options?.find((o) => o.value === String(value));
  }
  getBadgeClass(color) {
    const map = {
      green: "bg-green-100 text-green-700",
      red: "bg-red-100 text-red-700",
      blue: "bg-blue-100 text-blue-700",
      amber: "bg-amber-100 text-amber-700",
      orange: "bg-orange-100 text-orange-700",
      gray: "bg-slate-100 text-slate-600"
    };
    return map[color ?? "gray"] ?? map["gray"];
  }
  getInputType(componentType) {
    const map = {
      EMAIL: "email",
      PASSWORD: "password",
      NUMBER: "number",
      AMOUNT: "number",
      DATE: "date",
      DATETIME: "datetime-local",
      TIME: "time",
      CHECKBOX: "checkbox"
    };
    return map[componentType] ?? "text";
  }
  canWrite() {
    return true;
  }
  toggleCriteria() {
    this.showCriteria.update((v) => !v);
  }
  deleteSelected() {
    const idx = this.selectedRow();
    if (idx !== null)
      this.deleteTarget.set(this.rows()[idx]);
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
  getActionIconBg(color) {
    const map = {
      blue: "bg-blue-500",
      amber: "bg-amber-500",
      orange: "bg-orange-500",
      red: "bg-red-500",
      green: "bg-emerald-500",
      purple: "bg-purple-500",
      gray: "bg-slate-400"
    };
    return map[color ?? "gray"] ?? "bg-slate-400";
  }
  extractError(err) {
    return err?.error?.message ?? "Une erreur est survenue. Veuillez r\xE9essayer.";
  }
  static {
    this.\u0275fac = function DataGridComponent_Factory(t) {
      return new (t || _DataGridComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DataGridComponent, selectors: [["app-data-grid"]], inputs: { metadata: "metadata" }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 66, vars: 16, consts: [[1, "flex", "flex-col", "h-full", "bg-[#f0f0f0]"], [1, "bg-white", "border-b", "border-gray-300", "px-3", "pt-3", "pb-2"], [1, "flex", "items-center", "gap-1", "px-2", "py-1.5", "bg-white", "border-b", "border-gray-300", "flex-wrap"], [1, "crt-btn", 3, "click"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", "stroke-width", "2", 1, "w-3.5", "h-3.5"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0"], [1, "crt-btn", 3, "crt-btn-active"], [1, "w-px", "h-5", "bg-gray-300", "mx-0.5"], [1, "crt-btn", "crt-btn-primary"], [1, "crt-btn"], [1, "crt-btn", "crt-btn-danger", 3, "disabled"], [1, "crt-btn", 3, "disabled"], [1, "flex-1", "overflow-auto", "px-2", "pt-1", "pb-0"], [1, "text-xs", "text-gray-500", "mb-1", "px-1"], [1, "bg-white", "border", "border-gray-300", "overflow-hidden"], [1, "overflow-x-auto"], [1, "w-full", "border-collapse", "text-xs"], [1, "bg-[#dde8f0]", "border-b", "border-gray-300"], [1, "w-14", "border-r", "border-gray-300", "px-1", "py-1.5"], [1, "px-2", "py-1.5", "text-left", "font-semibold", "text-gray-600", "whitespace-nowrap", "border-r", "border-gray-200", "select-none", 3, "cursor-pointer"], [1, "flex", "items-center", "gap-1", "px-2", "py-1", "bg-white", "border-t", "border-gray-300", "shrink-0"], ["title", "Exporter Excel", 1, "w-6", "h-6", "flex", "items-center", "justify-center", "bg-[#1d7044]", "text-white", "rounded-sm", "text-xs", "font-bold", "hover:bg-[#155533]", "transition-colors", 3, "click"], ["title", "Exporter PDF", 1, "w-6", "h-6", "flex", "items-center", "justify-center", "bg-red-600", "text-white", "rounded-sm", "text-xs", "font-bold", "hover:bg-red-700", "transition-colors", 3, "click"], [1, "w-px", "h-5", "bg-gray-300", "mx-1"], ["title", "Premi\xE8re page", 1, "crt-pag-btn", 3, "click", "disabled"], ["title", "Page pr\xE9c\xE9dente", 1, "crt-pag-btn", 3, "click", "disabled"], [1, "px-2", "py-0.5", "text-xs", "border", "border-gray-300", "bg-white", "text-gray-700", "min-w-[3rem]", "text-center"], ["title", "Page suivante", 1, "crt-pag-btn", 3, "click", "disabled"], ["title", "Derni\xE8re page", 1, "crt-pag-btn", 3, "click", "disabled"], ["title", "Tri croissant", 1, "crt-pag-btn", 3, "click"], ["title", "Tri d\xE9croissant", 1, "crt-pag-btn", 3, "click"], ["title", "Rafra\xEEchir", 1, "crt-pag-btn", 3, "click"], [1, "flex-1"], [1, "text-xs", "text-gray-500"], [1, "h-6", "px-1", "text-xs", "text-gray-600", "bg-white", "border", "border-gray-300", "focus:outline-none", "cursor-pointer", 3, "change", "value"], ["value", "10"], ["value", "20"], ["value", "50"], ["value", "99"], ["value", "100"], [1, "fixed", "inset-0", "bg-black/40", "z-40", "flex", "items-center", "justify-center", "p-4"], [1, "grid", "grid-cols-4", "gap-x-3", "gap-y-2"], [1, "flex", "flex-col", "gap-0.5"], [1, "text-xs", "text-gray-600", "font-medium"], [1, "flex", "items-center"], [1, "h-7", "px-1", "text-xs", "text-gray-600", "bg-white", "border", "border-gray-300", "border-r-0", "focus:outline-none", "focus:border-blue-400", "cursor-pointer", "w-12", "shrink-0", 3, "change", "value"], [3, "value"], [1, "flex-1", "h-7", "px-2", "text-xs", "text-gray-700", "bg-white", "border", "border-gray-300", "focus:outline-none", "focus:border-blue-400", "cursor-pointer", "min-w-0", 3, "value"], [1, "flex-1", "h-7", "px-2", "text-xs", "text-gray-700", "bg-white", "border", "border-gray-300", "focus:outline-none", "focus:border-blue-400", "cursor-pointer", "min-w-0", 3, "change", "value"], ["value", ""], [1, "flex-1", "h-7", "px-2", "text-xs", "text-gray-700", "bg-white", "border", "border-gray-300", "focus:outline-none", "focus:border-blue-400", "min-w-0", 3, "input", "type", "value"], ["type", "text", 1, "flex-1", "h-7", "px-2", "text-xs", "text-gray-700", "bg-white", "border", "border-gray-300", "focus:outline-none", "focus:border-blue-400", "placeholder:text-gray-400", "min-w-0", 3, "input", "keydown.enter", "value"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z"], [1, "crt-btn", "crt-btn-primary", 3, "click"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", "stroke-width", "2.5", 1, "w-3.5", "h-3.5"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M12 4v16m8-8H4"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"], [1, "crt-btn", "crt-btn-danger", 3, "click", "disabled"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"], [1, "crt-btn", 3, "click", "disabled"], [1, "font-semibold", "text-gray-700"], [1, "px-2", "py-1.5", "text-left", "font-semibold", "text-gray-600", "whitespace-nowrap", "border-r", "border-gray-200", "select-none", 3, "click"], [1, "flex", "items-center", "gap-1"], [1, "text-gray-400", "text-[10px]", "leading-none", 3, "text-blue-600"], [1, "text-gray-400", "text-[10px]", "leading-none"], [1, "border-b", "border-gray-100"], [1, "px-1", "py-2", "border-r", "border-gray-200"], [1, "h-3", "bg-gray-100", "rounded", "animate-pulse"], [1, "px-2", "py-2", "border-r", "border-gray-100"], [1, "px-4", "py-10", "text-center", "text-xs", "text-gray-400"], [1, "border-b", "border-gray-100", "cursor-pointer", 3, "bg-[#cce0f5]", "hover:bg-[#eef4fb]"], [1, "border-b", "border-gray-100", "cursor-pointer", 3, "click", "dblclick"], [1, "px-1", "py-1", "border-r", "border-gray-200", "whitespace-nowrap"], [1, "flex", "items-center", "gap-0.5"], ["title", "Modifier", 1, "p-0.5", "text-gray-400", "hover:text-blue-600", "transition-colors", 3, "click"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"], ["title", "Consulter", 1, "p-0.5", "text-gray-400", "hover:text-blue-600", "transition-colors", 3, "click"], [1, "px-2", "py-1", "border-r", "border-gray-100", "text-gray-700"], [1, "inline-flex", "items-center", "px-1.5", "py-0.5", "rounded", "text-xs", "font-medium", 3, "class"], [1, "inline-flex", "items-center", "px-1.5", "py-0.5", "rounded", "text-xs", "font-medium"], [1, "bg-white", "border", "border-gray-400", "shadow-2xl", "z-50", "flex", "flex-col", "w-full", "max-w-2xl", "max-h-[90vh]"], [1, "flex", "items-center", "justify-between", "px-3", "py-2", "bg-[#2a7fc9]", "text-white", "shrink-0"], [1, "text-sm", "font-semibold"], [1, "w-6", "h-6", "flex", "items-center", "justify-center", "hover:bg-white/20", "rounded", "transition-colors", 3, "click"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", "stroke-width", "2.5", 1, "w-4", "h-4"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M6 18L18 6M6 6l12 12"], [1, "flex", "border-b", "border-gray-300", "bg-[#e8e8e8]", "shrink-0"], [1, "px-4", "py-1.5", "text-xs", "font-medium", "bg-white", "border-r", "border-gray-300", "text-gray-800", "-mb-px", "border-b-white"], [1, "mx-3", "mt-2", "px-3", "py-2", "bg-red-50", "border", "border-red-300", "text-xs", "text-red-700"], [1, "flex-1", "overflow-y-auto", "px-3", "py-3"], [1, "flex", "items-center", "gap-1", "px-3", "py-2", "bg-[#f0f0f0]", "border-t", "border-gray-300", "shrink-0"], [1, "crt-btn", "crt-btn-primary", 3, "click", "disabled"], [1, "animate-spin", "mr-1"], [1, "text-xs", "text-gray-600"], [1, "text-red-500"], [1, "h-7", "px-2", "text-xs", "text-gray-700", "bg-white", "border", "border-gray-300", "focus:outline-none", "focus:border-blue-400", "cursor-pointer", 3, "value"], [1, "h-7", "px-2", "text-xs", "text-gray-700", "bg-white", "border", "border-gray-300", "focus:outline-none", "focus:border-blue-400", "cursor-pointer", 3, "change", "value"], ["rows", "3", 1, "px-2", "py-1", "text-xs", "text-gray-700", "bg-white", "border", "border-gray-300", "focus:outline-none", "focus:border-blue-400", "resize-none", "col-span-4", 3, "input", "placeholder", "value"], [1, "h-7", "px-2", "text-xs", "text-gray-700", "bg-white", "border", "border-gray-300", "focus:outline-none", "focus:border-blue-400", "placeholder:text-gray-400", 3, "input", "type", "placeholder", "value", "readonly"], [1, "bg-white", "border", "border-gray-400", "shadow-2xl", "z-50", "w-full", "max-w-sm"], [1, "px-3", "py-2", "bg-[#2a7fc9]", "text-white", "text-sm", "font-semibold"], [1, "p-4", "text-sm", "text-gray-700"], [1, "flex", "justify-end", "gap-1", "px-3", "py-2", "bg-[#f0f0f0]", "border-t", "border-gray-300"]], template: function DataGridComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275template(1, DataGridComponent_Conditional_1_Template, 4, 0, "div", 1);
        \u0275\u0275elementStart(2, "div", 2)(3, "button", 3);
        \u0275\u0275listener("click", function DataGridComponent_Template_button_click_3_listener() {
          return ctx.onSearch();
        });
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(4, "svg", 4);
        \u0275\u0275element(5, "path", 5);
        \u0275\u0275elementEnd();
        \u0275\u0275text(6, " Chercher ");
        \u0275\u0275elementEnd();
        \u0275\u0275template(7, DataGridComponent_Conditional_7_Template, 4, 2, "button", 6);
        \u0275\u0275namespaceHTML();
        \u0275\u0275element(8, "div", 7);
        \u0275\u0275template(9, DataGridComponent_Conditional_9_Template, 4, 0, "button", 8)(10, DataGridComponent_Conditional_10_Template, 4, 0, "button", 9)(11, DataGridComponent_Conditional_11_Template, 4, 1, "button", 10);
        \u0275\u0275repeaterCreate(12, DataGridComponent_For_13_Template, 2, 2, "button", 11, _forTrack02);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(14, "div", 12);
        \u0275\u0275template(15, DataGridComponent_Conditional_15_Template, 4, 1, "div", 13);
        \u0275\u0275elementStart(16, "div", 14)(17, "div", 15)(18, "table", 16)(19, "thead")(20, "tr", 17);
        \u0275\u0275element(21, "th", 18);
        \u0275\u0275repeaterCreate(22, DataGridComponent_For_23_Template, 4, 4, "th", 19, _forTrack12);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(24, "tbody");
        \u0275\u0275template(25, DataGridComponent_Conditional_25_Template, 2, 0)(26, DataGridComponent_Conditional_26_Template, 3, 1)(27, DataGridComponent_Conditional_27_Template, 2, 0);
        \u0275\u0275elementEnd()()()()();
        \u0275\u0275elementStart(28, "div", 20)(29, "button", 21);
        \u0275\u0275listener("click", function DataGridComponent_Template_button_click_29_listener() {
          return ctx.exportData("EXCEL");
        });
        \u0275\u0275text(30, " E ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(31, "button", 22);
        \u0275\u0275listener("click", function DataGridComponent_Template_button_click_31_listener() {
          return ctx.exportData("PDF");
        });
        \u0275\u0275text(32, " P ");
        \u0275\u0275elementEnd();
        \u0275\u0275element(33, "div", 23);
        \u0275\u0275elementStart(34, "button", 24);
        \u0275\u0275listener("click", function DataGridComponent_Template_button_click_34_listener() {
          return ctx.goToPage(0);
        });
        \u0275\u0275text(35, "|\u25C0");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(36, "button", 25);
        \u0275\u0275listener("click", function DataGridComponent_Template_button_click_36_listener() {
          return ctx.goToPage(ctx.currentPage() - 1);
        });
        \u0275\u0275text(37, "\u25C0");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(38, "span", 26);
        \u0275\u0275text(39);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(40, "button", 27);
        \u0275\u0275listener("click", function DataGridComponent_Template_button_click_40_listener() {
          return ctx.goToPage(ctx.currentPage() + 1);
        });
        \u0275\u0275text(41, "\u25B6");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(42, "button", 28);
        \u0275\u0275listener("click", function DataGridComponent_Template_button_click_42_listener() {
          return ctx.goToPage(ctx.totalPages() - 1);
        });
        \u0275\u0275text(43, "\u25B6|");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(44, "button", 29);
        \u0275\u0275listener("click", function DataGridComponent_Template_button_click_44_listener() {
          return ctx.quickSort("asc");
        });
        \u0275\u0275text(45, "\u25B2");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(46, "button", 30);
        \u0275\u0275listener("click", function DataGridComponent_Template_button_click_46_listener() {
          return ctx.quickSort("desc");
        });
        \u0275\u0275text(47, "\u25BC");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(48, "button", 31);
        \u0275\u0275listener("click", function DataGridComponent_Template_button_click_48_listener() {
          return ctx.loadData();
        });
        \u0275\u0275text(49, "\u21BB");
        \u0275\u0275elementEnd();
        \u0275\u0275element(50, "div", 32);
        \u0275\u0275elementStart(51, "span", 33);
        \u0275\u0275text(52, "Nbre \xE9l\xE9ments :");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(53, "select", 34);
        \u0275\u0275listener("change", function DataGridComponent_Template_select_change_53_listener($event) {
          return ctx.setPageSize(+$event.target.value);
        });
        \u0275\u0275elementStart(54, "option", 35);
        \u0275\u0275text(55, "10");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(56, "option", 36);
        \u0275\u0275text(57, "20");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(58, "option", 37);
        \u0275\u0275text(59, "50");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(60, "option", 38);
        \u0275\u0275text(61, "99");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(62, "option", 39);
        \u0275\u0275text(63, "100");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275template(64, DataGridComponent_Conditional_64_Template, 24, 6, "div", 40)(65, DataGridComponent_Conditional_65_Template, 12, 2, "div", 40);
      }
      if (rf & 2) {
        \u0275\u0275advance();
        \u0275\u0275conditional(1, ctx.filterFields().length && ctx.showCriteria() ? 1 : -1);
        \u0275\u0275advance(6);
        \u0275\u0275conditional(7, ctx.filterFields().length ? 7 : -1);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(9, ctx.canWrite() ? 9 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(10, !ctx.metadata.disableReportButton ? 10 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(11, ctx.canWrite() ? 11 : -1);
        \u0275\u0275advance();
        \u0275\u0275repeater(ctx.mainActions());
        \u0275\u0275advance(3);
        \u0275\u0275conditional(15, ctx.totalElements() > 0 ? 15 : -1);
        \u0275\u0275advance(7);
        \u0275\u0275repeater(ctx.gridColumns());
        \u0275\u0275advance(3);
        \u0275\u0275conditional(25, ctx.isLoading() ? 25 : ctx.rows().length === 0 ? 26 : 27);
        \u0275\u0275advance(9);
        \u0275\u0275property("disabled", ctx.currentPage() === 0);
        \u0275\u0275advance(2);
        \u0275\u0275property("disabled", ctx.currentPage() === 0);
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate2(" ", ctx.currentPage() + 1, " / ", ctx.totalPages() || 1, " ");
        \u0275\u0275advance();
        \u0275\u0275property("disabled", ctx.currentPage() >= ctx.totalPages() - 1);
        \u0275\u0275advance(2);
        \u0275\u0275property("disabled", ctx.currentPage() >= ctx.totalPages() - 1);
        \u0275\u0275advance(11);
        \u0275\u0275property("value", ctx.pageSize());
        \u0275\u0275advance(11);
        \u0275\u0275conditional(64, ctx.showModal() ? 64 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(65, ctx.deleteTarget() ? 65 : -1);
      }
    }, dependencies: [FormsModule, NgSelectOption, \u0275NgSelectMultipleOption], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DataGridComponent, { className: "DataGridComponent", filePath: "src\\app\\shared\\components\\data-grid\\data-grid.component.ts", lineNumber: 425 });
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
    const params = new HttpParams().set("page", this.currentPage()).set("size", this.metadata.pageSize ?? 15).set("search", this.searchTerm);
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
function GenericRendererComponent_Conditional_0_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 11);
    \u0275\u0275listener("click", function GenericRendererComponent_Conditional_0_Conditional_9_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openScreenDesigner());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 12);
    \u0275\u0275element(2, "path", 13)(3, "path", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Configurer \xE9cran ");
    \u0275\u0275elementEnd();
  }
}
function GenericRendererComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 3);
    \u0275\u0275element(2, "path", 4);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(3, "span", 5);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275element(5, "div", 6);
    \u0275\u0275elementStart(6, "button", 7);
    \u0275\u0275listener("click", function GenericRendererComponent_Conditional_0_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.shortcutService.toggleShortcut(ctx_r1.metadata().code));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(7, "svg", 8);
    \u0275\u0275element(8, "path", 9);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(9, GenericRendererComponent_Conditional_0_Conditional_9_Template, 5, 0, "button", 10);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.metadata().title);
    \u0275\u0275advance(2);
    \u0275\u0275property("title", ctx_r1.shortcutService.isShortcut(ctx_r1.metadata().code) ? "Retirer des favoris" : "Ajouter aux favoris");
    \u0275\u0275advance(3);
    \u0275\u0275conditional(9, ctx_r1.authService.isAdmin() ? 9 : -1);
  }
}
function GenericRendererComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275element(1, "div", 15)(2, "div", 16);
    \u0275\u0275elementEnd();
  }
}
function GenericRendererComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17)(1, "div", 18);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 19);
    \u0275\u0275element(3, "path", 20);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(4, "p", 21);
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
    \u0275\u0275element(0, "app-form-generator", 22);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("metadata", ctx_r1.metadata());
  }
}
function GenericRendererComponent_Conditional_4_Case_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-data-grid", 22);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("metadata", ctx_r1.metadata());
  }
}
function GenericRendererComponent_Conditional_4_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-master-detail", 22);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("metadata", ctx_r1.metadata());
  }
}
function GenericRendererComponent_Conditional_4_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-analytics-dashboard", 22);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("metadata", ctx_r1.metadata());
  }
}
function GenericRendererComponent_Conditional_4_Case_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 23);
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
    this.authService = inject(AuthService);
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
    this.navSub = this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => {
      if (!this.screenCode)
        this.loadFromRoute();
    });
  }
  ngOnChanges() {
    if (this.screenCode) {
      this.load(this.screenCode);
    } else {
      this.loadFromRoute();
    }
  }
  ngOnDestroy() {
    this.navSub?.unsubscribe();
  }
  /**
   * Ouvre le Screen Designer pré-chargé sur l'écran courant.
   */
  openScreenDesigner() {
    const meta = this.metadata();
    if (!meta)
      return;
    this.router.navigate(["/admin/parametrage"], {
      queryParams: { screenCode: meta.code }
    });
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
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _GenericRendererComponent, selectors: [["app-generic-renderer"]], hostAttrs: [1, "flex", "flex-col", "h-full"], inputs: { screenCode: "screenCode" }, standalone: true, features: [\u0275\u0275NgOnChangesFeature, \u0275\u0275StandaloneFeature], decls: 5, vars: 2, consts: [[1, "flex", "items-center", "gap-2", "px-4", "py-2", "bg-[#2a7fc9]", "text-white", "shrink-0"], [1, "flex-1", "overflow-auto", "bg-[#f0f0f0]"], [1, "p-6", "space-y-4"], ["fill", "currentColor", "viewBox", "0 0 20 20", 1, "w-4", "h-4", "shrink-0", "text-white/80"], ["fill-rule", "evenodd", "d", "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z", "clip-rule", "evenodd"], [1, "text-sm", "font-semibold", "tracking-wide"], [1, "flex-1"], [1, "flex", "items-center", "gap-1", "px-2", "py-0.5", "rounded", "text-xs", "text-white/80", "hover:text-white", "hover:bg-white/10", "transition-colors", 3, "click", "title"], ["fill", "currentColor", "viewBox", "0 0 24 24", 1, "w-3.5", "h-3.5"], ["d", "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"], ["title", "Configurer cet \xE9cran", 1, "flex", "items-center", "gap-1", "px-2", "py-0.5", "rounded", "text-xs", "text-white/80", "hover:text-white", "hover:bg-white/10", "transition-colors"], ["title", "Configurer cet \xE9cran", 1, "flex", "items-center", "gap-1", "px-2", "py-0.5", "rounded", "text-xs", "text-white/80", "hover:text-white", "hover:bg-white/10", "transition-colors", 3, "click"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", "stroke-width", "2", 1, "w-3.5", "h-3.5"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M15 12a3 3 0 11-6 0 3 3 0 016 0z"], [1, "h-10", "bg-slate-200", "rounded-lg", "animate-pulse", "w-1/3"], [1, "h-64", "bg-slate-200", "rounded-lg", "animate-pulse"], [1, "flex", "flex-col", "items-center", "justify-center", "h-64", "gap-4"], [1, "w-12", "h-12", "rounded-full", "bg-red-100", "flex", "items-center", "justify-center"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-6", "h-6", "text-red-500"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.999L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16.001c-.77 1.332.192 2.999 1.732 2.999z"], [1, "text-slate-600", "font-medium"], [3, "metadata"], [1, "p-6", "text-red-500"]], template: function GenericRendererComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, GenericRendererComponent_Conditional_0_Template, 10, 3, "div", 0);
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
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(GenericRendererComponent, { className: "GenericRendererComponent", filePath: "src\\app\\shared\\components\\generic-renderer\\generic-renderer.component.ts", lineNumber: 114 });
})();
export {
  GenericRendererComponent
};
//# sourceMappingURL=generic-renderer.component-FJ5W6GXH.js.map
