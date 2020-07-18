import { Component, OnInit, Input } from "@angular/core";
import { Dish } from "../shared/dish";

@Component({
  selector: "app-dishdetails",
  templateUrl: "./dishdetails.component.html",
  styleUrls: ["./dishdetails.component.scss"],
})
export class DishdetailsComponent implements OnInit {
  @Input()
  dish: Dish;

  constructor() {}

  ngOnInit() {}
}
