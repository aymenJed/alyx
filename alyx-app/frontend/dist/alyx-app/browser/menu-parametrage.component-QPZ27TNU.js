import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
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
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeHtml,
  ɵɵstyleProp,
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

// src/app/features/admin/menu-parametrage/menu-parametrage.component.ts
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.label;
var _c0 = () => [1, 2, 3, 4, 5, 6];
var _c1 = () => [];
function MenuParametrageComponent_Conditional_20_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 15);
  }
}
function MenuParametrageComponent_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, MenuParametrageComponent_Conditional_20_For_1_Template, 1, 0, "div", 15, \u0275\u0275repeaterTrackByIndex);
  }
  if (rf & 2) {
    \u0275\u0275repeater(\u0275\u0275pureFunction0(0, _c0));
  }
}
function MenuParametrageComponent_Conditional_21_For_1_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 25);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const menu_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", menu_r2.childrenCount, " ");
  }
}
function MenuParametrageComponent_Conditional_21_For_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 18)(1, "button", 19);
    \u0275\u0275listener("click", function MenuParametrageComponent_Conditional_21_For_1_Template_button_click_1_listener() {
      const menu_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.selectMenu(menu_r2));
    });
    \u0275\u0275element(2, "span", 20);
    \u0275\u0275elementStart(3, "div", 21)(4, "p", 22);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 23);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 24);
    \u0275\u0275template(9, MenuParametrageComponent_Conditional_21_For_1_Conditional_9_Template, 2, 1, "span", 25);
    \u0275\u0275elementStart(10, "span", 26);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_12_0;
    let tmp_13_0;
    let tmp_14_0;
    const menu_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275styleProp("padding-left", menu_r2.parentId ? 32 : 12, "px");
    \u0275\u0275advance();
    \u0275\u0275classProp("border-blue-500", ((tmp_12_0 = ctx_r2.selectedMenu()) == null ? null : tmp_12_0.id) === menu_r2.id)("bg-blue-50", ((tmp_13_0 = ctx_r2.selectedMenu()) == null ? null : tmp_13_0.id) === menu_r2.id)("border-transparent", ((tmp_14_0 = ctx_r2.selectedMenu()) == null ? null : tmp_14_0.id) !== menu_r2.id);
    \u0275\u0275advance();
    \u0275\u0275property("innerHTML", ctx_r2.getIconSvg(menu_r2.icon), \u0275\u0275sanitizeHtml);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(menu_r2.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(menu_r2.route || menu_r2.code);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(9, menu_r2.childrenCount > 0 ? 9 : -1);
    \u0275\u0275advance();
    \u0275\u0275classMap(menu_r2.isActive === "Y" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", menu_r2.isActive === "Y" ? "ON" : "OFF", " ");
  }
}
function MenuParametrageComponent_Conditional_21_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 17);
    \u0275\u0275text(1, "Aucun menu");
    \u0275\u0275elementEnd();
  }
}
function MenuParametrageComponent_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, MenuParametrageComponent_Conditional_21_For_1_Template, 12, 15, "div", 16, _forTrack0);
    \u0275\u0275template(2, MenuParametrageComponent_Conditional_21_Conditional_2_Template, 2, 0, "p", 17);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275repeater(ctx_r2.filteredMenus());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(2, ctx_r2.filteredMenus().length === 0 && !ctx_r2.isLoading() ? 2 : -1);
  }
}
function MenuParametrageComponent_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 27);
    \u0275\u0275element(2, "path", 28);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(3, "p", 29);
    \u0275\u0275text(4, "S\xE9lectionnez un menu ou cr\xE9ez-en un nouveau");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 30);
    \u0275\u0275listener("click", function MenuParametrageComponent_Conditional_23_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.startCreate());
    });
    \u0275\u0275text(6, " + Nouveau menu ");
    \u0275\u0275elementEnd()();
  }
}
function MenuParametrageComponent_Conditional_24_For_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 40)(1, "p", 41);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 42);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const field_r6 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(field_r6.label);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(field_r6.value || "\u2014");
  }
}
function MenuParametrageComponent_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 13)(1, "div", 31)(2, "div")(3, "h1", 32);
    \u0275\u0275element(4, "span", 33);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 34);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 35)(9, "button", 36);
    \u0275\u0275listener("click", function MenuParametrageComponent_Conditional_24_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggleActive(ctx_r2.selectedMenu()));
    });
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "button", 37);
    \u0275\u0275listener("click", function MenuParametrageComponent_Conditional_24_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.startEdit(ctx_r2.selectedMenu()));
    });
    \u0275\u0275text(12, " Modifier ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "button", 38);
    \u0275\u0275listener("click", function MenuParametrageComponent_Conditional_24_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.confirmDelete(ctx_r2.selectedMenu()));
    });
    \u0275\u0275text(14, " Supprimer ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "div", 39);
    \u0275\u0275repeaterCreate(16, MenuParametrageComponent_Conditional_24_For_17_Template, 5, 2, "div", 40, _forTrack1);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275property("innerHTML", ctx_r2.getIconSvg(ctx_r2.selectedMenu().icon), \u0275\u0275sanitizeHtml);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.selectedMenu().label, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.selectedMenu().code);
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r2.selectedMenu().isActive === "Y" ? "bg-amber-50 text-amber-700 border-amber-300 hover:bg-amber-100" : "bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.selectedMenu().isActive === "Y" ? "D\xE9sactiver" : "Activer", " ");
    \u0275\u0275advance(6);
    \u0275\u0275repeater(ctx_r2.detailFields());
  }
}
function MenuParametrageComponent_Conditional_25_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 48);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.formError(), " ");
  }
}
function MenuParametrageComponent_Conditional_25_For_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 54);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r8 = ctx.$implicit;
    \u0275\u0275property("value", p_r8.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(p_r8.label);
  }
}
function MenuParametrageComponent_Conditional_25_For_61_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 54);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r9 = ctx.$implicit;
    \u0275\u0275property("value", s_r9.code);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", s_r9.label, " (", s_r9.code, ")");
  }
}
function MenuParametrageComponent_Conditional_25_For_75_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 54);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const r_r10 = ctx.$implicit;
    \u0275\u0275property("value", r_r10.code);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(r_r10.label);
  }
}
function MenuParametrageComponent_Conditional_25_Conditional_88_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 70);
    \u0275\u0275element(1, "circle", 71)(2, "path", 72);
    \u0275\u0275elementEnd();
  }
}
function MenuParametrageComponent_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 13)(1, "div", 43)(2, "button", 44);
    \u0275\u0275listener("click", function MenuParametrageComponent_Conditional_25_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.cancelForm());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(3, "svg", 45);
    \u0275\u0275element(4, "path", 46);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(5, "h1", 47);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(7, MenuParametrageComponent_Conditional_25_Conditional_7_Template, 2, 1, "div", 48);
    \u0275\u0275elementStart(8, "form", 49);
    \u0275\u0275listener("ngSubmit", function MenuParametrageComponent_Conditional_25_Template_form_ngSubmit_8_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.submitForm());
    });
    \u0275\u0275elementStart(9, "div", 50)(10, "h3", 51);
    \u0275\u0275text(11, "Hi\xE9rarchie");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div")(13, "label", 52);
    \u0275\u0275text(14, "Menu parent");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "select", 53)(16, "option", 54);
    \u0275\u0275text(17, "\u2014 Aucun (menu racine) \u2014");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(18, MenuParametrageComponent_Conditional_25_For_19_Template, 2, 2, "option", 54, _forTrack0);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(20, "div", 50)(21, "h3", 51);
    \u0275\u0275text(22, "Identit\xE9");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "div", 39)(24, "div")(25, "label", 52);
    \u0275\u0275text(26, "Code ");
    \u0275\u0275elementStart(27, "span", 55);
    \u0275\u0275text(28, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(29, "input", 56);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "div")(31, "label", 52);
    \u0275\u0275text(32, "Libell\xE9 ");
    \u0275\u0275elementStart(33, "span", 55);
    \u0275\u0275text(34, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(35, "input", 57);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(36, "div", 39)(37, "div")(38, "label", 52);
    \u0275\u0275text(39, "Ic\xF4ne (emoji ou classe)");
    \u0275\u0275elementEnd();
    \u0275\u0275element(40, "input", 58);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "div")(42, "label", 52);
    \u0275\u0275text(43, "Ordre d'affichage");
    \u0275\u0275elementEnd();
    \u0275\u0275element(44, "input", 59);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(45, "div", 50)(46, "h3", 51);
    \u0275\u0275text(47, "Navigation");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "div")(49, "label", 52);
    \u0275\u0275text(50, "Route URL");
    \u0275\u0275elementEnd();
    \u0275\u0275element(51, "input", 60);
    \u0275\u0275elementStart(52, "p", 61);
    \u0275\u0275text(53, "Chemin Angular de navigation (ex: /admin/roles)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(54, "div")(55, "label", 52);
    \u0275\u0275text(56, "\xC9cran li\xE9 (Screen Code)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(57, "select", 62)(58, "option", 54);
    \u0275\u0275text(59, "\u2014 Aucun \xE9cran li\xE9 \u2014");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(60, MenuParametrageComponent_Conditional_25_For_61_Template, 2, 3, "option", 54, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(62, "p", 61);
    \u0275\u0275text(63, "Optionnel pour les menus parents");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(64, "div", 50)(65, "h3", 51);
    \u0275\u0275text(66, "S\xE9curit\xE9 & Statut");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(67, "div", 39)(68, "div")(69, "label", 52);
    \u0275\u0275text(70, "R\xF4le requis");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(71, "select", 63)(72, "option", 54);
    \u0275\u0275text(73, "\u2014 Tous les utilisateurs \u2014");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(74, MenuParametrageComponent_Conditional_25_For_75_Template, 2, 2, "option", 54, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(76, "div")(77, "label", 52);
    \u0275\u0275text(78, "Statut");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(79, "select", 64)(80, "option", 65);
    \u0275\u0275text(81, "Actif");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(82, "option", 66);
    \u0275\u0275text(83, "Inactif");
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(84, "div", 67)(85, "button", 68);
    \u0275\u0275listener("click", function MenuParametrageComponent_Conditional_25_Template_button_click_85_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.cancelForm());
    });
    \u0275\u0275text(86, " Annuler ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(87, "button", 69);
    \u0275\u0275template(88, MenuParametrageComponent_Conditional_25_Conditional_88_Template, 3, 0, ":svg:svg", 70);
    \u0275\u0275text(89);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_1_0;
    let tmp_5_0;
    let tmp_6_0;
    let tmp_7_0;
    let tmp_8_0;
    let tmp_9_0;
    let tmp_11_0;
    let tmp_13_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ctx_r2.mode() === "create" ? "Nouveau menu" : "Modifier \u2014 " + ((tmp_1_0 = ctx_r2.selectedMenu()) == null ? null : tmp_1_0.label), " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(7, ctx_r2.formError() ? 7 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("formGroup", ctx_r2.form);
    \u0275\u0275advance(8);
    \u0275\u0275property("value", null);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(((tmp_5_0 = ctx_r2.options()) == null ? null : tmp_5_0.availableParents) || \u0275\u0275pureFunction0(17, _c1));
    \u0275\u0275advance(11);
    \u0275\u0275classProp("border-red-300", ((tmp_6_0 = ctx_r2.form.get("code")) == null ? null : tmp_6_0.invalid) && ((tmp_6_0 = ctx_r2.form.get("code")) == null ? null : tmp_6_0.touched))("border-slate-200", !(((tmp_7_0 = ctx_r2.form.get("code")) == null ? null : tmp_7_0.invalid) && ((tmp_7_0 = ctx_r2.form.get("code")) == null ? null : tmp_7_0.touched)));
    \u0275\u0275advance(6);
    \u0275\u0275classProp("border-red-300", ((tmp_8_0 = ctx_r2.form.get("label")) == null ? null : tmp_8_0.invalid) && ((tmp_8_0 = ctx_r2.form.get("label")) == null ? null : tmp_8_0.touched))("border-slate-200", !(((tmp_9_0 = ctx_r2.form.get("label")) == null ? null : tmp_9_0.invalid) && ((tmp_9_0 = ctx_r2.form.get("label")) == null ? null : tmp_9_0.touched)));
    \u0275\u0275advance(23);
    \u0275\u0275property("value", null);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(((tmp_11_0 = ctx_r2.options()) == null ? null : tmp_11_0.availableScreens) || \u0275\u0275pureFunction0(18, _c1));
    \u0275\u0275advance(12);
    \u0275\u0275property("value", null);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(((tmp_13_0 = ctx_r2.options()) == null ? null : tmp_13_0.availableRoles) || \u0275\u0275pureFunction0(19, _c1));
    \u0275\u0275advance(13);
    \u0275\u0275property("disabled", ctx_r2.form.invalid || ctx_r2.isSaving());
    \u0275\u0275advance();
    \u0275\u0275conditional(88, ctx_r2.isSaving() ? 88 : -1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.mode() === "create" ? "Cr\xE9er le menu" : "Enregistrer", " ");
  }
}
function MenuParametrageComponent_Conditional_26_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 76);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" Attention : ce menu a ", ctx_r2.deleteTarget().childrenCount, " sous-menu(s). ");
  }
}
function MenuParametrageComponent_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 14)(1, "div", 73)(2, "h3", 74);
    \u0275\u0275text(3, "Supprimer ce menu ?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 75)(5, "strong");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275text(7, " sera supprim\xE9 d\xE9finitivement. ");
    \u0275\u0275template(8, MenuParametrageComponent_Conditional_26_Conditional_8_Template, 2, 1, "span", 76);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 77)(10, "button", 78);
    \u0275\u0275listener("click", function MenuParametrageComponent_Conditional_26_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.deleteTarget.set(null));
    });
    \u0275\u0275text(11, " Annuler ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "button", 79);
    \u0275\u0275listener("click", function MenuParametrageComponent_Conditional_26_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.deleteConfirmed());
    });
    \u0275\u0275text(13, " Supprimer ");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r2.deleteTarget().label);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(8, ctx_r2.deleteTarget().childrenCount > 0 ? 8 : -1);
  }
}
var MenuParametrageComponent = class _MenuParametrageComponent {
  constructor() {
    this.http = inject(HttpClient);
    this.fb = inject(FormBuilder);
    this.sanitizer = inject(DomSanitizer);
    this.BASE = "/api/v1/designer/menus";
    this.menus = signal([]);
    this.options = signal(null);
    this.isLoading = signal(false);
    this.isSaving = signal(false);
    this.mode = signal("list");
    this.filterActive = signal("all");
    this.selectedMenu = signal(null);
    this.deleteTarget = signal(null);
    this.formError = signal(null);
    this.flatMenus = computed(() => {
      const flat = [];
      const walk = (items) => {
        for (const m of [...items].sort((a, b) => a.displayOrder - b.displayOrder)) {
          flat.push(m);
          if (m.children?.length)
            walk(m.children);
        }
      };
      walk(this.menus());
      return flat;
    });
    this.filteredMenus = computed(() => {
      const f = this.filterActive();
      return f === "all" ? this.flatMenus() : this.flatMenus().filter((m) => m.isActive === f);
    });
    this.detailFields = computed(() => {
      const m = this.selectedMenu();
      if (!m)
        return [];
      return [
        { label: "Code", value: m.code },
        { label: "Libell\xE9", value: m.label },
        { label: "Route", value: m.route },
        { label: "\xC9cran li\xE9", value: m.screenCode },
        { label: "Menu parent", value: m.parentLabel },
        { label: "Ordre", value: String(m.displayOrder) },
        { label: "R\xF4le requis", value: m.roleRequired },
        { label: "Sous-menus", value: m.childrenCount > 0 ? `${m.childrenCount} enfant(s)` : "Aucun" }
      ];
    });
  }
  ngOnInit() {
    this.buildForm();
    this.loadMenus();
    this.loadOptions();
  }
  buildForm() {
    this.form = this.fb.group({
      parentId: [null],
      code: ["", [Validators.required, Validators.pattern(/^[A-Z0-9_]+$/)]],
      label: ["", Validators.required],
      icon: [""],
      route: [""],
      screenCode: [null],
      displayOrder: [10],
      isActive: ["Y"],
      roleRequired: [null]
    });
  }
  loadMenus() {
    this.isLoading.set(true);
    this.http.get(`${this.BASE}/tree`).subscribe({
      next: (data) => {
        this.menus.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      }
    });
  }
  loadOptions() {
    this.http.get(`${this.BASE}/options`).subscribe({
      next: (data) => this.options.set(data)
    });
  }
  selectMenu(menu) {
    this.selectedMenu.set(menu);
    this.mode.set("list");
    this.formError.set(null);
  }
  startCreate() {
    this.selectedMenu.set(null);
    this.form.reset({ parentId: null, isActive: "Y", displayOrder: 10, screenCode: null, roleRequired: null });
    this.formError.set(null);
    this.mode.set("create");
  }
  startEdit(menu) {
    this.form.patchValue({
      parentId: menu.parentId ?? null,
      code: menu.code,
      label: menu.label,
      icon: menu.icon ?? "",
      route: menu.route ?? "",
      screenCode: menu.screenCode ?? null,
      displayOrder: menu.displayOrder,
      isActive: menu.isActive,
      roleRequired: menu.roleRequired ?? null
    });
    this.formError.set(null);
    this.mode.set("edit");
  }
  cancelForm() {
    this.mode.set("list");
    this.formError.set(null);
  }
  submitForm() {
    if (this.form.invalid)
      return;
    this.isSaving.set(true);
    this.formError.set(null);
    const payload = this.form.value;
    for (const k of ["parentId", "icon", "route", "screenCode", "roleRequired"]) {
      if (payload[k] === "" || payload[k] === "null")
        payload[k] = null;
    }
    const req = this.mode() === "create" ? this.http.post(this.BASE, payload) : this.http.put(`${this.BASE}/${this.selectedMenu().id}`, payload);
    req.subscribe({
      next: (saved) => {
        this.isSaving.set(false);
        this.selectedMenu.set(saved);
        this.mode.set("list");
        this.loadMenus();
        this.loadOptions();
      },
      error: (err) => {
        this.isSaving.set(false);
        this.formError.set(err?.error?.message || "Une erreur est survenue. V\xE9rifiez les donn\xE9es.");
      }
    });
  }
  confirmDelete(menu) {
    this.deleteTarget.set(menu);
  }
  deleteConfirmed() {
    const menu = this.deleteTarget();
    if (!menu)
      return;
    this.http.delete(`${this.BASE}/${menu.id}`).subscribe({
      next: () => {
        this.deleteTarget.set(null);
        this.selectedMenu.set(null);
        this.mode.set("list");
        this.loadMenus();
        this.loadOptions();
      },
      error: (err) => {
        this.deleteTarget.set(null);
        this.formError.set(err?.error?.message || "Suppression impossible (sous-menus existants ?)");
        this.mode.set("list");
      }
    });
  }
  toggleActive(menu) {
    this.http.patch(`${this.BASE}/${menu.id}/toggle`, {}).subscribe({
      next: () => {
        this.loadMenus();
        const updated = __spreadProps(__spreadValues({}, menu), { isActive: menu.isActive === "Y" ? "N" : "Y" });
        this.selectedMenu.set(updated);
      }
    });
  }
  getIconSvg(icon) {
    const icons = {
      "home": '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>',
      "chart-bar": '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>',
      "document-text": '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>',
      "arrow-trending-up": '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"/></svg>',
      "book-open": '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>',
      "building-office-2": '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"/></svg>',
      "cog-6-tooth": '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>',
      "users": '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"/></svg>',
      "presentation-chart-line": '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"/></svg>',
      "arrow-right-left": '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"/></svg>',
      "shield-check": '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-1.5-6.75a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
      "squares-plus": '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 16.5h-9v-9a1.5 1.5 0 011.5-1.5h9a1.5 1.5 0 011.5 1.5v9z"/><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75V19.5a1.5 1.5 0 001.5 1.5h12a1.5 1.5 0 001.5-1.5v-6.75M12 9v6m3-3H9"/></svg>',
      "user-group": '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"/></svg>',
      "document-chart-bar": '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/></svg>',
      "banknotes": '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H15V10.5z"/></svg>'
    };
    const fallback = '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h7"/></svg>';
    const svg = icons[icon ?? ""] ?? fallback;
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }
  static {
    this.\u0275fac = function MenuParametrageComponent_Factory(t) {
      return new (t || _MenuParametrageComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MenuParametrageComponent, selectors: [["app-menu-parametrage"]], hostAttrs: [1, "flex", "flex-col", "h-full"], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 27, vars: 12, consts: [[1, "flex", "h-full", "overflow-hidden"], [1, "w-80", "flex-shrink-0", "border-r", "border-slate-200", "bg-white", "flex", "flex-col"], [1, "px-4", "py-4", "border-b", "border-slate-100", "flex", "items-center", "justify-between"], [1, "text-sm", "font-semibold", "text-slate-700"], [1, "text-xs", "text-slate-400", "mt-0.5"], [1, "flex", "items-center", "gap-1", "px-2.5", "py-1.5", "bg-blue-600", "hover:bg-blue-700", "text-white", "text-xs", "font-medium", "rounded-lg", "transition-colors", 3, "click"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", "stroke-width", "2.5", 1, "w-3.5", "h-3.5"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M12 4v16m8-8H4"], [1, "px-3", "py-2", "border-b", "border-slate-100", "flex", "gap-1"], [1, "flex-1", "text-xs", "py-1", "rounded-md", "font-medium", "transition-colors", 3, "click"], [1, "flex-1", "overflow-y-auto", "py-1"], [1, "flex-1", "overflow-y-auto", "bg-slate-50"], [1, "flex", "flex-col", "items-center", "justify-center", "h-full", "gap-4", "text-slate-400"], [1, "p-6", "max-w-2xl"], [1, "fixed", "inset-0", "bg-black/40", "flex", "items-center", "justify-center", "z-50"], [1, "mx-3", "my-1", "h-11", "bg-slate-100", "rounded-lg", "animate-pulse"], [1, "pr-3", "py-0.5", 3, "padding-left"], [1, "text-center", "text-xs", "text-slate-400", "py-10"], [1, "pr-3", "py-0.5"], [1, "w-full", "text-left", "px-3", "py-2", "flex", "items-center", "gap-2.5", "rounded-lg", "hover:bg-slate-50", "transition-colors", "border", 3, "click"], [1, "flex-shrink-0", "w-4", "h-4", "text-slate-500", 3, "innerHTML"], [1, "flex-1", "min-w-0"], [1, "text-xs", "font-semibold", "text-slate-800", "truncate"], [1, "text-[10px]", "text-slate-400", "font-mono", "truncate"], [1, "flex", "items-center", "gap-1", "flex-shrink-0"], [1, "text-[10px]", "bg-slate-100", "text-slate-500", "rounded", "px-1"], [1, "text-[10px]", "font-bold", "rounded", "px-1"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-14", "h-14", "opacity-30"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "1.5", "d", "M4 6h16M4 12h16M4 18h7"], [1, "text-sm"], [1, "px-4", "py-2", "bg-blue-600", "text-white", "text-sm", "rounded-lg", "hover:bg-blue-700", "transition-colors", 3, "click"], [1, "flex", "items-start", "justify-between", "mb-6"], [1, "text-xl", "font-bold", "text-slate-800", "flex", "items-center", "gap-2"], [1, "w-6", "h-6", "text-slate-600", "flex-shrink-0", 3, "innerHTML"], [1, "text-xs", "text-slate-400", "font-mono", "mt-1"], [1, "flex", "gap-2"], [1, "px-3", "py-1.5", "text-xs", "font-medium", "border", "rounded-lg", "transition-colors", 3, "click"], [1, "px-3", "py-1.5", "text-xs", "font-medium", "bg-blue-600", "text-white", "rounded-lg", "hover:bg-blue-700", "transition-colors", 3, "click"], [1, "px-3", "py-1.5", "text-xs", "font-medium", "bg-red-500", "text-white", "rounded-lg", "hover:bg-red-600", "transition-colors", 3, "click"], [1, "grid", "grid-cols-2", "gap-4"], [1, "bg-white", "rounded-lg", "border", "border-slate-200", "px-4", "py-3"], [1, "text-[10px]", "text-slate-400", "uppercase", "tracking-wide", "font-semibold"], [1, "text-sm", "text-slate-700", "mt-1", "font-medium", "truncate"], [1, "flex", "items-center", "gap-3", "mb-6"], [1, "text-slate-400", "hover:text-slate-600", "transition-colors", 3, "click"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", "stroke-width", "2", 1, "w-5", "h-5"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M10 19l-7-7m0 0l7-7m-7 7h18"], [1, "text-lg", "font-bold", "text-slate-800"], [1, "mb-4", "px-4", "py-3", "bg-red-50", "border", "border-red-200", "rounded-lg", "text-sm", "text-red-700"], [1, "space-y-4", 3, "ngSubmit", "formGroup"], [1, "bg-white", "rounded-lg", "border", "border-slate-200", "p-4", "space-y-4"], [1, "text-xs", "font-semibold", "text-slate-500", "uppercase", "tracking-wide"], [1, "block", "text-xs", "font-medium", "text-slate-600", "mb-1"], ["formControlName", "parentId", 1, "w-full", "px-3", "py-2", "text-sm", "border", "border-slate-200", "rounded-lg", "focus:ring-2", "focus:ring-blue-500", "focus:outline-none", "bg-white"], [3, "value"], [1, "text-red-500"], ["formControlName", "code", "type", "text", "placeholder", "MNU_ROLES", 1, "w-full", "px-3", "py-2", "text-sm", "border", "rounded-lg", "focus:ring-2", "focus:ring-blue-500", "focus:outline-none", "font-mono"], ["formControlName", "label", "type", "text", "placeholder", "Gestion des r\xF4les", 1, "w-full", "px-3", "py-2", "text-sm", "border", "rounded-lg", "focus:ring-2", "focus:ring-blue-500", "focus:outline-none"], ["formControlName", "icon", "type", "text", "placeholder", "\u2699\uFE0F  ou shield", 1, "w-full", "px-3", "py-2", "text-sm", "border", "border-slate-200", "rounded-lg", "focus:ring-2", "focus:ring-blue-500", "focus:outline-none"], ["formControlName", "displayOrder", "type", "number", "min", "0", "placeholder", "10", 1, "w-full", "px-3", "py-2", "text-sm", "border", "border-slate-200", "rounded-lg", "focus:ring-2", "focus:ring-blue-500", "focus:outline-none"], ["formControlName", "route", "type", "text", "placeholder", "/admin/roles", 1, "w-full", "px-3", "py-2", "text-sm", "border", "border-slate-200", "rounded-lg", "focus:ring-2", "focus:ring-blue-500", "focus:outline-none", "font-mono"], [1, "text-[10px]", "text-slate-400", "mt-1"], ["formControlName", "screenCode", 1, "w-full", "px-3", "py-2", "text-sm", "border", "border-slate-200", "rounded-lg", "focus:ring-2", "focus:ring-blue-500", "focus:outline-none", "bg-white"], ["formControlName", "roleRequired", 1, "w-full", "px-3", "py-2", "text-sm", "border", "border-slate-200", "rounded-lg", "focus:ring-2", "focus:ring-blue-500", "focus:outline-none", "bg-white"], ["formControlName", "isActive", 1, "w-full", "px-3", "py-2", "text-sm", "border", "border-slate-200", "rounded-lg", "focus:ring-2", "focus:ring-blue-500", "focus:outline-none", "bg-white"], ["value", "Y"], ["value", "N"], [1, "flex", "items-center", "justify-end", "gap-3", "pt-2"], ["type", "button", 1, "px-4", "py-2", "text-sm", "text-slate-600", "border", "border-slate-300", "rounded-lg", "hover:bg-slate-50", "transition-colors", 3, "click"], ["type", "submit", 1, "px-5", "py-2", "text-sm", "font-medium", "bg-blue-600", "text-white", "rounded-lg", "hover:bg-blue-700", "disabled:opacity-50", "disabled:cursor-not-allowed", "transition-colors", "flex", "items-center", "gap-2", 3, "disabled"], ["fill", "none", "viewBox", "0 0 24 24", 1, "w-4", "h-4", "animate-spin"], ["cx", "12", "cy", "12", "r", "10", "stroke", "currentColor", "stroke-width", "4", 1, "opacity-25"], ["fill", "currentColor", "d", "M4 12a8 8 0 018-8v8z", 1, "opacity-75"], [1, "bg-white", "rounded-xl", "shadow-2xl", "p-6", "max-w-sm", "w-full", "mx-4"], [1, "text-base", "font-bold", "text-slate-800", "mb-2"], [1, "text-sm", "text-slate-500", "mb-6"], [1, "text-red-600", "block", "mt-1"], [1, "flex", "gap-3", "justify-end"], [1, "px-4", "py-2", "text-sm", "border", "border-slate-200", "rounded-lg", "hover:bg-slate-50", 3, "click"], [1, "px-4", "py-2", "text-sm", "bg-red-600", "text-white", "rounded-lg", "hover:bg-red-700", 3, "click"]], template: function MenuParametrageComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "aside", 1)(2, "div", 2)(3, "div")(4, "h2", 3);
        \u0275\u0275text(5, "Menus de l'application");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "p", 4);
        \u0275\u0275text(7);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(8, "button", 5);
        \u0275\u0275listener("click", function MenuParametrageComponent_Template_button_click_8_listener() {
          return ctx.startCreate();
        });
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(9, "svg", 6);
        \u0275\u0275element(10, "path", 7);
        \u0275\u0275elementEnd();
        \u0275\u0275text(11, " Nouveau ");
        \u0275\u0275elementEnd()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(12, "div", 8)(13, "button", 9);
        \u0275\u0275listener("click", function MenuParametrageComponent_Template_button_click_13_listener() {
          return ctx.filterActive.set("all");
        });
        \u0275\u0275text(14, " Tous ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(15, "button", 9);
        \u0275\u0275listener("click", function MenuParametrageComponent_Template_button_click_15_listener() {
          return ctx.filterActive.set("Y");
        });
        \u0275\u0275text(16, " Actifs ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(17, "button", 9);
        \u0275\u0275listener("click", function MenuParametrageComponent_Template_button_click_17_listener() {
          return ctx.filterActive.set("N");
        });
        \u0275\u0275text(18, " Inactifs ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(19, "div", 10);
        \u0275\u0275template(20, MenuParametrageComponent_Conditional_20_Template, 2, 1)(21, MenuParametrageComponent_Conditional_21_Template, 3, 1);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(22, "main", 11);
        \u0275\u0275template(23, MenuParametrageComponent_Conditional_23_Template, 7, 0, "div", 12)(24, MenuParametrageComponent_Conditional_24_Template, 18, 6, "div", 13)(25, MenuParametrageComponent_Conditional_25_Template, 90, 20, "div", 13);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(26, MenuParametrageComponent_Conditional_26_Template, 14, 2, "div", 14);
      }
      if (rf & 2) {
        \u0275\u0275advance(7);
        \u0275\u0275textInterpolate1("", ctx.flatMenus().length, " \xE9l\xE9ments configur\xE9s");
        \u0275\u0275advance(6);
        \u0275\u0275classMap(ctx.filterActive() === "all" ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200");
        \u0275\u0275advance(2);
        \u0275\u0275classMap(ctx.filterActive() === "Y" ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200");
        \u0275\u0275advance(2);
        \u0275\u0275classMap(ctx.filterActive() === "N" ? "bg-red-500 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200");
        \u0275\u0275advance(3);
        \u0275\u0275conditional(20, ctx.isLoading() ? 20 : 21);
        \u0275\u0275advance(3);
        \u0275\u0275conditional(23, ctx.mode() === "list" && !ctx.selectedMenu() ? 23 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(24, ctx.mode() === "list" && ctx.selectedMenu() ? 24 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(25, ctx.mode() === "create" || ctx.mode() === "edit" ? 25 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(26, ctx.deleteTarget() ? 26 : -1);
      }
    }, dependencies: [ReactiveFormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, MinValidator, FormGroupDirective, FormControlName], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MenuParametrageComponent, { className: "MenuParametrageComponent", filePath: "src\\app\\features\\admin\\menu-parametrage\\menu-parametrage.component.ts", lineNumber: 370 });
})();
export {
  MenuParametrageComponent
};
//# sourceMappingURL=menu-parametrage.component-QPZ27TNU.js.map
