import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExternalRequestsService {
  private http: HttpClient = inject(HttpClient);

  public getRandomWord(wordLength: number) {
    const url = 'https://random-word-api.herokuapp.com/word';
    const params = new HttpParams().set('length', wordLength);

    return firstValueFrom(this.http.get<string[]>(url, { params }).pipe(
      map(result => result[0])
    ));
  }
}
