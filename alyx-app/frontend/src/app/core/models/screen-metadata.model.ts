// ============================================================
// ALYX-APP :: Modèles TypeScript — Server-Driven UI
// Aligné sur le modèle de référence PresentationViewModel
// ============================================================

// ── Types de composants — hiérarchie SimpleField ─────────────────────────────

export type ComponentType =
  // SimpleField → types primitifs
  | 'TEXT' | 'NUMBER' | 'AMOUNT' | 'CURRENCY' | 'EMAIL' | 'PASSWORD'
  // EnumerationField
  | 'SELECT' | 'MULTISELECT'
  // AggregationOneField (relation mono-valuée)
  | 'AUTOCOMPLETE'
  // DateField
  | 'DATE' | 'DATETIME' | 'TIME'
  // BooleanField
  | 'CHECKBOX' | 'RADIO' | 'SWITCH'
  // RichTextField / FileField
  | 'TEXTAREA' | 'FILE' | 'IMAGE'
  // Affichage uniquement
  | 'BADGE' | 'LINK' | 'PROGRESS'
  // GroupField / Separator — structure du formulaire
  | 'GROUP' | 'SEPARATOR'
  // AggregationManyField / CompositionManyField
  | 'RELATION_ONE' | 'RELATION_MANY';

// ── Types de vues — équivalent des classes de vue du modèle de référence ─────

export type TemplateType =
  | 'FORM'          // EntityInputView
  | 'GRID'          // EntityGridView
  | 'TREE'          // TreeView
  | 'CHART'         // ChartView
  | 'TAB'           // TabView
  | 'SPLIT'         // SplitView
  | 'MASTER_DETAIL' // EntityInputView + EntityGridView liés
  | 'ANALYTICS';    // Multi-KPI + Charts

// ── Rendu des actions — ActionRendererType ────────────────────────────────────

export type ActionRenderer = 'BUTTON' | 'LINK' | 'IMAGE';
export type ActionType = 'MAIN' | 'GRID' | 'SUBVIEW';

// ── Alignement des colonnes — ColumnAlign ────────────────────────────────────

export type ColumnAlign = 'LEFT' | 'CENTER' | 'RIGHT';

// ── Orientation SplitView ─────────────────────────────────────────────────────

export type Orientation = 'HORIZONTAL' | 'VERTICAL';

// ── Disposition des labels — CompositionLayout ────────────────────────────────

export type CompositionLayout = 'LABEL_ON_TOP' | 'LABEL_ON_LEFT' | 'LABEL_ON_RIGHT';

// ============================================================
// ComponentMetadata — équivalent FieldView / SimpleField
// ============================================================

export interface ComponentOption {
  value: string;
  label: string;
  color?: string;
}

export interface ComponentMetadata {
  componentId?: number;
  fieldKey: string;
  label: string;
  componentType: ComponentType;
  placeholder?: string;
  defaultValue?: string;
  required: boolean;
  readonly: boolean;
  visible: boolean;
  sortable: boolean;
  filterable: boolean;
  gridColumn: boolean;
  fireOnChange: boolean;

  // Expressions dynamiques (*Exp) — évaluées côté client
  visibilityExp?: string;   // ex: "data.status === 'ACTIF'"
  readonlyExp?: string;
  requireExp?: string;
  labelExp?: string;
  onFireOnChangeExp?: string;
  dynamicListDataExp?: string;

  // Layout
  displayOrder: number;
  gridColSpan: number;      // 1-12 colonnes CSS Grid
  colSpan?: number;
  rowSpan?: number;

  // Validation
  validationRegex?: string;
  validationMsg?: string;
  maxLength?: number;
  minValue?: number;
  maxValue?: number;

  // Options / Relations
  optionsSource?: string;
  options?: ComponentOption[];
  relatedEntity?: string;
  displayField?: string;

  // Rendu
  formatPattern?: string;
  dateOnly?: string;
  caseTransform?: string;
  nbLines?: number;
}

// ============================================================
// ActionMetadata — équivalent Action / ActionElement
// ============================================================

export interface ActionMetadata {
  actionId: number;
  code: string;
  label: string;
  icon?: string;
  actionType: ActionType;
  renderer: ActionRenderer;
  httpMethod?: string;
  endpoint?: string;
  isEnabled: boolean;
  requireValidation: boolean;
  requireSelection: boolean;
  withConfirmation: boolean;
  confirmationMsg?: string;
  endAction: boolean;
  conditionExp?: string;
  color?: string;
  displayOrder: number;
  groupCode?: string;
  // Raccourci clavier
  kbCtrl: boolean;
  kbAlt: boolean;
  kbShift: boolean;
  kbKey?: string;
}

