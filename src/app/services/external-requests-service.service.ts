import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExternalRequestsServiceService {
  private http: HttpClient = inject(HttpClient);

  public getRandomWord(wordLength: number) {
    const url = `https://random-word-api.herokuapp.com/word`
    const params = new HttpParams().set('length', wordLength);

    return this.http.get<string[]>(url, { params }).pipe(
      map(result => result[0])
    );
  }
}
