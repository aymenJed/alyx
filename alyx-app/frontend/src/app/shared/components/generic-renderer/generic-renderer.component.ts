import {
  Component, OnInit, OnChanges, OnDestroy, Input, inject, signal
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { MetadataService }   from '../../../core/services/metadata.service';
import { ShortcutService }   from '../../../core/services/shortcut.service';
import { MenuService }       from '../../../core/services/menu.service';
import { AuthService }       from '../../../core/services/auth.service';
import { ScreenMetadata, MenuNode } from '../../../core/models/screen-metadata.model';
import { FormGeneratorComponent }       from '../form-generator/form-generator.component';
import { DataGridComponent }            from '../data-grid/data-grid.component';
import { MasterDetailComponent }        from '../master-detail/master-detail.component';
import { AnalyticsDashboardComponent }  from '../analytics-dashboard/analytics-dashboard.component';

/**
 * Composant Hôte — Cœur du moteur Server-Driven UI.
 * Reçoit un code d'écran OU un chemin de route, charge les métadonnées,
 * puis délègue le rendu au template approprié.
 *
 * L'écran est déterminé par:
 * 1. Le paramètre routePath (chemin URL comme /admin/roles)
 * 2. Le menu-item actif qui contient le screenCode
 * 3. La configuration de l'écran dans la base de données
 */
@Component({
  selector: 'app-generic-renderer',
  standalone: true,
  imports: [
    FormGeneratorComponent,
    DataGridComponent,
    MasterDetailComponent,
    AnalyticsDashboardComponent,
  ],
  template: `
    <!-- ── Barre d'information (titre écran) ── -->
    @if (metadata()) {
      <div class="flex items-center gap-2 px-4 py-2 bg-[#2a7fc9] text-white shrink-0">
        <!-- Icône info -->
        <svg class="w-4 h-4 shrink-0 text-white/80" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
        </svg>
        <span class="text-sm font-semibold tracking-wide">{{ metadata()!.title }}</span>
        <div class="flex-1"></div>
        <!-- Favori -->
        <button
          class="flex items-center gap-1 px-2 py-0.5 rounded text-xs text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          (click)="shortcutService.toggleShortcut(metadata()!.code)"
          [title]="shortcutService.isShortcut(metadata()!.code) ? 'Retirer des favoris' : 'Ajouter aux favoris'"
        >
          <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
          </svg>
        </button>
        @if (authService.isAdmin()) {
          <button
            class="flex items-center gap-1 px-2 py-0.5 rounded text-xs text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            (click)="openScreenDesigner()"
            title="Configurer cet écran"
          >
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            Configurer écran
          </button>
        }
      </div>
    }

    <!-- Zone de contenu -->
    <div class="flex-1 overflow-auto bg-[#f0f0f0]">
      @if (isLoading()) {
        <!-- Skeleton -->
        <div class="p-6 space-y-4">
          <div class="h-10 bg-slate-200 rounded-lg animate-pulse w-1/3"></div>
          <div class="h-64 bg-slate-200 rounded-lg animate-pulse"></div>
        </div>
      } @else if (error()) {
        <!-- État d'erreur -->
        <div class="flex flex-col items-center justify-center h-64 gap-4">
          <div class="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
            <svg class="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.999L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16.001c-.77 1.332.192 2.999 1.732 2.999z"/>
            </svg>
          </div>
          <p class="text-slate-600 font-medium">{{ error() }}</p>
        </div>
      } @else if (metadata()) {
        <!-- Délégation au template approprié -->
        @switch (metadata()!.templateType) {
          @case ('FORM') {
            <app-form-generator [metadata]="metadata()!" />
          }
          @case ('GRID') {
            <app-data-grid [metadata]="metadata()!" />
          }
          @case ('MASTER_DETAIL') {
            <app-master-detail [metadata]="metadata()!" />
          }
          @case ('ANALYTICS') {
            <app-analytics-dashboard [metadata]="metadata()!" />
          }
          @default {
            <p class="p-6 text-red-500">Template inconnu: {{ metadata()!.templateType }}</p>
          }
        }
      }
    </div>
  `,
  host: { class: 'flex flex-col h-full' },
})
export class GenericRendererComponent implements OnInit, OnChanges, OnDestroy {
  @Input() screenCode?: string;

  readonly shortcutService = inject(ShortcutService);
  readonly authService = inject(AuthService);
  private readonly metadataService = inject(MetadataService);
  private readonly menuService = inject(MenuService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly metadata  = signal<ScreenMetadata | null>(null);
  readonly isLoading = signal(false);
  readonly error     = signal<string | null>(null);

  private navSub?: Subscription;

  ngOnInit(): void {
    // Charge l'écran initial
    this.loadFromRoute();

    // Réagit à chaque NavigationEnd : Angular réutilise la même instance
    // pour toutes les routes ** donc ngOnInit ne se re-déclenche pas.
    this.navSub = this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe(() => {
      if (!this.screenCode) this.loadFromRoute();
    });
  }

  ngOnChanges(): void {
    if (this.screenCode) {
      this.load(this.screenCode);
    } else {
      this.loadFromRoute();
    }
  }

  ngOnDestroy(): void {
    this.navSub?.unsubscribe();
  }

  /**
   * Ouvre le Screen Designer pré-chargé sur l'écran courant.
   */
  openScreenDesigner(): void {
    const meta = this.metadata();
    if (!meta) return;
    this.router.navigate(['/admin/parametrage'], {
      queryParams: { screenCode: meta.code }
    });
  }

  /**
   * Charge l'écran depuis le chemin de route (URL)
   * Ex: /admin/roles → trouve le menu avec route=/admin/roles → charge SCR_ROLES
   */
  private loadFromRoute(): void {
    // Construire le chemin complet depuis l'URL
    const routePath = this.router.url.replace(/^\//, '');

    if (!routePath) {
      this.error.set('Aucun écran spécifié');
      return;
    }

    this.isLoading.set(true);
    this.error.set(null);

    // Chercher le menu correspondant au chemin
    this.menuService.getMenuTree().subscribe({
      next: (menuTree) => {
        const menuItem = this.findMenuByRoute(menuTree, '/' + routePath);

        if (menuItem && menuItem.screenCode) {
          // Menu trouvé avec un écran lié
          this.load(menuItem.screenCode);
        } else if (menuItem) {
          // Menu trouvé mais sans écran lié (menu parent)
          this.isLoading.set(false);
          this.error.set(`Le menu "${menuItem.label}" n'est pas lié à un écran. Veuillez sélectionner un sous-menu.`);
        } else {
          // Aucun menu trouvé pour ce chemin
          this.isLoading.set(false);
          this.error.set(`Écran introuvable pour le chemin: ${routePath}`);
        }
      },
      error: (err) => {
        this.isLoading.set(false);
        this.error.set('Erreur lors du chargement du menu');
        console.error('Menu load error:', err);
      }
    });
  }

  /**
   * Recherche récursive d'un menu par route
   */
  private findMenuByRoute(menus: MenuNode[], route: string): MenuNode | null {
    for (const menu of menus) {
      if (menu.route === route) {
        return menu;
      }
      if (menu.children && menu.children.length > 0) {
        const found = this.findMenuByRoute(menu.children, route);
        if (found) return found;
      }
    }
    return null;
  }

  /**
   * Charge les métadonnées d'un écran par son code
   */
  private load(code: string): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.metadataService.getScreenMetadata(code).subscribe({
      next: meta => {
        this.metadata.set(meta);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.error.set(`L'écran "${code}" est introuvable ou inaccessible.`);
        console.error('Metadata load error:', err);
      },
    });
  }
}
