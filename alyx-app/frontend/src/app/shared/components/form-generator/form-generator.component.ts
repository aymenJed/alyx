import {
  Component, Input, OnInit, inject, signal, computed
} from '@angular/core';
import {
  FormBuilder, FormGroup, ReactiveFormsModule,
  Validators, AbstractControl, ValidatorFn
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {
  ScreenMetadata, ComponentMetadata, ComponentOption, evaluateExp
} from '../../../core/models/screen-metadata.model';

export interface FormSection {
  key: string;
  label: string;
  fields: ComponentMetadata[];
}

/** Classes CSS Grid span 1-12 (Tailwind purge-safe) */
const COL_SPAN: Record<number, string> = {
  1:'col-span-1', 2:'col-span-2', 3:'col-span-3', 4:'col-span-4',
  5:'col-span-5', 6:'col-span-6', 7:'col-span-7', 8:'col-span-8',
  9:'col-span-9', 10:'col-span-10', 11:'col-span-11', 12:'col-span-12',
};

@Component({
  selector: 'app-form-generator',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="flex flex-col h-full bg-[#f0f0f0]">

      <!-- ── Onglets ─────────────────────────────────────────── -->
      <div class="flex bg-[#dde8f0] border-b border-gray-300 shrink-0">
        <button class="px-4 py-1.5 text-xs font-semibold bg-white border-r border-gray-300 text-gray-800 -mb-px border-b border-b-white">
          Général
        </button>
        <!-- Onglets additionnels depuis les actions SUBVIEW -->
        @for (action of subviewActions(); track action.actionId) {
          <button class="px-4 py-1.5 text-xs text-gray-600 border-r border-gray-300 hover:bg-[#ccd8e8] transition-colors">
            {{ action.label }}
          </button>
        }
      </div>

      <!-- ── Barre d'outils du formulaire ──────────────────────── -->
      <div class="flex items-center gap-1 px-2 py-1.5 bg-white border-b border-gray-300 shrink-0 flex-wrap">
        <button
          type="submit"
          form="main-form"
          [disabled]="form.invalid || isSubmitting()"
          class="crt-btn crt-btn-primary"
        >
          @if (isSubmitting()) { <span class="animate-spin mr-1">↻</span> }
          Enregistrer
        </button>

        @for (action of mainActions(); track action.actionId) {
          <button
            type="button"
            class="crt-btn"
            [class]="getActionBtnClass(action.color)"
            (click)="handleMainAction(action.code)"
          >{{ action.label }}</button>
        }

        <button type="button" class="crt-btn" (click)="reset()">Initialiser</button>
        <button type="button" class="crt-btn crt-btn-danger" (click)="reset()">Fermer</button>
      </div>

      <!-- ── Corps du formulaire ────────────────────────────────── -->
      <div class="flex-1 overflow-auto">
        <form id="main-form" [formGroup]="form" (ngSubmit)="onSubmit()" class="p-3 space-y-0">

          @for (section of sections(); track section.key) {

            <!-- En-tête de section cliquable -->
            @if (section.label) {
              <div
                class="flex items-center gap-1 pt-2 pb-1 cursor-pointer select-none group"
                (click)="toggleSection(section.key)"
              >
                <span class="text-sm font-bold text-gray-500 w-4 text-center leading-none">
                  {{ collapsedSections().has(section.key) ? '⊕' : '⊖' }}
                </span>
                <span class="text-xs font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">
                  {{ section.label }} :
                </span>
              </div>
            }

            <!-- Grille de champs -->
            @if (!collapsedSections().has(section.key)) {
              <div class="bg-white border border-gray-200 p-2 mb-2">
                <div class="grid grid-cols-12 gap-x-3 gap-y-1.5">
                  @for (comp of section.fields; track comp.fieldKey) {
                    <div [class]="colSpanClass(comp.gridColSpan)" class="flex flex-col gap-0.5">

                      <label [for]="comp.fieldKey" class="text-xs text-gray-600 leading-tight">
                        {{ comp.label }}
                        @if (comp.required) { <span class="text-red-500 ml-0.5">*</span> }
                      </label>

                      <!-- TEXT / EMAIL / PASSWORD / NUMBER / AMOUNT / CURRENCY -->
                      @if (['TEXT','EMAIL','PASSWORD','NUMBER','AMOUNT','CURRENCY'].includes(comp.componentType)) {
                        <div class="relative">
                          @if (comp.formatPattern === 'FCFA' || comp.formatPattern === 'XOF') {
                            <span class="absolute left-1.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none">FCFA</span>
                          }
                          <input
                            [id]="comp.fieldKey"
                            [formControlName]="comp.fieldKey"
                            [type]="getInputType(comp.componentType)"
                            [placeholder]="comp.placeholder ?? ''"
                            [readonly]="comp.readonly"
                            class="w-full h-7 px-2 text-xs text-gray-800 bg-white border border-gray-300
                                   focus:outline-none focus:border-blue-400
                                   read-only:bg-gray-100 read-only:text-gray-500
                                   disabled:bg-gray-100 disabled:text-gray-400 placeholder:text-gray-400"
                            [class.pl-10]="comp.formatPattern === 'FCFA' || comp.formatPattern === 'XOF'"
                            [class.border-red-400]="showError(comp.fieldKey)"
                          />
                        </div>
                      }

                      <!-- DATE / DATETIME -->
                      @if (['DATE','DATETIME'].includes(comp.componentType)) {
                        <input
                          [id]="comp.fieldKey"
                          [formControlName]="comp.fieldKey"
                          [type]="comp.componentType === 'DATETIME' ? 'datetime-local' : 'date'"
                          [readonly]="comp.readonly"
                          class="w-full h-7 px-2 text-xs text-gray-800 bg-white border border-gray-300
                                 focus:outline-none focus:border-blue-400
                                 read-only:bg-gray-100 disabled:bg-gray-100"
                          [class.border-red-400]="showError(comp.fieldKey)"
                        />
                      }

                      <!-- SELECT / AUTOCOMPLETE -->
                      @if (['SELECT','AUTOCOMPLETE'].includes(comp.componentType)) {
                        <select
                          [id]="comp.fieldKey"
                          [formControlName]="comp.fieldKey"
                          class="w-full h-7 px-2 text-xs text-gray-800 bg-white border border-gray-300
                                 focus:outline-none focus:border-blue-400
                                 disabled:bg-gray-100 cursor-pointer"
                          [class.border-red-400]="showError(comp.fieldKey)"
                        >
                          <option value=""></option>
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
                          class="w-full px-2 py-1 text-xs text-gray-800 bg-white border border-gray-300
                                 focus:outline-none focus:border-blue-400 cursor-pointer"
                          [class.border-red-400]="showError(comp.fieldKey)"
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
                          [rows]="comp.nbLines ?? 3"
                          class="w-full px-2 py-1 text-xs text-gray-800 bg-white border border-gray-300
                                 focus:outline-none focus:border-blue-400 resize-none placeholder:text-gray-400"
                          [class.border-red-400]="showError(comp.fieldKey)"
                        ></textarea>
                      }

                      <!-- CHECKBOX / SWITCH -->
                      @if (['CHECKBOX','SWITCH'].includes(comp.componentType)) {
                        <div class="flex items-center gap-2 h-7">
                          <input
                            [id]="comp.fieldKey"
                            [formControlName]="comp.fieldKey"
                            type="checkbox"
                            class="w-3.5 h-3.5 text-blue-600 border-gray-300 cursor-pointer"
                          />
                          @if (comp.placeholder) {
                            <span class="text-xs text-gray-600">{{ comp.placeholder }}</span>
                          }
                        </div>
                      }

                      <!-- BADGE -->
                      @if (comp.componentType === 'BADGE') {
                        <div class="h-7 flex items-center">
                          @if (form.get(comp.fieldKey)?.value; as val) {
                            @if (getBadgeOpt(comp, val); as opt) {
                              <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium"
                                    [class]="badgeClass(opt.color)">
                                {{ opt.label }}
                              </span>
                            } @else {
                              <span class="text-xs text-gray-700">{{ val }}</span>
                            }
                          }
                        </div>
                      }

                      @if (showError(comp.fieldKey)) {
                        <p class="text-xs text-red-500 leading-none">
                          {{ comp.validationMsg ?? 'Champ requis' }}
                        </p>
                      }
                    </div>
                  }
                </div>
              </div>
            }
          }
        </form>
      </div>
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
  readonly collapsedSections = signal<Set<string>>(new Set());

  private readonly dynamicOptions = new Map<string, ComponentOption[]>();

  // ── Sections calculées depuis les composants GROUP ──────────
  readonly sections = computed<FormSection[]>(() => {
    const sorted = [...this.visibleComponents()]
      .sort((a, b) => a.displayOrder - b.displayOrder);

    const result: FormSection[] = [];
    let current: FormSection = { key: '__root__', label: '', fields: [] };

    for (const comp of sorted) {
      if (comp.componentType === 'GROUP') {
        if (current.fields.length > 0 || current.key !== '__root__') {
          result.push(current);
        }
        current = { key: comp.fieldKey, label: comp.label, fields: [] };
      } else if (comp.componentType !== 'SEPARATOR') {
        current.fields.push(comp);
      }
    }
    if (current.fields.length > 0) result.push(current);
    return result;
  });

  // ── Actions MAIN depuis metadata ────────────────────────────
  readonly mainActions = computed(() =>
    this.metadata.actions
      .filter(a => a.actionType === 'MAIN' && a.isEnabled && a.code !== 'new')
      .sort((a, b) => a.displayOrder - b.displayOrder)
  );

  readonly subviewActions = computed(() =>
    this.metadata.actions
      .filter(a => a.actionType === 'SUBVIEW' && a.isEnabled)
      .sort((a, b) => a.displayOrder - b.displayOrder)
  );

  ngOnInit(): void {
    this.buildForm();
    this.loadDynamicOptions();
    this.form.valueChanges.subscribe(() => this.refreshVisibility());
  }

  // ── Form builder ────────────────────────────────────────────

  private buildForm(): void {
    const controls: Record<string, AbstractControl> = {};
    for (const comp of this.metadata.components) {
      if (comp.componentType === 'GROUP' || comp.componentType === 'SEPARATOR') continue;
      const v: ValidatorFn[] = [];
      if (comp.required)               v.push(Validators.required);
      if (comp.validationRegex)        v.push(Validators.pattern(comp.validationRegex));
      if (comp.componentType === 'EMAIL') v.push(Validators.email);
      controls[comp.fieldKey] = this.fb.control(
        { value: comp.defaultValue ?? '', disabled: comp.readonly }, v
      );
    }
    this.form = this.fb.group(controls);
    this.refreshVisibility();
  }

  private refreshVisibility(): void {
    const values = this.form.getRawValue() as Record<string, unknown>;
    this.visibleComponents.set(
      this.metadata.components.filter(c => evaluateExp(c.visibilityExp, values))
    );
  }

  private loadDynamicOptions(): void {
    for (const comp of this.metadata.components) {
      if (comp.optionsSource && !comp.options?.length) {
        this.http.get<ComponentOption[]>(comp.optionsSource).subscribe(
          opts => this.dynamicOptions.set(comp.fieldKey, opts)
        );
      }
    }
  }

  // ── Helpers template ────────────────────────────────────────

  getOptions(comp: ComponentMetadata): ComponentOption[] {
    return comp.options?.length
      ? comp.options
      : (this.dynamicOptions.get(comp.fieldKey) ?? []);
  }

  getBadgeOpt(comp: ComponentMetadata, value: unknown) {
    return comp.options?.find(o => o.value === String(value));
  }

  badgeClass(color?: string): string {
    const m: Record<string, string> = {
      green: 'bg-emerald-100 text-emerald-700',
      red:   'bg-red-100 text-red-700',
      amber: 'bg-amber-100 text-amber-700',
      blue:  'bg-blue-100 text-blue-700',
      gray:  'bg-slate-100 text-slate-600',
    };
    return m[color ?? 'gray'] ?? m['gray'];
  }

  getInputType(t: string): string {
    const m: Record<string, string> = {
      EMAIL: 'email', PASSWORD: 'password', NUMBER: 'number', AMOUNT: 'number',
    };
    return m[t] ?? 'text';
  }

  colSpanClass(span: number): string {
    return COL_SPAN[span] ?? 'col-span-3';
  }

  showError(key: string): boolean {
    const c = this.form.get(key);
    return !!(c?.invalid && (c.dirty || c.touched));
  }

  toggleSection(key: string): void {
    this.collapsedSections.update(s => {
      const n = new Set(s);
      n.has(key) ? n.delete(key) : n.add(key);
      return n;
    });
  }

  getActionBtnClass(color?: string): string {
    const m: Record<string, string> = {
      blue:   'crt-btn-primary',
      indigo: 'crt-btn-primary',
      green:  'bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700',
      amber:  'bg-amber-500 text-white border-amber-500 hover:bg-amber-600',
      red:    'crt-btn-danger',
      gray:   '',
    };
    return m[color ?? 'gray'] ?? '';
  }

  handleMainAction(code: string): void {
    const action = this.metadata.actions.find(a => a.code === code);
    if (!action?.endpoint || !action.httpMethod) return;
    this.http.request(action.httpMethod, action.endpoint, {
      body: this.form.getRawValue(),
    }).subscribe({ next: () => this.loadDynamicOptions() });
  }

  // ── Submit / Reset ──────────────────────────────────────────

  onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.isSubmitting.set(true);
    this.http.post(this.metadata.apiBaseUrl, this.form.getRawValue()).subscribe({
      next:  () => { this.isSubmitting.set(false); this.form.reset(); },
      error: () =>   this.isSubmitting.set(false),
    });
  }

  reset(): void { this.form.reset(); }
}
