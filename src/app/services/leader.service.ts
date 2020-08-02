import { Injectable } from "@angular/core";
import { Leader } from "../shared/leader";
import { leaders } from "../shared/leaders";

@Injectable({
  providedIn: "root",
})
export class LeaderService {
  getLeaders(): Promise<Leader[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(leaders), 2000);
    });
  }
  getLeader(id: string): Promise<Leader> {
    return new Promise((resolve) => {
      setTimeout(
        () => resolve(leaders.filter((ader) => ader.id === id)[0]),
        2000
      );
    });
  }

  getFeaturedLeader(): Promise<Leader> {
    return new Promise((resolve) => {
      // Simulate server latency with 2 second delay
      setTimeout(
        () => resolve(leaders.filter((Leader) => Leader.featured)[0]),
        2000
      );
    });
  }

  constructor() {}
}
