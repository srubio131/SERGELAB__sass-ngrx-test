import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Observable } from "rxjs";

import { HttpService } from "../../../shared/services/http.service";

import { LocationResponseModel } from "../models/response/location.model";
import { LocationSearchResponseModel } from "../models/response/location-search.model";
import { GLOBALS } from "../../../globals";
import { Weather } from "../../../shared/models/weather.model";
import { FilterModel } from "../../../shared/models/filter.model";
import { CityFilter } from "../models/city-filter.model";
import { SortEnum } from "../../../shared/enums/sort.enum";
import { sortArray } from "../../../shared/utils";

@Injectable()
export class WeatherService {
  constructor(private http: HttpService, private translate: TranslateService) {}

  public askForLocationSearch(
    query: string
  ): Observable<LocationSearchResponseModel[]> {
    const url: string = `${GLOBALS.endpoints.metaWeatherBaseURL}/${
      GLOBALS.context.api
    }/${GLOBALS.actions.locationSearch}`;

    return this.http.getVerb(url, { query });
  }

  public askForLocationWeather(
    woeid: number
  ): Observable<LocationResponseModel[]> {
    const url: string = `${GLOBALS.endpoints.metaWeatherBaseURL}/${
      GLOBALS.context.api
    }/${GLOBALS.actions.location}/${woeid}`;
    return this.http.getVerb(url);
  }

  public filterWeather(
    weatherList: Weather[],
    filters: FilterModel
  ): Weather[] {
    let { weatherState, orderBy, tempMin, tempMax } = filters;
    tempMin = tempMin ? tempMin : 0;
    tempMax = tempMax ? tempMax : Number.MAX_VALUE;
    // WeatherState, tempMin and tempMax filter
    let weatherListCopy: Weather[] = weatherList.filter((weather: Weather) => {
      const stateValid: boolean =
        weather.state === weatherState || weatherState === "All";
      const tempMinMaxValid: boolean =
        weather.temp >= tempMin && weather.temp <= tempMax;
      return stateValid && tempMinMaxValid;
    });
    // Order by filter
    if (orderBy) {
      const order: SortEnum = orderBy === "ASC" ? SortEnum.ASC : SortEnum.DESC;
      weatherListCopy = sortArray(weatherListCopy, "temp", order);
    }

    return weatherListCopy;
  }

  public getWeatherStates(
    weatherList: Weather[],
    currentWeatherStateFilter?: string
  ): CityFilter[] {
    const stateList: CityFilter[] = [];
    weatherList.forEach((dataCity: Weather) => {
      const distinctStateValues: string[] = [
        ...new Set(stateList.map((item: CityFilter) => item.value))
      ];
      const isAlready: boolean =
        distinctStateValues.indexOf(dataCity.state) > -1;
      if (!isAlready) {
        const isSelected: boolean =
          dataCity.state === currentWeatherStateFilter;
        const state: CityFilter = {
          name: this.getWeatherStateName(dataCity.state),
          value: dataCity.state,
          isSelected
        };
        stateList.push(state);
      }
    });
    return stateList;
  }

  private getWeatherStateName(stateCode: string): string {
    return this.translate.instant(`WEATHER_STATES.${stateCode.toUpperCase()}`);
  }
}
