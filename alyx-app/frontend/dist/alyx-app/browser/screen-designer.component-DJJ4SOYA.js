import {
  ActivatedRoute
} from "./chunk-JVNL7PXV.js";
import {
  CheckboxControlValueAccessor,
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  MaxValidator,
  MinValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgSelectOption,
  NumberValueAccessor,
  ReactiveFormsModule,
  SelectControlValueAccessor,
  Validators,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-LM3PESKF.js";
import {
  DomSanitizer,
  EventEmitter,
  HttpClient,
  computed,
  inject,
  signal,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵdefineComponent,
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
  ɵɵsanitizeHtml,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-CMRDFCUM.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-J4B6MK7R.js";

// src/app/features/admin/screen-designer/component-editor/component-editor.component.ts
var _forTrack0 = ($index, $item) => $item.key;
var _forTrack1 = ($index, $item) => $item.group;
var _forTrack2 = ($index, $item) => $item.value;
function ComponentEditorComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 4);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.component == null ? null : ctx_r0.component.fieldKey);
  }
}
function ComponentEditorComponent_For_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 16);
    \u0275\u0275listener("click", function ComponentEditorComponent_For_12_Template_button_click_0_listener() {
      const t_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.innerTab.set(t_r3.key));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r3 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classProp("border-blue-600", ctx_r0.innerTab() === t_r3.key)("text-blue-600", ctx_r0.innerTab() === t_r3.key)("border-transparent", ctx_r0.innerTab() !== t_r3.key)("text-slate-500", ctx_r0.innerTab() !== t_r3.key);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r3.label);
  }
}
function ComponentEditorComponent_Conditional_15_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 22);
    \u0275\u0275text(1, "camelCase recommand\xE9. Ex: isinCode, tauxNominal");
    \u0275\u0275elementEnd();
  }
}
function ComponentEditorComponent_Conditional_15_For_31_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 35);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r4 = ctx.$implicit;
    \u0275\u0275property("value", t_r4.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r4.label);
  }
}
function ComponentEditorComponent_Conditional_15_For_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "optgroup", 27);
    \u0275\u0275repeaterCreate(1, ComponentEditorComponent_Conditional_15_For_31_For_2_Template, 2, 2, "option", 35, _forTrack2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const group_r5 = ctx.$implicit;
    \u0275\u0275property("label", group_r5.group);
    \u0275\u0275advance();
    \u0275\u0275repeater(group_r5.types);
  }
}
function ComponentEditorComponent_Conditional_15_For_52_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "label", 34);
    \u0275\u0275element(1, "input", 36);
    \u0275\u0275elementStart(2, "span", 37);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const flag_r6 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("formControlName", flag_r6.key);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(flag_r6.label);
  }
}
function ComponentEditorComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17)(1, "div", 18)(2, "label", 19);
    \u0275\u0275text(3, "Cl\xE9 API ");
    \u0275\u0275elementStart(4, "span", 20);
    \u0275\u0275text(5, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(6, "input", 21);
    \u0275\u0275template(7, ComponentEditorComponent_Conditional_15_Conditional_7_Template, 2, 0, "p", 22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 18)(9, "label", 19);
    \u0275\u0275text(10, "Largeur (1-12 col.) ");
    \u0275\u0275elementStart(11, "span", 20);
    \u0275\u0275text(12, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(13, "input", 23);
    \u0275\u0275elementStart(14, "p", 22);
    \u0275\u0275text(15, "6 = demi-\xE9cran \xB7 12 = plein \xE9cran");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(16, "div")(17, "label", 19);
    \u0275\u0275text(18, "Libell\xE9 affich\xE9 ");
    \u0275\u0275elementStart(19, "span", 20);
    \u0275\u0275text(20, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(21, "input", 24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "div")(23, "label", 19);
    \u0275\u0275text(24, "Type de composant ");
    \u0275\u0275elementStart(25, "span", 20);
    \u0275\u0275text(26, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "select", 25)(28, "option", 26);
    \u0275\u0275text(29, "-- Choisir --");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(30, ComponentEditorComponent_Conditional_15_For_31_Template, 3, 1, "optgroup", 27, _forTrack1);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "div", 17)(33, "div")(34, "label", 19);
    \u0275\u0275text(35, "Placeholder");
    \u0275\u0275elementEnd();
    \u0275\u0275element(36, "input", 28);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "div")(38, "label", 19);
    \u0275\u0275text(39, "Valeur par d\xE9faut");
    \u0275\u0275elementEnd();
    \u0275\u0275element(40, "input", 29);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(41, "div")(42, "label", 19);
    \u0275\u0275text(43, "Ordre d'affichage");
    \u0275\u0275elementEnd();
    \u0275\u0275element(44, "input", 30);
    \u0275\u0275elementStart(45, "p", 22);
    \u0275\u0275text(46, "Les champs sont tri\xE9s par ordre croissant");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(47, "div", 31)(48, "p", 32);
    \u0275\u0275text(49, "Comportement");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(50, "div", 33);
    \u0275\u0275repeaterCreate(51, ComponentEditorComponent_Conditional_15_For_52_Template, 4, 2, "label", 34, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275classProp("bg-slate-50", ctx_r0.isEdit);
    \u0275\u0275property("readonly", ctx_r0.isEdit);
    \u0275\u0275advance();
    \u0275\u0275conditional(7, !ctx_r0.isEdit ? 7 : -1);
    \u0275\u0275advance(23);
    \u0275\u0275repeater(ctx_r0.componentTypeOptions);
    \u0275\u0275advance(21);
    \u0275\u0275repeater(ctx_r0.flagFields);
  }
}
function ComponentEditorComponent_Conditional_16_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 43);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.jsonError());
  }
}
function ComponentEditorComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12)(1, "div")(2, "label", 19);
    \u0275\u0275text(3, "Expression R\xE9guli\xE8re (Regex)");
    \u0275\u0275elementEnd();
    \u0275\u0275element(4, "input", 38);
    \u0275\u0275elementStart(5, "p", 22);
    \u0275\u0275text(6, "Appliqu\xE9e c\xF4t\xE9 Angular via Validators.pattern()");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div")(8, "label", 19);
    \u0275\u0275text(9, "Message d'erreur de validation");
    \u0275\u0275elementEnd();
    \u0275\u0275element(10, "input", 39);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div")(12, "label", 19);
    \u0275\u0275text(13, "Pattern d'affichage");
    \u0275\u0275elementEnd();
    \u0275\u0275element(14, "input", 40);
    \u0275\u0275elementStart(15, "p", 22);
    \u0275\u0275text(16, "FCFA ou XOF : formatage mon\xE9taire \xB7 % : pourcentage \xB7 dd/MM/yyyy : date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div")(18, "label", 19);
    \u0275\u0275text(19, "R\xE8gle de visibilit\xE9 (JSON)");
    \u0275\u0275elementEnd();
    \u0275\u0275element(20, "textarea", 41);
    \u0275\u0275elementStart(21, "p", 22);
    \u0275\u0275text(22, " Op\xE9rateurs : ");
    \u0275\u0275elementStart(23, "code", 42);
    \u0275\u0275text(24, "eq \xB7 neq \xB7 in \xB7 notin \xB7 gt \xB7 lt");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(25, ComponentEditorComponent_Conditional_16_Conditional_25_Template, 2, 1, "p", 43);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(20);
    \u0275\u0275property("placeholder", ctx_r0.visibilityPlaceholder);
    \u0275\u0275advance(5);
    \u0275\u0275conditional(25, ctx_r0.jsonError() ? 25 : -1);
  }
}
function ComponentEditorComponent_Conditional_17_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 43);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.optionsJsonError());
  }
}
function ComponentEditorComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12)(1, "div", 44);
    \u0275\u0275text(2, " Utilis\xE9 pour les types ");
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4, "SELECT, MULTISELECT, AUTOCOMPLETE, BADGE, RADIO");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div")(6, "label", 19);
    \u0275\u0275text(7, "Source dynamique (API)");
    \u0275\u0275elementEnd();
    \u0275\u0275element(8, "input", 45);
    \u0275\u0275elementStart(9, "p", 22);
    \u0275\u0275text(10, "Endpoint GET retournant un tableau d'objets (value, label). Priorit\xE9 sur les options statiques.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div")(12, "label", 19);
    \u0275\u0275text(13, "Options statiques (JSON)");
    \u0275\u0275elementEnd();
    \u0275\u0275element(14, "textarea", 46);
    \u0275\u0275template(15, ComponentEditorComponent_Conditional_17_Conditional_15_Template, 2, 1, "p", 43);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(14);
    \u0275\u0275property("placeholder", ctx_r0.optionsPlaceholder);
    \u0275\u0275advance();
    \u0275\u0275conditional(15, ctx_r0.optionsJsonError() ? 15 : -1);
  }
}
var ComponentEditorComponent = class _ComponentEditorComponent {
  constructor() {
    this.component = null;
    this.screenTemplateType = "FORM";
    this.saved = new EventEmitter();
    this.cancelled = new EventEmitter();
    this.fb = inject(FormBuilder);
    this.innerTab = signal("identity");
    this.jsonError = signal("");
    this.optionsJsonError = signal("");
    this.innerTabs = [
      { key: "identity", label: "Identit\xE9 & Comportement" },
      { key: "validation", label: "Validation & Format" },
      { key: "options", label: "Options (SELECT/BADGE)" }
    ];
    this.flagFields = [
      { key: "required", label: "Champ requis *" },
      { key: "visible", label: "Visible" },
      { key: "readonly", label: "Lecture seule" },
      { key: "sortable", label: "Triable (grille)" },
      { key: "filterable", label: "Filtrable (grille)" },
      { key: "gridColumn", label: "Colonne de grille" }
    ];
    this.visibilityPlaceholder = '{"field":"typeInstrument","operator":"eq","value":"OAT"}';
    this.optionsPlaceholder = '[{"value":"OAT","label":"OAT - Obligation Assimilable"},{"value":"OBMO","label":"OBMO"}]';
    this.componentTypeOptions = [
      { group: "Texte & Num\xE9rique", types: [
        { value: "TEXT", label: "TEXT \u2014 Texte libre" },
        { value: "NUMBER", label: "NUMBER \u2014 Nombre" },
        { value: "AMOUNT", label: "AMOUNT \u2014 Montant num\xE9rique" },
        { value: "CURRENCY", label: "CURRENCY \u2014 Montant format\xE9" },
        { value: "EMAIL", label: "EMAIL \u2014 Adresse email" },
        { value: "PASSWORD", label: "PASSWORD \u2014 Mot de passe" },
        { value: "TEXTAREA", label: "TEXTAREA \u2014 Texte long" }
      ] },
      { group: "Listes & S\xE9lection", types: [
        { value: "SELECT", label: "SELECT \u2014 Liste d\xE9roulante" },
        { value: "MULTISELECT", label: "MULTISELECT \u2014 S\xE9lection multiple" },
        { value: "AUTOCOMPLETE", label: "AUTOCOMPLETE \u2014 Recherche dynamique" },
        { value: "RADIO", label: "RADIO \u2014 Boutons radio" }
      ] },
      { group: "Date & Heure", types: [
        { value: "DATE", label: "DATE \u2014 S\xE9lecteur de date" },
        { value: "DATETIME", label: "DATETIME \u2014 Date et heure" },
        { value: "TIME", label: "TIME \u2014 Heure" }
      ] },
      { group: "Bool\xE9ens", types: [
        { value: "CHECKBOX", label: "CHECKBOX \u2014 Case \xE0 cocher" },
        { value: "SWITCH", label: "SWITCH \u2014 Interrupteur" }
      ] },
      { group: "Affichage (grille uniquement)", types: [
        { value: "BADGE", label: "BADGE \u2014 \xC9tiquette color\xE9e" },
        { value: "LINK", label: "LINK \u2014 Lien cliquable" },
        { value: "PROGRESS", label: "PROGRESS \u2014 Barre de progression" },
        { value: "IMAGE", label: "IMAGE \u2014 Vignette image" }
      ] },
      { group: "Fichier", types: [
        { value: "FILE", label: "FILE \u2014 T\xE9l\xE9chargement de fichier" }
      ] }
    ];
  }
  get isEdit() {
    return !!this.component?.componentId;
  }
  ngOnInit() {
    const c = this.component;
    this.form = this.fb.group({
      fieldKey: [
        { value: c?.fieldKey ?? "", disabled: this.isEdit },
        [Validators.required, Validators.pattern("^[a-zA-Z][a-zA-Z0-9_]{1,99}$")]
      ],
      label: [c?.label ?? "", [Validators.required, Validators.maxLength(200)]],
      componentType: [c?.componentType ?? "", Validators.required],
      placeholder: [c?.placeholder ?? ""],
      defaultValue: [c?.defaultValue ?? ""],
      displayOrder: [c?.displayOrder ?? 0, [Validators.min(0)]],
      gridColSpan: [c?.gridColSpan ?? 6, [Validators.required, Validators.min(1), Validators.max(12)]],
      // Flags booléens
      required: [c?.required ?? false],
      readonly: [c?.readonly ?? false],
      visible: [c?.visible ?? true],
      sortable: [c?.sortable ?? true],
      filterable: [c?.filterable ?? false],
      gridColumn: [c?.gridColumn ?? true],
      // Validation
      validationRegex: [c?.validationRegex ?? ""],
      validationMsg: [c?.validationMsg ?? ""],
      formatPattern: [c?.formatPattern ?? ""],
      visibilityRuleRaw: [c?.visibilityExp ?? ""],
      // Options
      optionsSource: [c?.optionsSource ?? ""],
      optionsJsonRaw: [c?.options?.length ? JSON.stringify(c.options, null, 2) : ""]
    });
  }
  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    let options = null;
    const optRaw = this.form.get("optionsJsonRaw")?.value?.trim();
    if (optRaw) {
      try {
        options = JSON.parse(optRaw);
        this.optionsJsonError.set("");
      } catch (e) {
        this.optionsJsonError.set(e instanceof Error ? e.message : "JSON invalide");
        this.innerTab.set("options");
        return;
      }
    }
    const v = this.form.getRawValue();
    const payload = {
      componentId: this.component?.componentId,
      fieldKey: v.fieldKey,
      label: v.label,
      componentType: v.componentType,
      placeholder: v.placeholder || void 0,
      defaultValue: v.defaultValue || void 0,
      required: v.required,
      readonly: v.readonly,
      visible: v.visible,
      sortable: v.sortable,
      filterable: v.filterable,
      gridColumn: v.gridColumn,
      fireOnChange: false,
      displayOrder: v.displayOrder,
      gridColSpan: v.gridColSpan,
      validationRegex: v.validationRegex || void 0,
      validationMsg: v.validationMsg || void 0,
      formatPattern: v.formatPattern || void 0,
      optionsSource: v.optionsSource || void 0,
      options,
      visibilityExp: v.visibilityRuleRaw || void 0
    };
    this.saved.emit(payload);
  }
  static {
    this.\u0275fac = function ComponentEditorComponent_Factory(t) {
      return new (t || _ComponentEditorComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ComponentEditorComponent, selectors: [["app-component-editor"]], inputs: { component: "component", screenTemplateType: "screenTemplateType" }, outputs: { saved: "saved", cancelled: "cancelled" }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 23, vars: 8, consts: [[1, "fixed", "inset-0", "bg-black/30", "z-40", 3, "click"], [1, "fixed", "inset-y-0", "right-0", "w-[480px]", "bg-white", "shadow-2xl", "z-50", "flex", "flex-col", "border-l", "border-slate-200"], [1, "flex", "items-center", "justify-between", "px-5", "py-4", "border-b", "border-slate-200", "bg-slate-50"], [1, "text-sm", "font-semibold", "text-slate-800"], [1, "text-xs", "text-slate-400", "font-mono", "mt-0.5"], [1, "text-slate-400", "hover:text-slate-700", "p-1", "rounded", 3, "click"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", "stroke-width", "2", 1, "w-5", "h-5"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M6 18L18 6M6 6l12 12"], [1, "border-b", "border-slate-200", "px-5", "flex", "gap-1", "bg-white"], [1, "px-3", "py-2", "text-xs", "border-b-2", "transition-colors", 3, "border-blue-600", "text-blue-600", "border-transparent", "text-slate-500"], [1, "flex-1", "overflow-y-auto", 3, "ngSubmit", "formGroup"], [1, "px-5", "py-4", "space-y-4"], [1, "space-y-4"], [1, "px-5", "py-4", "border-t", "border-slate-200", "bg-slate-50", "flex", "justify-end", "gap-3"], ["type", "button", 1, "btn-sec", 3, "click"], ["type", "button", 1, "btn-pri", 3, "click", "disabled"], [1, "px-3", "py-2", "text-xs", "border-b-2", "transition-colors", 3, "click"], [1, "grid", "grid-cols-2", "gap-3"], [1, "col-span-1"], [1, "flabel"], [1, "text-red-500"], ["formControlName", "fieldKey", "type", "text", "placeholder", "nomChamp", 1, "finput", "font-mono", 3, "readonly"], [1, "fhint"], ["formControlName", "gridColSpan", "type", "number", "min", "1", "max", "12", 1, "finput"], ["formControlName", "label", "type", "text", "placeholder", "Code ISIN", 1, "finput"], ["formControlName", "componentType", 1, "finput"], ["value", ""], [3, "label"], ["formControlName", "placeholder", "type", "text", "placeholder", "Saisir une valeur...", 1, "finput"], ["formControlName", "defaultValue", "type", "text", 1, "finput"], ["formControlName", "displayOrder", "type", "number", "min", "0", 1, "finput"], [1, "bg-slate-50", "rounded-lg", "p-3", "space-y-2"], [1, "text-[10px]", "font-semibold", "text-slate-500", "uppercase", "tracking-wide", "mb-2"], [1, "grid", "grid-cols-2", "gap-2"], [1, "flex", "items-center", "gap-2", "cursor-pointer", "group"], [3, "value"], ["type", "checkbox", 1, "w-3.5", "h-3.5", "text-blue-600", "rounded", "border-slate-300", 3, "formControlName"], [1, "text-xs", "text-slate-700", "group-hover:text-slate-900"], ["formControlName", "validationRegex", "type", "text", "placeholder", "^[A-Z]{2}[0-9]{10}$", 1, "finput", "font-mono", "text-xs"], ["formControlName", "validationMsg", "type", "text", "placeholder", "Format invalide (ex: FR0000000000)", 1, "finput"], ["formControlName", "formatPattern", "type", "text", "placeholder", "FCFA \xB7 % \xB7 dd/MM/yyyy", 1, "finput"], ["formControlName", "visibilityRuleRaw", "rows", "3", 1, "finput", "font-mono", "text-xs", "resize-none", 3, "placeholder"], [1, "bg-slate-100", "px-1", "rounded"], [1, "text-[10px]", "text-red-500", "mt-1"], [1, "bg-blue-50", "border", "border-blue-200", "rounded-lg", "p-3", "text-xs", "text-blue-700"], ["formControlName", "optionsSource", "type", "text", "placeholder", "/api/v1/ref/emetteurs/search", 1, "finput", "font-mono", "text-xs"], ["formControlName", "optionsJsonRaw", "rows", "7", 1, "finput", "font-mono", "text-xs", "resize-none", 3, "placeholder"]], template: function ComponentEditorComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275listener("click", function ComponentEditorComponent_Template_div_click_0_listener() {
          return ctx.cancelled.emit();
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(1, "div", 1)(2, "div", 2)(3, "div")(4, "h2", 3);
        \u0275\u0275text(5);
        \u0275\u0275elementEnd();
        \u0275\u0275template(6, ComponentEditorComponent_Conditional_6_Template, 2, 1, "p", 4);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "button", 5);
        \u0275\u0275listener("click", function ComponentEditorComponent_Template_button_click_7_listener() {
          return ctx.cancelled.emit();
        });
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(8, "svg", 6);
        \u0275\u0275element(9, "path", 7);
        \u0275\u0275elementEnd()()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(10, "div", 8);
        \u0275\u0275repeaterCreate(11, ComponentEditorComponent_For_12_Template, 2, 9, "button", 9, _forTrack0);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(13, "form", 10);
        \u0275\u0275listener("ngSubmit", function ComponentEditorComponent_Template_form_ngSubmit_13_listener() {
          return ctx.save();
        });
        \u0275\u0275elementStart(14, "div", 11);
        \u0275\u0275template(15, ComponentEditorComponent_Conditional_15_Template, 53, 4)(16, ComponentEditorComponent_Conditional_16_Template, 26, 2, "div", 12)(17, ComponentEditorComponent_Conditional_17_Template, 16, 2, "div", 12);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(18, "div", 13)(19, "button", 14);
        \u0275\u0275listener("click", function ComponentEditorComponent_Template_button_click_19_listener() {
          return ctx.cancelled.emit();
        });
        \u0275\u0275text(20, "Annuler");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(21, "button", 15);
        \u0275\u0275listener("click", function ComponentEditorComponent_Template_button_click_21_listener() {
          return ctx.save();
        });
        \u0275\u0275text(22);
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate1(" ", ctx.isEdit ? "Modifier le champ" : "Nouveau champ", " ");
        \u0275\u0275advance();
        \u0275\u0275conditional(6, ctx.isEdit ? 6 : -1);
        \u0275\u0275advance(5);
        \u0275\u0275repeater(ctx.innerTabs);
        \u0275\u0275advance(2);
        \u0275\u0275property("formGroup", ctx.form);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(15, ctx.innerTab() === "identity" ? 15 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(16, ctx.innerTab() === "validation" ? 16 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(17, ctx.innerTab() === "options" ? 17 : -1);
        \u0275\u0275advance(4);
        \u0275\u0275property("disabled", ctx.form.invalid);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.isEdit ? "Enregistrer" : "Ajouter le champ", " ");
      }
    }, dependencies: [ReactiveFormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, CheckboxControlValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, MinValidator, MaxValidator, FormGroupDirective, FormControlName], styles: ["\n\n.flabel[_ngcontent-%COMP%] {\n  margin-bottom: 0.25rem;\n  display: block;\n  font-size: 0.75rem;\n  line-height: 1rem;\n  font-weight: 500;\n  --tw-text-opacity: 1;\n  color: rgb(51 65 85 / var(--tw-text-opacity, 1));\n}\n.finput[_ngcontent-%COMP%] {\n  width: 100%;\n  border-radius: 0.5rem;\n  border-width: 1px;\n  --tw-border-opacity: 1;\n  border-color: rgb(203 213 225 / var(--tw-border-opacity, 1));\n  --tw-bg-opacity: 1;\n  background-color: rgb(255 255 255 / var(--tw-bg-opacity, 1));\n  padding-left: 0.75rem;\n  padding-right: 0.75rem;\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem;\n  font-size: 0.75rem;\n  line-height: 1rem;\n  --tw-text-opacity: 1;\n  color: rgb(30 41 59 / var(--tw-text-opacity, 1));\n  transition-property:\n    color,\n    background-color,\n    border-color,\n    text-decoration-color,\n    fill,\n    stroke;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 150ms;\n}\n.finput[_ngcontent-%COMP%]:focus {\n  --tw-border-opacity: 1;\n  border-color: rgb(59 130 246 / var(--tw-border-opacity, 1));\n  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);\n  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);\n  box-shadow:\n    var(--tw-ring-offset-shadow),\n    var(--tw-ring-shadow),\n    var(--tw-shadow, 0 0 #0000);\n  --tw-ring-opacity: 1;\n  --tw-ring-color: rgb(59 130 246 / var(--tw-ring-opacity, 1)) ;\n}\n.fhint[_ngcontent-%COMP%] {\n  margin-top: 0.25rem;\n  font-size: 10px;\n  --tw-text-opacity: 1;\n  color: rgb(148 163 184 / var(--tw-text-opacity, 1));\n}\n.btn-pri[_ngcontent-%COMP%] {\n  border-radius: 0.5rem;\n  --tw-bg-opacity: 1;\n  background-color: rgb(37 99 235 / var(--tw-bg-opacity, 1));\n  padding-left: 1rem;\n  padding-right: 1rem;\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem;\n  font-size: 0.75rem;\n  line-height: 1rem;\n  font-weight: 500;\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity, 1));\n  transition-property:\n    color,\n    background-color,\n    border-color,\n    text-decoration-color,\n    fill,\n    stroke;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 150ms;\n}\n.btn-pri[_ngcontent-%COMP%]:hover {\n  --tw-bg-opacity: 1;\n  background-color: rgb(29 78 216 / var(--tw-bg-opacity, 1));\n}\n.btn-pri[_ngcontent-%COMP%]:disabled {\n  cursor: not-allowed;\n  opacity: 0.5;\n}\n.btn-sec[_ngcontent-%COMP%] {\n  border-radius: 0.5rem;\n  border-width: 1px;\n  --tw-border-opacity: 1;\n  border-color: rgb(203 213 225 / var(--tw-border-opacity, 1));\n  --tw-bg-opacity: 1;\n  background-color: rgb(255 255 255 / var(--tw-bg-opacity, 1));\n  padding-left: 1rem;\n  padding-right: 1rem;\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem;\n  font-size: 0.75rem;\n  line-height: 1rem;\n  font-weight: 500;\n  --tw-text-opacity: 1;\n  color: rgb(51 65 85 / var(--tw-text-opacity, 1));\n  transition-property:\n    color,\n    background-color,\n    border-color,\n    text-decoration-color,\n    fill,\n    stroke;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 150ms;\n}\n.btn-sec[_ngcontent-%COMP%]:hover {\n  --tw-bg-opacity: 1;\n  background-color: rgb(248 250 252 / var(--tw-bg-opacity, 1));\n}\n/*# sourceMappingURL=component-editor.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ComponentEditorComponent, { className: "ComponentEditorComponent", filePath: "src\\app\\features\\admin\\screen-designer\\component-editor\\component-editor.component.ts", lineNumber: 234 });
})();

// src/app/features/admin/screen-designer/screen-designer.component.ts
var _forTrack02 = ($index, $item) => $item.screenId;
var _forTrack12 = ($index, $item) => $item.key;
var _forTrack22 = ($index, $item) => $item.value;
var _forTrack3 = ($index, $item) => $item.componentId;
var _c0 = () => [1, 2, 3, 4, 5];
var _c1 = () => [1, 2, 3];
var _c2 = () => [1, 2, 3, 4, 5, 6, 7, 8];
function ScreenDesignerComponent_Conditional_13_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 18);
  }
}
function ScreenDesignerComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, ScreenDesignerComponent_Conditional_13_For_1_Template, 1, 0, "div", 18, \u0275\u0275repeaterTrackByIndex);
  }
  if (rf & 2) {
    \u0275\u0275repeater(\u0275\u0275pureFunction0(0, _c0));
  }
}
function ScreenDesignerComponent_Conditional_14_For_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 21);
    \u0275\u0275listener("click", function ScreenDesignerComponent_Conditional_14_For_1_Template_button_click_0_listener() {
      const screen_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.selectScreen(screen_r2));
    });
    \u0275\u0275elementStart(1, "div", 22)(2, "span", 23);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 24)(5, "p", 25);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 26);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_11_0;
    let tmp_12_0;
    let tmp_13_0;
    const screen_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("border-blue-600", ((tmp_11_0 = ctx_r2.selectedScreen()) == null ? null : tmp_11_0.screenId) === screen_r2.screenId)("bg-blue-50", ((tmp_12_0 = ctx_r2.selectedScreen()) == null ? null : tmp_12_0.screenId) === screen_r2.screenId)("border-transparent", ((tmp_13_0 = ctx_r2.selectedScreen()) == null ? null : tmp_13_0.screenId) !== screen_r2.screenId);
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r2.templateBadgeClass(screen_r2.templateType));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", screen_r2.templateType.slice(0, 1), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(screen_r2.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(screen_r2.code);
  }
}
function ScreenDesignerComponent_Conditional_14_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 20);
    \u0275\u0275text(1, "Aucun r\xE9sultat");
    \u0275\u0275elementEnd();
  }
}
function ScreenDesignerComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, ScreenDesignerComponent_Conditional_14_For_1_Template, 9, 11, "button", 19, _forTrack02);
    \u0275\u0275template(2, ScreenDesignerComponent_Conditional_14_Conditional_2_Template, 2, 0, "p", 20);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275repeater(ctx_r2.filteredScreens());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(2, ctx_r2.filteredScreens().length === 0 ? 2 : -1);
  }
}
function ScreenDesignerComponent_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 27);
    \u0275\u0275element(2, "path", 28);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(3, "div", 29)(4, "p", 30);
    \u0275\u0275text(5, "S\xE9lectionnez un \xE9cran");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 31);
    \u0275\u0275text(7, "ou cr\xE9ez-en un nouveau depuis la liste \xE0 gauche");
    \u0275\u0275elementEnd()()();
  }
}
function ScreenDesignerComponent_Conditional_22_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 34);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.selectedScreen().code);
  }
}
function ScreenDesignerComponent_Conditional_22_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 42);
    \u0275\u0275listener("click", function ScreenDesignerComponent_Conditional_22_Conditional_5_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.deleteScreen());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 13);
    \u0275\u0275element(2, "path", 43);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " D\xE9sactiver ");
    \u0275\u0275elementEnd();
  }
}
function ScreenDesignerComponent_Conditional_22_For_8_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 45);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.components().length, " ");
  }
}
function ScreenDesignerComponent_Conditional_22_For_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 44);
    \u0275\u0275listener("click", function ScreenDesignerComponent_Conditional_22_For_8_Template_button_click_0_listener() {
      const tab_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.activeTab.set(tab_r6.key));
    });
    \u0275\u0275text(1);
    \u0275\u0275template(2, ScreenDesignerComponent_Conditional_22_For_8_Conditional_2_Template, 2, 1, "span", 45);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tab_r6 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("border-blue-600", ctx_r2.activeTab() === tab_r6.key)("text-blue-600", ctx_r2.activeTab() === tab_r6.key)("border-transparent", ctx_r2.activeTab() !== tab_r6.key)("text-slate-500", ctx_r2.activeTab() !== tab_r6.key)("hover:text-slate-800", ctx_r2.activeTab() !== tab_r6.key);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", tab_r6.label, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(2, tab_r6.key === "fields" && ctx_r2.selectedScreen() ? 2 : -1);
  }
}
function ScreenDesignerComponent_Conditional_22_Conditional_10_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 50);
    \u0275\u0275text(1, "Majuscules, chiffres et underscores uniquement");
    \u0275\u0275elementEnd();
  }
}
function ScreenDesignerComponent_Conditional_22_Conditional_10_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 51);
    \u0275\u0275text(1, "Le code est immuable apr\xE8s cr\xE9ation");
    \u0275\u0275elementEnd();
  }
}
function ScreenDesignerComponent_Conditional_22_Conditional_10_For_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 62);
    \u0275\u0275listener("click", function ScreenDesignerComponent_Conditional_22_Conditional_10_For_16_Template_button_click_0_listener() {
      const tpl_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.screenForm.get("templateType").setValue(tpl_r9.value));
    });
    \u0275\u0275element(1, "div", 63);
    \u0275\u0275elementStart(2, "span", 64);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 65);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_12_0;
    let tmp_13_0;
    let tmp_14_0;
    let tmp_15_0;
    const tpl_r9 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275classMap(((tmp_12_0 = ctx_r2.screenForm.get("templateType")) == null ? null : tmp_12_0.value) === tpl_r9.value ? tpl_r9.selectedClass : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50");
    \u0275\u0275advance();
    \u0275\u0275classMap(((tmp_13_0 = ctx_r2.screenForm.get("templateType")) == null ? null : tmp_13_0.value) === tpl_r9.value ? tpl_r9.iconBg : "bg-slate-100 group-hover:bg-slate-200");
    \u0275\u0275property("innerHTML", ctx_r2.getTemplateIconSvg(tpl_r9.value, ((tmp_14_0 = ctx_r2.screenForm.get("templateType")) == null ? null : tmp_14_0.value) === tpl_r9.value), \u0275\u0275sanitizeHtml);
    \u0275\u0275advance();
    \u0275\u0275classMap(((tmp_15_0 = ctx_r2.screenForm.get("templateType")) == null ? null : tmp_15_0.value) === tpl_r9.value ? tpl_r9.labelColor : "text-slate-600");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", tpl_r9.label, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", tpl_r9.description, " ");
  }
}
function ScreenDesignerComponent_Conditional_22_Conditional_10_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 54);
    \u0275\u0275text(1, "Veuillez s\xE9lectionner un type de template");
    \u0275\u0275elementEnd();
  }
}
function ScreenDesignerComponent_Conditional_22_Conditional_10_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "label", 47);
    \u0275\u0275text(2, "Nom du composant Angular ");
    \u0275\u0275elementStart(3, "span", 48);
    \u0275\u0275text(4, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(5, "input", 66);
    \u0275\u0275elementStart(6, "p", 51);
    \u0275\u0275text(7, " Selector Angular du composant (ex: ");
    \u0275\u0275elementStart(8, "code", 67);
    \u0275\u0275text(9, "app-obligations-chart");
    \u0275\u0275elementEnd();
    \u0275\u0275text(10, ") ");
    \u0275\u0275elementEnd()();
  }
}
function ScreenDesignerComponent_Conditional_22_Conditional_10_Conditional_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 50);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("JSON invalide : ", ctx_r2.jsonError()["permissions"], "");
  }
}
function ScreenDesignerComponent_Conditional_22_Conditional_10_Conditional_42_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 50);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("JSON invalide : ", ctx_r2.jsonError()["gridConfig"], "");
  }
}
function ScreenDesignerComponent_Conditional_22_Conditional_10_Conditional_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "label", 47);
    \u0275\u0275text(2, "Configuration GRID (JSON)");
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "textarea", 68);
    \u0275\u0275template(4, ScreenDesignerComponent_Conditional_22_Conditional_10_Conditional_42_Conditional_4_Template, 2, 1, "p", 50);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(4, ctx_r2.jsonError()["gridConfig"] ? 4 : -1);
  }
}
function ScreenDesignerComponent_Conditional_22_Conditional_10_Conditional_43_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 50);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("JSON invalide : ", ctx_r2.jsonError()["analyticsConfig"], "");
  }
}
function ScreenDesignerComponent_Conditional_22_Conditional_10_Conditional_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "label", 47);
    \u0275\u0275text(2, "Configuration ANALYTICS (JSON)");
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "textarea", 69);
    \u0275\u0275template(4, ScreenDesignerComponent_Conditional_22_Conditional_10_Conditional_43_Conditional_4_Template, 2, 1, "p", 50);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(4, ctx_r2.jsonError()["analyticsConfig"] ? 4 : -1);
  }
}
function ScreenDesignerComponent_Conditional_22_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 46);
    \u0275\u0275listener("ngSubmit", function ScreenDesignerComponent_Conditional_22_Conditional_10_Template_form_ngSubmit_0_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.saveScreen());
    });
    \u0275\u0275elementStart(1, "div")(2, "label", 47);
    \u0275\u0275text(3, "Code technique ");
    \u0275\u0275elementStart(4, "span", 48);
    \u0275\u0275text(5, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(6, "input", 49);
    \u0275\u0275template(7, ScreenDesignerComponent_Conditional_22_Conditional_10_Conditional_7_Template, 2, 0, "p", 50)(8, ScreenDesignerComponent_Conditional_22_Conditional_10_Conditional_8_Template, 2, 0, "p", 51);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div")(10, "label", 47);
    \u0275\u0275text(11, "Type de template ");
    \u0275\u0275elementStart(12, "span", 48);
    \u0275\u0275text(13, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 52);
    \u0275\u0275repeaterCreate(15, ScreenDesignerComponent_Conditional_22_Conditional_10_For_16_Template, 6, 9, "button", 53, _forTrack22);
    \u0275\u0275elementEnd();
    \u0275\u0275template(17, ScreenDesignerComponent_Conditional_22_Conditional_10_Conditional_17_Template, 2, 0, "p", 54);
    \u0275\u0275elementEnd();
    \u0275\u0275template(18, ScreenDesignerComponent_Conditional_22_Conditional_10_Conditional_18_Template, 11, 0, "div");
    \u0275\u0275elementStart(19, "div")(20, "label", 47);
    \u0275\u0275text(21, "Titre affich\xE9 ");
    \u0275\u0275elementStart(22, "span", 48);
    \u0275\u0275text(23, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(24, "input", 55);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "div")(26, "label", 47);
    \u0275\u0275text(27, "Description");
    \u0275\u0275elementEnd();
    \u0275\u0275element(28, "textarea", 56);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "div")(30, "label", 47);
    \u0275\u0275text(31, "URL de l'API de donn\xE9es ");
    \u0275\u0275elementStart(32, "span", 48);
    \u0275\u0275text(33, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(34, "input", 57);
    \u0275\u0275elementStart(35, "p", 51);
    \u0275\u0275text(36, " URL relative Spring Boot. GET=liste, POST=cr\xE9er, GET/:id=d\xE9tail, PUT/:id=modifier ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(37, "div")(38, "label", 47);
    \u0275\u0275text(39, "Permissions (JSON)");
    \u0275\u0275elementEnd();
    \u0275\u0275element(40, "textarea", 58);
    \u0275\u0275template(41, ScreenDesignerComponent_Conditional_22_Conditional_10_Conditional_41_Template, 2, 1, "p", 50);
    \u0275\u0275elementEnd();
    \u0275\u0275template(42, ScreenDesignerComponent_Conditional_22_Conditional_10_Conditional_42_Template, 5, 1, "div")(43, ScreenDesignerComponent_Conditional_22_Conditional_10_Conditional_43_Template, 5, 1, "div");
    \u0275\u0275elementStart(44, "div", 59)(45, "button", 60);
    \u0275\u0275listener("click", function ScreenDesignerComponent_Conditional_22_Conditional_10_Template_button_click_45_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.cancelEdit());
    });
    \u0275\u0275text(46, " Annuler ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "button", 61);
    \u0275\u0275text(48);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_8_0;
    let tmp_9_0;
    let tmp_11_0;
    let tmp_12_0;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("formGroup", ctx_r2.screenForm);
    \u0275\u0275advance(6);
    \u0275\u0275classProp("bg-slate-50", ctx_r2.mode() === "edit");
    \u0275\u0275property("readonly", ctx_r2.mode() === "edit");
    \u0275\u0275advance();
    \u0275\u0275conditional(7, ctx_r2.hasError("code", "pattern") ? 7 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(8, ctx_r2.mode() === "edit" ? 8 : -1);
    \u0275\u0275advance(7);
    \u0275\u0275repeater(ctx_r2.templateOptions);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(17, ((tmp_8_0 = ctx_r2.screenForm.get("templateType")) == null ? null : tmp_8_0.invalid) && ((tmp_8_0 = ctx_r2.screenForm.get("templateType")) == null ? null : tmp_8_0.touched) ? 17 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(18, ((tmp_9_0 = ctx_r2.screenForm.get("templateType")) == null ? null : tmp_9_0.value) === "CUSTOM" ? 18 : -1);
    \u0275\u0275advance(23);
    \u0275\u0275conditional(41, ctx_r2.jsonError()["permissions"] ? 41 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(42, ((tmp_11_0 = ctx_r2.screenForm.get("templateType")) == null ? null : tmp_11_0.value) === "GRID" || ((tmp_11_0 = ctx_r2.screenForm.get("templateType")) == null ? null : tmp_11_0.value) === "MASTER_DETAIL" ? 42 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(43, ((tmp_12_0 = ctx_r2.screenForm.get("templateType")) == null ? null : tmp_12_0.value) === "ANALYTICS" ? 43 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r2.screenForm.invalid || ctx_r2.isSaving());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.isSaving() ? "Enregistrement..." : ctx_r2.saveLabel(), " ");
  }
}
function ScreenDesignerComponent_Conditional_22_Conditional_11_Conditional_30_For_1_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 85);
    \u0275\u0275element(1, "div", 86);
    \u0275\u0275elementEnd();
  }
}
function ScreenDesignerComponent_Conditional_22_Conditional_11_Conditional_30_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr");
    \u0275\u0275repeaterCreate(1, ScreenDesignerComponent_Conditional_22_Conditional_11_Conditional_30_For_1_For_2_Template, 2, 0, "td", 85, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275repeater(\u0275\u0275pureFunction0(0, _c2));
  }
}
function ScreenDesignerComponent_Conditional_22_Conditional_11_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, ScreenDesignerComponent_Conditional_22_Conditional_11_Conditional_30_For_1_Template, 3, 1, "tr", null, \u0275\u0275repeaterTrackByIndex);
  }
  if (rf & 2) {
    \u0275\u0275repeater(\u0275\u0275pureFunction0(0, _c1));
  }
}
function ScreenDesignerComponent_Conditional_22_Conditional_11_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 87);
    \u0275\u0275text(2, ' Aucun champ \u2014 cliquez sur "Ajouter un champ" pour commencer ');
    \u0275\u0275elementEnd()();
  }
}
function ScreenDesignerComponent_Conditional_22_Conditional_11_Conditional_32_For_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 89)(1, "td", 90);
    \u0275\u0275text(2, " \u283F ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 91);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 92);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td", 85)(8, "span", 93);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "td", 94)(11, "span");
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "td", 94)(14, "span");
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "td", 94)(17, "span");
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "td", 85)(20, "div", 95)(21, "button", 96);
    \u0275\u0275listener("click", function ScreenDesignerComponent_Conditional_22_Conditional_11_Conditional_32_For_1_Template_button_click_21_listener() {
      const i_r12 = \u0275\u0275restoreView(_r11).$index;
      const ctx_r2 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r2.moveComponent(i_r12, -1));
    });
    \u0275\u0275text(22, "\u2191");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "button", 97);
    \u0275\u0275listener("click", function ScreenDesignerComponent_Conditional_22_Conditional_11_Conditional_32_For_1_Template_button_click_23_listener() {
      const i_r12 = \u0275\u0275restoreView(_r11).$index;
      const ctx_r2 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r2.moveComponent(i_r12, 1));
    });
    \u0275\u0275text(24, "\u2193");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "button", 98);
    \u0275\u0275listener("click", function ScreenDesignerComponent_Conditional_22_Conditional_11_Conditional_32_For_1_Template_button_click_25_listener() {
      const comp_r13 = \u0275\u0275restoreView(_r11).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r2.openComponentEditor(comp_r13));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(26, "svg", 13);
    \u0275\u0275element(27, "path", 99);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(28, "button", 100);
    \u0275\u0275listener("click", function ScreenDesignerComponent_Conditional_22_Conditional_11_Conditional_32_For_1_Template_button_click_28_listener() {
      const comp_r13 = \u0275\u0275restoreView(_r11).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r2.deleteComponent(comp_r13));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(29, "svg", 13);
    \u0275\u0275element(30, "path", 43);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const comp_r13 = ctx.$implicit;
    const i_r12 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275classProp("opacity-50", !comp_r13.visible);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(comp_r13.fieldKey);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(comp_r13.label);
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r2.typeBadgeClass(comp_r13.componentType));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", comp_r13.componentType, " ");
    \u0275\u0275advance(2);
    \u0275\u0275classMap(comp_r13.required ? "text-green-500" : "text-slate-300");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", comp_r13.required ? "\u2713" : "\u2014", " ");
    \u0275\u0275advance(2);
    \u0275\u0275classMap(comp_r13.visible ? "text-green-500" : "text-slate-300");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", comp_r13.visible ? "\u2713" : "\u2014", " ");
    \u0275\u0275advance(2);
    \u0275\u0275classMap(comp_r13.gridColumn ? "text-blue-500" : "text-slate-300");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", comp_r13.gridColumn ? "\u2713" : "\u2014", " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", i_r12 === 0);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", i_r12 === ctx_r2.components().length - 1);
  }
}
function ScreenDesignerComponent_Conditional_22_Conditional_11_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, ScreenDesignerComponent_Conditional_22_Conditional_11_Conditional_32_For_1_Template, 31, 18, "tr", 88, _forTrack3);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275repeater(ctx_r2.components());
  }
}
function ScreenDesignerComponent_Conditional_22_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 40)(1, "div", 70)(2, "p", 71)(3, "span", 72);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, " champs configur\xE9s \u2014 glisser-d\xE9poser pour r\xE9ordonner ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 73);
    \u0275\u0275listener("click", function ScreenDesignerComponent_Conditional_22_Conditional_11_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.openComponentEditor(null));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(7, "svg", 13);
    \u0275\u0275element(8, "path", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275text(9, " Ajouter un champ ");
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(10, "div", 74)(11, "table", 75)(12, "thead")(13, "tr", 76);
    \u0275\u0275element(14, "th", 77);
    \u0275\u0275elementStart(15, "th", 78);
    \u0275\u0275text(16, "Cl\xE9 API");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "th", 78);
    \u0275\u0275text(18, "Libell\xE9");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "th", 78);
    \u0275\u0275text(20, "Type");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "th", 79);
    \u0275\u0275text(22, "Requis");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "th", 79);
    \u0275\u0275text(24, "Visible");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "th", 79);
    \u0275\u0275text(26, "Colonne");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "th", 80);
    \u0275\u0275text(28, "Actions");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(29, "tbody", 81);
    \u0275\u0275template(30, ScreenDesignerComponent_Conditional_22_Conditional_11_Conditional_30_Template, 2, 1)(31, ScreenDesignerComponent_Conditional_22_Conditional_11_Conditional_31_Template, 3, 0)(32, ScreenDesignerComponent_Conditional_22_Conditional_11_Conditional_32_Template, 2, 0);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(33, "div", 82)(34, "p", 83);
    \u0275\u0275text(35, "\u{1F4A1} \xC9quivalent SQL direct :");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "code", 84);
    \u0275\u0275text(37);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_4_0;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.components().length);
    \u0275\u0275advance(26);
    \u0275\u0275conditional(30, ctx_r2.isLoadingComponents() ? 30 : ctx_r2.components().length === 0 ? 31 : 32);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate2("\nINSERT INTO ui_component (screen_id, field_key, label, component_type, is_required, display_order, grid_col_span)\nSELECT screen_id, 'monChamp', 'Mon Libell\xE9', 'TEXT', 'Y', ", (ctx_r2.components().length + 1) * 10, ", 6\nFROM ui_screen WHERE code = '", (tmp_4_0 = ctx_r2.selectedScreen()) == null ? null : tmp_4_0.code, "';");
  }
}
function ScreenDesignerComponent_Conditional_22_Conditional_12_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \u2014 ");
    \u0275\u0275elementStart(1, "span", 101);
    \u0275\u0275text(2, "disponible uniquement pour les templates GRID et MASTER_DETAIL");
    \u0275\u0275elementEnd();
  }
}
function ScreenDesignerComponent_Conditional_22_Conditional_12_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 112);
    \u0275\u0275text(2, ' Aucun bouton \u2014 cliquez sur "Ajouter un bouton" pour commencer ');
    \u0275\u0275elementEnd()();
  }
}
function ScreenDesignerComponent_Conditional_22_Conditional_12_Conditional_30_For_1_For_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 117);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ic_r17 = ctx.$implicit;
    \u0275\u0275property("value", ic_r17);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ic_r17);
  }
}
function ScreenDesignerComponent_Conditional_22_Conditional_12_Conditional_30_For_1_For_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 122);
    \u0275\u0275listener("click", function ScreenDesignerComponent_Conditional_22_Conditional_12_Conditional_30_For_1_For_14_Template_button_click_0_listener() {
      const col_r19 = \u0275\u0275restoreView(_r18).$implicit;
      const i_r16 = \u0275\u0275nextContext().$index;
      const ctx_r2 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r2.updateAction(i_r16, "color", col_r19));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_24_0;
    let tmp_25_0;
    const col_r19 = ctx.$implicit;
    const act_r20 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275classMap(ctx_r2.colorSwatchClass(col_r19));
    \u0275\u0275classProp("border-slate-900", ((tmp_24_0 = act_r20.color) !== null && tmp_24_0 !== void 0 ? tmp_24_0 : "blue") === col_r19)("border-transparent", ((tmp_25_0 = act_r20.color) !== null && tmp_25_0 !== void 0 ? tmp_25_0 : "blue") !== col_r19);
    \u0275\u0275property("title", col_r19);
  }
}
function ScreenDesignerComponent_Conditional_22_Conditional_12_Conditional_30_For_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 89)(1, "td", 113);
    \u0275\u0275text(2, "\u283F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 85)(4, "input", 114);
    \u0275\u0275listener("input", function ScreenDesignerComponent_Conditional_22_Conditional_12_Conditional_30_For_1_Template_input_input_4_listener($event) {
      const i_r16 = \u0275\u0275restoreView(_r15).$index;
      const ctx_r2 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r2.updateAction(i_r16, "key", $event.target.value));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "td", 85)(6, "input", 115);
    \u0275\u0275listener("input", function ScreenDesignerComponent_Conditional_22_Conditional_12_Conditional_30_For_1_Template_input_input_6_listener($event) {
      const i_r16 = \u0275\u0275restoreView(_r15).$index;
      const ctx_r2 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r2.updateAction(i_r16, "label", $event.target.value));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "td", 85)(8, "select", 116);
    \u0275\u0275listener("change", function ScreenDesignerComponent_Conditional_22_Conditional_12_Conditional_30_For_1_Template_select_change_8_listener($event) {
      const i_r16 = \u0275\u0275restoreView(_r15).$index;
      const ctx_r2 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r2.updateAction(i_r16, "icon", $event.target.value));
    });
    \u0275\u0275repeaterCreate(9, ScreenDesignerComponent_Conditional_22_Conditional_12_Conditional_30_For_1_For_10_Template, 2, 2, "option", 117, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "td", 85)(12, "div", 118);
    \u0275\u0275repeaterCreate(13, ScreenDesignerComponent_Conditional_22_Conditional_12_Conditional_30_For_1_For_14_Template, 1, 7, "button", 119, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "td", 94)(16, "input", 120);
    \u0275\u0275listener("change", function ScreenDesignerComponent_Conditional_22_Conditional_12_Conditional_30_For_1_Template_input_change_16_listener($event) {
      const i_r16 = \u0275\u0275restoreView(_r15).$index;
      const ctx_r2 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r2.updateAction(i_r16, "confirmRequired", $event.target.checked));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "td", 85)(18, "div", 121)(19, "button", 96);
    \u0275\u0275listener("click", function ScreenDesignerComponent_Conditional_22_Conditional_12_Conditional_30_For_1_Template_button_click_19_listener() {
      const i_r16 = \u0275\u0275restoreView(_r15).$index;
      const ctx_r2 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r2.moveAction(i_r16, -1));
    });
    \u0275\u0275text(20, "\u2191");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "button", 97);
    \u0275\u0275listener("click", function ScreenDesignerComponent_Conditional_22_Conditional_12_Conditional_30_For_1_Template_button_click_21_listener() {
      const i_r16 = \u0275\u0275restoreView(_r15).$index;
      const ctx_r2 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r2.moveAction(i_r16, 1));
    });
    \u0275\u0275text(22, "\u2193");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "button", 100);
    \u0275\u0275listener("click", function ScreenDesignerComponent_Conditional_22_Conditional_12_Conditional_30_For_1_Template_button_click_23_listener() {
      const i_r16 = \u0275\u0275restoreView(_r15).$index;
      const ctx_r2 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r2.removeAction(i_r16));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(24, "svg", 13);
    \u0275\u0275element(25, "path", 43);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    let tmp_18_0;
    const act_r20 = ctx.$implicit;
    const i_r16 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(4);
    \u0275\u0275property("value", act_r20.key);
    \u0275\u0275advance(2);
    \u0275\u0275property("value", act_r20.label);
    \u0275\u0275advance(2);
    \u0275\u0275property("value", act_r20.icon);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.iconPresets);
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r2.actionColors);
    \u0275\u0275advance(3);
    \u0275\u0275property("checked", (tmp_18_0 = act_r20.confirmRequired) !== null && tmp_18_0 !== void 0 ? tmp_18_0 : false);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", i_r16 === 0);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", i_r16 === ctx_r2.gridActions().length - 1);
  }
}
function ScreenDesignerComponent_Conditional_22_Conditional_12_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, ScreenDesignerComponent_Conditional_22_Conditional_12_Conditional_30_For_1_Template, 26, 6, "tr", 89, \u0275\u0275repeaterTrackByIdentity);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275repeater(ctx_r2.gridActions());
  }
}
function ScreenDesignerComponent_Conditional_22_Conditional_12_For_42_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 123);
    \u0275\u0275listener("click", function ScreenDesignerComponent_Conditional_22_Conditional_12_For_42_Template_button_click_0_listener() {
      const comp_r22 = \u0275\u0275restoreView(_r21).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.toggleGridColumn(comp_r22));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const comp_r22 = ctx.$implicit;
    \u0275\u0275classMap(comp_r22.gridColumn ? "bg-blue-50 border-blue-300 text-blue-700 hover:bg-blue-100" : "bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", comp_r22.gridColumn ? "\u2713" : "\u25CB", " ", comp_r22.label, " ");
  }
}
function ScreenDesignerComponent_Conditional_22_Conditional_12_Conditional_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 109);
    \u0275\u0275text(1, "Aucun champ \u2014 ajoutez-en depuis l'onglet Champs");
    \u0275\u0275elementEnd();
  }
}
function ScreenDesignerComponent_Conditional_22_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 40)(1, "div", 70)(2, "p", 71)(3, "span", 72);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, " bouton(s) d'action par ligne ");
    \u0275\u0275template(6, ScreenDesignerComponent_Conditional_22_Conditional_12_Conditional_6_Template, 3, 0, "span", 101);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 73);
    \u0275\u0275listener("click", function ScreenDesignerComponent_Conditional_22_Conditional_12_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.addAction());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(8, "svg", 13);
    \u0275\u0275element(9, "path", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275text(10, " Ajouter un bouton ");
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(11, "div", 74)(12, "table", 75)(13, "thead")(14, "tr", 76);
    \u0275\u0275element(15, "th", 77);
    \u0275\u0275elementStart(16, "th", 78);
    \u0275\u0275text(17, "Cl\xE9");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "th", 78);
    \u0275\u0275text(19, "Libell\xE9");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "th", 78);
    \u0275\u0275text(21, "Ic\xF4ne");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "th", 78);
    \u0275\u0275text(23, "Couleur");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "th", 79);
    \u0275\u0275text(25, "Confirmation");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "th", 80);
    \u0275\u0275text(27, "Actions");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(28, "tbody", 81);
    \u0275\u0275template(29, ScreenDesignerComponent_Conditional_22_Conditional_12_Conditional_29_Template, 3, 0, "tr")(30, ScreenDesignerComponent_Conditional_22_Conditional_12_Conditional_30_Template, 2, 0);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(31, "div", 102)(32, "div", 103)(33, "div")(34, "p", 104);
    \u0275\u0275text(35, "Colonnes affich\xE9es dans la grille");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "p", 105);
    \u0275\u0275text(37, "Activez/d\xE9sactivez les champs visibles comme colonnes");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(38, "span", 106);
    \u0275\u0275text(39);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(40, "div", 107);
    \u0275\u0275repeaterCreate(41, ScreenDesignerComponent_Conditional_22_Conditional_12_For_42_Template, 2, 4, "button", 108, _forTrack3);
    \u0275\u0275template(43, ScreenDesignerComponent_Conditional_22_Conditional_12_Conditional_43_Template, 2, 0, "p", 109);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(44, "div", 110)(45, "button", 111);
    \u0275\u0275listener("click", function ScreenDesignerComponent_Conditional_22_Conditional_12_Template_button_click_45_listener() {
      \u0275\u0275restoreView(_r14);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.persistGridActions());
    });
    \u0275\u0275text(46);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_3_0;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.gridActions().length);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(6, ((tmp_3_0 = ctx_r2.selectedScreen()) == null ? null : tmp_3_0.templateType) !== "GRID" && ((tmp_3_0 = ctx_r2.selectedScreen()) == null ? null : tmp_3_0.templateType) !== "MASTER_DETAIL" ? 6 : -1);
    \u0275\u0275advance(23);
    \u0275\u0275conditional(29, ctx_r2.gridActions().length === 0 ? 29 : 30);
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate2(" ", ctx_r2.gridColumnCount(), " / ", ctx_r2.components().length, " actives ");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.components());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(43, ctx_r2.components().length === 0 ? 43 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r2.isSaving());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.isSaving() ? "Enregistrement..." : "Enregistrer les boutons", " ");
  }
}
function ScreenDesignerComponent_Conditional_22_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 41)(1, "div", 124)(2, "p", 71);
    \u0275\u0275text(3, " Payload retourn\xE9 par ");
    \u0275\u0275elementStart(4, "code", 125);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "button", 126);
    \u0275\u0275listener("click", function ScreenDesignerComponent_Conditional_22_Conditional_13_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r23);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.copyJson());
    });
    \u0275\u0275text(7, " Copier JSON ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "pre", 127);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" GET /api/v1/metadata/screens/", (tmp_2_0 = ctx_r2.selectedScreen()) == null ? null : tmp_2_0.code, " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.previewJson());
  }
}
function ScreenDesignerComponent_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 32)(1, "div")(2, "h1", 33);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, ScreenDesignerComponent_Conditional_22_Conditional_4_Template, 2, 1, "p", 34);
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, ScreenDesignerComponent_Conditional_22_Conditional_5_Template, 4, 0, "button", 35);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 36);
    \u0275\u0275repeaterCreate(7, ScreenDesignerComponent_Conditional_22_For_8_Template, 3, 12, "button", 37, _forTrack12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 38);
    \u0275\u0275template(10, ScreenDesignerComponent_Conditional_22_Conditional_10_Template, 49, 13, "form", 39)(11, ScreenDesignerComponent_Conditional_22_Conditional_11_Template, 38, 4, "div", 40)(12, ScreenDesignerComponent_Conditional_22_Conditional_12_Template, 47, 8, "div", 40)(13, ScreenDesignerComponent_Conditional_22_Conditional_13_Template, 10, 2, "div", 41);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_1_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r2.mode() === "create" ? "+ Nouvel \xE9cran" : (tmp_1_0 = ctx_r2.selectedScreen()) == null ? null : tmp_1_0.title, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(4, ctx_r2.selectedScreen() && ctx_r2.mode() === "edit" ? 4 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(5, ctx_r2.mode() === "edit" && ctx_r2.selectedScreen() ? 5 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.tabs);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(10, ctx_r2.activeTab() === "general" ? 10 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(11, ctx_r2.activeTab() === "fields" ? 11 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(12, ctx_r2.activeTab() === "actions" ? 12 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(13, ctx_r2.activeTab() === "preview" ? 13 : -1);
  }
}
function ScreenDesignerComponent_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r24 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-component-editor", 128);
    \u0275\u0275listener("saved", function ScreenDesignerComponent_Conditional_23_Template_app_component_editor_saved_0_listener($event) {
      \u0275\u0275restoreView(_r24);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onComponentSaved($event));
    })("cancelled", function ScreenDesignerComponent_Conditional_23_Template_app_component_editor_cancelled_0_listener() {
      \u0275\u0275restoreView(_r24);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.componentEditorOpen.set(false));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("component", ctx_r2.editingComponent())("screenTemplateType", (tmp_2_0 = (tmp_2_0 = ctx_r2.selectedScreen()) == null ? null : tmp_2_0.templateType) !== null && tmp_2_0 !== void 0 ? tmp_2_0 : "FORM");
  }
}
var ScreenDesignerComponent = class _ScreenDesignerComponent {
  constructor() {
    this.http = inject(HttpClient);
    this.fb = inject(FormBuilder);
    this.sanitizer = inject(DomSanitizer);
    this.route = inject(ActivatedRoute);
    this.BASE = "/api/v1/designer";
    this.screens = signal([]);
    this.selectedScreen = signal(null);
    this.components = signal([]);
    this.mode = signal("list");
    this.activeTab = signal("general");
    this.searchTerm = signal("");
    this.isLoadingList = signal(false);
    this.isLoadingComponents = signal(false);
    this.isSaving = signal(false);
    this.jsonError = signal({});
    this.componentEditorOpen = signal(false);
    this.editingComponent = signal(null);
    this.filteredScreens = computed(() => {
      const term = this.searchTerm().toLowerCase();
      return this.screens().filter((s) => s.title.toLowerCase().includes(term) || s.code.toLowerCase().includes(term));
    });
    this.previewJson = computed(() => {
      if (!this.selectedScreen())
        return "";
      const dto = __spreadProps(__spreadValues({}, this.selectedScreen()), { components: this.components() });
      return JSON.stringify(dto, null, 2);
    });
    this.tabs = [
      { key: "general", label: "G\xE9n\xE9ral" },
      { key: "fields", label: "Champs" },
      { key: "actions", label: "Boutons" },
      { key: "preview", label: "Aper\xE7u JSON" }
    ];
    this.gridActions = signal([]);
    this.actionColors = ["blue", "amber", "red", "green", "gray"];
    this.iconPresets = [
      "pencil",
      "eye",
      "trash",
      "plus",
      "check",
      "x",
      "download",
      "upload",
      "refresh",
      "play",
      "pause",
      "lock"
    ];
    this.templateOptions = [
      {
        value: "FORM",
        label: "Input",
        description: "Formulaire de saisie",
        iconPath: '<path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>',
        selectedClass: "border-purple-500 bg-purple-50",
        iconBg: "bg-purple-100",
        iconColor: "text-purple-600",
        labelColor: "text-purple-700"
      },
      {
        value: "GRID",
        label: "Grid",
        description: "Tableau + filtres",
        iconPath: '<path stroke-linecap="round" stroke-linejoin="round" d="M3 10h18M3 14h18M10 6h4M10 18h4M3 6h4M3 18h4M17 6h4M17 18h4"/>',
        selectedClass: "border-blue-500 bg-blue-50",
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600",
        labelColor: "text-blue-700"
      },
      {
        value: "MASTER_DETAIL",
        label: "Input + Grid",
        description: "Formulaire + tableau",
        iconPath: '<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 10h16M4 14h8M4 18h8M14 14h6v6h-6v-6z"/>',
        selectedClass: "border-green-500 bg-green-50",
        iconBg: "bg-green-100",
        iconColor: "text-green-600",
        labelColor: "text-green-700"
      },
      {
        value: "ANALYTICS",
        label: "Chart",
        description: "Graphiques & KPIs",
        iconPath: '<path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>',
        selectedClass: "border-amber-500 bg-amber-50",
        iconBg: "bg-amber-100",
        iconColor: "text-amber-600",
        labelColor: "text-amber-700"
      },
      {
        value: "CUSTOM",
        label: "Customized",
        description: "Composant Angular",
        iconPath: '<path stroke-linecap="round" stroke-linejoin="round" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"/>',
        selectedClass: "border-rose-500 bg-rose-50",
        iconBg: "bg-rose-100",
        iconColor: "text-rose-600",
        labelColor: "text-rose-700"
      }
    ];
  }
  ngOnInit() {
    this.buildScreenForm();
    this.loadScreens();
  }
  buildScreenForm() {
    this.screenForm = this.fb.group({
      code: ["", [Validators.required, Validators.pattern("^[A-Z0-9_]{3,50}$")]],
      title: ["", [Validators.required, Validators.maxLength(200)]],
      description: [""],
      templateType: ["", Validators.required],
      apiBaseUrl: ["", [Validators.required, Validators.maxLength(500)]],
      permissionsRaw: [""],
      gridConfigRaw: [""],
      analyticsConfigRaw: [""],
      customComponentName: [""]
    });
  }
  // ─── CRUD Screens ──────────────────────────────────────────
  loadScreens() {
    this.isLoadingList.set(true);
    this.http.get(`${this.BASE}/screens`).subscribe({
      next: (list) => {
        this.screens.set(list);
        this.isLoadingList.set(false);
        this.autoSelectFromQueryParam();
      },
      error: () => this.isLoadingList.set(false)
    });
  }
  autoSelectFromQueryParam() {
    const code = this.route.snapshot.queryParamMap.get("screenCode");
    if (!code)
      return;
    const match = this.screens().find((s) => s.code === code);
    if (match)
      this.selectScreen(match);
  }
  selectScreen(screen) {
    this.selectedScreen.set(screen);
    this.mode.set("edit");
    this.activeTab.set("general");
    this.patchForm(screen);
    this.loadComponents(screen.screenId);
  }
  startCreate() {
    this.selectedScreen.set(null);
    this.mode.set("create");
    this.activeTab.set("general");
    this.screenForm.reset();
    this.screenForm.get("code")?.enable();
    this.components.set([]);
    this.gridActions.set([]);
  }
  saveScreen() {
    if (this.screenForm.invalid) {
      this.screenForm.markAllAsTouched();
      return;
    }
    const errs = {};
    const permissions = this.parseJson("permissionsRaw", errs);
    const gridConfig = this.parseJson("gridConfigRaw", errs);
    const analyticsConfig = this.parseJson("analyticsConfigRaw", errs);
    if (Object.keys(errs).length) {
      this.jsonError.set(errs);
      return;
    }
    this.jsonError.set({});
    const v = this.screenForm.getRawValue();
    this.isSaving.set(true);
    if (this.mode() === "create") {
      this.http.post(`${this.BASE}/screens`, {
        code: v.code,
        title: v.title,
        description: v.description,
        templateType: v.templateType,
        apiBaseUrl: v.apiBaseUrl,
        permissions,
        gridConfig,
        analyticsConfig,
        customComponentName: v.templateType === "CUSTOM" ? v.customComponentName : null
      }).subscribe({
        next: (created) => {
          this.screens.update((list) => [...list, created]);
          this.selectedScreen.set(created);
          this.mode.set("edit");
          this.activeTab.set("fields");
          this.isSaving.set(false);
        },
        error: () => this.isSaving.set(false)
      });
    } else {
      const id = this.selectedScreen().screenId;
      this.http.put(`${this.BASE}/screens/${id}`, {
        title: v.title,
        description: v.description,
        templateType: v.templateType,
        apiBaseUrl: v.apiBaseUrl,
        permissions,
        gridConfig,
        analyticsConfig,
        isActive: "Y",
        customComponentName: v.templateType === "CUSTOM" ? v.customComponentName : null
      }).subscribe({
        next: (updated) => {
          this.selectedScreen.set(updated);
          this.screens.update((list) => list.map((s) => s.screenId === id ? updated : s));
          this.isSaving.set(false);
        },
        error: () => this.isSaving.set(false)
      });
    }
  }
  deleteScreen() {
    if (!confirm(`D\xE9sactiver l'\xE9cran "${this.selectedScreen()?.title}" ?`))
      return;
    const id = this.selectedScreen().screenId;
    this.http.delete(`${this.BASE}/screens/${id}`).subscribe(() => {
      this.screens.update((list) => list.filter((s) => s.screenId !== id));
      this.selectedScreen.set(null);
      this.mode.set("list");
    });
  }
  cancelEdit() {
    if (this.mode() === "create") {
      this.mode.set("list");
      this.selectedScreen.set(null);
    } else {
      this.patchForm(this.selectedScreen());
    }
  }
  // ─── CRUD Components ───────────────────────────────────────
  loadComponents(screenId) {
    this.isLoadingComponents.set(true);
    this.http.get(`${this.BASE}/screens/${screenId}/components`).subscribe({
      next: (list) => {
        this.components.set(list);
        this.isLoadingComponents.set(false);
      },
      error: () => this.isLoadingComponents.set(false)
    });
  }
  openComponentEditor(comp) {
    this.editingComponent.set(comp);
    this.componentEditorOpen.set(true);
  }
  onComponentSaved(comp) {
    const screenId = this.selectedScreen().screenId;
    const isExisting = !!comp.componentId;
    const url = isExisting ? `${this.BASE}/screens/${screenId}/components/${comp.componentId}` : `${this.BASE}/screens/${screenId}/components`;
    const body = __spreadValues({}, comp);
    const req$ = isExisting ? this.http.put(url, body) : this.http.post(url, body);
    req$.subscribe((saved) => {
      if (isExisting) {
        this.components.update((list) => list.map((c) => c.componentId === saved.componentId ? saved : c));
      } else {
        this.components.update((list) => [...list, saved]);
      }
      this.componentEditorOpen.set(false);
    });
  }
  deleteComponent(comp) {
    if (!confirm(`Supprimer d\xE9finitivement le champ "${comp.label}" ?`))
      return;
    const screenId = this.selectedScreen().screenId;
    this.http.delete(`${this.BASE}/screens/${screenId}/components/${comp.componentId}`).subscribe(() => {
      this.components.update((list) => list.filter((c) => c.componentId !== comp.componentId));
    });
  }
  /** Déplace un composant dans la liste et sauvegarde l'ordre */
  moveComponent(index, direction) {
    const list = [...this.components()];
    const swap = index + direction;
    if (swap < 0 || swap >= list.length)
      return;
    [list[index], list[swap]] = [list[swap], list[index]];
    this.components.set(list);
    this.saveOrder(list);
  }
  saveOrder(list) {
    const screenId = this.selectedScreen().screenId;
    const orderedComponentIds = list.map((c) => c.componentId);
    this.http.patch(`${this.BASE}/screens/${screenId}/components/reorder`, { orderedComponentIds }).subscribe();
  }
  copyJson() {
    navigator.clipboard.writeText(this.previewJson());
  }
  // ─── Actions (boutons de grille) ───────────────────────────
  gridColumnCount() {
    return this.components().filter((c) => c.gridColumn).length;
  }
  colorSwatchClass(color) {
    return {
      blue: "bg-blue-500",
      amber: "bg-amber-500",
      red: "bg-red-500",
      green: "bg-green-500",
      gray: "bg-slate-400"
    }[color] ?? "bg-slate-400";
  }
  addAction() {
    const n = this.gridActions().length + 1;
    this.gridActions.update((list) => [...list, {
      key: `action_${n}`,
      label: `Action ${n}`,
      icon: "pencil",
      color: "blue",
      confirmRequired: false
    }]);
  }
  updateAction(index, field, value) {
    this.gridActions.update((list) => {
      const copy = [...list];
      copy[index] = __spreadProps(__spreadValues({}, copy[index]), { [field]: value });
      return copy;
    });
  }
  removeAction(index) {
    this.gridActions.update((list) => list.filter((_, i) => i !== index));
  }
  moveAction(index, direction) {
    const list = [...this.gridActions()];
    const swap = index + direction;
    if (swap < 0 || swap >= list.length)
      return;
    [list[index], list[swap]] = [list[swap], list[index]];
    this.gridActions.set(list);
  }
  /** Synchronise gridActions vers le champ gridConfigRaw puis enregistre l'écran. */
  persistGridActions() {
    const raw = (this.screenForm.get("gridConfigRaw")?.value ?? "").trim();
    let cfg = {};
    if (raw) {
      try {
        cfg = JSON.parse(raw);
      } catch {
        cfg = {};
      }
    }
    cfg["actions"] = this.gridActions();
    this.screenForm.patchValue({ gridConfigRaw: JSON.stringify(cfg, null, 2) });
    this.saveScreen();
  }
  /** Toggle la colonne de grille d'un composant et persiste via PUT. */
  toggleGridColumn(comp) {
    const screenId = this.selectedScreen()?.screenId;
    if (!screenId || !comp.componentId)
      return;
    const updated = __spreadProps(__spreadValues({}, comp), { gridColumn: !comp.gridColumn });
    this.http.put(`${this.BASE}/screens/${screenId}/components/${comp.componentId}`, updated).subscribe((saved) => {
      this.components.update((list) => list.map((c) => c.componentId === saved.componentId ? saved : c));
    });
  }
  // ─── Helpers ───────────────────────────────────────────────
  patchForm(screen) {
    this.screenForm.patchValue({
      code: screen.code,
      title: screen.title,
      description: screen.description ?? "",
      templateType: screen.templateType,
      apiBaseUrl: screen.apiBaseUrl,
      permissionsRaw: "",
      gridConfigRaw: "",
      analyticsConfigRaw: screen.analyticsConfig ? JSON.stringify(screen.analyticsConfig, null, 2) : "",
      customComponentName: ""
    });
    this.screenForm.get("code")?.disable();
    this.gridActions.set([]);
  }
  parseJson(controlName, errors) {
    const raw = (this.screenForm.get(controlName)?.value ?? "").trim();
    if (!raw)
      return null;
    try {
      return JSON.parse(raw);
    } catch (e) {
      const key = controlName.replace("Raw", "");
      errors[key] = e instanceof Error ? e.message : "JSON invalide";
      return null;
    }
  }
  saveLabel() {
    return this.mode() === "create" ? "Cr\xE9er l'\xE9cran" : "Enregistrer";
  }
  hasError(field, error) {
    const ctrl = this.screenForm.get(field);
    return !!(ctrl?.hasError(error) && (ctrl.dirty || ctrl.touched));
  }
  templateBadgeClass(type) {
    const map = {
      GRID: "bg-blue-100 text-blue-700",
      FORM: "bg-purple-100 text-purple-700",
      MASTER_DETAIL: "bg-green-100 text-green-700",
      ANALYTICS: "bg-amber-100 text-amber-700",
      CUSTOM: "bg-rose-100 text-rose-700"
    };
    return map[type] ?? "bg-slate-100 text-slate-600";
  }
  getTemplateIconSvg(value, active) {
    const color = active ? { FORM: "#9333ea", GRID: "#2563eb", MASTER_DETAIL: "#16a34a", ANALYTICS: "#d97706", CUSTOM: "#e11d48" }[value] ?? "#64748b" : "#94a3b8";
    const paths = {
      FORM: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z",
      GRID: "M3 10h18M3 14h18M10 6v12M14 6v12M3 6h18v12H3z",
      MASTER_DETAIL: "M4 5h16v5H4zM4 13h7v6H4zM13 13h7v2h-7zM13 17h5",
      ANALYTICS: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
      CUSTOM: "M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
    };
    const d = paths[value] ?? paths["FORM"];
    const svg = `<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="${d}"/></svg>`;
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }
  typeBadgeClass(type) {
    if (["TEXT", "EMAIL", "PASSWORD", "TEXTAREA"].includes(type))
      return "bg-slate-100 text-slate-600";
    if (["NUMBER", "AMOUNT", "CURRENCY"].includes(type))
      return "bg-blue-50 text-blue-700";
    if (["SELECT", "MULTISELECT", "AUTOCOMPLETE"].includes(type))
      return "bg-purple-50 text-purple-700";
    if (["DATE", "DATETIME", "TIME"].includes(type))
      return "bg-amber-50 text-amber-700";
    if (["CHECKBOX", "RADIO", "SWITCH"].includes(type))
      return "bg-green-50 text-green-700";
    return "bg-slate-50 text-slate-500";
  }
  static {
    this.\u0275fac = function ScreenDesignerComponent_Factory(t) {
      return new (t || _ScreenDesignerComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ScreenDesignerComponent, selectors: [["app-screen-designer"]], hostAttrs: [1, "flex", "h-full", "overflow-hidden"], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 24, vars: 5, consts: [[1, "flex", "h-full", "overflow-hidden"], [1, "w-72", "flex-shrink-0", "border-r", "border-slate-200", "bg-white", "flex", "flex-col"], [1, "px-4", "py-4", "border-b", "border-slate-100"], [1, "text-sm", "font-semibold", "text-slate-700"], [1, "text-xs", "text-slate-400", "mt-0.5"], [1, "px-3", "py-2", "border-b", "border-slate-100"], [1, "relative"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", "stroke-width", "2", 1, "absolute", "left-2.5", "top-1/2", "-translate-y-1/2", "w-3.5", "h-3.5", "text-slate-400"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0"], ["type", "text", "placeholder", "Rechercher un \xE9cran...", 1, "w-full", "pl-8", "pr-3", "py-1.5", "text-xs", "border", "border-slate-200", "rounded-lg", "focus:ring-2", "focus:ring-blue-500", "focus:outline-none", 3, "input", "value"], [1, "flex-1", "overflow-y-auto", "py-1"], [1, "p-3", "border-t", "border-slate-100"], [1, "w-full", "flex", "items-center", "justify-center", "gap-2", "py-2", "px-3", "text-xs", "font-medium", "text-blue-600", "border", "border-blue-200", "rounded-lg", "hover:bg-blue-50", "transition-colors", 3, "click"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", "stroke-width", "2", 1, "w-3.5", "h-3.5"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M12 4v16m8-8H4"], [1, "flex-1", "flex", "flex-col", "overflow-hidden", "bg-slate-50"], [1, "flex-1", "flex", "flex-col", "items-center", "justify-center", "gap-4", "text-slate-400"], [3, "component", "screenTemplateType"], [1, "mx-3", "my-1", "h-12", "bg-slate-100", "rounded-lg", "animate-pulse"], [1, "w-full", "text-left", "px-3", "py-2.5", "mx-0", "flex", "items-start", "gap-2.5", "group", "hover:bg-slate-50", "transition-colors", "border-l-2", 3, "border-blue-600", "bg-blue-50", "border-transparent"], [1, "text-center", "text-xs", "text-slate-400", "py-8"], [1, "w-full", "text-left", "px-3", "py-2.5", "mx-0", "flex", "items-start", "gap-2.5", "group", "hover:bg-slate-50", "transition-colors", "border-l-2", 3, "click"], [1, "flex-shrink-0", "mt-0.5"], [1, "inline-flex", "items-center", "px-1.5", "py-0.5", "rounded", "text-[10px]", "font-bold"], [1, "flex-1", "min-w-0"], [1, "text-xs", "font-semibold", "text-slate-800", "truncate"], [1, "text-[10px]", "text-slate-400", "truncate", "font-mono", "mt-0.5"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-20", "h-20", "text-slate-200"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "1", "d", "M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7"], [1, "text-center"], [1, "text-sm", "font-medium", "text-slate-600"], [1, "text-xs", "mt-1"], [1, "bg-white", "border-b", "border-slate-200", "px-6", "py-3", "flex", "items-center", "justify-between"], [1, "text-sm", "font-semibold", "text-slate-800"], [1, "text-xs", "text-slate-400", "font-mono"], [1, "flex", "items-center", "gap-1.5", "text-xs", "text-red-500", "hover:text-red-700", "hover:bg-red-50", "px-3", "py-1.5", "rounded-lg", "border", "border-transparent", "hover:border-red-200", "transition-all"], [1, "bg-white", "border-b", "border-slate-200", "px-6", "flex", "gap-1"], [1, "px-4", "py-2.5", "text-xs", "font-medium", "border-b-2", "transition-colors", 3, "border-blue-600", "text-blue-600", "border-transparent", "text-slate-500", "hover:text-slate-800"], [1, "flex-1", "overflow-auto", "p-6"], [1, "max-w-2xl", "space-y-5", 3, "formGroup"], [1, "max-w-4xl", "space-y-4"], [1, "max-w-3xl", "space-y-4"], [1, "flex", "items-center", "gap-1.5", "text-xs", "text-red-500", "hover:text-red-700", "hover:bg-red-50", "px-3", "py-1.5", "rounded-lg", "border", "border-transparent", "hover:border-red-200", "transition-all", 3, "click"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"], [1, "px-4", "py-2.5", "text-xs", "font-medium", "border-b-2", "transition-colors", 3, "click"], [1, "ml-1.5", "px-1.5", "py-0.5", "bg-slate-100", "text-slate-600", "rounded-full", "text-[10px]"], [1, "max-w-2xl", "space-y-5", 3, "ngSubmit", "formGroup"], [1, "field-label"], [1, "text-red-500"], ["formControlName", "code", "type", "text", "placeholder", "SCR_MON_ECRAN", 1, "field-input", "font-mono", "uppercase", 3, "readonly"], [1, "field-error"], [1, "text-[10px]", "text-slate-400", "mt-1"], [1, "grid", "grid-cols-5", "gap-2", "mt-1"], ["type", "button", 1, "flex", "flex-col", "items-center", "gap-2", "p-3", "rounded-xl", "border-2", "transition-all", "text-center", "group", 3, "class"], [1, "field-error", "mt-1"], ["formControlName", "title", "type", "text", "placeholder", "Gestion des Obligations", 1, "field-input"], ["formControlName", "description", "rows", "2", "placeholder", "Description fonctionnelle de l'\xE9cran...", 1, "field-input", "resize-none"], ["formControlName", "apiBaseUrl", "type", "text", "placeholder", "/api/v1/marche/obligations", 1, "field-input", "font-mono", "text-xs"], ["formControlName", "permissionsRaw", "rows", "3", "placeholder", '{"read":["ROLE_USER"],"write":["ROLE_TRADER"],"delete":["ROLE_ADMIN"]}', 1, "field-input", "font-mono", "text-xs", "resize-none"], [1, "flex", "justify-end", "gap-3", "pt-2", "border-t", "border-slate-200"], ["type", "button", 1, "btn-secondary", "text-xs", 3, "click"], ["type", "submit", 1, "btn-primary", "text-xs", 3, "disabled"], ["type", "button", 1, "flex", "flex-col", "items-center", "gap-2", "p-3", "rounded-xl", "border-2", "transition-all", "text-center", "group", 3, "click"], [1, "w-8", "h-8", "rounded-lg", "flex", "items-center", "justify-center", "transition-colors", 3, "innerHTML"], [1, "text-[11px]", "font-semibold", "leading-tight"], [1, "text-[9px]", "leading-tight", "text-slate-400", "hidden", "xl:block"], ["formControlName", "customComponentName", "type", "text", "placeholder", "app-mon-composant-custom", 1, "field-input", "font-mono", "text-xs"], [1, "bg-slate-100", "px-1", "rounded"], ["formControlName", "gridConfigRaw", "rows", "4", "placeholder", '{"pageSize":20,"defaultSort":"createdAt","defaultSortDir":"desc","exportFormats":["CSV","EXCEL"]}', 1, "field-input", "font-mono", "text-xs", "resize-none"], ["formControlName", "analyticsConfigRaw", "rows", "6", "placeholder", '{"kpis":[...],"charts":[...]}', 1, "field-input", "font-mono", "text-xs", "resize-none"], [1, "flex", "items-center", "justify-between"], [1, "text-xs", "text-slate-500"], [1, "font-semibold", "text-slate-700"], [1, "btn-primary", "text-xs", "flex", "items-center", "gap-1.5", 3, "click"], [1, "bg-white", "rounded-xl", "border", "border-slate-200", "overflow-hidden"], [1, "w-full", "text-xs"], [1, "bg-slate-50", "border-b", "border-slate-200", "text-left"], [1, "px-3", "py-2.5", "w-8"], [1, "px-3", "py-2.5", "font-semibold", "text-slate-600"], [1, "px-3", "py-2.5", "font-semibold", "text-slate-600", "text-center"], [1, "px-3", "py-2.5", "font-semibold", "text-slate-600", "text-right"], [1, "divide-y", "divide-slate-100"], [1, "bg-amber-50", "border", "border-amber-200", "rounded-lg", "p-4", "text-xs", "text-amber-800"], [1, "font-semibold", "mb-1"], [1, "font-mono", "text-[11px]", "block", "bg-amber-100", "rounded", "p-2", "whitespace-pre-wrap"], [1, "px-3", "py-2.5"], [1, "h-3", "bg-slate-100", "rounded", "animate-pulse"], ["colspan", "8", 1, "px-4", "py-10", "text-center", "text-slate-400"], [1, "hover:bg-slate-50", "transition-colors", "group", 3, "opacity-50"], [1, "hover:bg-slate-50", "transition-colors", "group"], [1, "px-3", "py-2.5", "text-slate-300", "group-hover:text-slate-500", "cursor-grab"], [1, "px-3", "py-2.5", "font-mono", "text-slate-700"], [1, "px-3", "py-2.5", "text-slate-700"], [1, "inline-flex", "px-1.5", "py-0.5", "rounded", "text-[10px]", "font-medium"], [1, "px-3", "py-2.5", "text-center"], [1, "flex", "justify-end", "gap-1", "opacity-0", "group-hover:opacity-100", "transition-opacity"], ["title", "Monter", 1, "p-1", "text-slate-400", "hover:text-slate-700", "rounded", 3, "click", "disabled"], ["title", "Descendre", 1, "p-1", "text-slate-400", "hover:text-slate-700", "rounded", 3, "click", "disabled"], ["title", "Modifier", 1, "p-1", "text-blue-400", "hover:text-blue-700", "hover:bg-blue-50", "rounded", 3, "click"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"], ["title", "Supprimer", 1, "p-1", "text-red-400", "hover:text-red-700", "hover:bg-red-50", "rounded", 3, "click"], [1, "text-amber-600"], [1, "bg-white", "rounded-xl", "border", "border-slate-200", "p-4"], [1, "flex", "items-center", "justify-between", "mb-3"], [1, "text-xs", "font-semibold", "text-slate-700"], [1, "text-[10px]", "text-slate-400", "mt-0.5"], [1, "text-[10px]", "text-slate-500"], [1, "flex", "flex-wrap", "gap-2"], ["type", "button", 1, "px-2.5", "py-1", "rounded-full", "text-[11px]", "font-medium", "border", "transition-all", 3, "class"], [1, "text-[11px]", "text-slate-400"], [1, "flex", "justify-end"], [1, "btn-primary", "text-xs", 3, "click", "disabled"], ["colspan", "7", 1, "px-4", "py-10", "text-center", "text-slate-400"], [1, "px-3", "py-2.5", "text-slate-300"], ["type", "text", 1, "w-28", "px-2", "py-1", "text-xs", "border", "border-slate-200", "rounded", "font-mono", 3, "input", "value"], ["type", "text", 1, "w-36", "px-2", "py-1", "text-xs", "border", "border-slate-200", "rounded", 3, "input", "value"], [1, "px-2", "py-1", "text-xs", "border", "border-slate-200", "rounded", 3, "change", "value"], [3, "value"], [1, "flex", "gap-1"], ["type", "button", 1, "w-5", "h-5", "rounded-full", "border-2", "transition-all", 3, "border-slate-900", "border-transparent", "class", "title"], ["type", "checkbox", 1, "h-4", "w-4", "rounded", 3, "change", "checked"], [1, "flex", "justify-end", "gap-1"], ["type", "button", 1, "w-5", "h-5", "rounded-full", "border-2", "transition-all", 3, "click", "title"], ["type", "button", 1, "px-2.5", "py-1", "rounded-full", "text-[11px]", "font-medium", "border", "transition-all", 3, "click"], [1, "flex", "items-center", "gap-3"], [1, "font-mono", "bg-slate-100", "px-1.5", "py-0.5", "rounded", "text-blue-700"], [1, "text-xs", "text-blue-600", "hover:underline", 3, "click"], [1, "bg-slate-900", "text-green-300", "rounded-xl", "p-5", "text-xs", "overflow-auto", "max-h-[60vh]", "font-mono", "leading-relaxed"], [3, "saved", "cancelled", "component", "screenTemplateType"]], template: function ScreenDesignerComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "aside", 1)(2, "div", 2)(3, "h2", 3);
        \u0275\u0275text(4, "\xC9crans de l'application");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "p", 4);
        \u0275\u0275text(6);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(7, "div", 5)(8, "div", 6);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(9, "svg", 7);
        \u0275\u0275element(10, "path", 8);
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(11, "input", 9);
        \u0275\u0275listener("input", function ScreenDesignerComponent_Template_input_input_11_listener($event) {
          return ctx.searchTerm.set($event.target.value);
        });
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(12, "div", 10);
        \u0275\u0275template(13, ScreenDesignerComponent_Conditional_13_Template, 2, 1)(14, ScreenDesignerComponent_Conditional_14_Template, 3, 1);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(15, "div", 11)(16, "button", 12);
        \u0275\u0275listener("click", function ScreenDesignerComponent_Template_button_click_16_listener() {
          return ctx.startCreate();
        });
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(17, "svg", 13);
        \u0275\u0275element(18, "path", 14);
        \u0275\u0275elementEnd();
        \u0275\u0275text(19, " Nouvel \xC9cran ");
        \u0275\u0275elementEnd()()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(20, "main", 15);
        \u0275\u0275template(21, ScreenDesignerComponent_Conditional_21_Template, 8, 0, "div", 16)(22, ScreenDesignerComponent_Conditional_22_Template, 14, 7);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(23, ScreenDesignerComponent_Conditional_23_Template, 1, 2, "app-component-editor", 17);
      }
      if (rf & 2) {
        \u0275\u0275advance(6);
        \u0275\u0275textInterpolate1("", ctx.screens().length, " \xE9crans configur\xE9s");
        \u0275\u0275advance(5);
        \u0275\u0275property("value", ctx.searchTerm());
        \u0275\u0275advance(2);
        \u0275\u0275conditional(13, ctx.isLoadingList() ? 13 : 14);
        \u0275\u0275advance(8);
        \u0275\u0275conditional(21, ctx.mode() === "list" && !ctx.selectedScreen() ? 21 : 22);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(23, ctx.componentEditorOpen() ? 23 : -1);
      }
    }, dependencies: [ReactiveFormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, ComponentEditorComponent], styles: ["\n\n.field-label[_ngcontent-%COMP%] {\n  margin-bottom: 0.25rem;\n  display: block;\n  font-size: 0.75rem;\n  line-height: 1rem;\n  font-weight: 500;\n  --tw-text-opacity: 1;\n  color: rgb(51 65 85 / var(--tw-text-opacity, 1));\n}\n.field-input[_ngcontent-%COMP%] {\n  width: 100%;\n  border-radius: 0.5rem;\n  border-width: 1px;\n  --tw-border-opacity: 1;\n  border-color: rgb(203 213 225 / var(--tw-border-opacity, 1));\n  --tw-bg-opacity: 1;\n  background-color: rgb(255 255 255 / var(--tw-bg-opacity, 1));\n  padding-left: 0.75rem;\n  padding-right: 0.75rem;\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem;\n  font-size: 0.75rem;\n  line-height: 1rem;\n  --tw-text-opacity: 1;\n  color: rgb(30 41 59 / var(--tw-text-opacity, 1));\n  transition-property:\n    color,\n    background-color,\n    border-color,\n    text-decoration-color,\n    fill,\n    stroke;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 150ms;\n}\n.field-input[_ngcontent-%COMP%]:focus {\n  --tw-border-opacity: 1;\n  border-color: rgb(59 130 246 / var(--tw-border-opacity, 1));\n  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);\n  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);\n  box-shadow:\n    var(--tw-ring-offset-shadow),\n    var(--tw-ring-shadow),\n    var(--tw-shadow, 0 0 #0000);\n  --tw-ring-opacity: 1;\n  --tw-ring-color: rgb(59 130 246 / var(--tw-ring-opacity, 1)) ;\n}\n.field-error[_ngcontent-%COMP%] {\n  margin-top: 0.25rem;\n  font-size: 10px;\n  --tw-text-opacity: 1;\n  color: rgb(239 68 68 / var(--tw-text-opacity, 1));\n}\n.btn-primary[_ngcontent-%COMP%] {\n  border-radius: 0.5rem;\n  --tw-bg-opacity: 1;\n  background-color: rgb(37 99 235 / var(--tw-bg-opacity, 1));\n  padding-left: 1rem;\n  padding-right: 1rem;\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem;\n  font-size: 0.75rem;\n  line-height: 1rem;\n  font-weight: 500;\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity, 1));\n  transition-property:\n    color,\n    background-color,\n    border-color,\n    text-decoration-color,\n    fill,\n    stroke;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 150ms;\n}\n.btn-primary[_ngcontent-%COMP%]:hover {\n  --tw-bg-opacity: 1;\n  background-color: rgb(29 78 216 / var(--tw-bg-opacity, 1));\n}\n.btn-primary[_ngcontent-%COMP%]:disabled {\n  cursor: not-allowed;\n  opacity: 0.5;\n}\n.btn-secondary[_ngcontent-%COMP%] {\n  border-radius: 0.5rem;\n  border-width: 1px;\n  --tw-border-opacity: 1;\n  border-color: rgb(203 213 225 / var(--tw-border-opacity, 1));\n  --tw-bg-opacity: 1;\n  background-color: rgb(255 255 255 / var(--tw-bg-opacity, 1));\n  padding-left: 1rem;\n  padding-right: 1rem;\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem;\n  font-size: 0.75rem;\n  line-height: 1rem;\n  font-weight: 500;\n  --tw-text-opacity: 1;\n  color: rgb(51 65 85 / var(--tw-text-opacity, 1));\n  transition-property:\n    color,\n    background-color,\n    border-color,\n    text-decoration-color,\n    fill,\n    stroke;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 150ms;\n}\n.btn-secondary[_ngcontent-%COMP%]:hover {\n  --tw-bg-opacity: 1;\n  background-color: rgb(248 250 252 / var(--tw-bg-opacity, 1));\n}\n/*# sourceMappingURL=screen-designer.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ScreenDesignerComponent, { className: "ScreenDesignerComponent", filePath: "src\\app\\features\\admin\\screen-designer\\screen-designer.component.ts", lineNumber: 642 });
})();
export {
  ScreenDesignerComponent
};
//# sourceMappingURL=screen-designer.component-DJJ4SOYA.js.map
