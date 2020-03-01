import { Component, OnInit, OnDestroy } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";

import { FilterModel } from "../../shared/models/filter.model";
import { StateModel } from "../../shared/models/state.model";
import { Weather } from "../../shared/models/weather.model";
import { CityFilter } from "./models/city-filter.model";
import { SearchModel } from "./models/search.model";
import {
  LoadWeatherAction,
  RemoveWeatherAction,
  AddFiltersAction
} from "../../store/actions/weather.actions";

import { WeatherService } from "./services/weather.service";

@Component({
  selector: "app-javascript",
  templateUrl: "./javascript.component.html",
  styleUrls: ["./javascript.component.scss"]
})
export class JavascriptComponent implements OnInit, OnDestroy {
  public weatherList: Weather[] = [];
  public weatherListOriginal: Weather[] = [];
  public statesList: CityFilter[] = [];
  public filters: FilterModel;
  public searchText: string = "";

  private subscriptions: Subscription[] = [];

  constructor(
    private store: Store<{ weather: StateModel }>,
    private weatherService: WeatherService,
    private translate: TranslateService
  ) {}

  public ngOnInit() {
    this.subscriptions.push(
      this.store.select("weather").subscribe((weatherState: StateModel) => {
        const filters: FilterModel = weatherState.filters;
        const weatherList: Weather[] = weatherState.weatherList;
        const filteredList: Weather[] = this.weatherService.filterWeather(
          weatherList,
          filters
        );

        this.searchText = weatherState.searchText;
        this.filters = { ...filters };
        this.weatherList = [...filteredList];
        this.statesList = this.weatherService.getWeatherStates(
          weatherList,
          filters.weatherState
        );
        this.weatherListOriginal = [...weatherList];
      }),
      this.translate.onLangChange.subscribe(() => {
        this.statesList = this.weatherService.getWeatherStates(
          this.weatherListOriginal,
          this.filters.weatherState
        );
      })
    );
  }

  public ngOnDestroy() {
    if (this.subscriptions && this.subscriptions.length > 0) {
      this.subscriptions.forEach((subscription: Subscription) => {
        subscription.unsubscribe();
      });
    }
  }

  public onNewSearch(search: SearchModel): void {
    const { text, isValid } = search;
    if (isValid) {
      this.store.dispatch(new LoadWeatherAction(text));
    } else {
      this.store.dispatch(new RemoveWeatherAction());
    }
  }

  public onFilterChanges(filters: FilterModel): void {
    this.store.dispatch(new AddFiltersAction(filters));
  }
}
