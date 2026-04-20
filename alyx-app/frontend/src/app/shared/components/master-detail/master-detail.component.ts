import {
  Component, Input, OnInit, inject, signal
} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ScreenMetadata, PagedResponse } from '../../../core/models/screen-metadata.model';
import { FormGeneratorComponent } from '../form-generator/form-generator.component';

/**
 * MasterDetail — Template 3 (MASTER_DETAIL)
 *
 * Layout split-screen :
 *  - Gauche : liste paginée des enregistrements (Master)
 *  - Droite : formulaire de détail/édition (Detail)
 *
 * La même métadonnée ScreenMetadata pilote les deux zones :
 *  - IS_GRID_COLUMN = 'Y' → colonne du Master
 *  - IS_GRID_COLUMN = 'N' → champ du formulaire Detail uniquement
 */
@Component({
  selector: 'app-master-detail',
  standalone: true,
  imports: [FormGeneratorComponent],
  template: `
    <div class="flex h-full overflow-hidden">

      <!-- ===== MASTER (Liste gauche) ===== -->
      <div class="w-80 flex-shrink-0 border-r border-slate-200 bg-white flex flex-col">

        <!-- Barre de recherche -->
        <div class="p-3 border-b border-slate-100">
          <div class="relative">
            <svg class="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
                 fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0"/>
            </svg>
            <input
              type="text"
              [value]="searchTerm"
              (input)="onSearch($event)"
              placeholder="Filtrer..."
              class="w-full pl-8 pr-3 py-1.5 text-sm border border-slate-300 rounded-lg
                     focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <!-- Bouton Nouveau -->
        <div class="px-3 py-2 border-b border-slate-100">
          <button
            class="w-full flex items-center justify-center gap-2 py-1.5 px-3 text-sm font-medium
                   text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
            (click)="newRecord()"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
            </svg>
            Nouveau
          </button>
        </div>

        <!-- Liste des enregistrements -->
        <div class="flex-1 overflow-y-auto divide-y divide-slate-50">
          @if (isLoading()) {
            @for (_ of [1,2,3,4,5]; track $index) {
              <div class="px-4 py-3 space-y-1.5">
                <div class="h-4 bg-slate-100 rounded animate-pulse w-3/4"></div>
                <div class="h-3 bg-slate-100 rounded animate-pulse w-1/2"></div>
              </div>
            }
          } @else if (rows().length === 0) {
            <div class="px-4 py-8 text-center text-slate-400 text-sm">Aucun enregistrement</div>
          } @else {
            @for (row of rows(); track $index) {
              <button
                class="w-full text-left px-4 py-3 hover:bg-slate-50 transition-colors"
                [class.bg-blue-50]="selectedRow() === row"
                [class.border-l-2]="selectedRow() === row"
                [class.border-blue-600]="selectedRow() === row"
                (click)="selectRow(row)"
              >
                <!-- Affiche les 2 premières colonnes GRID comme titre/sous-titre -->
                <p class="text-sm font-medium text-slate-800 truncate">
                  {{ getCellValue(row, 0) }}
                </p>
                @if (masterColumns()[1]) {
                  <p class="text-xs text-slate-500 mt-0.5 truncate">
                    {{ getCellValue(row, 1) }}
                  </p>
                }
              </button>
            }
          }
        </div>

        <!-- Pagination simplifiée -->
        <div class="border-t border-slate-200 px-3 py-2 flex items-center justify-between">
          <span class="text-xs text-slate-400">{{ totalElements() }} éléments</span>
          <div class="flex gap-1">
            <button
              class="px-2 py-1 text-xs border border-slate-300 rounded hover:bg-slate-50
                     disabled:opacity-40 disabled:cursor-not-allowed"
              [disabled]="currentPage() === 0"
              (click)="prevPage()"
            >
              ‹
            </button>
            <button
              class="px-2 py-1 text-xs border border-slate-300 rounded hover:bg-slate-50
                     disabled:opacity-40 disabled:cursor-not-allowed"
              [disabled]="currentPage() >= totalPages() - 1"
              (click)="nextPage()"
            >
              ›
            </button>
          </div>
        </div>
      </div>

      <!-- ===== DETAIL (Formulaire droit) ===== -->
      <div class="flex-1 overflow-y-auto bg-slate-50">
        @if (selectedRow() || isCreating()) {
          <div class="p-6">
            <!-- Sous-titre contextuel -->
            <div class="mb-4 pb-4 border-b border-slate-200">
              <h2 class="text-base font-semibold text-slate-800">
                {{ isCreating() ? 'Nouvel enregistrement' : 'Modification' }}
              </h2>
            </div>
            <!-- Formulaire dynamique réutilisé -->
            <app-form-generator [metadata]="detailMetadata()" />
          </div>
        } @else {
          <!-- Placeholder -->
          <div class="flex flex-col items-center justify-center h-full gap-3 text-slate-400">
            <svg class="w-16 h-16 text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            <p class="text-sm">Sélectionner un élément dans la liste</p>
          </div>
        }
      </div>
    </div>
  `,
  host: { class: 'flex h-full overflow-hidden' },
})
export class MasterDetailComponent implements OnInit {
  @Input({ required: true }) metadata!: ScreenMetadata;

  private readonly http = inject(HttpClient);

  readonly rows          = signal<Record<string, unknown>[]>([]);
  readonly isLoading     = signal(false);
  readonly selectedRow   = signal<Record<string, unknown> | null>(null);
  readonly isCreating    = signal(false);
  readonly currentPage   = signal(0);
  readonly totalElements = signal(0);
  readonly totalPages    = signal(0);

  searchTerm = '';

  /** Colonnes affichées dans la liste Master */
  readonly masterColumns = () =>
    this.metadata.components.filter(c => c.gridColumn).slice(0, 3);

  /** Accès typé à une valeur de cellule — évite l'indexation par undefined */
  getCellValue(row: Record<string, unknown>, colIndex: number): string {
    const col = this.masterColumns()[colIndex];
    if (!col) return '';
    return String(row[col.fieldKey] ?? (colIndex === 0 ? '—' : ''));
  }

  /**
   * Métadonnée adaptée pour le formulaire Detail :
   * tous les composants (avec ou sans IS_GRID_COLUMN)
   * et l'URL pointant sur la ressource sélectionnée.
   */
  detailMetadata(): ScreenMetadata {
    const selected = this.selectedRow();
    const id       = selected ? selected['id'] ?? selected['screenId'] : null;
    return {
      ...this.metadata,
      apiBaseUrl: id ? `${this.metadata.apiBaseUrl}/${id}` : this.metadata.apiBaseUrl,
    };
  }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.isLoading.set(true);
    const params = new HttpParams()
      .set('page', this.currentPage())
      .set('size', this.metadata.gridConfig?.pageSize ?? 15)
      .set('search', this.searchTerm);

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

  selectRow(row: Record<string, unknown>): void {
    this.selectedRow.set(row);
    this.isCreating.set(false);
  }

  newRecord(): void {
    this.selectedRow.set(null);
    this.isCreating.set(true);
  }

  onSearch(event: Event): void {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.currentPage.set(0);
    this.loadData();
  }

  prevPage(): void {
    this.currentPage.update(p => p - 1);
    this.loadData();
  }

  nextPage(): void {
    this.currentPage.update(p => p + 1);
    this.loadData();
  }
}
