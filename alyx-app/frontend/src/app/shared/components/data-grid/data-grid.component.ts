import {
  Component, Input, OnInit, inject, signal, computed
} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  ScreenMetadata, ComponentMetadata, ActionMetadata, SortParams, PagedResponse
} from '../../../core/models/screen-metadata.model';
import { FormsModule } from '@angular/forms';

const OPERATORS = [
  { value: '=',    label: '=' },
  { value: '!=',   label: '≠' },
  { value: '>',    label: '>' },
  { value: '>=',   label: '≥' },
  { value: '<',    label: '<' },
  { value: '<=',   label: '≤' },
  { value: 'LIKE', label: '~' },
];

@Component({
  selector: 'app-data-grid',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="flex flex-col h-full bg-[#f0f0f0]">

      <!-- ── Panneau Critères ──────────────────────────────────── -->
      @if (filterFields().length && showCriteria()) {
        <div class="bg-white border-b border-gray-300 px-3 pt-3 pb-2">
          <div class="grid grid-cols-4 gap-x-3 gap-y-2">
            @for (f of filterFields(); track f.fieldKey) {
              <div class="flex flex-col gap-0.5">
                <label class="text-xs text-gray-600 font-medium">{{ f.label }}</label>
                <div class="flex items-center">
                  <!-- Opérateur -->
                  <select
                    class="h-7 px-1 text-xs text-gray-600 bg-white border border-gray-300 border-r-0
                           focus:outline-none focus:border-blue-400 cursor-pointer w-12 shrink-0"
                    [value]="filterOps()[f.fieldKey] ?? '='"
                    (change)="setFilterOp(f.fieldKey, $any($event.target).value)"
                  >
                    @for (op of operators; track op.value) {
                      <option [value]="op.value">{{ op.label }}</option>
                    }
                  </select>
                  <!-- Valeur -->
                  @if (f.componentType === 'SELECT' || f.componentType === 'BADGE') {
                    <select
                      class="flex-1 h-7 px-2 text-xs text-gray-700 bg-white border border-gray-300
                             focus:outline-none focus:border-blue-400 cursor-pointer min-w-0"
                      [value]="filterValues()[f.fieldKey] ?? ''"
                      (change)="setFilterValue(f.fieldKey, $any($event.target).value)"
                    >
                      <option value=""></option>
                      @for (opt of f.options; track opt.value) {
                        <option [value]="opt.value">{{ opt.label }}</option>
                      }
                    </select>
                  } @else if (f.componentType === 'DATE' || f.componentType === 'DATETIME') {
                    <input
                      [type]="f.componentType === 'DATE' ? 'date' : 'datetime-local'"
                      class="flex-1 h-7 px-2 text-xs text-gray-700 bg-white border border-gray-300
                             focus:outline-none focus:border-blue-400 min-w-0"
                      [value]="filterValues()[f.fieldKey] ?? ''"
                      (input)="setFilterValue(f.fieldKey, $any($event.target).value)"
                    />
                  } @else {
                    <input
                      type="text"
                      class="flex-1 h-7 px-2 text-xs text-gray-700 bg-white border border-gray-300
                             focus:outline-none focus:border-blue-400 placeholder:text-gray-400 min-w-0"
                      [value]="filterValues()[f.fieldKey] ?? ''"
                      (input)="setFilterValue(f.fieldKey, $any($event.target).value)"
                      (keydown.enter)="onSearch()"
                    />
                  }
                </div>
              </div>
            }
          </div>
        </div>
      }

      <!-- ── Barre d'outils ────────────────────────────────────── -->
      <div class="flex items-center gap-1 px-2 py-1.5 bg-white border-b border-gray-300 flex-wrap">

        <!-- Chercher -->
        <button class="crt-btn" (click)="onSearch()">
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0"/>
          </svg>
          Chercher
        </button>

        <!-- Critères toggle -->
        @if (filterFields().length) {
          <button class="crt-btn" [class.crt-btn-active]="showCriteria()" (click)="toggleCriteria()">
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z"/>
            </svg>
            Critères
          </button>
        }

        <div class="w-px h-5 bg-gray-300 mx-0.5"></div>

        <!-- Nouveau -->
        @if (canWrite()) {
          <button class="crt-btn crt-btn-primary" (click)="openNew()">
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
            </svg>
            Nouveau
          </button>
        }

        <!-- Exporter -->
        @if (!metadata.disableReportButton) {
          <button class="crt-btn" (click)="exportData('CSV')">
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
            </svg>
            Exporter
          </button>
        }

        <!-- Supprimer -->
        @if (canWrite()) {
          <button class="crt-btn crt-btn-danger"
                  [disabled]="selectedRow() === null"
                  (click)="deleteSelected()">
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
            Supprimer
          </button>
        }

        <!-- Actions personnalisées -->
        @for (action of mainActions(); track action.actionId) {
          <button
            class="crt-btn"
            [disabled]="!action.isEnabled"
            (click)="handleMainAction(action)"
          >{{ action.label }}</button>
        }
      </div>

      <!-- ── Résultat + Tableau ─────────────────────────────────── -->
      <div class="flex-1 overflow-auto px-2 pt-1 pb-0">

        @if (totalElements() > 0) {
          <div class="text-xs text-gray-500 mb-1 px-1">
            Résultat : <span class="font-semibold text-gray-700">{{ totalElements() }}</span>
          </div>
        }

        <div class="bg-white border border-gray-300 overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full border-collapse text-xs">
              <thead>
                <tr class="bg-[#dde8f0] border-b border-gray-300">
                  <!-- Colonne icônes actions -->
                  <th class="w-14 border-r border-gray-300 px-1 py-1.5"></th>
                  @for (col of gridColumns(); track col.fieldKey) {
                    <th
                      class="px-2 py-1.5 text-left font-semibold text-gray-600 whitespace-nowrap
                             border-r border-gray-200 select-none"
                      [class.cursor-pointer]="col.sortable"
                      (click)="col.sortable && sort(col.fieldKey)"
                    >
                      <div class="flex items-center gap-1">
                        {{ col.label }}
                        @if (col.sortable) {
                          <span class="text-gray-400 text-[10px] leading-none"
                                [class.text-blue-600]="currentSort().field === col.fieldKey">
                            @if (currentSort().field === col.fieldKey) {
                              {{ currentSort().direction === 'asc' ? '▲' : '▼' }}
                            } @else { ⇅ }
                          </span>
                        }
                      </div>
                    </th>
                  }
                </tr>
              </thead>
              <tbody>
                @if (isLoading()) {
                  @for (_ of skeletonRows; track $index) {
                    <tr class="border-b border-gray-100">
                      <td class="px-1 py-2 border-r border-gray-200">
                        <div class="h-3 bg-gray-100 rounded animate-pulse"></div>
                      </td>
                      @for (col of gridColumns(); track col.fieldKey) {
                        <td class="px-2 py-2 border-r border-gray-100">
                          <div class="h-3 bg-gray-100 rounded animate-pulse"></div>
                        </td>
                      }
                    </tr>
                  }
                } @else if (rows().length === 0) {
                  <tr>
                    <td [attr.colspan]="gridColumns().length + 1" class="px-4 py-10 text-center text-xs text-gray-400">
                      Aucune donnée disponible
                    </td>
                  </tr>
                } @else {
                  @for (row of rows(); track $index) {
                    <tr
                      class="border-b border-gray-100 cursor-pointer"
                      [class.bg-[#cce0f5]]="selectedRow() === $index"
                      [class.hover:bg-[#eef4fb]]="selectedRow() !== $index"
                      (click)="selectedRow.set($index)"
                      (dblclick)="openEdit(row)"
                    >
                      <!-- Icônes : édition + vue -->
                      <td class="px-1 py-1 border-r border-gray-200 whitespace-nowrap">
                        <div class="flex items-center gap-0.5">
                          <button
                            class="p-0.5 text-gray-400 hover:text-blue-600 transition-colors"
                            title="Modifier"
                            (click)="$event.stopPropagation(); openEdit(row)"
                          >
                            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                            </svg>
                          </button>
                          <button
                            class="p-0.5 text-gray-400 hover:text-blue-600 transition-colors"
                            title="Consulter"
                            (click)="$event.stopPropagation(); selectedRow.set($index)"
                          >
                            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0"/>
                            </svg>
                          </button>
                        </div>
                      </td>
                      @for (col of gridColumns(); track col.fieldKey) {
                        <td class="px-2 py-1 border-r border-gray-100 text-gray-700">
                          @if (col.componentType === 'BADGE' && col.options) {
                            @if (getBadgeOption(col, row[col.fieldKey]); as opt) {
                              <span class="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium"
                                    [class]="getBadgeClass(opt?.color)">
                                {{ opt?.label ?? row[col.fieldKey] }}
                              </span>
                            }
                          } @else {
                            {{ formatCell(row[col.fieldKey], col) }}
                          }
                        </td>
                      }
                    </tr>
                  }
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- ── Barre de pagination CARTHAGO ──────────────────────── -->
      <div class="flex items-center gap-1 px-2 py-1 bg-white border-t border-gray-300 shrink-0">
        <!-- Icône Excel (vert) -->
        <button class="w-6 h-6 flex items-center justify-center bg-[#1d7044] text-white rounded-sm text-xs font-bold hover:bg-[#155533] transition-colors" title="Exporter Excel" (click)="exportData('EXCEL')">
          E
        </button>
        <!-- Icône PDF (rouge) -->
        <button class="w-6 h-6 flex items-center justify-center bg-red-600 text-white rounded-sm text-xs font-bold hover:bg-red-700 transition-colors" title="Exporter PDF" (click)="exportData('PDF')">
          P
        </button>

        <div class="w-px h-5 bg-gray-300 mx-1"></div>

        <!-- Navigation pages -->
        <button class="crt-pag-btn" [disabled]="currentPage() === 0" (click)="goToPage(0)" title="Première page">|◀</button>
        <button class="crt-pag-btn" [disabled]="currentPage() === 0" (click)="goToPage(currentPage()-1)" title="Page précédente">◀</button>

        <span class="px-2 py-0.5 text-xs border border-gray-300 bg-white text-gray-700 min-w-[3rem] text-center">
          {{ currentPage() + 1 }} / {{ totalPages() || 1 }}
        </span>

        <button class="crt-pag-btn" [disabled]="currentPage() >= totalPages()-1" (click)="goToPage(currentPage()+1)" title="Page suivante">▶</button>
        <button class="crt-pag-btn" [disabled]="currentPage() >= totalPages()-1" (click)="goToPage(totalPages()-1)" title="Dernière page">▶|</button>

        <!-- Tri rapide -->
        <button class="crt-pag-btn" (click)="quickSort('asc')" title="Tri croissant">▲</button>
        <button class="crt-pag-btn" (click)="quickSort('desc')" title="Tri décroissant">▼</button>

        <!-- Rafraîchir -->
        <button class="crt-pag-btn" (click)="loadData()" title="Rafraîchir">↻</button>

        <div class="flex-1"></div>

        <!-- Nbre éléments -->
        <span class="text-xs text-gray-500">Nbre éléments :</span>
        <select
          class="h-6 px-1 text-xs text-gray-600 bg-white border border-gray-300 focus:outline-none cursor-pointer"
          [value]="pageSize()"
          (change)="setPageSize(+$any($event.target).value)"
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="99">99</option>
          <option value="100">100</option>
        </select>
      </div>
    </div>

    <!-- ── Dialogue : Création / Édition ──────────────────────── -->
    @if (showModal()) {
      <div class="fixed inset-0 bg-black/40 z-40 flex items-center justify-center p-4">
        <div class="bg-white border border-gray-400 shadow-2xl z-50 flex flex-col w-full max-w-2xl max-h-[90vh]">

          <!-- Titre du dialogue -->
          <div class="flex items-center justify-between px-3 py-2 bg-[#2a7fc9] text-white shrink-0">
            <span class="text-sm font-semibold">
              {{ formMode() === 'create' ? 'Nouveau — ' : 'Modifier — ' }}{{ metadata.title }}
            </span>
            <button class="w-6 h-6 flex items-center justify-center hover:bg-white/20 rounded transition-colors" (click)="closeModal()">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <!-- Onglets (tab Général par défaut) -->
          <div class="flex border-b border-gray-300 bg-[#e8e8e8] shrink-0">
            <button class="px-4 py-1.5 text-xs font-medium bg-white border-r border-gray-300 text-gray-800 -mb-px border-b-white">
              Général
            </button>
          </div>

          @if (formError()) {
            <div class="mx-3 mt-2 px-3 py-2 bg-red-50 border border-red-300 text-xs text-red-700">
              {{ formError() }}
            </div>
          }

          <!-- Champs du formulaire -->
          <div class="flex-1 overflow-y-auto px-3 py-3">
            <div class="grid grid-cols-4 gap-x-3 gap-y-2">
              @for (field of formFields(); track field.fieldKey) {
                <div class="flex flex-col gap-0.5">
                  <label class="text-xs text-gray-600">
                    {{ field.label }}
                    @if (field.required) { <span class="text-red-500">*</span> }
                  </label>
                  @if (field.componentType === 'SELECT' || field.componentType === 'BADGE') {
                    <select
                      class="h-7 px-2 text-xs text-gray-700 bg-white border border-gray-300
                             focus:outline-none focus:border-blue-400 cursor-pointer"
                      [value]="formData()[field.fieldKey] ?? field.defaultValue ?? ''"
                      (change)="setField(field.fieldKey, $any($event.target).value)"
                    >
                      <option value=""></option>
                      @for (opt of field.options; track opt.value) {
                        <option [value]="opt.value">{{ opt.label }}</option>
                      }
                    </select>
                  } @else if (field.componentType === 'TEXTAREA') {
                    <textarea
                      class="px-2 py-1 text-xs text-gray-700 bg-white border border-gray-300
                             focus:outline-none focus:border-blue-400 resize-none col-span-4"
                      rows="3"
                      [placeholder]="field.placeholder ?? ''"
                      [value]="formData()[field.fieldKey] ?? field.defaultValue ?? ''"
                      (input)="setField(field.fieldKey, $any($event.target).value)"
                    ></textarea>
                  } @else {
                    <input
                      class="h-7 px-2 text-xs text-gray-700 bg-white border border-gray-300
                             focus:outline-none focus:border-blue-400 placeholder:text-gray-400"
                      [class.bg-gray-100]="field.readonly"
                      [type]="getInputType(field.componentType)"
                      [placeholder]="field.fieldKey === 'password' && formMode() === 'edit'
                        ? 'Laisser vide pour ne pas modifier'
                        : (field.placeholder ?? '')"
                      [value]="formData()[field.fieldKey] ?? field.defaultValue ?? ''"
                      [readonly]="field.readonly || (formMode() === 'edit' && field.fieldKey === 'username')"
                      (input)="setField(field.fieldKey, $any($event.target).value)"
                    />
                  }
                </div>
              }
            </div>
          </div>

          <!-- Barre d'actions -->
          <div class="flex items-center gap-1 px-3 py-2 bg-[#f0f0f0] border-t border-gray-300 shrink-0">
            <button
              class="crt-btn crt-btn-primary"
              (click)="submitForm()"
              [disabled]="isSaving()"
            >
              @if (isSaving()) { <span class="animate-spin mr-1">↻</span> }
              Enregistrer
            </button>
            <button class="crt-btn" (click)="closeModal()" [disabled]="isSaving()">Fermer</button>
            <button class="crt-btn" (click)="formData.set({})">Initialiser</button>
          </div>
        </div>
      </div>
    }

    <!-- ── Confirmation suppression ───────────────────────────── -->
    @if (deleteTarget()) {
      <div class="fixed inset-0 bg-black/40 z-40 flex items-center justify-center p-4">
        <div class="bg-white border border-gray-400 shadow-2xl z-50 w-full max-w-sm">
          <div class="px-3 py-2 bg-[#2a7fc9] text-white text-sm font-semibold">Confirmer la suppression</div>
          <div class="p-4 text-sm text-gray-700">Cette action est irréversible et permanente.</div>
          <div class="flex justify-end gap-1 px-3 py-2 bg-[#f0f0f0] border-t border-gray-300">
            <button class="crt-btn" (click)="deleteTarget.set(null)">Annuler</button>
            <button class="crt-btn crt-btn-danger" (click)="confirmDelete()" [disabled]="isSaving()">
              @if (isSaving()) { <span class="animate-spin mr-1">↻</span> }
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

  readonly operators = OPERATORS;

  readonly rows           = signal<Record<string, unknown>[]>([]);
  readonly isLoading      = signal(false);
  readonly currentPage    = signal(0);
  readonly totalElements  = signal(0);
  readonly totalPages     = signal(0);
  readonly currentSort    = signal<SortParams>({ field: '', direction: 'asc' });
  readonly selectedRow    = signal<number | null>(null);
  readonly pageSize       = signal(20);

  // Filter state
  readonly filterValues = signal<Record<string, string>>({});
  readonly filterOps    = signal<Record<string, string>>({});

  // ── Modal state ──────────────────────────────────────────────
  readonly showModal    = signal(false);
  readonly showCriteria = signal(true);
  readonly formMode     = signal<'create' | 'edit'>('create');
  readonly formData     = signal<Record<string, unknown>>({});
  readonly formError    = signal<string | null>(null);
  readonly isSaving     = signal(false);
  readonly deleteTarget = signal<Record<string, unknown> | null>(null);

  private editingId: unknown = null;

  // ── Computed ─────────────────────────────────────────────────

  readonly gridColumns = computed(() =>
    this.metadata.components
      .filter(c => c.gridColumn)
      .sort((a, b) => a.displayOrder - b.displayOrder)
  );

  readonly filterFields = computed(() =>
    this.metadata.components
      .filter(c => c.filterable)
      .sort((a, b) => a.displayOrder - b.displayOrder)
  );

  readonly mainActions = computed(() =>
    this.metadata.actions
      .filter(a => a.actionType === 'MAIN' && a.isEnabled)
      .sort((a, b) => a.displayOrder - b.displayOrder)
  );

  readonly gridRowActions = computed(() =>
    this.metadata.actions
      .filter(a => a.actionType === 'GRID')
      .sort((a, b) => a.displayOrder - b.displayOrder)
  );

  readonly formFields = computed(() =>
    [...this.metadata.components]
      .filter(c => c.visible)
      .sort((a, b) => a.displayOrder - b.displayOrder)
  );

  /** Pages visibles dans la pagination : max 7 boutons avec ellipses (-1) */
  readonly visiblePages = computed(() => {
    const total   = this.totalPages();
    const current = this.currentPage();
    if (total <= 7) return Array.from({ length: total }, (_, i) => i);
    const pages: number[] = [];
    pages.push(0);
    if (current > 2)            pages.push(-1);
    for (let i = Math.max(1, current - 1); i <= Math.min(total - 2, current + 1); i++) pages.push(i);
    if (current < total - 3)    pages.push(-1);
    pages.push(total - 1);
    return pages;
  });

  readonly skeletonRows = Array(5);

  ngOnInit(): void {
    const orderByParts = (this.metadata.orderBy ?? '').trim().split(/\s+/);
    const defaultField = orderByParts[0]?.replace(/^o\./, '') ?? '';
    const defaultDir   = (orderByParts[1]?.toLowerCase() === 'desc' ? 'desc' : 'asc') as 'asc' | 'desc';
    this.currentSort.set({ field: defaultField, direction: defaultDir });
    this.pageSize.set(this.metadata.pageSize ?? 20);
    this.loadData();
  }

  loadData(): void {
    this.isLoading.set(true);
    const sort = this.currentSort();

    let params = new HttpParams()
      .set('page', this.currentPage())
      .set('size', this.pageSize());

    if (sort.field) params = params.set('sort', `${sort.field},${sort.direction}`);

    // Append active filter params
    const fv = this.filterValues();
    const fo = this.filterOps();
    const globalSearchKeys = new Set(['search', 'q']);
    for (const [key, val] of Object.entries(fv)) {
      if (val?.trim()) {
        params = params.set(key, val.trim());
        const op = fo[key] ?? '=';
        if (op !== '=') params = params.set(`${key}_op`, op);
      }
    }

    // ── Choix de l'URL : si entityClass est défini dans la métadonnée,
    //    on passe par le Data API générique (/api/v1/data). Sinon, on retombe
    //    sur l'apiBaseUrl historique (endpoints entité-spécifiques).
    let url: string;
    if (this.metadata.entityClass) {
      url = '/api/v1/data';
      params = params.set('entityClass', this.metadata.entityClass);
      // Mappe les filtres par défaut vers le paramètre 'search' du Data API
      for (const key of globalSearchKeys) {
        const v = fv[key];
        if (v?.trim()) { params = params.set('search', v.trim()); break; }
      }
    } else {
      url = this.metadata.apiBaseUrl;
    }

    this.http
      .get<PagedResponse<Record<string, unknown>>>(url, { params })
      .subscribe({
        next: res => {
          this.rows.set(res.content);
          this.totalElements.set(res.totalElements);
          this.totalPages.set(res.totalPages);
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error('[DataGrid] loadData error', err);
          this.isLoading.set(false);
        },
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

  quickSort(direction: 'asc' | 'desc'): void {
    const field = this.currentSort().field || (this.gridColumns()[0]?.fieldKey ?? '');
    if (field) {
      this.currentSort.set({ field, direction });
      this.currentPage.set(0);
      this.loadData();
    }
  }

  goToPage(page: number): void {
    if (page < 0 || (this.totalPages() > 0 && page >= this.totalPages())) return;
    this.currentPage.set(page);
    this.loadData();
  }

  setPageSize(size: number): void {
    if (size > 0) {
      this.pageSize.set(size);
      this.currentPage.set(0);
      this.loadData();
    }
  }

  onSearch(): void {
    this.currentPage.set(0);
    this.loadData();
  }

  setFilterValue(key: string, value: string): void {
    this.filterValues.update(v => ({ ...v, [key]: value }));
  }

  setFilterOp(key: string, op: string): void {
    this.filterOps.update(o => ({ ...o, [key]: op }));
  }

  handleMainAction(action: ActionMetadata): void {
    if (action.code === 'new' || action.code === 'nouveau') {
      this.openNew();
    } else if (action.endpoint && action.httpMethod) {
      const row = this.selectedRow() !== null ? this.rows()[this.selectedRow()!] : null;
      const url = row ? action.endpoint.replace('{id}', String(row['id'] ?? '')) : action.endpoint;
      this.http.request(action.httpMethod, url, { body: row }).subscribe({
        next: () => this.loadData(),
        error: err => console.error('Action error', err),
      });
    }
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

  openEdit(row: Record<string, unknown>): void {
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

  toggleCriteria(): void {
    this.showCriteria.update(v => !v);
  }

  deleteSelected(): void {
    const idx = this.selectedRow();
    if (idx !== null) this.deleteTarget.set(this.rows()[idx]);
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

  getActionIconBg(color?: string): string {
    const map: Record<string, string> = {
      blue:   'bg-blue-500',
      amber:  'bg-amber-500',
      orange: 'bg-orange-500',
      red:    'bg-red-500',
      green:  'bg-emerald-500',
      purple: 'bg-purple-500',
      gray:   'bg-slate-400',
    };
    return map[color ?? 'gray'] ?? 'bg-slate-400';
  }

  private extractError(err: { error?: { message?: string } }): string {
    return err?.error?.message ?? 'Une erreur est survenue. Veuillez réessayer.';
  }
}
