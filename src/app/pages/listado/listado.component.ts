import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { RickMortyService, RMCharacter } from '../../services/rick-morty.service';
import { SelectedItemService } from '../../services/selected-item.service';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-listado',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss'],
})
export class ListadoComponent implements OnInit {
  loading = false;
  page = 1;
  totalPages = 1;
  items: RMCharacter[] = [];
  error = false;
  private loadingTimer?: number;

  constructor(
    private api: RickMortyService,
    private selected: SelectedItemService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.load(1);
  }

  load(page: number) {
    this.loading = true;
    this.error = false;
    if (this.loadingTimer) window.clearTimeout(this.loadingTimer);
    this.loadingTimer = window.setTimeout(() => {
      if (this.loading) {
        this.loading = false;
        this.error = true;
        this.cdr.detectChanges();
      }
    }, 8000);

    this.api.getCharacters(page).subscribe({
      next: (res) => {
        this.page = page;
        this.totalPages = res.pages;
        this.items = res.results;
        this.loading = false;
        this.cdr.detectChanges();
        if (this.loadingTimer) window.clearTimeout(this.loadingTimer);
      },
      error: () => {
        this.items = [];
        this.error = true;
        this.loading = false;
        this.cdr.detectChanges();
        if (this.loadingTimer) window.clearTimeout(this.loadingTimer);
      }
    });
  }

  pick(it: RMCharacter) {
    this.selected.set({
      id: it.id,
      title: it.name,
      image: it.image,
      subtitle: `${it.species} - ${it.gender} - ${it.status}`,
      extra: `ID: ${it.id}`,
    });

    // mostrar en Home (no localstorage)
    this.router.navigateByUrl('/home');
  }

  pagesToShow(): number[] {
    const windowSize = 5;
    const start = Math.max(1, this.page - 2);
    const end = Math.min(this.totalPages, start + windowSize - 1);
    const pages = [];
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  }
}
