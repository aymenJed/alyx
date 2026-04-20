import { Routes } from '@angular/router';
import { authGuard }  from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  // -------------------------------------------------------
  // Écran de connexion (public)
  // -------------------------------------------------------
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then(m => m.LoginComponent),
    title: 'Alyx — Connexion',
  },

  // -------------------------------------------------------
  // Shell principal — protégé par authGuard
  // -------------------------------------------------------
  {
    path: '',
    loadComponent: () =>
      import('./layout/shell/shell.component').then(m => m.ShellComponent),
    canActivate: [authGuard],
    children: [
      // -------------------------------------------------------
      // ROUTE PAR DÉFAUT - Redirection vers le dashboard
      // -------------------------------------------------------
      {
        path: '',
        redirectTo: 'marches/dashboard',
        pathMatch: 'full',
      },

      // -------------------------------------------------------
      // ROUTES EXPLICITES - Composants dédiés (avant le wildcard)
      // -------------------------------------------------------
      {
        path: 'admin/parametrage',
        loadComponent: () =>
          import('./features/admin/screen-designer/screen-designer.component')
            .then(m => m.ScreenDesignerComponent),
        canActivate: [adminGuard],
        title: 'Alyx — Paramétrage des écrans',
      },
      {
        path: 'admin/param-menu',
        loadComponent: () =>
          import('./features/admin/menu-parametrage/menu-parametrage.component')
            .then(m => m.MenuParametrageComponent),
        canActivate: [adminGuard],
        title: 'Alyx — Paramétrage des menus',
      },

      // -------------------------------------------------------
      // ROUTE GÉNÉRIQUE - Pour TOUS les écrans metadata-driven
      // Doit être en DERNIER : capture tout chemin multi-segment
      // -------------------------------------------------------
      {
        path: '**',
        loadComponent: () =>
          import('./shared/components/generic-renderer/generic-renderer.component')
            .then(m => m.GenericRendererComponent),
        title: 'Alyx — Chargement...',
      },
    ],
  },

  // -------------------------------------------------------
  // ROUTE WIldcard - Redirection vers la page d'accueil
  // -------------------------------------------------------
  { path: '**', redirectTo: '' },
];
