import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExchangeDataService {

  headers = { apikey: 'oO66cl65R143rZd5CDXtAsTfTL9BVvXi' };

  constructor(private http: HttpClient) { }
}
