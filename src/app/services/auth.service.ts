import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap, map, of } from 'rxjs';



export interface LogoutResponse {
  message?: string;
}


@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'https://unity-bills-backend.onrender.com/auth';

  constructor(private http: HttpClient) {}

   private get authHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  register(data: {
    name: string;
    email: string;
    password: string;
  }): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  login(data: {
    email: string;
    password: string;
  }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, data).pipe(
      tap((res: any) => {
        if (res?.token) {
          localStorage.setItem('token', res.token);
        }
      })
    );
  }

logout(): Observable<LogoutResponse> {
  return this.http.post<LogoutResponse>(
    `${this.baseUrl}/logout`,
    {}
  );
}

    

  /** ➕ Додати email до allow list */
  addToAllowList(email: string, listId: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/allow/add/${listId}`,
      { email }
    );
  }

  /** ➖ Видалити email з allow list */
  removeFromAllowList(email: string, listId: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/allow/delete/${listId}`,
      { email }
    );
  }

getCurrentUser(): Observable<any> {
  return this.http.get(`${this.baseUrl}/current`
  );
}


  isAuthenticated(): Observable<boolean> {
    return this.getCurrentUser().pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
}
