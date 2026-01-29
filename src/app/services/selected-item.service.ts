import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface SelectedItem {
  id: number;
  title: string;
  image: string;
  subtitle?: string;
  extra?: string;
}

@Injectable({ providedIn: 'root' })
export class SelectedItemService {
  private subject = new BehaviorSubject<SelectedItem | null>(null);
  selected$ = this.subject.asObservable();

  set(item: SelectedItem) {
    this.subject.next(item);
  }

  clear() {
    this.subject.next(null);
  }
}
