import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';
import { ShortcutItem } from '../models/screen-metadata.model';

/**
 * Gestion des raccourcis utilisateur (ShortcutBar).
 * État global Signal partagé entre ShortcutBarComponent
 * et les boutons "Ajouter aux favoris" des GenericRenderer.
 */
@Injectable({ providedIn: 'root' })
export class ShortcutService {
  private readonly http = inject(HttpClient);

  readonly shortcuts = signal<ShortcutItem[]>([]);

  /** Set des codes d'écrans en favoris — pour vérification O(1) */
  readonly shortcutCodes = computed(
    () => new Set(this.shortcuts().map(s => s.screenCode))
  );

  loadShortcuts(): void {
    this.http.get<ShortcutItem[]>('/api/v1/metadata/shortcuts').pipe(
      catchError(() => of([] as ShortcutItem[]))
    ).subscribe(items => this.shortcuts.set(items));
  }

  isShortcut(screenCode: string): boolean {
    return this.shortcutCodes().has(screenCode);
  }

  addShortcut(screenCode: string): void {
    this.http.post(`/api/v1/metadata/shortcuts/${screenCode}`, {}).subscribe(
      () => this.loadShortcuts()
    );
  }

  removeShortcut(screenCode: string): void {
    this.http.delete(`/api/v1/metadata/shortcuts/${screenCode}`).subscribe(() => {
      this.shortcuts.update(items =>
        items.filter(i => i.screenCode !== screenCode)
      );
    });
  }

  toggleShortcut(screenCode: string): void {
    if (this.isShortcut(screenCode)) {
      this.removeShortcut(screenCode);
    } else {
      this.addShortcut(screenCode);
    }
  }
}
