import {
  Component, OnInit, inject, signal, computed
} from '@angular/core';
import {
  FormBuilder, FormGroup, ReactiveFormsModule, Validators
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { JsonPipe } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {
  ScreenMetadata, ComponentMetadata, TemplateType
} from '../../../core/models/screen-metadata.model';
import { ComponentEditorComponent } from './component-editor/component-editor.component';

type Tab = 'general' | 'fields' | 'preview';
type DesignerMode = 'list' | 'create' | 'edit';

@Component({
  selector: 'app-screen-designer',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, ComponentEditorComponent],
  template: `
    <div class="flex h-full overflow-hidden">

      <!-- ══════════════════════════════════════
           PANNEAU GAUCHE — Liste des écrans
      ══════════════════════════════════════ -->
      <aside class="w-72 flex-shrink-0 border-r border-slate-200 bg-white flex flex-col">

        <!-- En-tête -->
        <div class="px-4 py-4 border-b border-slate-100">
          <h2 class="text-sm font-semibold text-slate-700">Écrans de l'application</h2>
          <p class="text-xs text-slate-400 mt-0.5">{{ screens().length }} écrans configurés</p>
        </div>

        <!-- Recherche -->
        <div class="px-3 py-2 border-b border-slate-100">
          <div class="relative">
            <svg class="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400"
                 fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0"/>
            </svg>
            <input type="text" [value]="searchTerm()"
                   (input)="searchTerm.set($any($event.target).value)"
                   placeholder="Rechercher un écran..."
                   class="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg
                          focus:ring-2 focus:ring-blue-500 focus:outline-none" />
          </div>
        </div>

        <!-- Liste -->
        <div class="flex-1 overflow-y-auto py-1">
          @if (isLoadingList()) {
            @for (_ of [1,2,3,4,5]; track $index) {
              <div class="mx-3 my-1 h-12 bg-slate-100 rounded-lg animate-pulse"></div>
            }
          } @else {
            @for (screen of filteredScreens(); track screen.screenId) {
              <button
                class="w-full text-left px-3 py-2.5 mx-0 flex items-start gap-2.5 group
                       hover:bg-slate-50 transition-colors border-l-2"
                [class.border-blue-600]="selectedScreen()?.screenId === screen.screenId"
                [class.bg-blue-50]="selectedScreen()?.screenId === screen.screenId"
                [class.border-transparent]="selectedScreen()?.screenId !== screen.screenId"
                (click)="selectScreen(screen)"
              >
                <!-- Icône template -->
                <div class="flex-shrink-0 mt-0.5">
                  <span [class]="templateBadgeClass(screen.templateType)"
                        class="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold">
                    {{ screen.templateType.slice(0,1) }}
                  </span>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-xs font-semibold text-slate-800 truncate">{{ screen.title }}</p>
                  <p class="text-[10px] text-slate-400 truncate font-mono mt-0.5">{{ screen.code }}</p>
                </div>
              </button>
            }
            @if (filteredScreens().length === 0) {
              <p class="text-center text-xs text-slate-400 py-8">Aucun résultat</p>
            }
          }
        </div>

        <!-- Bouton Nouveau -->
        <div class="p-3 border-t border-slate-100">
          <button
            class="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-medium
                   text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
            (click)="startCreate()"
          >
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
            </svg>
            Nouvel Écran
          </button>
        </div>
      </aside>

      <!-- ══════════════════════════════════════
           PANNEAU DROIT — Éditeur
      ══════════════════════════════════════ -->
      <main class="flex-1 flex flex-col overflow-hidden bg-slate-50">

        @if (mode() === 'list' && !selectedScreen()) {
          <!-- État vide -->
          <div class="flex-1 flex flex-col items-center justify-center gap-4 text-slate-400">
            <svg class="w-20 h-20 text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7"/>
            </svg>
            <div class="text-center">
              <p class="text-sm font-medium text-slate-600">Sélectionnez un écran</p>
              <p class="text-xs mt-1">ou créez-en un nouveau depuis la liste à gauche</p>
            </div>
          </div>
        } @else {
          <!-- En-tête éditeur -->
          <div class="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between">
            <div>
              <h1 class="text-sm font-semibold text-slate-800">
                {{ mode() === 'create' ? '+ Nouvel écran' : selectedScreen()?.title }}
              </h1>
              @if (selectedScreen() && mode() === 'edit') {
                <p class="text-xs text-slate-400 font-mono">{{ selectedScreen()!.code }}</p>
              }
            </div>
            <!-- Actions rapides -->
            @if (mode() === 'edit' && selectedScreen()) {
              <button
                class="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-700
                       hover:bg-red-50 px-3 py-1.5 rounded-lg border border-transparent
                       hover:border-red-200 transition-all"
                (click)="deleteScreen()"
              >
                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
                Désactiver
              </button>
            }
          </div>

          <!-- Onglets -->
          <div class="bg-white border-b border-slate-200 px-6 flex gap-1">
            @for (tab of tabs; track tab.key) {
              <button
                class="px-4 py-2.5 text-xs font-medium border-b-2 transition-colors"
                [class.border-blue-600]="activeTab() === tab.key"
                [class.text-blue-600]="activeTab() === tab.key"
                [class.border-transparent]="activeTab() !== tab.key"
                [class.text-slate-500]="activeTab() !== tab.key"
                [class.hover:text-slate-800]="activeTab() !== tab.key"
                (click)="activeTab.set(tab.key)"
              >
                {{ tab.label }}
                @if (tab.key === 'fields' && selectedScreen()) {
                  <span class="ml-1.5 px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded-full text-[10px]">
                    {{ components().length }}
                  </span>
                }
              </button>
            }
          </div>

          <!-- Contenu des onglets -->
          <div class="flex-1 overflow-auto p-6">

            <!-- ─── ONGLET GÉNÉRAL ──────────────────────────── -->
            @if (activeTab() === 'general') {
              <form [formGroup]="screenForm" (ngSubmit)="saveScreen()" class="max-w-2xl space-y-5">

                <!-- Code (readonly en édition) -->
                <div>
                  <label class="field-label">Code technique <span class="text-red-500">*</span></label>
                  <input formControlName="code" type="text" placeholder="SCR_MON_ECRAN"
                         class="field-input font-mono uppercase"
                         [readonly]="mode() === 'edit'"
                         [class.bg-slate-50]="mode() === 'edit'" />
                  @if (hasError('code', 'pattern')) {
                    <p class="field-error">Majuscules, chiffres et underscores uniquement</p>
                  }
                  @if (mode() === 'edit') {
                    <p class="text-[10px] text-slate-400 mt-1">Le code est immuable après création</p>
                  }
                </div>

                <!-- Sélecteur visuel de template -->
                <div>
                  <label class="field-label">Type de template <span class="text-red-500">*</span></label>
                  <div class="grid grid-cols-5 gap-2 mt-1">
                    @for (tpl of templateOptions; track tpl.value) {
                      <button type="button"
                        (click)="screenForm.get('templateType')!.setValue(tpl.value)"
                        class="flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all text-center group"
                        [class]="screenForm.get('templateType')?.value === tpl.value
                          ? tpl.selectedClass
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'">
                        <!-- Icône -->
                        <div class="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                             [class]="screenForm.get('templateType')?.value === tpl.value
                               ? tpl.iconBg
                               : 'bg-slate-100 group-hover:bg-slate-200'"
                             [innerHTML]="getTemplateIconSvg(tpl.value, screenForm.get('templateType')?.value === tpl.value)">
                        </div>
                        <!-- Label -->
                        <span class="text-[11px] font-semibold leading-tight"
                              [class]="screenForm.get('templateType')?.value === tpl.value
                                ? tpl.labelColor : 'text-slate-600'">
                          {{ tpl.label }}
                        </span>
                        <!-- Description -->
                        <span class="text-[9px] leading-tight text-slate-400 hidden xl:block">
                          {{ tpl.description }}
                        </span>
                      </button>
                    }
                  </div>
                  @if (screenForm.get('templateType')?.invalid && screenForm.get('templateType')?.touched) {
                    <p class="field-error mt-1">Veuillez sélectionner un type de template</p>
                  }
                </div>

                <!-- Composant personnalisé (CUSTOM uniquement) -->
                @if (screenForm.get('templateType')?.value === 'CUSTOM') {
                  <div>
                    <label class="field-label">Nom du composant Angular <span class="text-red-500">*</span></label>
                    <input formControlName="customComponentName" type="text"
                           placeholder="app-mon-composant-custom"
                           class="field-input font-mono text-xs" />
                    <p class="text-[10px] text-slate-400 mt-1">
                      Selector Angular du composant (ex: <code class="bg-slate-100 px-1 rounded">app-obligations-chart</code>)
                    </p>
                  </div>
                }

                <div>
                  <label class="field-label">Titre affiché <span class="text-red-500">*</span></label>
                  <input formControlName="title" type="text" placeholder="Gestion des Obligations"
                         class="field-input" />
                </div>

                <div>
                  <label class="field-label">Description</label>
                  <textarea formControlName="description" rows="2" placeholder="Description fonctionnelle de l'écran..."
                            class="field-input resize-none"></textarea>
                </div>

                <div>
                  <label class="field-label">URL de l'API de données <span class="text-red-500">*</span></label>
                  <input formControlName="apiBaseUrl" type="text"
                         placeholder="/api/v1/marche/obligations"
                         class="field-input font-mono text-xs" />
                  <p class="text-[10px] text-slate-400 mt-1">
                    URL relative Spring Boot. GET=liste, POST=créer, GET/:id=détail, PUT/:id=modifier
                  </p>
                </div>

                <!-- Permissions JSON -->
                <div>
                  <label class="field-label">Permissions (JSON)</label>
                  <textarea formControlName="permissionsRaw" rows="3"
                            placeholder='{"read":["ROLE_USER"],"write":["ROLE_TRADER"],"delete":["ROLE_ADMIN"]}'
                            class="field-input font-mono text-xs resize-none"></textarea>
                  @if (jsonError()['permissions']) {
                    <p class="field-error">JSON invalide : {{ jsonError()['permissions'] }}</p>
                  }
                </div>

                <!-- Config Grid (conditionnel) -->
                @if (screenForm.get('templateType')?.value === 'GRID' ||
                     screenForm.get('templateType')?.value === 'MASTER_DETAIL') {
                  <div>
                    <label class="field-label">Configuration GRID (JSON)</label>
                    <textarea formControlName="gridConfigRaw" rows="4"
                              placeholder='{"pageSize":20,"defaultSort":"createdAt","defaultSortDir":"desc","exportFormats":["CSV","EXCEL"]}'
                              class="field-input font-mono text-xs resize-none"></textarea>
                    @if (jsonError()['gridConfig']) {
                      <p class="field-error">JSON invalide : {{ jsonError()['gridConfig'] }}</p>
                    }
                  </div>
                }

                <!-- Config Analytics (conditionnel) -->
                @if (screenForm.get('templateType')?.value === 'ANALYTICS') {
                  <div>
                    <label class="field-label">Configuration ANALYTICS (JSON)</label>
                    <textarea formControlName="analyticsConfigRaw" rows="6"
                              placeholder='{"kpis":[...],"charts":[...]}'
                              class="field-input font-mono text-xs resize-none"></textarea>
                    @if (jsonError()['analyticsConfig']) {
                      <p class="field-error">JSON invalide : {{ jsonError()['analyticsConfig'] }}</p>
                    }
                  </div>
                }

                <div class="flex justify-end gap-3 pt-2 border-t border-slate-200">
                  <button type="button" class="btn-secondary text-xs" (click)="cancelEdit()">
                    Annuler
                  </button>
                  <button type="submit"
                          [disabled]="screenForm.invalid || isSaving()"
                          class="btn-primary text-xs">
                    {{ isSaving() ? 'Enregistrement...' : saveLabel() }}
                  </button>
                </div>
              </form>
            }

            <!-- ─── ONGLET CHAMPS ───────────────────────────── -->
            @if (activeTab() === 'fields') {
              <div class="max-w-4xl space-y-4">

                <!-- Toolbar -->
                <div class="flex items-center justify-between">
                  <p class="text-xs text-slate-500">
                    <span class="font-semibold text-slate-700">{{ components().length }}</span> champs configurés
                    — glisser-déposer pour réordonner
                  </p>
                  <button
                    class="btn-primary text-xs flex items-center gap-1.5"
                    (click)="openComponentEditor(null)"
                  >
                    <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
                    </svg>
                    Ajouter un champ
                  </button>
                </div>

                <!-- Table des composants -->
                <div class="bg-white rounded-xl border border-slate-200 overflow-hidden">
                  <table class="w-full text-xs">
                    <thead>
                      <tr class="bg-slate-50 border-b border-slate-200 text-left">
                        <th class="px-3 py-2.5 w-8"></th>
                        <th class="px-3 py-2.5 font-semibold text-slate-600">Clé API</th>
                        <th class="px-3 py-2.5 font-semibold text-slate-600">Libellé</th>
                        <th class="px-3 py-2.5 font-semibold text-slate-600">Type</th>
                        <th class="px-3 py-2.5 font-semibold text-slate-600 text-center">Requis</th>
                        <th class="px-3 py-2.5 font-semibold text-slate-600 text-center">Visible</th>
                        <th class="px-3 py-2.5 font-semibold text-slate-600 text-center">Colonne</th>
                        <th class="px-3 py-2.5 font-semibold text-slate-600 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                      @if (isLoadingComponents()) {
                        @for (_ of [1,2,3]; track $index) {
                          <tr>
                            @for (__ of [1,2,3,4,5,6,7,8]; track $index) {
                              <td class="px-3 py-2.5">
                                <div class="h-3 bg-slate-100 rounded animate-pulse"></div>
                              </td>
                            }
                          </tr>
                        }
                      } @else if (components().length === 0) {
                        <tr>
                          <td colspan="8" class="px-4 py-10 text-center text-slate-400">
                            Aucun champ — cliquez sur "Ajouter un champ" pour commencer
                          </td>
                        </tr>
                      } @else {
                        @for (comp of components(); track comp.componentId; let i = $index) {
                          <tr class="hover:bg-slate-50 transition-colors group"
                              [class.opacity-50]="!comp.visible">
                            <!-- Drag handle -->
                            <td class="px-3 py-2.5 text-slate-300 group-hover:text-slate-500 cursor-grab">
                              ⠿
                            </td>
                            <td class="px-3 py-2.5 font-mono text-slate-700">{{ comp.fieldKey }}</td>
                            <td class="px-3 py-2.5 text-slate-700">{{ comp.label }}</td>
                            <td class="px-3 py-2.5">
                              <span [class]="typeBadgeClass(comp.componentType)"
                                    class="inline-flex px-1.5 py-0.5 rounded text-[10px] font-medium">
                                {{ comp.componentType }}
                              </span>
                            </td>
                            <td class="px-3 py-2.5 text-center">
                              <span [class]="comp.required ? 'text-green-500' : 'text-slate-300'">
                                {{ comp.required ? '✓' : '—' }}
                              </span>
                            </td>
                            <td class="px-3 py-2.5 text-center">
                              <span [class]="comp.visible ? 'text-green-500' : 'text-slate-300'">
                                {{ comp.visible ? '✓' : '—' }}
                              </span>
                            </td>
                            <td class="px-3 py-2.5 text-center">
                              <span [class]="comp.gridColumn ? 'text-blue-500' : 'text-slate-300'">
                                {{ comp.gridColumn ? '✓' : '—' }}
                              </span>
                            </td>
                            <td class="px-3 py-2.5">
                              <div class="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <!-- Monter / Descendre -->
                                <button class="p-1 text-slate-400 hover:text-slate-700 rounded"
                                        [disabled]="i === 0"
                                        (click)="moveComponent(i, -1)" title="Monter">↑</button>
                                <button class="p-1 text-slate-400 hover:text-slate-700 rounded"
                                        [disabled]="i === components().length - 1"
                                        (click)="moveComponent(i, 1)" title="Descendre">↓</button>
                                <!-- Éditer -->
                                <button
                                  class="p-1 text-blue-400 hover:text-blue-700 hover:bg-blue-50 rounded"
                                  (click)="openComponentEditor(comp)" title="Modifier">
                                  <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                  </svg>
                                </button>
                                <!-- Supprimer -->
                                <button
                                  class="p-1 text-red-400 hover:text-red-700 hover:bg-red-50 rounded"
                                  (click)="deleteComponent(comp)" title="Supprimer">
                                  <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                  </svg>
                                </button>
                              </div>
                            </td>
                          </tr>
                        }
                      }
                    </tbody>
                  </table>
                </div>

                <!-- Aide SQL équivalent -->
                <div class="bg-amber-50 border border-amber-200 rounded-lg p-4 text-xs text-amber-800">
                  <p class="font-semibold mb-1">💡 Équivalent SQL direct :</p>
                  <code class="font-mono text-[11px] block bg-amber-100 rounded p-2 whitespace-pre-wrap">
INSERT INTO ui_component (screen_id, field_key, label, component_type, is_required, display_order, grid_col_span)
SELECT screen_id, 'monChamp', 'Mon Libellé', 'TEXT', 'Y', {{ (components().length + 1) * 10 }}, 6
FROM ui_screen WHERE code = '{{ selectedScreen()?.code }}';</code>
                </div>
              </div>
            }

            <!-- ─── ONGLET APERÇU JSON ──────────────────────── -->
            @if (activeTab() === 'preview') {
              <div class="max-w-3xl space-y-4">
                <div class="flex items-center gap-3">
                  <p class="text-xs text-slate-500">
                    Payload retourné par
                    <code class="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-blue-700">
                      GET /api/v1/metadata/screens/{{ selectedScreen()?.code }}
                    </code>
                  </p>
                  <button class="text-xs text-blue-600 hover:underline" (click)="copyJson()">
                    Copier JSON
                  </button>
                </div>
                <pre class="bg-slate-900 text-green-300 rounded-xl p-5 text-xs overflow-auto
                            max-h-[60vh] font-mono leading-relaxed">{{ previewJson() }}</pre>
              </div>
            }

          </div>
        }
      </main>
    </div>

    <!-- ══════════════════════════════════════
         SLIDE-OVER : Éditeur de composant
    ══════════════════════════════════════ -->
    @if (componentEditorOpen()) {
      <app-component-editor
        [component]="editingComponent()"
        [screenTemplateType]="selectedScreen()?.templateType ?? 'FORM'"
        (saved)="onComponentSaved($event)"
        (cancelled)="componentEditorOpen.set(false)"
      />
    }
  `,
  styles: [`
    .field-label { @apply block text-xs font-medium text-slate-700 mb-1; }
    .field-input  { @apply w-full px-3 py-2 text-xs border border-slate-300 rounded-lg
                          text-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                          transition-colors bg-white; }
    .field-error  { @apply mt-1 text-[10px] text-red-500; }
    .btn-primary  { @apply px-4 py-2 text-xs font-medium text-white bg-blue-600 rounded-lg
                          hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed; }
    .btn-secondary { @apply px-4 py-2 text-xs font-medium text-slate-700 bg-white border
                           border-slate-300 rounded-lg hover:bg-slate-50 transition-colors; }
  `],
  host: { class: 'flex h-full overflow-hidden' },
})
export class ScreenDesignerComponent implements OnInit {
  private readonly http      = inject(HttpClient);
  private readonly fb        = inject(FormBuilder);
  private readonly sanitizer = inject(DomSanitizer);

