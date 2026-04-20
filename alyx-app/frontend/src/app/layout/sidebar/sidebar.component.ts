import {
  Component, OnInit, inject, signal
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MenuService } from '../../core/services/menu.service';
import { AuthService } from '../../core/services/auth.service';
import { MenuNode } from '../../core/models/screen-metadata.model';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <aside
      class="flex flex-col h-screen bg-slate-900 text-slate-100 transition-all duration-300 ease-in-out"
      [class.w-64]="!menuService.isCollapsed()"
      [class.w-16]="menuService.isCollapsed()"
    >
      <!-- Logo / Header -->
      <div class="flex items-center gap-3 px-4 py-5 border-b border-slate-700">
        <div class="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white text-sm">
          A
        </div>
        @if (!menuService.isCollapsed()) {
          <div>
            <span class="font-semibold text-white text-sm">Alyx Bonds</span>
            <p class="text-xs text-slate-400">Marchés Bonds</p>
          </div>
        }
        <button
          class="ml-auto text-slate-400 hover:text-white transition-colors"
          (click)="menuService.toggleCollapsed()"
          [title]="menuService.isCollapsed() ? 'Déplier' : 'Réduire'"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              [attr.d]="menuService.isCollapsed()
                ? 'M13 5l7 7-7 7M5 5l7 7-7 7'
                : 'M11 19l-7-7 7-7m8 14l-7-7 7-7'" />
          </svg>
        </button>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 overflow-y-auto py-4 space-y-1 px-2">
        @if (menuService.isLoading()) {
          <!-- Skeleton loader -->
          @for (_ of [1,2,3,4]; track $index) {
            <div class="h-9 bg-slate-700 rounded-lg animate-pulse mx-1 mb-2"></div>
          }
        } @else {
          @for (node of menuService.menu(); track node.id) {
            <div>
              <!-- Nœud racine (section) -->
              @if (node.children && node.children.length > 0) {
                <button
                  class="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400
                         hover:bg-slate-800 hover:text-slate-100 transition-colors group"
                  (click)="toggleExpanded(node.code)"
                >
                  <span class="flex-shrink-0 w-5 h-5" [innerHTML]="getIconSvg(node.icon)"></span>
                  @if (!menuService.isCollapsed()) {
                    <span class="flex-1 text-left text-sm font-medium">{{ node.label }}</span>
                    <svg class="w-4 h-4 transition-transform duration-200"
                         [class.rotate-90]="isExpanded(node.code)"
                         fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  }
                </button>

                <!-- Sous-menu -->
                @if (isExpanded(node.code) && !menuService.isCollapsed()) {
                  <div class="ml-4 mt-1 space-y-1 border-l border-slate-700 pl-3">
                    @for (child of node.children; track child.id) {
                      @if (child.isActive === 'Y') {
                        <a
                          [routerLink]="child.route"
                          routerLinkActive="bg-blue-600 text-white"
                          [routerLinkActiveOptions]="{ exact: true }"
                          class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm
                                 text-slate-400 hover:bg-slate-800 hover:text-slate-100 transition-colors"
                          (click)="menuService.setActive(child.code)"
                        >
                          <span class="flex-shrink-0 w-4 h-4" [innerHTML]="getIconSvg(child.icon)"></span>
                          <span>{{ child.label }}</span>
                        </a>
                      }
                    }
                  </div>
                }
              } @else if (node.isActive === 'Y') {
                <!-- Lien direct (sans enfants) -->
                <a
                  [routerLink]="node.route"
                  routerLinkActive="bg-blue-600 text-white"
                  class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm
                         text-slate-400 hover:bg-slate-800 hover:text-slate-100 transition-colors"
                  (click)="menuService.setActive(node.code)"
                >
                  <span class="flex-shrink-0 w-5 h-5" [innerHTML]="getIconSvg(node.icon)"></span>
                  @if (!menuService.isCollapsed()) {
                    <span>{{ node.label }}</span>
                  }
                </a>
              }
            </div>
          }
        }
      </nav>

      <!-- Footer utilisateur -->
      <div class="border-t border-slate-700 p-3 flex items-center gap-3">
        <div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold flex-shrink-0">
          {{ initiales() }}
        </div>
        @if (!menuService.isCollapsed()) {
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium truncate">{{ authService.user()?.fullName }}</p>
            <p class="text-xs text-slate-400 truncate">{{ authService.user()?.username }}</p>
          </div>
        }
      </div>
    </aside>
  `,
})
export class SidebarComponent implements OnInit {
  readonly menuService = inject(MenuService);
  readonly authService = inject(AuthService);
  private readonly sanitizer = inject(DomSanitizer);

  private readonly expanded = signal<Set<string>>(new Set(['MNU_REFERENTIEL', 'MNU_TRANSACTION', 'MNU_ADMINISTRATION']));

  ngOnInit(): void {
    this.menuService.loadMenu();
  }

  initiales(): string {
    const name = this.authService.user()?.fullName ?? '';
    return name.split(' ').slice(0, 2).map(w => w[0] ?? '').join('').toUpperCase() || 'U';
  }

  isExpanded(code: string): boolean {
    return this.expanded().has(code);
  }

  toggleExpanded(code: string): void {
    this.expanded.update(set => {
      const next = new Set(set);
      next.has(code) ? next.delete(code) : next.add(code);
      return next;
    });
  }

  /** Retourne un SVG inline sécurisé selon le nom d'icône */
  getIconSvg(icon: string | undefined): SafeHtml {
    const icons: Record<string, string> = {
      'home':                    '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>',
      'chart-bar':               '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>',
      'document-text':           '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>',
      'arrow-trending-up':       '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"/></svg>',
      'book-open':               '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>',
      'building-office-2':       '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"/></svg>',
      'cog-6-tooth':             '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>',
      'users':                   '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"/></svg>',
      'presentation-chart-line': '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"/></svg>',
      'arrow-right-left':       '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"/></svg>',
      'shield-check':           '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-1.5-6.75a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
      'squares-plus':          '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 16.5h-9v-9a1.5 1.5 0 011.5-1.5h9a1.5 1.5 0 011.5 1.5v9z"/><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75V19.5a1.5 1.5 0 001.5 1.5h12a1.5 1.5 0 001.5-1.5v-6.75M12 9v6m3-3H9"/></svg>',
      'user-group':             '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"/></svg>',
      'document-chart-bar':     '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/></svg>',
      'banknotes':              '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H15V10.5z"/></svg>',
    };
    const svg = icons[icon ?? ''] ?? icons['chart-bar'];
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }
}
