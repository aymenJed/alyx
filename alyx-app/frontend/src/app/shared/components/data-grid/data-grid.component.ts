import {
  Component, Input, OnInit, inject, signal, computed
} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  ScreenMetadata, ComponentMetadata, SortParams, PagedResponse
} from '../../../core/models/screen-metadata.model';
import { FormsModule } from '@angular/forms';

/**
 * DataGrid — Template 2 (GRID)
 *
 * Tableau générique piloté par la configuration de colonnes JSON.
 * Tri et pagination côté serveur via Spring Data JPA.
 * Actions contextuelles configurables (edit, delete, custom).
 * Formulaire de création/édition intégré (slide-over panel).
 */
@Component({
  selector: 'app-data-grid',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="p-6 flex flex-col gap-4">

      <!-- Barre d'outils -->
      <div class="flex items-center justify-between gap-3 flex-wrap">
        <!-- Recherche globale -->
        <div class="relative">
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
               fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0"/>
          </svg>
          <input
            type="text"
            [(ngModel)]="searchTerm"
            (ngModelChange)="onSearch()"
            placeholder="Rechercher..."
            class="pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 w-64"
          />
        </div>

        <div class="flex items-center gap-2">
          <!-- Exports -->
          @if (metadata.gridConfig?.exportFormats?.length) {
            <div class="flex gap-1">
              @for (fmt of metadata.gridConfig!.exportFormats; track fmt) {
                <button
                  class="px-3 py-2 text-xs font-medium text-slate-600 bg-white border border-slate-300
                         rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-1"
                  (click)="exportData(fmt)"
                >
                  <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                  </svg>
                  {{ fmt }}
                </button>
              }
            </div>
          }

          <!-- Nouveau -->
          @if (canWrite()) {
            <button
              class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg
                     hover:bg-blue-700 transition-colors flex items-center gap-2"
              (click)="openNew()"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
              </svg>
              Nouveau
            </button>
          }
        </div>
      </div>

      <!-- Table -->
      <div class="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-200">
                @for (col of gridColumns(); track col.fieldKey) {
                  <th
                    class="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wide whitespace-nowrap"
                    [class.cursor-pointer]="col.sortable"
                    [class.hover:bg-slate-100]="col.sortable"
                    (click)="col.sortable && sort(col.fieldKey)"
                  >
                    <div class="flex items-center gap-1.5">
                      {{ col.label }}
                      @if (col.sortable) {
                        <span class="text-slate-300">
                          @if (currentSort().field === col.fieldKey) {
                            @if (currentSort().direction === 'asc') { ↑ } @else { ↓ }
                          } @else { ↕ }
                        </span>
                      }
                    </div>
                  </th>
                }
                @if (metadata.gridConfig?.actions?.length) {
                  <th class="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase tracking-wide">
                    Actions
                  </th>
                }
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              @if (isLoading()) {
                @for (_ of skeletonRows; track $index) {
                  <tr>
                    @for (col of gridColumns(); track col.fieldKey) {
                      <td class="px-4 py-3">
                        <div class="h-4 bg-slate-100 rounded animate-pulse"></div>
                      </td>
                    }
                    @if (metadata.gridConfig?.actions?.length) {
                      <td class="px-4 py-3">
                        <div class="h-4 w-20 bg-slate-100 rounded animate-pulse ml-auto"></div>
                      </td>
                    }
                  </tr>
                }
              } @else if (rows().length === 0) {
                <tr>
                  <td [attr.colspan]="gridColumns().length + 1" class="px-4 py-12 text-center text-slate-400">
                    Aucune donnée disponible
                  </td>
                </tr>
              } @else {
                @for (row of rows(); track $index) {
                  <tr class="hover:bg-slate-50 transition-colors">
                    @for (col of gridColumns(); track col.fieldKey) {
                      <td class="px-4 py-3 text-slate-700">
@if (col.componentType === 'BADGE' && col.options) {
  @if (getBadgeOption(col, row[col.fieldKey]); as opt) {
    <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
          [class]="getBadgeClass(opt?.color)">
      {{ opt?.label ?? row[col.fieldKey] }}
    </span>
  }
}@else {
                          {{ formatCell(row[col.fieldKey], col) }}
                        }
                      </td>
                    }
                    @if (metadata.gridConfig?.actions?.length) {
                      <td class="px-4 py-3">
                        <div class="flex justify-end gap-1">
                          @for (action of metadata.gridConfig!.actions; track action.key) {
                            <button
                              class="px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1"
                              [class]="getActionClass(action.color)"
                              (click)="handleAction(action.key, row)"
                              [title]="action.label"
                            >
                              {{ action.label }}
                            </button>
                          }
                        </div>
                      </td>
                    }
                  </tr>
                }
              }
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="flex items-center justify-between px-4 py-3 border-t border-slate-200 bg-slate-50">
          <p class="text-xs text-slate-500">
            {{ totalElements() }} résultat(s) —
            Page {{ currentPage() + 1 }} / {{ totalPages() }}
          </p>
          <div class="flex items-center gap-1">
            <button
              class="px-2.5 py-1.5 text-xs rounded-md border border-slate-300 bg-white text-slate-600
                     hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              [disabled]="currentPage() === 0"
              (click)="goToPage(currentPage() - 1)"
            >
              Précédent
            </button>
            @for (p of pageNumbers(); track p) {
              <button
                class="w-8 h-8 text-xs rounded-md border transition-colors"
                [class]="p === currentPage()
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'"
                (click)="goToPage(p)"
              >
                {{ p + 1 }}
              </button>
            }
            <button
              class="px-2.5 py-1.5 text-xs rounded-md border border-slate-300 bg-white text-slate-600
                     hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              [disabled]="currentPage() === totalPages() - 1"
              (click)="goToPage(currentPage() + 1)"
            >
              Suivant
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ═══════════════════════════════════════════════════════
         Slide-over : Formulaire Création / Édition
    ════════════════════════════════════════════════════════ -->
    @if (showModal()) {
      <!-- Overlay -->
      <div
        class="fixed inset-0 bg-black/40 z-40 transition-opacity"
        (click)="closeModal()"
      ></div>

      <!-- Panel -->
      <div class="fixed inset-y-0 right-0 w-full max-w-lg bg-white shadow-2xl z-50
                  flex flex-col overflow-hidden">

        <!-- Header -->
        <div class="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div>
            <h2 class="text-base font-semibold text-slate-800">
              {{ formMode() === 'create' ? 'Nouveau' : 'Modifier' }} — {{ metadata.title }}
            </h2>
            <p class="text-xs text-slate-500 mt-0.5">
              {{ formMode() === 'create' ? 'Remplissez les champs ci-dessous' : 'Modifiez les informations' }}
            </p>
          </div>
          <button
            class="p-2 rounded-lg hover:bg-slate-200 transition-colors text-slate-500"
            (click)="closeModal()"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- Erreur globale -->
        @if (formError()) {
          <div class="mx-6 mt-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 flex items-start gap-2">
            <svg class="w-4 h-4 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            {{ formError() }}
          </div>
        }

        <!-- Champs -->
        <div class="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          @for (field of formFields(); track field.fieldKey) {
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">
                {{ field.label }}
                @if (field.required) { <span class="text-red-500 ml-0.5">*</span> }
              </label>

              @if (field.componentType === 'SELECT' || field.componentType === 'BADGE') {
                <select
                  class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  [value]="formData()[field.fieldKey] ?? field.defaultValue ?? ''"
                  (change)="setField(field.fieldKey, $any($event.target).value)"
                >
                  <option value="">— Sélectionner —</option>
                  @for (opt of field.options; track opt.value) {
                    <option [value]="opt.value">{{ opt.label }}</option>
                  }
                </select>
              } @else if (field.componentType === 'TEXTAREA') {
                <textarea
                  class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  rows="3"
                  [placeholder]="field.placeholder ?? ''"
                  [value]="formData()[field.fieldKey] ?? field.defaultValue ?? ''"
                  (input)="setField(field.fieldKey, $any($event.target).value)"
                ></textarea>
              } @else {
                <input
                  class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  [type]="getInputType(field.componentType)"
                  [placeholder]="field.fieldKey === 'password' && formMode() === 'edit'
                    ? 'Laisser vide pour ne pas modifier'
                    : (field.placeholder ?? '')"
                  [value]="formData()[field.fieldKey] ?? field.defaultValue ?? ''"
                  [readonly]="field.readonly || (formMode() === 'edit' && field.fieldKey === 'username')"
                  [class.bg-slate-50]="field.readonly || (formMode() === 'edit' && field.fieldKey === 'username')"
                  (input)="setField(field.fieldKey, $any($event.target).value)"
                />
              }
            </div>
          }
        </div>

        <!-- Footer -->
        <div class="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200 bg-slate-50">
          <button
            class="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300
                   rounded-lg hover:bg-slate-50 transition-colors"
            (click)="closeModal()"
            [disabled]="isSaving()"
          >
            Annuler
          </button>
          <button
            class="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg
                   hover:bg-blue-700 transition-colors flex items-center gap-2
                   disabled:opacity-50 disabled:cursor-not-allowed"
            (click)="submitForm()"
            [disabled]="isSaving()"
          >
            @if (isSaving()) {
              <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
              </svg>
              Enregistrement…
            } @else {
              {{ formMode() === 'create' ? 'Créer' : 'Enregistrer' }}
            }
          </button>
        </div>
      </div>
    }

    <!-- ═══════════════════════════════════════════════════════
         Modal de confirmation de suppression
    ════════════════════════════════════════════════════════ -->
    @if (deleteTarget()) {
      <div class="fixed inset-0 bg-black/40 z-40 flex items-center justify-center p-4">
        <div class="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 z-50">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
              <svg class="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div>
              <h3 class="text-sm font-semibold text-slate-800">Confirmer la suppression</h3>
              <p class="text-xs text-slate-500 mt-0.5">Cette action est irréversible.</p>
            </div>
          </div>
          <div class="flex justify-end gap-2 mt-6">
            <button
              class="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
              (click)="deleteTarget.set(null)"
            >
              Annuler
            </button>
            <button
              class="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 flex items-center gap-2
                     disabled:opacity-50"
              (click)="confirmDelete()"
              [disabled]="isSaving()"
            >
              @if (isSaving()) {
                <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                </svg>
              }
              Supprimer
            </button>
          </div>
        </div>
      </div>
    }
  `,
})
export class DataGridComponent implements OnInit {
  @Input({ required: true }) metadata!: ScreenMetadata;

  private readonly http = inject(HttpClient);

  readonly rows           = signal<Record<string, unknown>[]>([]);
  readonly isLoading      = signal(false);
  readonly currentPage    = signal(0);
  readonly totalElements  = signal(0);
  readonly totalPages     = signal(0);
  readonly currentSort    = signal<SortParams>({ field: '', direction: 'asc' });

  searchTerm = '';

  // ── Modal state ──────────────────────────────────────────────
  readonly showModal   = signal(false);
  readonly formMode    = signal<'create' | 'edit'>('create');
  readonly formData    = signal<Record<string, unknown>>({});
  readonly formError   = signal<string | null>(null);
  readonly isSaving    = signal(false);
  readonly deleteTarget = signal<Record<string, unknown> | null>(null);

  private editingId: unknown = null;

  // ── Computed ─────────────────────────────────────────────────

  readonly gridColumns = computed(() =>
    this.metadata.components.filter(c => c.gridColumn)
  );

  /** Champs du formulaire : tous les composants visibles, ordonnés */
  readonly formFields = computed(() =>
    [...this.metadata.components]
      .filter(c => c.visible)
      .sort((a, b) => a.displayOrder - b.displayOrder)
  );

  readonly pageNumbers = computed(() =>
    Array.from({ length: Math.min(this.totalPages(), 5) }, (_, i) => i)
  );

  readonly skeletonRows = Array(5);

  ngOnInit(): void {
    const cfg = this.metadata.gridConfig;
    this.currentSort.set({
      field:     cfg?.defaultSort     ?? '',
      direction: cfg?.defaultSortDir  ?? 'desc',
    });
    this.loadData();
  }

  private loadData(): void {
    this.isLoading.set(true);
    const cfg    = this.metadata.gridConfig;
    const sort   = this.currentSort();

    let params = new HttpParams()
      .set('page', this.currentPage())
      .set('size', cfg?.pageSize ?? 20);

    if (sort.field)       params = params.set('sort', `${sort.field},${sort.direction}`);
    if (this.searchTerm)  params = params.set('search', this.searchTerm);

    this.http
      .get<PagedResponse<Record<string, unknown>>>(this.metadata.apiBaseUrl, { params })
      .subscribe({
        next: res => {
          this.rows.set(res.content);
          this.totalElements.set(res.totalElements);
          this.totalPages.set(res.totalPages);
          this.isLoading.set(false);
        },
        error: () => this.isLoading.set(false),
      });
  }

  sort(field: string): void {
    this.currentSort.update(s => ({
      field,
      direction: s.field === field && s.direction === 'asc' ? 'desc' : 'asc',
    }));
    this.currentPage.set(0);
    this.loadData();
  }

  goToPage(page: number): void {
    this.currentPage.set(page);
    this.loadData();
  }

  onSearch(): void {
    this.currentPage.set(0);
    this.loadData();
  }

  // ── CRUD actions ─────────────────────────────────────────────

  handleAction(actionKey: string, row: Record<string, unknown>): void {
    if (actionKey === 'edit') {
      this.openEdit(row);
    } else if (actionKey === 'delete') {
      this.deleteTarget.set(row);
    } else if (actionKey === 'toggle') {
      const id = row['id'];
      this.http.patch(`${this.metadata.apiBaseUrl}/${id}/toggle`, {}).subscribe({
        next: () => this.loadData(),
        error: err => console.error('Toggle failed', err),
      });
    }
  }

  openNew(): void {
    this.formMode.set('create');
    this.editingId = null;
    // Pré-remplir les valeurs par défaut
    const defaults: Record<string, unknown> = {};
    this.formFields().forEach(f => {
      if (f.defaultValue != null) defaults[f.fieldKey] = f.defaultValue;
    });
    this.formData.set(defaults);
    this.formError.set(null);
    this.showModal.set(true);
  }

  private openEdit(row: Record<string, unknown>): void {
    this.formMode.set('edit');
    this.editingId = row['id'];
    this.formData.set({ ...row });
    this.formError.set(null);
    this.showModal.set(true);
  }

  closeModal(): void {
    this.showModal.set(false);
    this.formError.set(null);
  }

  setField(key: string, value: unknown): void {
    this.formData.update(d => ({ ...d, [key]: value }));
  }

  submitForm(): void {
    // Validation basique des champs required
    // Le champ 'password' n'est pas obligatoire en mode édition (changement optionnel)
    for (const field of this.formFields()) {
      const val = this.formData()[field.fieldKey];
      const isOptionalPassword = field.fieldKey === 'password' && this.formMode() === 'edit';
      if (field.required && !isOptionalPassword && (val == null || String(val).trim() === '')) {
        this.formError.set(`Le champ « ${field.label} » est obligatoire.`);
        return;
      }
    }
    this.formError.set(null);
    this.isSaving.set(true);

    // En mode édition : password → newPassword (convention UpdateUserRequest)
    const raw = { ...this.formData() };
    if (this.formMode() === 'edit' && 'password' in raw) {
      if (raw['password']) raw['newPassword'] = raw['password'];
      delete raw['password'];
    }
    const payload = raw;

    if (this.formMode() === 'create') {
      this.http.post(this.metadata.apiBaseUrl, payload).subscribe({
        next: () => { this.isSaving.set(false); this.closeModal(); this.loadData(); },
        error: err => {
          this.isSaving.set(false);
          this.formError.set(this.extractError(err));
        },
      });
    } else {
      this.http.put(`${this.metadata.apiBaseUrl}/${this.editingId}`, payload).subscribe({
        next: () => { this.isSaving.set(false); this.closeModal(); this.loadData(); },
        error: err => {
          this.isSaving.set(false);
          this.formError.set(this.extractError(err));
        },
      });
    }
  }

  confirmDelete(): void {
    const row = this.deleteTarget();
    if (!row) return;
    const id = row['id'];
    this.isSaving.set(true);
    this.http.delete(`${this.metadata.apiBaseUrl}/${id}`).subscribe({
      next: () => {
        this.isSaving.set(false);
        this.deleteTarget.set(null);
        this.loadData();
      },
      error: err => {
        this.isSaving.set(false);
        console.error('Delete failed', err);
      },
    });
  }

  exportData(format: string): void {
    window.open(`${this.metadata.apiBaseUrl}/export?format=${format}`, '_blank');
  }

  // ── Helpers ──────────────────────────────────────────────────

  formatCell(value: unknown, col: ComponentMetadata): string {
    if (value == null) return '—';
    if (col.formatPattern === 'FCFA' || col.formatPattern === 'XOF') {
      return new Intl.NumberFormat('fr-FR', {
        style: 'currency', currency: 'XOF', minimumFractionDigits: 0
      }).format(Number(value));
    }
    if (col.formatPattern === '%') return `${value} %`;
    if (col.componentType === 'DATE' && typeof value === 'string') {
      return new Date(value).toLocaleDateString('fr-FR');
    }
    return String(value);
  }

  getBadgeOption(col: ComponentMetadata, value: unknown) {
    return col.options?.find(o => o.value === String(value));
  }

  getBadgeClass(color?: string): string {
    const map: Record<string, string> = {
      green:  'bg-green-100 text-green-700',
      red:    'bg-red-100 text-red-700',
      blue:   'bg-blue-100 text-blue-700',
      amber:  'bg-amber-100 text-amber-700',
      orange: 'bg-orange-100 text-orange-700',
      gray:   'bg-slate-100 text-slate-600',
    };
    return map[color ?? 'gray'] ?? map['gray'];
  }

  getInputType(componentType: string): string {
    const map: Record<string, string> = {
      EMAIL:    'email',
      PASSWORD: 'password',
      NUMBER:   'number',
      AMOUNT:   'number',
      DATE:     'date',
      DATETIME: 'datetime-local',
      TIME:     'time',
      CHECKBOX: 'checkbox',
    };
    return map[componentType] ?? 'text';
  }

  canWrite(): boolean {
    return true; // À brancher sur le service d'autorisation JWT
  }

  getActionClass(color?: string): string {
    const map: Record<string, string> = {
      blue:  'bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100',
      amber: 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100',
      red:   'bg-red-50 text-red-700 border border-red-200 hover:bg-red-100',
      green: 'bg-green-50 text-green-700 border border-green-200 hover:bg-green-100',
      gray:  'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100',
    };
    return map[color ?? 'gray'];
  }

  private extractError(err: { error?: { message?: string } }): string {
    return err?.error?.message ?? 'Une erreur est survenue. Veuillez réessayer.';
  }
}
