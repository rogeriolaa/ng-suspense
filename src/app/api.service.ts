import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, delay, of } from 'rxjs';

// Simplified types for the API responses
export interface Post {
  id: number;
  title: string;
  body: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly baseUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  // Returns a delayed Observable to show the spinner
  getPostsAsObservable(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}/posts`).pipe(delay(2000));
  }

  // Returns a delayed Promise to show the spinner
  getPostsAsPromise(): Promise<Post[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.http
          .get<Post[]>(`${this.baseUrl}/posts`)
          .subscribe((data) => resolve(data));
      }, 2000);
    });
  }

  // A method that returns an Observable, to be used in an effect to set a signal
  getPostsForSignal(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}/posts`).pipe(delay(1000));
  }
}
