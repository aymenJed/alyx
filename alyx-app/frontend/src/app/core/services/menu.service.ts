import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MenuNode, MenuItem } from '../models/screen-metadata.model';

/**
 * Service de navigation — Architecture Signals Angular 17+.
 * État global partagé entre SidebarComponent et tous les composants
 * qui ont besoin d'accéder à l'arbre de menu.
 */
@Injectable({ providedIn: 'root' })
export class MenuService {
  private readonly http = inject(HttpClient);

  // --- État réactif via Signals ---
  readonly menu         = signal<MenuNode[]>([]);
  readonly isLoading    = signal(false);
  readonly isCollapsed  = signal(false);
  readonly activeCode   = signal<string | null>(null);

  /** Aplatit le menu pour recherche rapide par code */
  readonly flatMenu = computed(() => this.flatten(this.menu()));

  clearMenu(): void {
    this.menu.set([]);
  }

  /**
   * Charge l'arbre des menus depuis l'API metadata
   * Endpoint: GET /api/metadata/menu/tree
   */
  loadMenu(): void {
    if (this.menu().length > 0) return; // déjà chargé
    this.isLoading.set(true);
    this.http.get<MenuNode[]>('/api/v1/metadata/menu/tree').subscribe({
      next: nodes => {
        this.menu.set(nodes);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Erreur chargement menu:', err);
        this.isLoading.set(false);
      }
    });
  }

  /**
   * Retourne l'arbre des menus (pour GenericRendererComponent)
   */
  getMenuTree(): import('rxjs').Observable<MenuNode[]> {
    return this.http.get<MenuNode[]>('/api/v1/metadata/menu/tree');
  }

  /**
   * Trouve un menu par son chemin de route
   */
  findByRoute(route: string): MenuItem | null {
    const flat = this.flatMenu();
    return flat.find(m => m.route === route) as MenuItem || null;
  }

  toggleCollapsed(): void {
    this.isCollapsed.update(v => !v);
  }

  setActive(code: string): void {
    this.activeCode.set(code);
  }

  private flatten(nodes: MenuNode[]): MenuNode[] {
    return nodes.flatMap(n => [n, ...this.flatten(n.children)]);
  }
}
