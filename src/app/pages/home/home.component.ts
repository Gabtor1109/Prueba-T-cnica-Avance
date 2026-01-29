import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { SelectedItemService } from '../../services/selected-item.service';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { ImageDialogComponent } from '../../shared/image-dialog/image-dialog.component';
import { Observable } from 'rxjs';
import { SelectedItem } from '../../services/selected-item.service';

@Component({
  selector: 'app-home',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule, MatDialogModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('swiperEl', { static: true }) swiperEl?: ElementRef;

  email: string | null = null;

  // NO inicialices con this.selected aqui
  selectedStream!: Observable<SelectedItem | null>;

  banners = [
    { src: 'https://picsum.photos/id/1015/1200/500', alt: 'banner 1' },
    { src: 'https://picsum.photos/id/1025/1200/500', alt: 'banner 2' },
    { src: 'https://picsum.photos/id/1035/1200/500', alt: 'banner 3' },
  ];

  cards = [
    { title: 'Card 1', img: 'https://picsum.photos/id/1062/800/500', text: 'Contenido demo para la prueba.' },
    { title: 'Card 2', img: 'https://picsum.photos/id/1043/800/500', text: 'Otra card con hover y transicion.' },
    { title: 'Card 3', img: 'https://picsum.photos/id/1050/800/500', text: 'Click en la imagen para modal.' },
  ];

  private loaded = 0;

  constructor(
    private auth: AuthService,
    private selected: SelectedItemService,
    private dialog: MatDialog
  ) {
    this.email = this.auth.getEmail();
    this.selectedStream = this.selected.selected$;
  }

  ngAfterViewInit() {
    this.updateSwiper();
  }

  onBannerLoad() {
    this.loaded += 1;
    if (this.loaded >= this.banners.length) this.updateSwiper();
  }

  private updateSwiper() {
    const el = this.swiperEl?.nativeElement as any;
    if (!el) return;

    // Espera al render del DOM antes de actualizar
    setTimeout(() => {
      if (el.swiper?.update) el.swiper.update();
    }, 0);
  }

  openImage(src: string, alt: string) {
    this.dialog.open(ImageDialogComponent, { data: { src, alt } });
  }

  isLoggedIn() {
    return this.auth.isLoggedIn();
  }
}
