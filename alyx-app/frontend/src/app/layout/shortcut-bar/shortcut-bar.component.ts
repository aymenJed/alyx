import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ShortcutService } from '../../core/services/shortcut.service';
import { MenuService } from '../../core/services/menu.service';

@Component({
  selector: 'app-shortcut-bar',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="flex items-center gap-1 px-4 py-1.5 bg-white border-b border-slate-200">
      <!-- Label -->
      <span class="text-xs text-slate-400 mr-2 font-medium hidden sm:block">Favoris:</span>

      <!-- Raccourcis dynamiques -->
      @for (shortcut of shortcutService.shortcuts(); track shortcut.shortcutId) {
        <a
          [routerLink]="getRoute(shortcut.screenCode)"
          class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium
                 bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-blue-700
                 border border-transparent hover:border-blue-200 transition-all group"
          [title]="shortcut.screenTitle"
        >
          <span class="text-slate-400 group-hover:text-blue-500">
            <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/>
            </svg>
          </span>
          {{ shortcut.screenTitle }}
          <button
            class="ml-0.5 opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 transition-all"
            (click)="remove($event, shortcut.screenCode)"
            title="Retirer des favoris"
          >
            <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </a>
      }

      @if (shortcutService.shortcuts().length === 0) {
        <span class="text-xs text-slate-400 italic">
          Aucun favori — cliquez sur ★ dans un écran pour en ajouter
        </span>
      }
    </div>
  `,
})
export class ShortcutBarComponent implements OnInit {
  readonly shortcutService = inject(ShortcutService);
  private readonly menuService  = inject(MenuService);

  ngOnInit(): void {
    this.shortcutService.loadShortcuts();
  }

  remove(event: Event, screenCode: string): void {
    event.preventDefault();
    event.stopPropagation();
    this.shortcutService.removeShortcut(screenCode);
  }

  /** Retrouve la route Angular d'un screenCode via le menu aplati */
  getRoute(screenCode: string): string {
    const node = this.menuService.flatMenu().find(n => n.screenCode === screenCode);
    return node?.route ?? `/screen/${screenCode}`;
  }
}
