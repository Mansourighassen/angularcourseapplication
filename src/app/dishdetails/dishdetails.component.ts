import { Component, OnInit, ViewChild, Inject } from "@angular/core";
import { Dish } from "../shared/dish";
import { Params, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { DishService } from "../services/dish.service";
import { switchMap } from "rxjs/operators";
import { Comment } from "../shared/Comment";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { visibility, flyInOut, expand } from "../animations/app.animation";

import {
  trigger,
  state,
  style,
  animate,
  transition,
} from "@angular/animations";
@Component({
  selector: "app-dishdetails",
  templateUrl: "./dishdetails.component.html",
  styleUrls: ["./dishdetails.component.scss"],
  host: {
    "[@flyInOut]": "true",
    style: "display: block;",
  },
  animations: [visibility(), flyInOut(), expand()],
})
export class DishdetailsComponent implements OnInit {
  @ViewChild("cform") commentFormDirective;

  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;
  comment: Comment;
  commentForm: FormGroup;
  errMess: string;
  dishcopy: Dish;
  visibility = "shown";

  constructor(
    private dishService: DishService,
    private location: Location,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    @Inject("baseURL") private baseURL: string
  ) {
    this.createForm();
  }

  formErrors = {
    author: "",
    comment: "",
    rating: "",
  };

  validationMessages = {
    author: {
      required: "author Name is required.",
      minlength: "author Name must be at least 2 characters long.",
      //maxlength: "FirstName cannot be more than 25 characters long.",
    },
    comment: {
      required: "comment is required.",
      //minlength: "Last Name must be at least 2 characters long.",
      //maxlength: "Last Name cannot be more than 25 characters long.",
    },
  };

  ngOnInit() {
    this.dishService.getDishIds().subscribe(
      (dishIds) => (this.dishIds = dishIds),
      (errmess) => (this.errMess = <any>errmess)
    );
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          this.visibility = "hidden";
          return this.dishService.getDish(+params["id"]);
        })
      )
      .subscribe(
        (dish) => {
          this.dish = dish;
          this.dishcopy = dish;
          this.setPrevNext(dish.id);
          this.visibility = "shown";
        },
        (errmess) => (this.errMess = <any>errmess)
      );
  }
  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[
      (this.dishIds.length + index - 1) % this.dishIds.length
    ];
    this.next = this.dishIds[
      (this.dishIds.length + index + 1) % this.dishIds.length
    ];
  }
  goBack(): void {
    this.location.back();
  }

  createForm(): void {
    this.commentForm = this.fb.group({
      author: [
        "",
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(25),
        ],
      ],
      comment: [
        "",
        [
          Validators.required,
          //Validators.minLength(2),
          //Validators.maxLength(25),
        ],
      ],
      //telnum: ["", [Validators.required, Validators.pattern]],
      //email: ["", [Validators.required, Validators.email]],
      //agree: false,
      rating: "",
      date: "",
    });

    this.commentForm.valueChanges.subscribe((data) =>
      this.onValueChanged(data)
    );

    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) {
      return;
    }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = "";
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + " ";
            }
          }
        }
      }
    }
  }

  onSubmit() {
    this.comment = this.commentForm.value;
    this.comment.date = new Date().toISOString();
    console.log(this.comment);
    this.dishcopy.comments.push(this.comment);
    this.dishService.putDish(this.dishcopy).subscribe(
      (dish) => {
        this.dish = dish;
        this.dishcopy = dish;
      },
      (errmess) => {
        this.dish = null;
        this.dishcopy = null;
        this.errMess = <any>errmess;
      }
    );
    this.commentForm.reset({
      author: "",
      comment: "",
      rating: "",
      date: "",
    });
    this.commentFormDirective.resetForm();
  }
}
