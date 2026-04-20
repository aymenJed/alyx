import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent }    from '../sidebar/sidebar.component';
import { ShortcutBarComponent } from '../shortcut-bar/shortcut-bar.component';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, ShortcutBarComponent],
  template: `
    <div class="flex h-screen overflow-hidden bg-slate-50">
      <!-- Sidebar navigation dynamique -->
      <app-sidebar />

      <!-- Zone principale -->
      <div class="flex flex-col flex-1 overflow-hidden">

        <!-- Header utilisateur -->
        <header class="flex items-center justify-between px-4 py-2 bg-white border-b
                        border-slate-200 shadow-sm flex-shrink-0">
          <!-- Barre de raccourcis favoris -->
          <app-shortcut-bar class="flex-1" />

          <!-- Infos utilisateur + logout -->
          <div class="flex items-center gap-3 ml-4 flex-shrink-0">
            <div class="text-right hidden sm:block">
              <p class="text-sm font-medium text-slate-700 leading-tight">
                {{ auth.user()?.fullName }}
              </p>
              <p class="text-xs text-slate-400 leading-tight">
                {{ auth.user()?.username }}
              </p>
            </div>

            <!-- Avatar initiales -->
            <div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center
                        text-white text-xs font-bold flex-shrink-0">
              {{ initiales() }}
            </div>

            <!-- Bouton déconnexion -->
            <button
              (click)="logout()"
              title="Se déconnecter"
              class="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-500
                     hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2"
                   viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3
                         0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
              </svg>
              <span class="hidden sm:inline">Déconnexion</span>
            </button>
          </div>
        </header>

        <!-- Contenu de l'écran actif -->
        <main class="flex-1 overflow-auto">
          <router-outlet />
        </main>
      </div>
    </div>
  `,
})
export class ShellComponent {
  readonly auth = inject(AuthService);

  initiales(): string {
    const name = this.auth.user()?.fullName ?? '';
    return name
      .split(' ')
      .slice(0, 2)
      .map(w => w[0] ?? '')
      .join('')
      .toUpperCase();
  }

  logout(): void {
    this.auth.logout();
  }
}
