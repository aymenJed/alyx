import {
  AuthService
} from "./chunk-WG4XWN2K.js";
import {
  ShortcutService
} from "./chunk-H7NGBKNO.js";
import {
  DomSanitizer,
  MenuService,
  RouterLink,
  RouterLinkActive,
  RouterOutlet
} from "./chunk-Y5NZM7SX.js";
import {
  inject,
  signal,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵattribute,
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
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-JFHKQIVQ.js";
import "./chunk-J4B6MK7R.js";

// src/app/layout/sidebar/sidebar.component.ts
var _forTrack0 = ($index, $item) => $item.id;
var _c0 = () => [1, 2, 3, 4];
var _c1 = () => ({ exact: true });
function SidebarComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "span", 10);
    \u0275\u0275text(2, "Alyx Bonds");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 11);
    \u0275\u0275text(4, "March\xE9s Bonds");
    \u0275\u0275elementEnd()();
  }
}
function SidebarComponent_Conditional_9_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 12);
  }
}
function SidebarComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, SidebarComponent_Conditional_9_For_1_Template, 1, 0, "div", 12, \u0275\u0275repeaterTrackByIndex);
  }
  if (rf & 2) {
    \u0275\u0275repeater(\u0275\u0275pureFunction0(0, _c0));
  }
}
function SidebarComponent_Conditional_10_For_1_Conditional_1_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 16);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 17);
    \u0275\u0275element(3, "path", 18);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const node_r2 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(node_r2.label);
    \u0275\u0275advance();
    \u0275\u0275classProp("rotate-90", ctx_r2.isExpanded(node_r2.code));
  }
}
function SidebarComponent_Conditional_10_For_1_Conditional_1_Conditional_3_For_2_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "a", 20);
    \u0275\u0275listener("click", function SidebarComponent_Conditional_10_For_1_Conditional_1_Conditional_3_For_2_Conditional_0_Template_a_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const child_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r2.menuService.setActive(child_r5.code));
    });
    \u0275\u0275element(1, "span", 21);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const child_r5 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(5);
    \u0275\u0275property("routerLink", child_r5.route)("routerLinkActiveOptions", \u0275\u0275pureFunction0(4, _c1));
    \u0275\u0275advance();
    \u0275\u0275property("innerHTML", ctx_r2.getIconSvg(child_r5.icon), \u0275\u0275sanitizeHtml);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(child_r5.label);
  }
}
function SidebarComponent_Conditional_10_For_1_Conditional_1_Conditional_3_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, SidebarComponent_Conditional_10_For_1_Conditional_1_Conditional_3_For_2_Conditional_0_Template, 4, 5, "a", 19);
  }
  if (rf & 2) {
    const child_r5 = ctx.$implicit;
    \u0275\u0275conditional(0, child_r5.isActive === "Y" ? 0 : -1);
  }
}
function SidebarComponent_Conditional_10_For_1_Conditional_1_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275repeaterCreate(1, SidebarComponent_Conditional_10_For_1_Conditional_1_Conditional_3_For_2_Template, 1, 1, null, null, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const node_r2 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275repeater(node_r2.children);
  }
}
function SidebarComponent_Conditional_10_For_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 13);
    \u0275\u0275listener("click", function SidebarComponent_Conditional_10_For_1_Conditional_1_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const node_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.toggleExpanded(node_r2.code));
    });
    \u0275\u0275element(1, "span", 14);
    \u0275\u0275template(2, SidebarComponent_Conditional_10_For_1_Conditional_1_Conditional_2_Template, 4, 3);
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, SidebarComponent_Conditional_10_For_1_Conditional_1_Conditional_3_Template, 3, 0, "div", 15);
  }
  if (rf & 2) {
    const node_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("innerHTML", ctx_r2.getIconSvg(node_r2.icon), \u0275\u0275sanitizeHtml);
    \u0275\u0275advance();
    \u0275\u0275conditional(2, !ctx_r2.menuService.isCollapsed() ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(3, ctx_r2.isExpanded(node_r2.code) && !ctx_r2.menuService.isCollapsed() ? 3 : -1);
  }
}
function SidebarComponent_Conditional_10_For_1_Conditional_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const node_r2 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(node_r2.label);
  }
}
function SidebarComponent_Conditional_10_For_1_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "a", 22);
    \u0275\u0275listener("click", function SidebarComponent_Conditional_10_For_1_Conditional_2_Template_a_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const node_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.menuService.setActive(node_r2.code));
    });
    \u0275\u0275element(1, "span", 14);
    \u0275\u0275template(2, SidebarComponent_Conditional_10_For_1_Conditional_2_Conditional_2_Template, 2, 1, "span");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const node_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("routerLink", node_r2.route);
    \u0275\u0275advance();
    \u0275\u0275property("innerHTML", ctx_r2.getIconSvg(node_r2.icon), \u0275\u0275sanitizeHtml);
    \u0275\u0275advance();
    \u0275\u0275conditional(2, !ctx_r2.menuService.isCollapsed() ? 2 : -1);
  }
}
function SidebarComponent_Conditional_10_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275template(1, SidebarComponent_Conditional_10_For_1_Conditional_1_Template, 4, 3)(2, SidebarComponent_Conditional_10_For_1_Conditional_2_Template, 3, 3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const node_r2 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional(1, node_r2.children && node_r2.children.length > 0 ? 1 : node_r2.isActive === "Y" ? 2 : -1);
  }
}
function SidebarComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, SidebarComponent_Conditional_10_For_1_Template, 3, 1, "div", null, _forTrack0);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275repeater(ctx_r2.menuService.menu());
  }
}
function SidebarComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9)(1, "p", 23);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 24);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_1_0;
    let tmp_2_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((tmp_1_0 = ctx_r2.authService.user()) == null ? null : tmp_1_0.fullName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((tmp_2_0 = ctx_r2.authService.user()) == null ? null : tmp_2_0.username);
  }
}
var SidebarComponent = class _SidebarComponent {
  constructor() {
    this.menuService = inject(MenuService);
    this.authService = inject(AuthService);
    this.sanitizer = inject(DomSanitizer);
    this.expanded = signal(/* @__PURE__ */ new Set(["MNU_REFERENTIEL", "MNU_TRANSACTION", "MNU_ADMINISTRATION"]));
  }
  ngOnInit() {
    this.menuService.loadMenu();
  }
  initiales() {
    const name = this.authService.user()?.fullName ?? "";
    return name.split(" ").slice(0, 2).map((w) => w[0] ?? "").join("").toUpperCase() || "U";
  }
  isExpanded(code) {
    return this.expanded().has(code);
  }
  toggleExpanded(code) {
    this.expanded.update((set) => {
      const next = new Set(set);
      next.has(code) ? next.delete(code) : next.add(code);
      return next;
    });
  }
  /** Retourne un SVG inline sécurisé selon le nom d'icône */
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
    const svg = icons[icon ?? ""] ?? icons["chart-bar"];
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }
  static {
    this.\u0275fac = function SidebarComponent_Factory(t) {
      return new (t || _SidebarComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SidebarComponent, selectors: [["app-sidebar"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 15, vars: 10, consts: [[1, "flex", "flex-col", "h-screen", "bg-slate-900", "text-slate-100", "transition-all", "duration-300", "ease-in-out"], [1, "flex", "items-center", "gap-3", "px-4", "py-5", "border-b", "border-slate-700"], [1, "flex-shrink-0", "w-8", "h-8", "bg-blue-600", "rounded-lg", "flex", "items-center", "justify-center", "font-bold", "text-white", "text-sm"], [1, "ml-auto", "text-slate-400", "hover:text-white", "transition-colors", 3, "click", "title"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-4", "h-4"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2"], [1, "flex-1", "overflow-y-auto", "py-4", "space-y-1", "px-2"], [1, "border-t", "border-slate-700", "p-3", "flex", "items-center", "gap-3"], [1, "w-8", "h-8", "rounded-full", "bg-blue-600", "flex", "items-center", "justify-center", "text-xs", "font-bold", "flex-shrink-0"], [1, "flex-1", "min-w-0"], [1, "font-semibold", "text-white", "text-sm"], [1, "text-xs", "text-slate-400"], [1, "h-9", "bg-slate-700", "rounded-lg", "animate-pulse", "mx-1", "mb-2"], [1, "w-full", "flex", "items-center", "gap-3", "px-3", "py-2", "rounded-lg", "text-slate-400", "hover:bg-slate-800", "hover:text-slate-100", "transition-colors", "group", 3, "click"], [1, "flex-shrink-0", "w-5", "h-5", 3, "innerHTML"], [1, "ml-4", "mt-1", "space-y-1", "border-l", "border-slate-700", "pl-3"], [1, "flex-1", "text-left", "text-sm", "font-medium"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "w-4", "h-4", "transition-transform", "duration-200"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M9 5l7 7-7 7"], ["routerLinkActive", "bg-blue-600 text-white", 1, "flex", "items-center", "gap-3", "px-3", "py-2", "rounded-lg", "text-sm", "text-slate-400", "hover:bg-slate-800", "hover:text-slate-100", "transition-colors", 3, "routerLink", "routerLinkActiveOptions"], ["routerLinkActive", "bg-blue-600 text-white", 1, "flex", "items-center", "gap-3", "px-3", "py-2", "rounded-lg", "text-sm", "text-slate-400", "hover:bg-slate-800", "hover:text-slate-100", "transition-colors", 3, "click", "routerLink", "routerLinkActiveOptions"], [1, "flex-shrink-0", "w-4", "h-4", 3, "innerHTML"], ["routerLinkActive", "bg-blue-600 text-white", 1, "flex", "items-center", "gap-3", "px-3", "py-2", "rounded-lg", "text-sm", "text-slate-400", "hover:bg-slate-800", "hover:text-slate-100", "transition-colors", 3, "click", "routerLink"], [1, "text-sm", "font-medium", "truncate"], [1, "text-xs", "text-slate-400", "truncate"]], template: function SidebarComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "aside", 0)(1, "div", 1)(2, "div", 2);
        \u0275\u0275text(3, " A ");
        \u0275\u0275elementEnd();
        \u0275\u0275template(4, SidebarComponent_Conditional_4_Template, 5, 0, "div");
        \u0275\u0275elementStart(5, "button", 3);
        \u0275\u0275listener("click", function SidebarComponent_Template_button_click_5_listener() {
          return ctx.menuService.toggleCollapsed();
        });
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(6, "svg", 4);
        \u0275\u0275element(7, "path", 5);
        \u0275\u0275elementEnd()()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(8, "nav", 6);
        \u0275\u0275template(9, SidebarComponent_Conditional_9_Template, 2, 1)(10, SidebarComponent_Conditional_10_Template, 2, 0);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(11, "div", 7)(12, "div", 8);
        \u0275\u0275text(13);
        \u0275\u0275elementEnd();
        \u0275\u0275template(14, SidebarComponent_Conditional_14_Template, 5, 2, "div", 9);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275classProp("w-64", !ctx.menuService.isCollapsed())("w-16", ctx.menuService.isCollapsed());
        \u0275\u0275advance(4);
        \u0275\u0275conditional(4, !ctx.menuService.isCollapsed() ? 4 : -1);
        \u0275\u0275advance();
        \u0275\u0275property("title", ctx.menuService.isCollapsed() ? "D\xE9plier" : "R\xE9duire");
        \u0275\u0275advance(2);
        \u0275\u0275attribute("d", ctx.menuService.isCollapsed() ? "M13 5l7 7-7 7M5 5l7 7-7 7" : "M11 19l-7-7 7-7m8 14l-7-7 7-7");
        \u0275\u0275advance(2);
        \u0275\u0275conditional(9, ctx.menuService.isLoading() ? 9 : 10);
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate1(" ", ctx.initiales(), " ");
        \u0275\u0275advance();
        \u0275\u0275conditional(14, !ctx.menuService.isCollapsed() ? 14 : -1);
      }
    }, dependencies: [RouterLink, RouterLinkActive], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SidebarComponent, { className: "SidebarComponent", filePath: "src\\app\\layout\\sidebar\\sidebar.component.ts", lineNumber: 128 });
})();

// src/app/layout/shortcut-bar/shortcut-bar.component.ts
var _forTrack02 = ($index, $item) => $item.shortcutId;
function ShortcutBarComponent_For_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "a", 2)(1, "span", 4);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 5);
    \u0275\u0275element(3, "path", 6);
    \u0275\u0275elementEnd()();
    \u0275\u0275text(4);
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(5, "button", 7);
    \u0275\u0275listener("click", function ShortcutBarComponent_For_4_Template_button_click_5_listener($event) {
      const shortcut_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.remove($event, shortcut_r2.screenCode));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(6, "svg", 5);
    \u0275\u0275element(7, "path", 8);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const shortcut_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("routerLink", ctx_r2.getRoute(shortcut_r2.screenCode))("title", shortcut_r2.screenTitle);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", shortcut_r2.screenTitle, " ");
  }
}
function ShortcutBarComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 3);
    \u0275\u0275text(1, " Aucun favori \u2014 cliquez sur \u2605 dans un \xE9cran pour en ajouter ");
    \u0275\u0275elementEnd();
  }
}
var ShortcutBarComponent = class _ShortcutBarComponent {
  constructor() {
    this.shortcutService = inject(ShortcutService);
    this.menuService = inject(MenuService);
  }
  ngOnInit() {
    this.shortcutService.loadShortcuts();
  }
  remove(event, screenCode) {
    event.preventDefault();
    event.stopPropagation();
    this.shortcutService.removeShortcut(screenCode);
  }
  /** Retrouve la route Angular d'un screenCode via le menu aplati */
  getRoute(screenCode) {
    const node = this.menuService.flatMenu().find((n) => n.screenCode === screenCode);
    return node?.route ?? `/screen/${screenCode}`;
  }
  static {
    this.\u0275fac = function ShortcutBarComponent_Factory(t) {
      return new (t || _ShortcutBarComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ShortcutBarComponent, selectors: [["app-shortcut-bar"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 6, vars: 1, consts: [[1, "flex", "items-center", "gap-1", "px-4", "py-1.5", "bg-white", "border-b", "border-slate-200"], [1, "text-xs", "text-slate-400", "mr-2", "font-medium", "hidden", "sm:block"], [1, "inline-flex", "items-center", "gap-1.5", "px-2.5", "py-1", "rounded-md", "text-xs", "font-medium", "bg-slate-100", "text-slate-700", "hover:bg-blue-50", "hover:text-blue-700", "border", "border-transparent", "hover:border-blue-200", "transition-all", "group", 3, "routerLink", "title"], [1, "text-xs", "text-slate-400", "italic"], [1, "text-slate-400", "group-hover:text-blue-500"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", "stroke-width", "2", 1, "w-3", "h-3"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"], ["title", "Retirer des favoris", 1, "ml-0.5", "opacity-0", "group-hover:opacity-100", "text-slate-400", "hover:text-red-500", "transition-all", 3, "click"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M6 18L18 6M6 6l12 12"]], template: function ShortcutBarComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "span", 1);
        \u0275\u0275text(2, "Favoris:");
        \u0275\u0275elementEnd();
        \u0275\u0275repeaterCreate(3, ShortcutBarComponent_For_4_Template, 8, 3, "a", 2, _forTrack02);
        \u0275\u0275template(5, ShortcutBarComponent_Conditional_5_Template, 2, 0, "span", 3);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(3);
        \u0275\u0275repeater(ctx.shortcutService.shortcuts());
        \u0275\u0275advance(2);
        \u0275\u0275conditional(5, ctx.shortcutService.shortcuts().length === 0 ? 5 : -1);
      }
    }, dependencies: [RouterLink], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ShortcutBarComponent, { className: "ShortcutBarComponent", filePath: "src\\app\\layout\\shortcut-bar\\shortcut-bar.component.ts", lineNumber: 51 });
})();

// src/app/layout/shell/shell.component.ts
var ShellComponent = class _ShellComponent {
  constructor() {
    this.auth = inject(AuthService);
  }
  initiales() {
    const name = this.auth.user()?.fullName ?? "";
    return name.split(" ").slice(0, 2).map((w) => w[0] ?? "").join("").toUpperCase();
  }
  logout() {
    this.auth.logout();
  }
  static {
    this.\u0275fac = function ShellComponent_Factory(t) {
      return new (t || _ShellComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ShellComponent, selectors: [["app-shell"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 20, vars: 3, consts: [[1, "flex", "h-screen", "overflow-hidden", "bg-slate-50"], [1, "flex", "flex-col", "flex-1", "overflow-hidden"], [1, "flex", "items-center", "justify-between", "px-4", "py-2", "bg-white", "border-b", "border-slate-200", "shadow-sm", "flex-shrink-0"], [1, "flex-1"], [1, "flex", "items-center", "gap-3", "ml-4", "flex-shrink-0"], [1, "text-right", "hidden", "sm:block"], [1, "text-sm", "font-medium", "text-slate-700", "leading-tight"], [1, "text-xs", "text-slate-400", "leading-tight"], [1, "w-8", "h-8", "rounded-full", "bg-blue-600", "flex", "items-center", "justify-center", "text-white", "text-xs", "font-bold", "flex-shrink-0"], ["title", "Se d\xE9connecter", 1, "flex", "items-center", "gap-1.5", "px-3", "py-1.5", "text-xs", "text-slate-500", "hover:text-red-600", "hover:bg-red-50", "rounded-lg", "transition-colors", 3, "click"], ["fill", "none", "stroke", "currentColor", "stroke-width", "2", "viewBox", "0 0 24 24", 1, "w-4", "h-4"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3\n                         0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"], [1, "hidden", "sm:inline"], [1, "flex-1", "overflow-auto"]], template: function ShellComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275element(1, "app-sidebar");
        \u0275\u0275elementStart(2, "div", 1)(3, "header", 2);
        \u0275\u0275element(4, "app-shortcut-bar", 3);
        \u0275\u0275elementStart(5, "div", 4)(6, "div", 5)(7, "p", 6);
        \u0275\u0275text(8);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "p", 7);
        \u0275\u0275text(10);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(11, "div", 8);
        \u0275\u0275text(12);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(13, "button", 9);
        \u0275\u0275listener("click", function ShellComponent_Template_button_click_13_listener() {
          return ctx.logout();
        });
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(14, "svg", 10);
        \u0275\u0275element(15, "path", 11);
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(16, "span", 12);
        \u0275\u0275text(17, "D\xE9connexion");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(18, "main", 13);
        \u0275\u0275element(19, "router-outlet");
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        let tmp_0_0;
        let tmp_1_0;
        \u0275\u0275advance(8);
        \u0275\u0275textInterpolate1(" ", (tmp_0_0 = ctx.auth.user()) == null ? null : tmp_0_0.fullName, " ");
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate1(" ", (tmp_1_0 = ctx.auth.user()) == null ? null : tmp_1_0.username, " ");
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate1(" ", ctx.initiales(), " ");
      }
    }, dependencies: [RouterOutlet, SidebarComponent, ShortcutBarComponent], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ShellComponent, { className: "ShellComponent", filePath: "src\\app\\layout\\shell\\shell.component.ts", lineNumber: 68 });
})();
export {
  ShellComponent
};
//# sourceMappingURL=shell.component-7SVYBZMY.js.map