// ============================================================
// ColumnMetadata — équivalent Column / TreeColumn
// ============================================================

export interface ColumnMetadata {
  columnId: number;
  fieldName: string;
  label: string;
  width?: number;
  columnAlign: ColumnAlign;
  isSortable: boolean;
  isFilterable: boolean;
  isEditable: boolean;
  isVisible: boolean;
  visibilityExp?: string;
  labelExp?: string;
  formatPattern?: string;
  actionCode?: string;
  displayOrder: number;
}

// ============================================================
// ScreenMetadata — équivalent de l'union EntityInputView +
//                 EntityGridView + View (interface racine)
// ============================================================

export interface AnalyticsConfig {
  kpis?: KpiConfig[];
  charts: ChartConfig[];
}

export interface KpiConfig {
  key: string;
  label: string;
  dataEndpoint: string;
  format?: string;
  icon?: string;
  color?: string;
}

export interface ChartConfig {
  key: string;
  type: 'line' | 'bar' | 'pie' | 'doughnut' | 'area';
  title: string;
  dataEndpoint: string;
  colSpan?: number;
}

export interface ScreenMetadata {
  // ── Identité ─────────────────────────────────────────────
  screenId: number;
  code: string;
  title: string;
  description?: string;
  templateType: TemplateType;
  apiBaseUrl: string;

  // ── Propriétés View communes ──────────────────────────────
  caption?: string;
  width?: number;
  height?: number;
  refreshTime?: number;
  serverCache: boolean;
  clientCache: boolean;
  maximized: boolean;

  // ── Propriétés EntityInputView ────────────────────────────
  entityClass?: string;
  criteria?: string;
  orderBy?: string;
  compositionLayout?: CompositionLayout;
  actionLayout?: string;
  autoSaveTime?: number;
  hasNavigationBar: boolean;

  // ── Propriétés SplitView ──────────────────────────────────
  isSplitView: boolean;
  sizeShare?: string;
  orientation?: Orientation;

  // ── Propriétés GridView ───────────────────────────────────
  pageSize?: number;
  checkboxSelection: boolean;
  wordWrap: boolean;
  rowHeight?: number;
  disableReportButton: boolean;
  actionRenderer?: ActionRenderer;

  // ── Config Analytics ──────────────────────────────────────
  analyticsConfig?: AnalyticsConfig;

  // ── Sous-modèles ─────────────────────────────────────────
  components: ComponentMetadata[];
  actions: ActionMetadata[];
  columns: ColumnMetadata[];
  labels: Record<string, string>; // fieldKey → label i18n
}

// ============================================================
// Menu — équivalent Application → ServicePackage → Service
// ============================================================

export interface MenuNode {
  id: number;
  parentId?: number;
  parentLabel?: string;
  code: string;
  label: string;
  icon?: string;
  route?: string;
  screenCode?: string;
  displayOrder: number;
  isActive: boolean;
  roleRequired?: string;
  childrenCount?: number;
  children: MenuNode[];
}

export interface MenuItem {
  id: number;
  parentId?: number;
  parentLabel?: string;
  code: string;
  label: string;
  icon?: string;
  route?: string;
  screenCode?: string;
  displayOrder: number;
  isActive: boolean;
  roleRequired?: string;
  childrenCount?: number;
}

export interface ShortcutItem {
  shortcutId: number;
  screenCode: string;
  screenTitle: string;
  screenIcon?: string;
  displayOrder: number;
}

// ============================================================
// Réponse paginée générique
// ============================================================

export interface PagedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
}

export interface SortParams {
  field: string;
  direction: 'asc' | 'desc';
}

// ============================================================
// Évaluateur d'expressions dynamiques (*Exp)
// Équivalent léger du moteur EL/OGNL du modèle de référence
// ============================================================

export function evaluateExp(expression: string | undefined, data: Record<string, unknown>): boolean {
  if (!expression) return true;
  try {
    // eslint-disable-next-line no-new-func
    return new Function('data', `"use strict"; return (${expression})`)(data);
  } catch {
    return true;
  }
}

export function evaluateStringExp(expression: string | undefined, data: Record<string, unknown>): string | undefined {
  if (!expression) return undefined;
  try {
    // eslint-disable-next-line no-new-func
    return String(new Function('data', `"use strict"; return (${expression})`)(data));
  } catch {
    return undefined;
  }
}
