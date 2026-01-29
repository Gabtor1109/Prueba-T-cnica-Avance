import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, timeout } from 'rxjs';

export interface RMCharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
}

interface RMResponse {
  info: { pages: number; next: string | null; prev: string | null };
  results: RMCharacter[];
}

@Injectable({ providedIn: 'root' })
export class RickMortyService {
  private base = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) {}

  getCharacters(page: number): Observable<{ pages: number; results: RMCharacter[] }> {
    return this.http.get<RMResponse>(`${this.base}?page=${page}`).pipe(
      timeout(8000),
      map(res => ({ pages: res.info.pages, results: res.results }))
    );
  }
}
