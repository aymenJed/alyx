// ============================================================
// ALYX-APP :: Modèles TypeScript — Server-Driven UI
// Miroir exact des Records Java du Backend
// ============================================================

export type ComponentType =
  | 'TEXT' | 'NUMBER' | 'AMOUNT' | 'CURRENCY' | 'EMAIL' | 'PASSWORD'
  | 'SELECT' | 'MULTISELECT' | 'AUTOCOMPLETE'
  | 'DATE' | 'DATETIME' | 'TIME'
  | 'CHECKBOX' | 'RADIO' | 'SWITCH'
  | 'TEXTAREA' | 'FILE' | 'IMAGE'
  | 'BADGE' | 'LINK' | 'PROGRESS';

export type TemplateType = 'GRID' | 'FORM' | 'MASTER_DETAIL' | 'ANALYTICS' | 'CUSTOM';

export type VisibilityOperator = 'eq' | 'neq' | 'in' | 'notin' | 'gt' | 'lt';

export interface ComponentOption {
  value: string;
  label: string;
  color?: string; // Pour BADGE
}

export interface VisibilityRule {
  field: string;
  operator: VisibilityOperator;
  value: unknown;
}

export interface ComponentMetadata {
  componentId?: number; // optionnel : absent lors de la création
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
  displayOrder: number;
  gridColSpan: number; // 1-12 colonnes CSS Grid
  validationRegex?: string;
  validationMsg?: string;
  optionsSource?: string;
  options?: ComponentOption[];
  visibilityRule?: VisibilityRule;
  formatPattern?: string;
}

export interface GridAction {
  key: string;
  label: string;
  icon: string;
  color?: 'blue' | 'amber' | 'red' | 'green' | 'gray';
  confirmRequired?: boolean;
}

export interface GridConfig {
  pageSize: number;
  pageSizeOptions?: number[];
  defaultSort?: string;
  defaultSortDir?: 'asc' | 'desc';
  actions?: GridAction[];
  exportFormats?: string[];
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

export interface AnalyticsConfig {
  kpis?: KpiConfig[];
  charts: ChartConfig[];
}

export interface ScreenMetadata {
  screenId: number;
  code: string;
  title: string;
  description?: string;
  templateType: TemplateType;
  apiBaseUrl: string;
  permissions?: Record<string, string[]>;
  gridConfig?: GridConfig;
  analyticsConfig?: AnalyticsConfig;
  customComponentName?: string;
  components: ComponentMetadata[];
}

// ============================================================
// Menu & Shortcuts
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
  isActive: string;
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
  isActive: string;
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
// Réponse paginée générique (pour DataGrid)
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
