import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FixedCostsService {
  private baseUrl = 'https://unity-bills-backend.onrender.com/fixed-costs';

  constructor(private http: HttpClient) {}


  /** 📌 GET /fixed-costs */
  getFixedCosts(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  /** 📌 POST /fixed-costs */
  createFixedCost(data: {
    title: string;
    sum: number;
  }): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  /** 📌 PUT /fixed-costs/:id */
  updateFixedCost(
    id: string,
    data: {
      title: string;
      sum: number;
    }
  ): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data,);
  }

  /** 📌 DELETE /fixed-costs/:id */
  deleteFixedCost(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
