import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatToolbarModule } from "@angular/material/toolbar";
import { FlexLayoutModule } from "@angular/flex-layout";
import "hammerjs";
import { MenuComponent } from "./menu/menu.component";
import { MatListModule } from "@angular/material/list";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { DishdetailsComponent } from "./dishdetails/dishdetails.component";
import { DishService } from "./services/dish.service";
import { AppRoutingModule } from "./app-routing/app-routing.module";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { AboutComponent } from "./about/about.component";
import { HomeComponent } from "./home/home.component";
import { ContactComponent } from "./contact/contact.component";
import { PromotionService } from "./services/promotion.service";
import { LeaderService } from "./services/leader.service";
import { LoginComponent } from "./login/login.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { FormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { ReactiveFormsModule } from "@angular/forms";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSliderModule } from "@angular/material/slider";
import { HttpModule } from "@angular/http";
import { baseURL } from "./shared/baseurl";
import { HttpClientModule } from "@angular/common/http";
import { HighlightDirective } from './directives/highlight.directive';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DishdetailsComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    HomeComponent,
    ContactComponent,
    LoginComponent,
    HighlightDirective,
  ],
  imports: [
    MatDialogModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    FormsModule,
    MatSelectModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatSliderModule,
    HttpModule,
    HttpClientModule,
  ],
  providers: [
    DishService,
    PromotionService,
    LeaderService,
    { provide: "baseURL", useValue: baseURL },
  ],
  bootstrap: [AppComponent],
  entryComponents: [LoginComponent],
})
export class AppModule {}
