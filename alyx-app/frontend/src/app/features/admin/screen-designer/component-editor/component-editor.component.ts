import {
  Component, Input, Output, EventEmitter, OnInit, inject, signal
} from '@angular/core';
import {
  FormBuilder, FormGroup, ReactiveFormsModule, Validators
} from '@angular/forms';
import {
  ComponentMetadata, ComponentType, VisibilityRule
} from '../../../../core/models/screen-metadata.model';

interface ComponentTypeOption {
  group: string;
  types: { value: ComponentType; label: string }[];
}

@Component({
  selector: 'app-component-editor',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <!-- Overlay -->
    <div class="fixed inset-0 bg-black/30 z-40" (click)="cancelled.emit()"></div>

    <!-- Panneau slide-over -->
    <div class="fixed inset-y-0 right-0 w-[480px] bg-white shadow-2xl z-50
                flex flex-col border-l border-slate-200">

      <!-- En-tête -->
      <div class="flex items-center justify-between px-5 py-4 border-b border-slate-200 bg-slate-50">
        <div>
          <h2 class="text-sm font-semibold text-slate-800">
            {{ isEdit ? 'Modifier le champ' : 'Nouveau champ' }}
          </h2>
          @if (isEdit) {
            <p class="text-xs text-slate-400 font-mono mt-0.5">{{ component?.fieldKey }}</p>
          }
        </div>
        <button class="text-slate-400 hover:text-slate-700 p-1 rounded" (click)="cancelled.emit()">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Onglets internes -->
      <div class="border-b border-slate-200 px-5 flex gap-1 bg-white">
        @for (t of innerTabs; track t.key) {
          <button
            class="px-3 py-2 text-xs border-b-2 transition-colors"
            [class.border-blue-600]="innerTab() === t.key"
            [class.text-blue-600]="innerTab() === t.key"
            [class.border-transparent]="innerTab() !== t.key"
            [class.text-slate-500]="innerTab() !== t.key"
            (click)="innerTab.set(t.key)"
          >{{ t.label }}</button>
        }
      </div>

      <!-- Formulaire scrollable -->
      <form [formGroup]="form" (ngSubmit)="save()" class="flex-1 overflow-y-auto">
        <div class="px-5 py-4 space-y-4">

          <!-- ─── ONGLET IDENTITÉ ─── -->
          @if (innerTab() === 'identity') {

            <div class="grid grid-cols-2 gap-3">
              <!-- Clé API -->
              <div class="col-span-1">
                <label class="flabel">Clé API <span class="text-red-500">*</span></label>
                <input formControlName="fieldKey" type="text"
                       placeholder="nomChamp" class="finput font-mono"
                       [readonly]="isEdit"
                       [class.bg-slate-50]="isEdit" />
                @if (!isEdit) {
                  <p class="fhint">camelCase recommandé. Ex: isinCode, tauxNominal</p>
                }
              </div>
              <!-- Span colonnes -->
              <div class="col-span-1">
                <label class="flabel">Largeur (1-12 col.) <span class="text-red-500">*</span></label>
                <input formControlName="gridColSpan" type="number" min="1" max="12"
                       class="finput" />
                <p class="fhint">6 = demi-écran · 12 = plein écran</p>
              </div>
            </div>

            <!-- Libellé -->
            <div>
              <label class="flabel">Libellé affiché <span class="text-red-500">*</span></label>
              <input formControlName="label" type="text"
                     placeholder="Code ISIN" class="finput" />
            </div>

            <!-- Type de composant -->
            <div>
              <label class="flabel">Type de composant <span class="text-red-500">*</span></label>
              <select formControlName="componentType" class="finput">
                <option value="">-- Choisir --</option>
                @for (group of componentTypeOptions; track group.group) {
                  <optgroup [label]="group.group">
                    @for (t of group.types; track t.value) {
                      <option [value]="t.value">{{ t.label }}</option>
                    }
                  </optgroup>
                }
              </select>
            </div>

            <!-- Placeholder / Valeur par défaut -->
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="flabel">Placeholder</label>
                <input formControlName="placeholder" type="text" class="finput"
                       placeholder="Saisir une valeur..." />
              </div>
              <div>
                <label class="flabel">Valeur par défaut</label>
                <input formControlName="defaultValue" type="text" class="finput" />
              </div>
            </div>

            <!-- Ordre d'affichage -->
            <div>
              <label class="flabel">Ordre d'affichage</label>
              <input formControlName="displayOrder" type="number" min="0" class="finput" />
              <p class="fhint">Les champs sont triés par ordre croissant</p>
            </div>

            <!-- Cases à cocher comportement -->
            <div class="bg-slate-50 rounded-lg p-3 space-y-2">
              <p class="text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-2">Comportement</p>
              <div class="grid grid-cols-2 gap-2">
                @for (flag of flagFields; track flag.key) {
                  <label class="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" [formControlName]="flag.key"
                           class="w-3.5 h-3.5 text-blue-600 rounded border-slate-300" />
                    <span class="text-xs text-slate-700 group-hover:text-slate-900">{{ flag.label }}</span>
                  </label>
                }
              </div>
            </div>
          }

          <!-- ─── ONGLET VALIDATION ─── -->
          @if (innerTab() === 'validation') {
            <div class="space-y-4">
              <div>
                <label class="flabel">Expression Régulière (Regex)</label>
                <input formControlName="validationRegex" type="text"
                       placeholder="^[A-Z]{2}[0-9]{10}$"
                       class="finput font-mono text-xs" />
                <p class="fhint">Appliquée côté Angular via Validators.pattern()</p>
              </div>
              <div>
                <label class="flabel">Message d'erreur de validation</label>
                <input formControlName="validationMsg" type="text"
                       placeholder="Format invalide (ex: FR0000000000)"
                       class="finput" />
              </div>
              <div>
                <label class="flabel">Pattern d'affichage</label>
                <input formControlName="formatPattern" type="text"
                       placeholder="FCFA · % · dd/MM/yyyy" class="finput" />
                <p class="fhint">FCFA ou XOF : formatage monétaire · % : pourcentage · dd/MM/yyyy : date</p>
              </div>

              <!-- Règle de visibilité conditionnelle -->
              <div>
                <label class="flabel">Règle de visibilité (JSON)</label>
                <textarea formControlName="visibilityRuleRaw" rows="3"
                          [placeholder]="visibilityPlaceholder"
                          class="finput font-mono text-xs resize-none"></textarea>
                <p class="fhint">
                  Opérateurs : <code class="bg-slate-100 px-1 rounded">eq · neq · in · notin · gt · lt</code>
                </p>
                @if (jsonError()) {
                  <p class="text-[10px] text-red-500 mt-1">{{ jsonError() }}</p>
                }
              </div>
            </div>
          }

          <!-- ─── ONGLET OPTIONS ─── -->
          @if (innerTab() === 'options') {
            <div class="space-y-4">
              <div class="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-700">
                Utilisé pour les types <strong>SELECT, MULTISELECT, AUTOCOMPLETE, BADGE, RADIO</strong>
              </div>

              <div>
                <label class="flabel">Source dynamique (API)</label>
                <input formControlName="optionsSource" type="text"
                       placeholder="/api/v1/ref/emetteurs/search"
                       class="finput font-mono text-xs" />
                <p class="fhint">Endpoint GET retournant un tableau d'objets (value, label). Priorité sur les options statiques.</p>
              </div>

              <div>
                <label class="flabel">Options statiques (JSON)</label>
                <textarea formControlName="optionsJsonRaw" rows="7"
                          [placeholder]="optionsPlaceholder"
                          class="finput font-mono text-xs resize-none"></textarea>
                @if (optionsJsonError()) {
                  <p class="text-[10px] text-red-500 mt-1">{{ optionsJsonError() }}</p>
                }
              </div>
            </div>
          }

        </div>
      </form>

      <!-- Footer actions -->
      <div class="px-5 py-4 border-t border-slate-200 bg-slate-50 flex justify-end gap-3">
        <button type="button" class="btn-sec" (click)="cancelled.emit()">Annuler</button>
        <button type="button" class="btn-pri" (click)="save()" [disabled]="form.invalid">
          {{ isEdit ? 'Enregistrer' : 'Ajouter le champ' }}
        </button>
      </div>
    </div>
  `,
  styles: [`
    .flabel { @apply block text-xs font-medium text-slate-700 mb-1; }
    .finput  { @apply w-full px-3 py-2 text-xs border border-slate-300 rounded-lg
                     text-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                     transition-colors bg-white; }
    .fhint   { @apply mt-1 text-[10px] text-slate-400; }
    .btn-pri { @apply px-4 py-2 text-xs font-medium text-white bg-blue-600 rounded-lg
                     hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed; }
    .btn-sec { @apply px-4 py-2 text-xs font-medium text-slate-700 bg-white border
                     border-slate-300 rounded-lg hover:bg-slate-50 transition-colors; }
  `],
})
export class ComponentEditorComponent implements OnInit {
  @Input() component: ComponentMetadata | null = null;
  @Input() screenTemplateType: string = 'FORM';
  @Output() saved    = new EventEmitter<ComponentMetadata>();
  @Output() cancelled = new EventEmitter<void>();

  private readonly fb = inject(FormBuilder);

  form!: FormGroup;
  readonly innerTab  = signal<'identity' | 'validation' | 'options'>('identity');
  readonly jsonError = signal<string>('');
  readonly optionsJsonError = signal<string>('');

  get isEdit(): boolean { return !!this.component?.componentId; }

  readonly innerTabs = [
    { key: 'identity'  as const, label: 'Identité & Comportement' },
    { key: 'validation'as const, label: 'Validation & Format' },
    { key: 'options'   as const, label: 'Options (SELECT/BADGE)' },
  ];

  readonly flagFields: { key: string; label: string }[] = [
    { key: 'required',    label: 'Champ requis *' },
    { key: 'visible',     label: 'Visible' },
    { key: 'readonly',    label: 'Lecture seule' },
    { key: 'sortable',    label: 'Triable (grille)' },
    { key: 'filterable',  label: 'Filtrable (grille)' },
    { key: 'gridColumn',  label: 'Colonne de grille' },
  ];

  // Placeholders avec accolades — liés via [placeholder] pour éviter le parseur ICU d'Angular
  readonly visibilityPlaceholder = '{"field":"typeInstrument","operator":"eq","value":"OAT"}';
  readonly optionsPlaceholder    = '[{"value":"OAT","label":"OAT - Obligation Assimilable"},{"value":"OBMO","label":"OBMO"}]';

  readonly componentTypeOptions: ComponentTypeOption[] = [
    { group: 'Texte & Numérique', types: [
      { value: 'TEXT',     label: 'TEXT — Texte libre' },
      { value: 'NUMBER',   label: 'NUMBER — Nombre' },
      { value: 'AMOUNT',   label: 'AMOUNT — Montant numérique' },
      { value: 'CURRENCY', label: 'CURRENCY — Montant formaté' },
      { value: 'EMAIL',    label: 'EMAIL — Adresse email' },
      { value: 'PASSWORD', label: 'PASSWORD — Mot de passe' },
      { value: 'TEXTAREA', label: 'TEXTAREA — Texte long' },
    ]},
    { group: 'Listes & Sélection', types: [
      { value: 'SELECT',       label: 'SELECT — Liste déroulante' },
      { value: 'MULTISELECT',  label: 'MULTISELECT — Sélection multiple' },
      { value: 'AUTOCOMPLETE', label: 'AUTOCOMPLETE — Recherche dynamique' },
      { value: 'RADIO',        label: 'RADIO — Boutons radio' },
    ]},
    { group: 'Date & Heure', types: [
      { value: 'DATE',     label: 'DATE — Sélecteur de date' },
      { value: 'DATETIME', label: 'DATETIME — Date et heure' },
      { value: 'TIME',     label: 'TIME — Heure' },
    ]},
    { group: 'Booléens', types: [
      { value: 'CHECKBOX', label: 'CHECKBOX — Case à cocher' },
      { value: 'SWITCH',   label: 'SWITCH — Interrupteur' },
    ]},
    { group: 'Affichage (grille uniquement)', types: [
      { value: 'BADGE',    label: 'BADGE — Étiquette colorée' },
      { value: 'LINK',     label: 'LINK — Lien cliquable' },
      { value: 'PROGRESS', label: 'PROGRESS — Barre de progression' },
      { value: 'IMAGE',    label: 'IMAGE — Vignette image' },
    ]},
    { group: 'Fichier', types: [
      { value: 'FILE', label: 'FILE — Téléchargement de fichier' },
    ]},
  ];

  ngOnInit(): void {
    const c = this.component;
    this.form = this.fb.group({
      fieldKey:         [{ value: c?.fieldKey ?? '', disabled: this.isEdit },
                         [Validators.required, Validators.pattern('^[a-zA-Z][a-zA-Z0-9_]{1,99}$')]],
      label:            [c?.label ?? '',         [Validators.required, Validators.maxLength(200)]],
      componentType:    [c?.componentType ?? '',  Validators.required],
      placeholder:      [c?.placeholder ?? ''],
      defaultValue:     [c?.defaultValue ?? ''],
      displayOrder:     [c?.displayOrder ?? 0,    [Validators.min(0)]],
      gridColSpan:      [c?.gridColSpan ?? 6,     [Validators.required, Validators.min(1), Validators.max(12)]],
      // Flags booléens
      required:         [c?.required   ?? false],
      readonly:         [c?.readonly   ?? false],
      visible:          [c?.visible    ?? true],
      sortable:         [c?.sortable   ?? true],
      filterable:       [c?.filterable ?? false],
      gridColumn:       [c?.gridColumn ?? true],
      // Validation
      validationRegex:  [c?.validationRegex ?? ''],
      validationMsg:    [c?.validationMsg   ?? ''],
      formatPattern:    [c?.formatPattern   ?? ''],
      visibilityRuleRaw:[c?.visibilityRule  ? JSON.stringify(c.visibilityRule, null, 2) : ''],
      // Options
      optionsSource:    [c?.optionsSource ?? ''],
      optionsJsonRaw:   [c?.options?.length ? JSON.stringify(c.options, null, 2) : ''],
    });
  }

  save(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }

    // Parse JSON fields
    let visibilityRule: Record<string, unknown> | null = null;
    let options: unknown[] | null = null;

    const visRaw = this.form.get('visibilityRuleRaw')?.value?.trim();
    if (visRaw) {
      try { visibilityRule = JSON.parse(visRaw); this.jsonError.set(''); }
      catch (e: unknown) {
        this.jsonError.set(e instanceof Error ? e.message : 'JSON invalide');
        this.innerTab.set('validation');
        return;
      }
    }

    const optRaw = this.form.get('optionsJsonRaw')?.value?.trim();
    if (optRaw) {
      try { options = JSON.parse(optRaw); this.optionsJsonError.set(''); }
      catch (e: unknown) {
        this.optionsJsonError.set(e instanceof Error ? e.message : 'JSON invalide');
        this.innerTab.set('options');
        return;
      }
    }

    const v = this.form.getRawValue();
    const payload: ComponentMetadata = {
      componentId:     this.component?.componentId,
      fieldKey:        v.fieldKey,
      label:           v.label,
      componentType:   v.componentType,
      placeholder:     v.placeholder || undefined,
      defaultValue:    v.defaultValue || undefined,
      required:        v.required,
      readonly:        v.readonly,
      visible:         v.visible,
      sortable:        v.sortable,
      filterable:      v.filterable,
      gridColumn:      v.gridColumn,
      displayOrder:    v.displayOrder,
      gridColSpan:     v.gridColSpan,
      validationRegex: v.validationRegex || undefined,
      validationMsg:   v.validationMsg   || undefined,
      formatPattern:   v.formatPattern   || undefined,
      optionsSource:   v.optionsSource   || undefined,
      options:         options as { value: string; label: string }[] | undefined,
      visibilityRule:  visibilityRule as unknown as VisibilityRule ?? undefined,
    };

    this.saved.emit(payload);
  }
}
