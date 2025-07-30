import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExternalRequestsService {
  public static validWordList: string[] = [];
  private static url = 'https://random-word-api.herokuapp.com/word';

  private http: HttpClient = inject(HttpClient);

  public async getRandomWord(wordLength: number) {
    const params: HttpParams = new HttpParams().set('length', wordLength);

    ExternalRequestsService.validWordList = await this.getValidWordList(wordLength)
    return firstValueFrom(this.http.get<string[]>(ExternalRequestsService.url, { params }).pipe(
      map(result => result[0])
    ));
  }

  private getValidWordList(wordLength: number) {
    const url = 'https://random-word-api.herokuapp.com/word';
    const javaMaxSafeInt: number = 2147483647;

    const params: HttpParams = new HttpParams()
      .set('number', javaMaxSafeInt)
      .set('length', wordLength);

    return firstValueFrom(this.http.get<string[]>(url, { params }));
  }
}
