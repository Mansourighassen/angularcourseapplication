import { Injectable } from "@angular/core";
import { Leader } from "../shared/leader";
import { leaders } from "../shared/leaders";

@Injectable({
  providedIn: "root",
})
export class LeaderService {
  getLeaders(): Promise<Leader[]> {
    return Promise.resolve(leaders);
  }

  getLeader(id: string): Promise<Leader> {
    return Promise.resolve(leaders.filter((ader) => ader.id === id)[0]);
  }
  getFeaturedLeader(): Promise<Leader> {
    return Promise.resolve(leaders.filter((Leader) => Leader.featured)[0]);
  }

  constructor() {}
}
