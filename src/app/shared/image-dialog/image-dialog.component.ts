import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-image-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <div class="wrap">
      <img [src]="data.src" [alt]="data.alt" />
      <div class="actions">
        <button mat-raised-button color="primary" mat-dialog-close>Cerrar</button>
      </div>
    </div>
  `,
  styles: [`
    .wrap { padding: 12px; animation: fade .18s ease; }
    img { width: min(820px, 92vw); max-height: 78vh; object-fit: contain; border-radius: 14px; }
    .actions { display: flex; justify-content: flex-end; margin-top: 10px; }
    @keyframes fade { from { opacity: .6; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
  `]
})
export class ImageDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { src: string; alt: string }) {}
}
