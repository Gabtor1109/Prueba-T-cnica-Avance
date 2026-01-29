import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Session {
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly EMAIL_KEY = 'email';
  private readonly PASS_KEY = 'password';

  private sessionSubject = new BehaviorSubject<Session | null>(this.readSession());
  session$ = this.sessionSubject.asObservable();

  isLoggedIn(): boolean {
    return !!this.readSession();
  }

  login(email: string, password: string) {
    localStorage.setItem(this.EMAIL_KEY, email);
    localStorage.setItem(this.PASS_KEY, password);
    this.sessionSubject.next({ email, password });
  }

  logout() {
    localStorage.removeItem(this.EMAIL_KEY);
    localStorage.removeItem(this.PASS_KEY);
    this.sessionSubject.next(null);
  }

  getEmail(): string | null {
    const s = this.readSession();
    return s?.email ?? null;
  }

  private readSession(): Session | null {
    const email = localStorage.getItem(this.EMAIL_KEY);
    const password = localStorage.getItem(this.PASS_KEY);
    if (!email || !password) return null;
    return { email, password };
  }
}
