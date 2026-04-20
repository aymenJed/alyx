import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900
                flex items-center justify-center p-4">
      <div class="w-full max-w-md">

        <!-- Logo -->
        <div class="text-center mb-8">
          <div class="inline-flex items-center justify-center w-14 h-14 bg-blue-600
                      rounded-2xl shadow-lg shadow-blue-500/30 mb-4">
            <span class="text-2xl font-bold text-white">A</span>
          </div>
          <h1 class="text-2xl font-bold text-white">Alyx App</h1>
          <p class="text-slate-400 text-sm mt-1">Marchés Financiers UMOA / BRVM</p>
        </div>

        <!-- Formulaire -->
        <div class="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl">
          <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-5">

            @if (errorMsg()) {
              <div class="bg-red-500/10 border border-red-500/30 text-red-400 text-sm
                          px-4 py-3 rounded-lg flex items-center gap-2">
                <svg class="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
                </svg>
                {{ errorMsg() }}
              </div>
            }

            <div>
              <label class="block text-sm font-medium text-slate-300 mb-1.5">
                Identifiant
              </label>
              <input
                formControlName="username"
                type="text"
                placeholder="Votre login"
                autocomplete="username"
                class="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg
                       text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500
                       focus:border-transparent text-sm transition-all outline-none"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-300 mb-1.5">
                Mot de passe
              </label>
              <input
                formControlName="password"
                type="password"
                placeholder="••••••••"
                autocomplete="current-password"
                class="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg
                       text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500
                       focus:border-transparent text-sm transition-all outline-none"
              />
            </div>

            <button
              type="submit"
              [disabled]="form.invalid || isLoading()"
              class="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium
                     rounded-lg text-sm transition-colors disabled:opacity-50
                     disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
            >
              @if (isLoading()) {
                <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                Connexion en cours...
              } @else {
                Se connecter
              }
            </button>
          </form>
        </div>

        <!-- Comptes démo -->
        <div class="mt-4 bg-white/3 border border-white/10 rounded-xl p-4 text-xs text-slate-500">
          <p class="font-medium text-slate-400 mb-2">Comptes de démonstration</p>
          <div class="space-y-1">
            <div class="flex justify-between">
              <span class="text-slate-400">admin / admin123</span>
              <span class="text-blue-400">ADMIN + USER</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-400">trader / user123</span>
              <span class="text-slate-400">USER</span>
            </div>
          </div>
        </div>

        <p class="text-center text-slate-600 text-xs mt-4">
          © {{ year }} Alyx Bonds — Plateforme Marchés Bonds
        </p>
      </div>
    </div>
  `,
})
export class LoginComponent {
  private readonly fb     = inject(FormBuilder);
  private readonly auth   = inject(AuthService);
  private readonly router = inject(Router);

  readonly year      = new Date().getFullYear();
  readonly isLoading = signal(false);
  readonly errorMsg  = signal<string | null>(null);

  form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit(): void {
    if (this.form.invalid) return;
    this.isLoading.set(true);
    this.errorMsg.set(null);

    const { username, password } = this.form.value;

    this.auth.login(username!, password!).subscribe({
      next: () => this.router.navigate(['/']),
      error: () => {
        this.errorMsg.set('Identifiants incorrects. Veuillez réessayer.');
        this.isLoading.set(false);
      },
    });
  }
}
