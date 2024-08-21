import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

interface PredictionResponse {
  OBJECTID: number[];
  ACCLASS: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private prediction_url = 'http://127.0.0.1:5000/fatal-prediction'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  modelPrediction(formData: FormData): Observable<any> {

    return this.http.post<PredictionResponse>(this.prediction_url, formData)
    .pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(error.error.error);
  }
}