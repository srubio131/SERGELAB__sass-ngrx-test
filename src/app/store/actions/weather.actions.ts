import { Action } from "@ngrx/store";

import { Weather } from "../../shared/models/weather.model";
import { FilterModel } from "../../shared/models/filter.model";
import { WeatherActionTypes } from "../../shared/enums/weather-actions";

export class LoadWeatherAction implements Action {
  readonly type = WeatherActionTypes.Load;
  constructor(public searchText: string) {}
}

export class AddFiltersAction implements Action {
  readonly type = WeatherActionTypes.AddFilters;
  constructor(public filters: FilterModel) {}
}

export class AddWeatherAction implements Action {
  readonly type = WeatherActionTypes.AddWeatherList;
  constructor(public weatherList: Weather[]) {}
}

export class RemoveWeatherAction implements Action {
  readonly type = WeatherActionTypes.Remove;
}

export type WeatherActions =
  | LoadWeatherAction
  | AddFiltersAction
  | AddWeatherAction
  | RemoveWeatherAction;
