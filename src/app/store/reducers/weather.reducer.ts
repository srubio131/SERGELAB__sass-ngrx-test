import { WeatherActions } from "../actions/weather.actions";
import { StateModel } from "../../shared/models/state.model";

import { WeatherActionTypes } from "../../shared/enums/weather-actions";

const initialState: StateModel = {
  searchText: "",
  filters: {
    weatherState: "All",
    tempMin: undefined,
    tempMax: undefined,
    orderBy: null
  },
  weatherList: []
};

export function weatherReducer(state = initialState, action: WeatherActions) {
  switch (action.type) {
    case WeatherActionTypes.Load:
      const newStateLoad: StateModel = { ...state };
      newStateLoad.searchText = action.searchText;
      return newStateLoad;
    case WeatherActionTypes.AddFilters:
      const newStateAddFilters: StateModel = { ...state };
      newStateAddFilters.filters = { ...action.filters };
      return newStateAddFilters;
    case WeatherActionTypes.AddWeatherList:
      const newStateAddWeatherList: StateModel = { ...state };
      newStateAddWeatherList.weatherList = [...action.weatherList];
      return newStateAddWeatherList;
    case WeatherActionTypes.Remove:
      const newStateRemoveWeather: StateModel = { ...state };
      newStateRemoveWeather.weatherList = [];
      return newStateRemoveWeather;
    default:
      return state;
  }
}
