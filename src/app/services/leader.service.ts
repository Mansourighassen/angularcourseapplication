import { Injectable } from "@angular/core";
import { Leader } from "../shared/leader";
import { leaders } from "../shared/leaders";
import { delay } from "rxjs/operators";
import { Observable, of } from "rxjs";
import { baseURL } from "../shared/baseurl";
import { ProcessHTTPMsgService } from "./process-httpmsg.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class LeaderService {
  getLeaders(): Observable<Leader[]> {
    return this.http
      .get<Leader[]>(baseURL + "leadership")
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getLeader(id: string): Observable<Leader> {
    return this.http
      .get<Leader>(baseURL + "leadership/" + id)
      .pipe(catchError(this.processHTTPMsgService.handleError));
    //return of(leaders.filter((ader) => ader.id === id)[0]).pipe(delay(2000));
  }

  getFeaturedLeader(): Observable<Leader> {
    // return of(leaders.filter((leader) => leader.featured)[0]).pipe(delay(2000));
    return this.http
      .get<Leader[]>(baseURL + "leadership?featured=true")
      .pipe(map((dishes) => dishes[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  constructor(
    private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService
  ) {}
}
