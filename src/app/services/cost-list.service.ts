import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CostListService {
  private baseUrl = 'https://unity-bills-backend.onrender.com/costs-list';

  constructor(private http: HttpClient) {}

  /** 📌 GET /costs-list */
  getCostLists(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  /** 📌 GET /costs-list/:listId */
getCostListById(listId: string): Observable<any> {
  return this.http.get(`${this.baseUrl}/${listId}`);
}


  /** 📌 POST /costs-list */
createCostList(): Observable<any> {
  return this.http.post(this.baseUrl, {});
}


  /** 📌 DELETE /costs-list/:id */
  deleteCostList(listId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${listId}`);
  }

  /** 📌 POST /costs-list/costs/:listId */
  addCost(
    listId: string,
    data: {
      title: string;
      price: number;
      number: number;
    }
  ): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/costs/${listId}`,
      data
    );
  }

  /** 📌 PATCH /costs-list/costs/:listId/:costId */
  updateCost(
    listId: string,
    costId: string,
    data: {
      title?: string;
      price?: number;
      number?: number;
    }
  ): Observable<any> {
    return this.http.patch(
      `${this.baseUrl}/costs/${listId}/${costId}`,
      data
    );
  }

  /** 📌 DELETE /costs-list/costs/:listId/:costId */
  deleteCost(listId: string, costId: string): Observable<any> {
    return this.http.delete(
      `${this.baseUrl}/costs/${listId}/${costId}`
    );
  }
}
