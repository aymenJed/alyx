import {
  Component, Input, OnInit, inject, signal
} from '@angular/core';
import {
  FormBuilder, FormGroup, ReactiveFormsModule,
  Validators, AbstractControl, ValidatorFn
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {
  ScreenMetadata, ComponentMetadata, ComponentOption, VisibilityOperator
} from '../../../core/models/screen-metadata.model';

/**
 * FormGenerator — Template 1 (FORM)
 *
 * Construit dynamiquement un formulaire ReactiveForms complet
 * à partir de la configuration JSON de l'écran.
 *
 * Zéro ligne de template spécifique par formulaire métier.
 * Un INSERT dans UI_COMPONENT suffit pour ajouter un champ.
 */
@Component({
  selector: 'app-form-generator',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="p-6 max-w-5xl mx-auto">
      <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-6">

        <!-- Grille de champs — CSS Grid 12 colonnes -->
        <div class="bg-white rounded-xl border border-slate-200 p-6">
          <div class="grid grid-cols-12 gap-4">
            @for (comp of visibleComponents(); track comp.fieldKey) {
              <div [class]="colSpanClass(comp.gridColSpan)">
                <label
                  [for]="comp.fieldKey"
                  class="block text-sm font-medium text-slate-700 mb-1"
                >
                  {{ comp.label }}
                  @if (comp.required) {
                    <span class="text-red-500 ml-0.5">*</span>
                  }
                </label>

                <!-- TEXT / EMAIL / PASSWORD / NUMBER / AMOUNT -->
                @if (['TEXT','EMAIL','PASSWORD','NUMBER','AMOUNT'].includes(comp.componentType)) {
                  <div class="relative">
                    @if (comp.formatPattern === 'FCFA' || comp.formatPattern === 'XOF') {
                      <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-medium">
                        FCFA
                      </span>
                    }
                    <input
                      [id]="comp.fieldKey"
                      [formControlName]="comp.fieldKey"
                      [type]="getInputType(comp.componentType)"
                      [placeholder]="comp.placeholder ?? ''"
                      [readonly]="comp.readonly"
                      class="w-full border border-slate-300 rounded-lg py-2 text-sm
                             text-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                             disabled:bg-slate-50 disabled:text-slate-400 transition-colors"
                      [class.pl-12]="comp.formatPattern === 'FCFA' || comp.formatPattern === 'XOF'"
                      [class.px-3]="comp.formatPattern !== 'FCFA' && comp.formatPattern !== 'XOF'"
                    />
                  </div>
                }

                <!-- DATE / DATETIME -->
                @if (['DATE', 'DATETIME'].includes(comp.componentType)) {
                  <input
                    [id]="comp.fieldKey"
                    [formControlName]="comp.fieldKey"
                    [type]="comp.componentType === 'DATETIME' ? 'datetime-local' : 'date'"
                    [readonly]="comp.readonly"
                    class="w-full px-3 border border-slate-300 rounded-lg py-2 text-sm
                           text-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                }

                <!-- SELECT / AUTOCOMPLETE -->
                @if (['SELECT', 'AUTOCOMPLETE'].includes(comp.componentType)) {
                  <select
                    [id]="comp.fieldKey"
                    [formControlName]="comp.fieldKey"
                    class="w-full px-3 border border-slate-300 rounded-lg py-2 text-sm
                           text-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                           bg-white transition-colors"
                  >
                    <option value="">-- Choisir --</option>
                    @for (opt of getOptions(comp); track opt.value) {
                      <option [value]="opt.value">{{ opt.label }}</option>
                    }
                  </select>
                }

                <!-- MULTISELECT -->
                @if (comp.componentType === 'MULTISELECT') {
                  <select
                    [id]="comp.fieldKey"
                    [formControlName]="comp.fieldKey"
                    multiple
                    class="w-full px-3 border border-slate-300 rounded-lg py-2 text-sm
                           text-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                    @for (opt of getOptions(comp); track opt.value) {
                      <option [value]="opt.value">{{ opt.label }}</option>
                    }
                  </select>
                }

                <!-- TEXTAREA -->
                @if (comp.componentType === 'TEXTAREA') {
                  <textarea
                    [id]="comp.fieldKey"
                    [formControlName]="comp.fieldKey"
                    [placeholder]="comp.placeholder ?? ''"
                    rows="3"
                    class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm
                           text-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                           resize-none transition-colors"
                  ></textarea>
                }

                <!-- CHECKBOX / SWITCH -->
                @if (['CHECKBOX', 'SWITCH'].includes(comp.componentType)) {
                  <div class="flex items-center h-9">
                    <input
                      [id]="comp.fieldKey"
                      [formControlName]="comp.fieldKey"
                      type="checkbox"
                      class="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                    />
                    <span class="ml-2 text-sm text-slate-600">{{ comp.placeholder }}</span>
                  </div>
                }

                <!-- Message de validation -->
                @if (showError(comp.fieldKey)) {
                  <p class="mt-1 text-xs text-red-500">
                    {{ comp.validationMsg ?? 'Ce champ est requis' }}
                  </p>
                }
              </div>
            }
          </div>
        </div>

        <!-- Actions -->
        <div class="flex justify-end gap-3">
          <button
            type="button"
            class="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300
                   rounded-lg hover:bg-slate-50 transition-colors"
            (click)="reset()"
          >
            Annuler
          </button>
          <button
            type="submit"
            [disabled]="form.invalid || isSubmitting()"
            class="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg
                   hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            @if (isSubmitting()) { Enregistrement... } @else { Enregistrer }
          </button>
        </div>
      </form>
    </div>
  `,
})
export class FormGeneratorComponent implements OnInit {
  @Input({ required: true }) metadata!: ScreenMetadata;

  private readonly fb   = inject(FormBuilder);
  private readonly http = inject(HttpClient);

  form!: FormGroup;
  readonly isSubmitting      = signal(false);
  readonly visibleComponents = signal<ComponentMetadata[]>([]);

  /** Cache des options chargées dynamiquement depuis OPTIONS_SOURCE */
  private readonly dynamicOptions = new Map<string, ComponentOption[]>();

  ngOnInit(): void {
    this.buildForm();
    this.loadDynamicOptions();
    // Recalcul de la visibilité à chaque changement de valeur
    this.form.valueChanges.subscribe(() => this.refreshVisibility());
  }

  // ─── Form Builder ──────────────────────────────────────────

  private buildForm(): void {
    const controls: Record<string, AbstractControl> = {};

    for (const comp of this.metadata.components) {
      const validators: ValidatorFn[] = [];
      if (comp.required)                    validators.push(Validators.required);
      if (comp.validationRegex)             validators.push(Validators.pattern(comp.validationRegex));
      if (comp.componentType === 'EMAIL')   validators.push(Validators.email);

      controls[comp.fieldKey] = this.fb.control(
        { value: comp.defaultValue ?? '', disabled: comp.readonly },
        validators
      );
    }

    this.form = this.fb.group(controls);
    this.refreshVisibility();
  }

  // ─── Visibilité conditionnelle ─────────────────────────────

  private refreshVisibility(): void {
    const values = this.form.getRawValue() as Record<string, unknown>;
    const visible = this.metadata.components.filter(comp => {
      if (!comp.visibilityRule) return true;
      const { field, operator, value } = comp.visibilityRule;
      const fieldValue = values[field];
      return this.evaluateRule(fieldValue, operator, value);
    });
    this.visibleComponents.set(visible);
  }

  private evaluateRule(
    fieldValue: unknown,
    operator: VisibilityOperator,
    ruleValue: unknown
  ): boolean {
    switch (operator) {
      case 'eq':    return fieldValue === ruleValue;
      case 'neq':   return fieldValue !== ruleValue;
      case 'in':    return Array.isArray(ruleValue) && ruleValue.includes(fieldValue);
      case 'notin': return Array.isArray(ruleValue) && !ruleValue.includes(fieldValue);
      case 'gt':    return Number(fieldValue) > Number(ruleValue);
      case 'lt':    return Number(fieldValue) < Number(ruleValue);
      default:      return true;
    }
  }

  // ─── Options dynamiques ────────────────────────────────────

  private loadDynamicOptions(): void {
    for (const comp of this.metadata.components) {
      if (comp.optionsSource && !comp.options?.length) {
        this.http.get<ComponentOption[]>(comp.optionsSource).subscribe(
          opts => this.dynamicOptions.set(comp.fieldKey, opts)
        );
      }
    }
  }

  getOptions(comp: ComponentMetadata): ComponentOption[] {
    return comp.options?.length
      ? comp.options
      : (this.dynamicOptions.get(comp.fieldKey) ?? []);
  }

  // ─── Helpers template ──────────────────────────────────────

  getInputType(componentType: string): string {
    switch (componentType) {
      case 'EMAIL':    return 'email';
      case 'PASSWORD': return 'password';
      case 'NUMBER':
      case 'AMOUNT':   return 'number';
      default:         return 'text';
    }
  }

  /** Classe CSS Grid selon le span déclaré en BDD (1–12) */
  colSpanClass(span: number): string {
    // Tailwind nécessite les classes complètes pour le purge
    const map: Record<number, string> = {
      1: 'col-span-1',  2: 'col-span-2',  3: 'col-span-3',
      4: 'col-span-4',  5: 'col-span-5',  6: 'col-span-6',
      7: 'col-span-7',  8: 'col-span-8',  9: 'col-span-9',
      10: 'col-span-10', 11: 'col-span-11', 12: 'col-span-12',
    };
    return map[span] ?? 'col-span-6';
  }

  showError(fieldKey: string): boolean {
    const ctrl = this.form.get(fieldKey);
    return !!(ctrl?.invalid && (ctrl.dirty || ctrl.touched));
  }

  // ─── Actions ───────────────────────────────────────────────

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isSubmitting.set(true);
    this.http.post(this.metadata.apiBaseUrl, this.form.getRawValue()).subscribe({
      next:  () => { this.isSubmitting.set(false); this.form.reset(); },
      error: () => this.isSubmitting.set(false),
    });
  }

  reset(): void {
    this.form.reset();
  }
}
