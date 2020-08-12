import { Injectable } from "@angular/core";
import { Feedback } from "../shared/feedback";
import { Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { baseURL } from "../shared/baseurl";
import { ProcessHTTPMsgService } from "./process-httpmsg.service";
//import { baseURL } from "../shared/baseurl";

@Injectable({
  providedIn: "root",
})
export class FeedbackService {
  constructor(
    private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService
  ) {}

  submitFeedback(Feedback: Feedback): Observable<Feedback> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    return this.http
      .post<Feedback>(baseURL + "feedback", Feedback, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
  /*
  putDish(dish: Dish): Observable<Dish> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    return this.http
      .put<Dish>(baseURL + "dishes/" + dish.id, dish, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }*/
}
