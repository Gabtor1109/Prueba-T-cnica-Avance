import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
})
export class SkillsComponent {
  @ViewChild('stage', { static: true }) stage!: ElementRef<HTMLDivElement>;

  constructor(private r: Renderer2) {}

  burst() {
    const host = this.stage.nativeElement;

    for (let i = 0; i < 18; i++) {
      const dot = this.r.createElement('span');
      this.r.addClass(dot, 'dot');

      const x = (Math.random() * 260) - 130;
      const y = (Math.random() * 220) - 110;
      const size = 10 + Math.random() * 14;
      const dur = 500 + Math.random() * 500;
      const hue = 210 + Math.random() * 90;

      this.r.setStyle(dot, '--x', `${x}px`);
      this.r.setStyle(dot, '--y', `${y}px`);
      this.r.setStyle(dot, '--s', `${size}px`);
      this.r.setStyle(dot, '--d', `${dur}ms`);
      this.r.setStyle(dot, '--c', `hsl(${hue} 80% 60%)`);

      this.r.appendChild(host, dot);

      setTimeout(() => this.r.removeChild(host, dot), dur + 60);
    }
  }
}
