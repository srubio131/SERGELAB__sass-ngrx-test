import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Actions, Effect } from "@ngrx/effects";
import { Observable } from "rxjs/Observable";
import { forkJoin } from "rxjs/observable/forkJoin";
import { of } from "rxjs/observable/of";

import { WeatherActionTypes } from "../../shared/enums/weather-actions";
import { WeatherService } from "../../pages/javascript/services/weather.service";

import { LocationSearchResponseModel } from "../../pages/javascript/models/response/location-search.model";
import { LocationResponseModel } from "../../pages/javascript/models/response/location.model";
import { Weather } from "../../shared/models/weather.model";

import * as WeatherActions from "../actions/weather.actions";

@Injectable()
export class WeatherEffects {
  constructor(
    private actions: Actions,
    private weatherService: WeatherService
  ) {}

  /**
   * Al hacer una búsqueda se busca el listado de ciudades coincidentes; por cada ciudad se recuperan
   * sus datos de temperatura, se mapean a los modelos de nuestra app y se guardan en la store.
   */
  @Effect()
  loadWeather$: Observable<Action> = this.actions
    .ofType(WeatherActionTypes.Load)
    .switchMap((action: WeatherActions.LoadWeatherAction) =>
      this.weatherService.askForLocationSearch(action.searchText)
    )
    .switchMap((locations: LocationSearchResponseModel[]) => {
      if (locations && locations.length === 0) {
        new WeatherActions.RemoveWeatherAction();
        return of([]);
      }

      const observables: Observable<
        LocationSearchResponseModel[]
      >[] = locations.map((location: LocationResponseModel) =>
        this.weatherService.askForLocationWeather(location.woeid)
      );
      return forkJoin(observables);
    })
    .map((weatherLocationsInfo: LocationResponseModel[]) => {
      const weatherList: Weather[] = weatherLocationsInfo.map(
        (weatherLocation: LocationResponseModel) => {
          const weather: Weather = {
            title: weatherLocation.title,
            temp: weatherLocation.consolidated_weather[0].the_temp,
            tempMin: weatherLocation.consolidated_weather[0].min_temp,
            tempMax: weatherLocation.consolidated_weather[0].max_temp,
            state: weatherLocation.consolidated_weather[0].weather_state_abbr
          };
          return weather;
        }
      );
      return new WeatherActions.AddWeatherAction(weatherList);
    });
}
