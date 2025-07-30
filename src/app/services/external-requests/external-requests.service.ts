import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExternalRequestsService {
  public static _validWordList: string[] = [];
  private static _url = 'https://random-word-api.herokuapp.com/word';

  private http: HttpClient = inject(HttpClient);

  public async getRandomWord(wordLength: number) {
    const params: HttpParams = new HttpParams().set('length', wordLength);

    ExternalRequestsService._validWordList = await this.getValidWordList(wordLength)
    return firstValueFrom(this.http.get<string[]>(ExternalRequestsService._url, { params }).pipe(
      map(result => result[0])
    ));
  }

  private getValidWordList(wordLength: number) {
    const javaMaxSafeInt: number = 2147483647;

    const params: HttpParams = new HttpParams()
      .set('number', javaMaxSafeInt)
      .set('length', wordLength);

    return firstValueFrom(this.http.get<string[]>(ExternalRequestsService._url, { params }));
  }
}