  private readonly BASE = '/api/v1/designer';

  // ─── État ──────────────────────────────────────────────────
  readonly screens            = signal<ScreenMetadata[]>([]);
  readonly selectedScreen     = signal<ScreenMetadata | null>(null);
  readonly components         = signal<ComponentMetadata[]>([]);
  readonly mode               = signal<DesignerMode>('list');
  readonly activeTab          = signal<Tab>('general');
  readonly searchTerm         = signal('');
  readonly isLoadingList      = signal(false);
  readonly isLoadingComponents = signal(false);
  readonly isSaving           = signal(false);
  readonly jsonError          = signal<Record<string, string>>({});
  readonly componentEditorOpen = signal(false);
  readonly editingComponent   = signal<ComponentMetadata | null>(null);

  readonly filteredScreens = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.screens().filter(s =>
      s.title.toLowerCase().includes(term) ||
      s.code.toLowerCase().includes(term)
    );
  });

  readonly previewJson = computed(() => {
    if (!this.selectedScreen()) return '';
    const dto = { ...this.selectedScreen(), components: this.components() };
    return JSON.stringify(dto, null, 2);
  });

  readonly tabs: { key: Tab; label: string }[] = [
    { key: 'general', label: 'Général' },
    { key: 'fields',  label: 'Champs' },
    { key: 'preview', label: 'Aperçu JSON' },
  ];

  // ─── Formulaire écran ──────────────────────────────────────
  screenForm!: FormGroup;

  ngOnInit(): void {
    this.buildScreenForm();
    this.loadScreens();
  }

  readonly templateOptions = [
    {
      value: 'FORM',
      label: 'Input',
      description: 'Formulaire de saisie',
      iconPath: '<path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>',
      selectedClass: 'border-purple-500 bg-purple-50',
      iconBg:        'bg-purple-100',
      iconColor:     'text-purple-600',
      labelColor:    'text-purple-700',
    },
    {
      value: 'GRID',
      label: 'Grid',
      description: 'Tableau + filtres',
      iconPath: '<path stroke-linecap="round" stroke-linejoin="round" d="M3 10h18M3 14h18M10 6h4M10 18h4M3 6h4M3 18h4M17 6h4M17 18h4"/>',
      selectedClass: 'border-blue-500 bg-blue-50',
      iconBg:        'bg-blue-100',
      iconColor:     'text-blue-600',
      labelColor:    'text-blue-700',
    },
    {
      value: 'MASTER_DETAIL',
      label: 'Input + Grid',
      description: 'Formulaire + tableau',
      iconPath: '<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 10h16M4 14h8M4 18h8M14 14h6v6h-6v-6z"/>',
      selectedClass: 'border-green-500 bg-green-50',
      iconBg:        'bg-green-100',
      iconColor:     'text-green-600',
      labelColor:    'text-green-700',
    },
    {
      value: 'ANALYTICS',
      label: 'Chart',
      description: 'Graphiques & KPIs',
      iconPath: '<path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>',
      selectedClass: 'border-amber-500 bg-amber-50',
      iconBg:        'bg-amber-100',
      iconColor:     'text-amber-600',
      labelColor:    'text-amber-700',
    },
    {
      value: 'CUSTOM',
      label: 'Customized',
      description: 'Composant Angular',
      iconPath: '<path stroke-linecap="round" stroke-linejoin="round" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"/>',
      selectedClass: 'border-rose-500 bg-rose-50',
      iconBg:        'bg-rose-100',
      iconColor:     'text-rose-600',
      labelColor:    'text-rose-700',
    },
  ];

  private buildScreenForm(): void {
    this.screenForm = this.fb.group({
      code:                ['', [Validators.required, Validators.pattern('^[A-Z0-9_]{3,50}$')]],
      title:               ['', [Validators.required, Validators.maxLength(200)]],
      description:         [''],
      templateType:        ['', Validators.required],
      apiBaseUrl:          ['', [Validators.required, Validators.maxLength(500)]],
      permissionsRaw:      [''],
      gridConfigRaw:       [''],
      analyticsConfigRaw:  [''],
      customComponentName: [''],
    });
  }

  // ─── CRUD Screens ──────────────────────────────────────────

  loadScreens(): void {
    this.isLoadingList.set(true);
    this.http.get<ScreenMetadata[]>(`${this.BASE}/screens`).subscribe({
      next: list => { this.screens.set(list); this.isLoadingList.set(false); },
      error: ()  => this.isLoadingList.set(false),
    });
  }

  selectScreen(screen: ScreenMetadata): void {
    this.selectedScreen.set(screen);
    this.mode.set('edit');
    this.activeTab.set('general');
    this.patchForm(screen);
    this.loadComponents(screen.screenId!);
  }

  startCreate(): void {
    this.selectedScreen.set(null);
    this.mode.set('create');
    this.activeTab.set('general');
    this.screenForm.reset();
    this.screenForm.get('code')?.enable();
    this.components.set([]);
  }

  saveScreen(): void {
    if (this.screenForm.invalid) { this.screenForm.markAllAsTouched(); return; }
    const errs: Record<string, string> = {};
    const permissions    = this.parseJson('permissionsRaw',     errs);
    const gridConfig     = this.parseJson('gridConfigRaw',      errs);
    const analyticsConfig= this.parseJson('analyticsConfigRaw', errs);
    if (Object.keys(errs).length) { this.jsonError.set(errs); return; }
    this.jsonError.set({});

    const v = this.screenForm.getRawValue();
    this.isSaving.set(true);

    if (this.mode() === 'create') {
      this.http.post<ScreenMetadata>(`${this.BASE}/screens`, {
        code: v.code, title: v.title, description: v.description,
        templateType: v.templateType, apiBaseUrl: v.apiBaseUrl,
        permissions, gridConfig, analyticsConfig,
        customComponentName: v.templateType === 'CUSTOM' ? v.customComponentName : null,
      }).subscribe({
        next: created => {
          this.screens.update(list => [...list, created]);
          this.selectedScreen.set(created);
          this.mode.set('edit');
          this.activeTab.set('fields');
          this.isSaving.set(false);
        },
        error: () => this.isSaving.set(false),
      });
    } else {
      const id = this.selectedScreen()!.screenId!;
      this.http.put<ScreenMetadata>(`${this.BASE}/screens/${id}`, {
        title: v.title, description: v.description,
        templateType: v.templateType, apiBaseUrl: v.apiBaseUrl,
        permissions, gridConfig, analyticsConfig, isActive: 'Y',
        customComponentName: v.templateType === 'CUSTOM' ? v.customComponentName : null,
      }).subscribe({
        next: updated => {
          this.selectedScreen.set(updated);
          this.screens.update(list => list.map(s => s.screenId === id ? updated : s));
          this.isSaving.set(false);
        },
        error: () => this.isSaving.set(false),
      });
    }
  }

  deleteScreen(): void {
    if (!confirm(`Désactiver l'écran "${this.selectedScreen()?.title}" ?`)) return;
    const id = this.selectedScreen()!.screenId!;
    this.http.delete(`${this.BASE}/screens/${id}`).subscribe(() => {
      this.screens.update(list => list.filter(s => s.screenId !== id));
      this.selectedScreen.set(null);
      this.mode.set('list');
    });
  }

  cancelEdit(): void {
    if (this.mode() === 'create') {
      this.mode.set('list');
      this.selectedScreen.set(null);
    } else {
      this.patchForm(this.selectedScreen()!);
    }
  }

  // ─── CRUD Components ───────────────────────────────────────

  loadComponents(screenId: number): void {
    this.isLoadingComponents.set(true);
    this.http.get<ComponentMetadata[]>(`${this.BASE}/screens/${screenId}/components`).subscribe({
      next: list => { this.components.set(list); this.isLoadingComponents.set(false); },
      error: ()  => this.isLoadingComponents.set(false),
    });
  }

  openComponentEditor(comp: ComponentMetadata | null): void {
    this.editingComponent.set(comp);
    this.componentEditorOpen.set(true);
  }

  onComponentSaved(comp: ComponentMetadata): void {
    const screenId = this.selectedScreen()!.screenId!;
    const isExisting = !!comp.componentId;
    const url = isExisting
      ? `${this.BASE}/screens/${screenId}/components/${comp.componentId}`
      : `${this.BASE}/screens/${screenId}/components`;

    // Sérialisation du payload au format SaveComponentRequest attendu par le backend
    const body: Record<string, unknown> = { ...comp };

    const req$ = isExisting
      ? this.http.put<ComponentMetadata>(url, body)
      : this.http.post<ComponentMetadata>(url, body);

    req$.subscribe(saved => {
      if (isExisting) {
        this.components.update(list =>
          list.map(c => c.componentId === saved.componentId ? saved : c)
        );
      } else {
        this.components.update(list => [...list, saved]);
      }
      this.componentEditorOpen.set(false);
    });
  }

  deleteComponent(comp: ComponentMetadata): void {
    if (!confirm(`Supprimer définitivement le champ "${comp.label}" ?`)) return;
    const screenId = this.selectedScreen()!.screenId!;
    this.http.delete(`${this.BASE}/screens/${screenId}/components/${comp.componentId}`).subscribe(() => {
      this.components.update(list => list.filter(c => c.componentId !== comp.componentId));
    });
  }

  /** Déplace un composant dans la liste et sauvegarde l'ordre */
  moveComponent(index: number, direction: -1 | 1): void {
    const list  = [...this.components()];
    const swap  = index + direction;
    if (swap < 0 || swap >= list.length) return;
    [list[index], list[swap]] = [list[swap], list[index]];
    this.components.set(list);
    this.saveOrder(list);
  }

  private saveOrder(list: ComponentMetadata[]): void {
    const screenId = this.selectedScreen()!.screenId!;
    const orderedComponentIds = list.map(c => c.componentId!);
    this.http.patch(`${this.BASE}/screens/${screenId}/components/reorder`,
      { orderedComponentIds }).subscribe();
  }

  copyJson(): void {
    navigator.clipboard.writeText(this.previewJson());
  }

  // ─── Helpers ───────────────────────────────────────────────

  private patchForm(screen: ScreenMetadata): void {
    this.screenForm.patchValue({
      code:                screen.code,
      title:               screen.title,
      description:         screen.description ?? '',
      templateType:        screen.templateType,
      apiBaseUrl:          screen.apiBaseUrl,
      permissionsRaw:      screen.permissions ? JSON.stringify(screen.permissions, null, 2) : '',
      gridConfigRaw:       screen.gridConfig  ? JSON.stringify(screen.gridConfig,  null, 2) : '',
      analyticsConfigRaw:  screen.analyticsConfig ? JSON.stringify(screen.analyticsConfig, null, 2) : '',
      customComponentName: screen.customComponentName ?? '',
    });
    this.screenForm.get('code')?.disable();
  }

  private parseJson(
    controlName: string,
    errors: Record<string, string>
  ): Record<string, unknown> | null {
    const raw = (this.screenForm.get(controlName)?.value ?? '').trim();
    if (!raw) return null;
    try { return JSON.parse(raw); }
    catch (e: unknown) {
      const key = controlName.replace('Raw', '');
      errors[key] = e instanceof Error ? e.message : 'JSON invalide';
      return null;
    }
  }

  saveLabel(): string {
    return this.mode() === 'create' ? "Créer l'écran" : 'Enregistrer';
  }

  hasError(field: string, error: string): boolean {
    const ctrl = this.screenForm.get(field);
    return !!(ctrl?.hasError(error) && (ctrl.dirty || ctrl.touched));
  }

  templateBadgeClass(type: string): string {
    const map: Record<string, string> = {
      GRID:          'bg-blue-100 text-blue-700',
      FORM:          'bg-purple-100 text-purple-700',
      MASTER_DETAIL: 'bg-green-100 text-green-700',
      ANALYTICS:     'bg-amber-100 text-amber-700',
      CUSTOM:        'bg-rose-100 text-rose-700',
    };
    return map[type] ?? 'bg-slate-100 text-slate-600';
  }

  getTemplateIconSvg(value: string, active: boolean): SafeHtml {
    const color = active
      ? { FORM: '#9333ea', GRID: '#2563eb', MASTER_DETAIL: '#16a34a', ANALYTICS: '#d97706', CUSTOM: '#e11d48' }[value] ?? '#64748b'
      : '#94a3b8';
    const paths: Record<string, string> = {
      FORM:          'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
      GRID:          'M3 10h18M3 14h18M10 6v12M14 6v12M3 6h18v12H3z',
      MASTER_DETAIL: 'M4 5h16v5H4zM4 13h7v6H4zM13 13h7v2h-7zM13 17h5',
      ANALYTICS:     'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
      CUSTOM:        'M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5',
    };
    const d = paths[value] ?? paths['FORM'];
    const svg = `<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="${d}"/></svg>`;
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }

  typeBadgeClass(type: string): string {
    if (['TEXT','EMAIL','PASSWORD','TEXTAREA'].includes(type)) return 'bg-slate-100 text-slate-600';
    if (['NUMBER','AMOUNT','CURRENCY'].includes(type))         return 'bg-blue-50 text-blue-700';
    if (['SELECT','MULTISELECT','AUTOCOMPLETE'].includes(type))return 'bg-purple-50 text-purple-700';
    if (['DATE','DATETIME','TIME'].includes(type))             return 'bg-amber-50 text-amber-700';
    if (['CHECKBOX','RADIO','SWITCH'].includes(type))          return 'bg-green-50 text-green-700';
    return 'bg-slate-50 text-slate-500';
  }
}
