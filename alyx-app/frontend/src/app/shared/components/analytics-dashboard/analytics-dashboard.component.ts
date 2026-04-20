import {
  Component, Input, OnInit, AfterViewInit,
  inject, signal
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ScreenMetadata, KpiConfig, ChartConfig } from '../../../core/models/screen-metadata.model';

interface KpiValue {
  config: KpiConfig;
  value: number | string | null;
  loading: boolean;
}

/**
 * AnalyticsDashboard — Template 4 (ANALYTICS)
 *
 * Dashboard piloté par analyticsConfig JSON de l'écran.
 * Intègre Chart.js (chargé en lazy via import dynamique).
 * KPIs + Graphiques sont 100% configurés en base de données.
 */
@Component({
  selector: 'app-analytics-dashboard',
  standalone: true,
  template: `
    <div class="p-6 space-y-6">

      <!-- ===== KPIs ===== -->
      @if (kpis().length > 0) {
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          @for (kpi of kpis(); track kpi.config.key) {
            <div class="bg-white rounded-xl border border-slate-200 p-5 flex items-start gap-4">
              <!-- Icône colorée -->
              <div
                class="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                [class]="getKpiBg(kpi.config.color)"
              >
                <svg class="w-5 h-5" [class]="getKpiText(kpi.config.color)"
                     fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22"/>
                </svg>
              </div>
              <!-- Valeur -->
              <div>
                <p class="text-xs font-medium text-slate-500">{{ kpi.config.label }}</p>
                @if (kpi.loading) {
                  <div class="h-7 w-28 bg-slate-100 rounded animate-pulse mt-1"></div>
                } @else {
                  <p class="text-xl font-bold text-slate-800 mt-0.5">
                    {{ formatKpi(kpi.value, kpi.config.format) }}
                  </p>
                }
              </div>
            </div>
          }
        </div>
      }

      <!-- ===== Graphiques ===== -->
      @if (charts().length > 0) {
        <div class="grid grid-cols-12 gap-4">
          @for (chart of charts(); track chart.key) {
            <div
              class="bg-white rounded-xl border border-slate-200 p-5"
              [class]="'col-span-12 lg:col-span-' + (chart.colSpan ?? 6)"
            >
              <h3 class="text-sm font-semibold text-slate-700 mb-4">{{ chart.title }}</h3>
              <div class="relative" style="height: 280px;">
                <canvas [id]="'chart-' + chart.key"></canvas>
                @if (chartLoading()) {
                  <div class="absolute inset-0 flex items-center justify-center bg-white/80">
                    <div class="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                }
              </div>
            </div>
          }
        </div>
      }
    </div>
  `,
})
export class AnalyticsDashboardComponent implements OnInit, AfterViewInit {
  @Input({ required: true }) metadata!: ScreenMetadata;

  private readonly http = inject(HttpClient);

  readonly kpis        = signal<KpiValue[]>([]);
  readonly charts      = signal<ChartConfig[]>([]);
  readonly chartLoading = signal(true);

  // Référence aux canvases pour Chart.js
  private chartInstances: unknown[] = [];

  ngOnInit(): void {
    const cfg = this.metadata.analyticsConfig;
    if (!cfg) return;

    // Initialiser les KPIs avec état de chargement
    if (cfg.kpis) {
      this.kpis.set(cfg.kpis.map(k => ({ config: k, value: null, loading: true })));
      this.loadKpis(cfg.kpis);
    }

    if (cfg.charts) {
      this.charts.set(cfg.charts);
    }
  }

  ngAfterViewInit(): void {
    // Chart.js chargé en lazy import — pas inclus dans le bundle principal
    const cfg = this.metadata.analyticsConfig;
    if (cfg?.charts?.length) {
      this.loadCharts(cfg.charts);
    }
  }

  private loadKpis(kpiConfigs: KpiConfig[]): void {
    const requests = kpiConfigs.map(k =>
      this.http.get<{ value: number | string }>(k.dataEndpoint).pipe(
        catchError(() => of({ value: null }))
      )
    );

    forkJoin(requests).subscribe(results => {
      this.kpis.update(kpis =>
        kpis.map((kpi, i) => ({
          ...kpi,
          value: results[i]?.value ?? null,
          loading: false,
        }))
      );
    });
  }

  private async loadCharts(chartConfigs: ChartConfig[]): Promise<void> {
    // Lazy import Chart.js — ne charge que si le template ANALYTICS est utilisé
    const { Chart, registerables } = await import('chart.js');
    Chart.register(...registerables);

    const dataRequests = chartConfigs.map(c =>
      this.http.get<{ labels: string[]; datasets: Record<string, unknown>[] }>(c.dataEndpoint).pipe(
        catchError(() => of({ labels: [] as string[], datasets: [] as Record<string, unknown>[] }))
      )
    );

    forkJoin(dataRequests).subscribe(results => {
      chartConfigs.forEach((cfg, i) => {
        const canvas = document.getElementById(`chart-${cfg.key}`) as HTMLCanvasElement;
        if (!canvas) return;

        const data = results[i];
        // Fusion des datasets API avec les options visuelles Alyx
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const mergedDatasets: any[] = data.datasets.map(ds => ({
          ...ds,
          borderWidth: 2,
          borderRadius: cfg.type === 'bar' ? 4 : 0,
        }));

        const instance = new Chart(canvas, {
          type: cfg.type as 'line' | 'bar' | 'pie' | 'doughnut',
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data: { labels: data.labels, datasets: mergedDatasets } as any,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'bottom',
                labels: { font: { size: 11 }, padding: 16 },
              },
            },
            scales: cfg.type === 'pie' || cfg.type === 'doughnut'
              ? {}
              : {
                  x: { grid: { color: '#f1f5f9' } },
                  y: { grid: { color: '#f1f5f9' }, beginAtZero: true },
                },
          },
        });

        this.chartInstances.push(instance);
      });

      this.chartLoading.set(false);
    });
  }

  formatKpi(value: number | string | null, format?: string): string {
    if (value == null) return '—';
    if (format === 'FCFA' || format === 'XOF') {
      return new Intl.NumberFormat('fr-FR', {
        style: 'currency', currency: 'XOF', minimumFractionDigits: 0,
        notation: 'compact', compactDisplay: 'short',
      }).format(Number(value));
    }
    if (format === 'points') return `${Number(value).toLocaleString('fr-FR')} pts`;
    if (format === '%') return `${value} %`;
    return String(value);
  }

  getKpiBg(color?: string): string {
    const map: Record<string, string> = {
      blue:   'bg-blue-50',
      green:  'bg-green-50',
      amber:  'bg-amber-50',
      purple: 'bg-purple-50',
    };
    return map[color ?? 'blue'];
  }

  getKpiText(color?: string): string {
    const map: Record<string, string> = {
      blue:   'text-blue-600',
      green:  'text-green-600',
      amber:  'text-amber-600',
      purple: 'text-purple-600',
    };
    return map[color ?? 'blue'];
  }
}
