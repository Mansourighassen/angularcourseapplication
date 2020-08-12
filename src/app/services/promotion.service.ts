import { Injectable } from "@angular/core";
import { Promotion } from "../shared/promotion";
import { PROMOTIONS } from "../shared/promotions";
import { Observable, of } from "rxjs";
import { baseURL } from "../shared/baseurl";
import { ProcessHTTPMsgService } from "./process-httpmsg.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class PromotionService {
  getPromotions(): Observable<Promotion[]> {
    //return new Promise((resolve) => {
    // Simulate server latency with 2 second delay
    //setTimeout(() => resolve(PROMOTIONS), 2000);
    //});
    // return of(PROMOTIONS).pipe(delay(2000));
    return this.http
      .get<Promotion[]>(baseURL + "promotions")
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getPromotion(id: string): Observable<Promotion> {
    return this.http
      .get<Promotion>(baseURL + "promotions/" + id)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedPromotion(): Observable<Promotion> {
    // return of(PROMOTIONS.filter((promo) => promo.featured)[0]).pipe(
    // delay(2000)
    //);
    return this.http
      .get<Promotion[]>(baseURL + "promotions?featured=true")
      .pipe(map((dishes) => dishes[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  constructor(
    private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService
  ) {}
}
