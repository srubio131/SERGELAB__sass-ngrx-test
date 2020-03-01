import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";

import { SharedModule } from "./../shared/shared.module";

import { WeatherService } from "./javascript/services/weather.service";

import { HomeComponent } from "./home.component";
import { StylingComponent } from "./styling/styling.component";
import { JavascriptComponent } from "./javascript/javascript.component";
import { CitiesSearchComponent } from "./javascript/components/cities-search/cities-search.component";
import { CitiesListComponent } from "./javascript/components/cities-list/cities-list.component";
import { CitiesFiltersComponent } from "./javascript/components/cities-filters/cities-filters.component";
import { CardComponent } from "./styling/components/card/card.component";

@NgModule({
  declarations: [
    HomeComponent,
    StylingComponent,
    JavascriptComponent,
    CitiesSearchComponent,
    CitiesFiltersComponent,
    CitiesListComponent,
    CardComponent
  ],
  imports: [
    TranslateModule,
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [WeatherService]
})
export class PagesModule {}
