import { Injectable } from "@angular/core";
import { Leader } from "../shared/leader";
import { leaders } from "../shared/leaders";

@Injectable({
  providedIn: "root",
})
export class LeaderService {
  getLeaders(): Leader[] {
    return leaders;
  }

  getLeader(id: string): Leader {
    return leaders.filter((ader) => ader.id === id)[0];
  }
  getFeaturedLeader(): Leader {
    return leaders.filter((Leader) => Leader.featured)[0];
  }

  constructor() {}
}
