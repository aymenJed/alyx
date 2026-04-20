import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { ScreenMetadata } from '../models/screen-metadata.model';

/**
 * Service central de récupération des métadonnées d'écran.
 * Cache côté Frontend (Map) pour éviter les appels redondants
 * au cours d'une même session (complète le cache backend Caffeine).
 */
@Injectable({ providedIn: 'root' })
export class MetadataService {
  private readonly http = inject(HttpClient);
  private readonly cache = new Map<string, ScreenMetadata>();

  getScreenMetadata(code: string): Observable<ScreenMetadata> {
    const cached = this.cache.get(code);
    if (cached) return of(cached);

    return this.http
      .get<ScreenMetadata>(`/api/v1/metadata/screens/${code}`)
      .pipe(tap(meta => this.cache.set(code, meta)));
  }

  /** Invalide le cache d'un écran (ex: après modification admin) */
  invalidate(code: string): void {
    this.cache.delete(code);
  }

  clearCache(): void {
    this.cache.clear();
  }
}
