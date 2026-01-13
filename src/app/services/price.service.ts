import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PriceService {
  private baseUrl = 'https://unity-bills-backend.onrender.com/price';

  constructor(private http: HttpClient) {}


  /** 📌 GET /price */
  getPrices(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  /** 📌 POST /price */
  createPrice(data: {
    title: string;
    price: number;
  }): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  /** 📌 PUT /price/:id */
  updatePrice(
    id: string,
    data: {
      title: string;
      price: number;
    }
  ): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  /** 📌 DELETE /price/:id */
  deletePrice(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
