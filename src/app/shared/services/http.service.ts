import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) {}

  public postVerb<T>(
    endpoint: string,
    data: any,
    params?: any
  ): Observable<T | any> {
    const queryParams = this.setParams(params);

    return this.http
      .post<T>(endpoint, data, {
        params: queryParams,
        headers: new HttpHeaders()
      })
      .take(1)
      .catch(this.handleError);
  }

  public putVerb<T>(
    endpoint: string,
    data: any,
    params?: any
  ): Observable<T | any> {
    const queryParams = this.setParams(params);

    return this.http
      .put<T>(endpoint, data, {
        params: queryParams
      })
      .take(1)
      .catch(this.handleError);
  }

  public getVerb<T>(endpoint: string, params?: any): Observable<T | any> {
    const queryParams = this.setParams(params);

    return this.http
      .get<T>(endpoint, {
        params: queryParams,
        headers: new HttpHeaders()
      })
      .take(1)
      .catch(this.handleError);
  }

  public deleteVerb<T>(endpoint: string, params?: any): Observable<T | any> {
    const queryParams = this.setParams(params);

    return this.http
      .delete<T>(endpoint, {
        params: queryParams
      })
      .take(1)
      .catch(this.handleError);
  }

  private handleError(error: Response | any): any {
    return Observable.throw(error);
  }

  private setParams(params: any): HttpParams {
    let queryParams = new HttpParams();

    for (const prop in params) {
      if (prop) {
        queryParams = queryParams.append(prop, params[prop]);
      }
    }

    return queryParams;
  }
}
