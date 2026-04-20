import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface MenuItemDto {
  id: number;
  parentId: number | null;
  parentLabel: string | null;
  code: string;
  label: string;
  icon: string | null;
  route: string | null;
  screenCode: string | null;
  displayOrder: number;
  isActive: string;
  roleRequired: string | null;
  childrenCount: number;
  children: MenuItemDto[];
}

interface MenuOptionDto { id: number; code: string; label: string; type: string; }
interface MenuOptionsDto {
  availableParents: MenuOptionDto[];
  availableScreens: MenuOptionDto[];
  availableRoles:   MenuOptionDto[];
}

type Mode = 'list' | 'create' | 'edit';

@Component({
  selector: 'app-menu-parametrage',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="flex h-full overflow-hidden">

      <!-- ══════════════════════════════════
           PANNEAU GAUCHE — Arbre des menus
      ══════════════════════════════════ -->
      <aside class="w-80 flex-shrink-0 border-r border-slate-200 bg-white flex flex-col">

        <!-- En-tête -->
        <div class="px-4 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 class="text-sm font-semibold text-slate-700">Menus de l'application</h2>
            <p class="text-xs text-slate-400 mt-0.5">{{ flatMenus().length }} éléments configurés</p>
          </div>
          <button (click)="startCreate()"
            class="flex items-center gap-1 px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700
                   text-white text-xs font-medium rounded-lg transition-colors">
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
            </svg>
            Nouveau
          </button>
        </div>

        <!-- Filtre actif/inactif -->
        <div class="px-3 py-2 border-b border-slate-100 flex gap-1">
          <button (click)="filterActive.set('all')"
            [class]="filterActive() === 'all'
              ? 'bg-slate-800 text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'"
            class="flex-1 text-xs py-1 rounded-md font-medium transition-colors">
            Tous
          </button>
          <button (click)="filterActive.set('Y')"
            [class]="filterActive() === 'Y'
              ? 'bg-emerald-600 text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'"
            class="flex-1 text-xs py-1 rounded-md font-medium transition-colors">
            Actifs
          </button>
          <button (click)="filterActive.set('N')"
            [class]="filterActive() === 'N'
              ? 'bg-red-500 text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'"
            class="flex-1 text-xs py-1 rounded-md font-medium transition-colors">
            Inactifs
          </button>
        </div>

        <!-- Liste -->
        <div class="flex-1 overflow-y-auto py-1">
          @if (isLoading()) {
            @for (_ of [1,2,3,4,5,6]; track $index) {
              <div class="mx-3 my-1 h-11 bg-slate-100 rounded-lg animate-pulse"></div>
            }
          } @else {
            @for (menu of filteredMenus(); track menu.id) {
              <div
                [style.padding-left.px]="menu.parentId ? 32 : 12"
                class="pr-3 py-0.5">
                <button
                  (click)="selectMenu(menu)"
                  class="w-full text-left px-3 py-2 flex items-center gap-2.5 rounded-lg
                         hover:bg-slate-50 transition-colors border"
                  [class.border-blue-500]="selectedMenu()?.id === menu.id"
                  [class.bg-blue-50]="selectedMenu()?.id === menu.id"
                  [class.border-transparent]="selectedMenu()?.id !== menu.id">

                  <!-- Icône -->
                  <span class="flex-shrink-0 w-4 h-4 text-slate-500"
                        [innerHTML]="getIconSvg(menu.icon)"></span>

                  <div class="flex-1 min-w-0">
                    <p class="text-xs font-semibold text-slate-800 truncate">{{ menu.label }}</p>
                    <p class="text-[10px] text-slate-400 font-mono truncate">{{ menu.route || menu.code }}</p>
                  </div>

                  <!-- Badges -->
                  <div class="flex items-center gap-1 flex-shrink-0">
                    @if (menu.childrenCount > 0) {
                      <span class="text-[10px] bg-slate-100 text-slate-500 rounded px-1">
                        {{ menu.childrenCount }}
                      </span>
                    }
                    <span [class]="menu.isActive === 'Y'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-red-100 text-red-600'"
                      class="text-[10px] font-bold rounded px-1">
                      {{ menu.isActive === 'Y' ? 'ON' : 'OFF' }}
                    </span>
                  </div>
                </button>
              </div>
            }
            @if (filteredMenus().length === 0 && !isLoading()) {
              <p class="text-center text-xs text-slate-400 py-10">Aucun menu</p>
            }
          }
        </div>
      </aside>

      <!-- ══════════════════════════════════
           PANNEAU DROIT — Formulaire / Détail
      ══════════════════════════════════ -->
      <main class="flex-1 overflow-y-auto bg-slate-50">

        @if (mode() === 'list' && !selectedMenu()) {
          <!-- État vide -->
          <div class="flex flex-col items-center justify-center h-full gap-4 text-slate-400">
            <svg class="w-14 h-14 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M4 6h16M4 12h16M4 18h7"/>
            </svg>
            <p class="text-sm">Sélectionnez un menu ou créez-en un nouveau</p>
            <button (click)="startCreate()"
              class="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
              + Nouveau menu
            </button>
          </div>
        }

        @if (mode() === 'list' && selectedMenu()) {
          <!-- Fiche détail -->
          <div class="p-6 max-w-2xl">
            <div class="flex items-start justify-between mb-6">
              <div>
                <h1 class="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <span class="w-6 h-6 text-slate-600 flex-shrink-0"
                        [innerHTML]="getIconSvg(selectedMenu()!.icon)"></span>
                  {{ selectedMenu()!.label }}
                </h1>
                <p class="text-xs text-slate-400 font-mono mt-1">{{ selectedMenu()!.code }}</p>
              </div>
              <div class="flex gap-2">
                <button (click)="toggleActive(selectedMenu()!)"
                  [class]="selectedMenu()!.isActive === 'Y'
                    ? 'bg-amber-50 text-amber-700 border-amber-300 hover:bg-amber-100'
                    : 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100'"
                  class="px-3 py-1.5 text-xs font-medium border rounded-lg transition-colors">
                  {{ selectedMenu()!.isActive === 'Y' ? 'Désactiver' : 'Activer' }}
                </button>
                <button (click)="startEdit(selectedMenu()!)"
                  class="px-3 py-1.5 text-xs font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Modifier
                </button>
                <button (click)="confirmDelete(selectedMenu()!)"
                  class="px-3 py-1.5 text-xs font-medium bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                  Supprimer
                </button>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              @for (field of detailFields(); track field.label) {
                <div class="bg-white rounded-lg border border-slate-200 px-4 py-3">
                  <p class="text-[10px] text-slate-400 uppercase tracking-wide font-semibold">{{ field.label }}</p>
                  <p class="text-sm text-slate-700 mt-1 font-medium truncate">{{ field.value || '—' }}</p>
                </div>
              }
            </div>
          </div>
        }

        @if (mode() === 'create' || mode() === 'edit') {
          <!-- Formulaire -->
          <div class="p-6 max-w-2xl">
            <div class="flex items-center gap-3 mb-6">
              <button (click)="cancelForm()"
                class="text-slate-400 hover:text-slate-600 transition-colors">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                </svg>
              </button>
              <h1 class="text-lg font-bold text-slate-800">
                {{ mode() === 'create' ? 'Nouveau menu' : 'Modifier — ' + selectedMenu()?.label }}
              </h1>
            </div>

            @if (formError()) {
              <div class="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                {{ formError() }}
              </div>
            }

            <form [formGroup]="form" (ngSubmit)="submitForm()" class="space-y-4">

              <!-- Parent -->
              <div class="bg-white rounded-lg border border-slate-200 p-4 space-y-4">
                <h3 class="text-xs font-semibold text-slate-500 uppercase tracking-wide">Hiérarchie</h3>
                <div>
                  <label class="block text-xs font-medium text-slate-600 mb-1">Menu parent</label>
                  <select formControlName="parentId"
                    class="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white">
                    <option [value]="null">— Aucun (menu racine) —</option>
                    @for (p of options()?.availableParents || []; track p.id) {
                      <option [value]="p.id">{{ p.label }}</option>
                    }
                  </select>
                </div>
              </div>

              <!-- Identité -->
              <div class="bg-white rounded-lg border border-slate-200 p-4 space-y-4">
                <h3 class="text-xs font-semibold text-slate-500 uppercase tracking-wide">Identité</h3>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-medium text-slate-600 mb-1">Code <span class="text-red-500">*</span></label>
                    <input formControlName="code" type="text" placeholder="MNU_ROLES"
                      class="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
                      [class.border-red-300]="form.get('code')?.invalid && form.get('code')?.touched"
                      [class.border-slate-200]="!(form.get('code')?.invalid && form.get('code')?.touched)" />
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-slate-600 mb-1">Libellé <span class="text-red-500">*</span></label>
                    <input formControlName="label" type="text" placeholder="Gestion des rôles"
                      class="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      [class.border-red-300]="form.get('label')?.invalid && form.get('label')?.touched"
                      [class.border-slate-200]="!(form.get('label')?.invalid && form.get('label')?.touched)" />
                  </div>
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-medium text-slate-600 mb-1">Icône (emoji ou classe)</label>
                    <input formControlName="icon" type="text" placeholder="⚙️  ou shield"
                      class="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-slate-600 mb-1">Ordre d'affichage</label>
                    <input formControlName="displayOrder" type="number" min="0" placeholder="10"
                      class="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                  </div>
                </div>
              </div>

              <!-- Navigation -->
              <div class="bg-white rounded-lg border border-slate-200 p-4 space-y-4">
                <h3 class="text-xs font-semibold text-slate-500 uppercase tracking-wide">Navigation</h3>
                <div>
                  <label class="block text-xs font-medium text-slate-600 mb-1">Route URL</label>
                  <input formControlName="route" type="text" placeholder="/admin/roles"
                    class="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono" />
                  <p class="text-[10px] text-slate-400 mt-1">Chemin Angular de navigation (ex: /admin/roles)</p>
                </div>
                <div>
                  <label class="block text-xs font-medium text-slate-600 mb-1">Écran lié (Screen Code)</label>
                  <select formControlName="screenCode"
                    class="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white">
                    <option [value]="null">— Aucun écran lié —</option>
                    @for (s of options()?.availableScreens || []; track s.id) {
                      <option [value]="s.code">{{ s.label }} ({{ s.code }})</option>
                    }
                  </select>
                  <p class="text-[10px] text-slate-400 mt-1">Optionnel pour les menus parents</p>
                </div>
              </div>

              <!-- Sécurité & Statut -->
              <div class="bg-white rounded-lg border border-slate-200 p-4 space-y-4">
                <h3 class="text-xs font-semibold text-slate-500 uppercase tracking-wide">Sécurité & Statut</h3>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-medium text-slate-600 mb-1">Rôle requis</label>
                    <select formControlName="roleRequired"
                      class="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white">
                      <option [value]="null">— Tous les utilisateurs —</option>
                      @for (r of options()?.availableRoles || []; track r.id) {
                        <option [value]="r.code">{{ r.label }}</option>
                      }
                    </select>
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-slate-600 mb-1">Statut</label>
                    <select formControlName="isActive"
                      class="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white">
                      <option value="Y">Actif</option>
                      <option value="N">Inactif</option>
                    </select>
                  </div>
                </div>
              </div>

              <!-- Actions -->
              <div class="flex items-center justify-end gap-3 pt-2">
                <button type="button" (click)="cancelForm()"
                  class="px-4 py-2 text-sm text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
                  Annuler
                </button>
                <button type="submit" [disabled]="form.invalid || isSaving()"
                  class="px-5 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg
                         hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors
                         flex items-center gap-2">
                  @if (isSaving()) {
                    <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                  }
                  {{ mode() === 'create' ? 'Créer le menu' : 'Enregistrer' }}
                </button>
              </div>
            </form>
          </div>
        }
      </main>
    </div>

    <!-- Modal confirmation suppression -->
    @if (deleteTarget()) {
      <div class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div class="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full mx-4">
          <h3 class="text-base font-bold text-slate-800 mb-2">Supprimer ce menu ?</h3>
          <p class="text-sm text-slate-500 mb-6">
            <strong>{{ deleteTarget()!.label }}</strong> sera supprimé définitivement.
            @if (deleteTarget()!.childrenCount > 0) {
              <span class="text-red-600 block mt-1">
                Attention : ce menu a {{ deleteTarget()!.childrenCount }} sous-menu(s).
              </span>
            }
          </p>
          <div class="flex gap-3 justify-end">
            <button (click)="deleteTarget.set(null)"
              class="px-4 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50">
              Annuler
            </button>
            <button (click)="deleteConfirmed()"
              class="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700">
              Supprimer
            </button>
          </div>
        </div>
      </div>
    }
  `,
  host: { class: 'flex flex-col h-full' },
})
export class MenuParametrageComponent implements OnInit {
  private readonly http      = inject(HttpClient);
  private readonly fb        = inject(FormBuilder);
  private readonly sanitizer = inject(DomSanitizer);

  private readonly BASE = '/api/v1/designer/menus';

  readonly menus      = signal<MenuItemDto[]>([]);
  readonly options    = signal<MenuOptionsDto | null>(null);
  readonly isLoading  = signal(false);
  readonly isSaving   = signal(false);
  readonly mode       = signal<Mode>('list');
  readonly filterActive = signal<'all' | 'Y' | 'N'>('all');
  readonly selectedMenu = signal<MenuItemDto | null>(null);
  readonly deleteTarget = signal<MenuItemDto | null>(null);
  readonly formError  = signal<string | null>(null);

  form!: FormGroup;

  // Liste à plat triée par displayOrder
  readonly flatMenus = computed(() => {
    const flat: MenuItemDto[] = [];
    const walk = (items: MenuItemDto[]) => {
      for (const m of [...items].sort((a, b) => a.displayOrder - b.displayOrder)) {
        flat.push(m);
        if (m.children?.length) walk(m.children);
      }
    };
    walk(this.menus());
    return flat;
  });

  readonly filteredMenus = computed(() => {
    const f = this.filterActive();
    return f === 'all' ? this.flatMenus() : this.flatMenus().filter(m => m.isActive === f);
  });

  readonly detailFields = computed(() => {
    const m = this.selectedMenu();
    if (!m) return [];
    return [
      { label: 'Code',          value: m.code },
      { label: 'Libellé',       value: m.label },
      { label: 'Route',         value: m.route },
      { label: 'Écran lié',     value: m.screenCode },
      { label: 'Menu parent',   value: m.parentLabel },
      { label: 'Ordre',         value: String(m.displayOrder) },
      { label: 'Rôle requis',   value: m.roleRequired },
      { label: 'Sous-menus',    value: m.childrenCount > 0 ? `${m.childrenCount} enfant(s)` : 'Aucun' },
    ];
  });

  ngOnInit(): void {
    this.buildForm();
    this.loadMenus();
    this.loadOptions();
  }

  private buildForm(): void {
    this.form = this.fb.group({
      parentId:     [null],
      code:         ['', [Validators.required, Validators.pattern(/^[A-Z0-9_]+$/)]],
      label:        ['', Validators.required],
      icon:         [''],
      route:        [''],
      screenCode:   [null],
      displayOrder: [10],
      isActive:     ['Y'],
      roleRequired: [null],
    });
  }

  loadMenus(): void {
    this.isLoading.set(true);
    this.http.get<MenuItemDto[]>(`${this.BASE}/tree`).subscribe({
      next: data => { this.menus.set(data); this.isLoading.set(false); },
      error: ()  => { this.isLoading.set(false); },
    });
  }

  private loadOptions(): void {
    this.http.get<MenuOptionsDto>(`${this.BASE}/options`).subscribe({
      next: data => this.options.set(data),
    });
  }

  selectMenu(menu: MenuItemDto): void {
    this.selectedMenu.set(menu);
    this.mode.set('list');
    this.formError.set(null);
  }

  startCreate(): void {
    this.selectedMenu.set(null);
    this.form.reset({ parentId: null, isActive: 'Y', displayOrder: 10, screenCode: null, roleRequired: null });
    this.formError.set(null);
    this.mode.set('create');
  }

  startEdit(menu: MenuItemDto): void {
    this.form.patchValue({
      parentId:     menu.parentId ?? null,
      code:         menu.code,
      label:        menu.label,
      icon:         menu.icon ?? '',
      route:        menu.route ?? '',
      screenCode:   menu.screenCode ?? null,
      displayOrder: menu.displayOrder,
      isActive:     menu.isActive,
      roleRequired: menu.roleRequired ?? null,
    });
    this.formError.set(null);
    this.mode.set('edit');
  }

  cancelForm(): void {
    this.mode.set('list');
    this.formError.set(null);
  }

  submitForm(): void {
    if (this.form.invalid) return;
    this.isSaving.set(true);
    this.formError.set(null);

    const payload = this.form.value;
    // Convertir chaînes vides en null
    for (const k of ['parentId', 'icon', 'route', 'screenCode', 'roleRequired']) {
      if (payload[k] === '' || payload[k] === 'null') payload[k] = null;
    }

    const req = this.mode() === 'create'
      ? this.http.post<MenuItemDto>(this.BASE, payload)
      : this.http.put<MenuItemDto>(`${this.BASE}/${this.selectedMenu()!.id}`, payload);

    req.subscribe({
      next: saved => {
        this.isSaving.set(false);
        this.selectedMenu.set(saved);
        this.mode.set('list');
        this.loadMenus();
        this.loadOptions();
      },
      error: err => {
        this.isSaving.set(false);
        this.formError.set(err?.error?.message || 'Une erreur est survenue. Vérifiez les données.');
      },
    });
  }

  confirmDelete(menu: MenuItemDto): void {
    this.deleteTarget.set(menu);
  }

  deleteConfirmed(): void {
    const menu = this.deleteTarget();
    if (!menu) return;
    this.http.delete(`${this.BASE}/${menu.id}`).subscribe({
      next: () => {
        this.deleteTarget.set(null);
        this.selectedMenu.set(null);
        this.mode.set('list');
        this.loadMenus();
        this.loadOptions();
      },
      error: err => {
        this.deleteTarget.set(null);
        this.formError.set(err?.error?.message || 'Suppression impossible (sous-menus existants ?)');
        this.mode.set('list');
      },
    });
  }

  toggleActive(menu: MenuItemDto): void {
    this.http.patch(`${this.BASE}/${menu.id}/toggle`, {}).subscribe({
      next: () => {
        this.loadMenus();
        const updated = { ...menu, isActive: menu.isActive === 'Y' ? 'N' : 'Y' };
        this.selectedMenu.set(updated as MenuItemDto);
      },
    });
  }

  getIconSvg(icon: string | null | undefined): SafeHtml {
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
      'arrow-right-left':        '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"/></svg>',
      'shield-check':            '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-1.5-6.75a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
      'squares-plus':            '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 16.5h-9v-9a1.5 1.5 0 011.5-1.5h9a1.5 1.5 0 011.5 1.5v9z"/><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75V19.5a1.5 1.5 0 001.5 1.5h12a1.5 1.5 0 001.5-1.5v-6.75M12 9v6m3-3H9"/></svg>',
      'user-group':              '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"/></svg>',
      'document-chart-bar':      '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/></svg>',
      'banknotes':               '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H15V10.5z"/></svg>',
    };
    const fallback = '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h7"/></svg>';
    const svg = icons[icon ?? ''] ?? fallback;
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }
}
