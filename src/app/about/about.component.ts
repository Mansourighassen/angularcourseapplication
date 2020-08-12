import { Component, OnInit, Inject } from "@angular/core";
import { Leader } from "../shared/leader";
import { LeaderService } from "../services/leader.service";

@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.scss"],
})
export class AboutComponent implements OnInit {
  Leaders: Leader[];
  leadererr: string;

  constructor(
    private learderservice: LeaderService,
    @Inject("baseURL") private baseURL
  ) {}

  ngOnInit() {
    this.learderservice.getLeaders().subscribe(
      (leader) => (this.Leaders = leader),
      (errmesg) => (this.leadererr = <any>errmesg)
    );
  }
}
