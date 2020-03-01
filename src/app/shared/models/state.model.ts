import { Weather } from "./weather.model";
import { FilterModel } from "./filter.model";

export interface StateModel {
  searchText: string;
  filters: FilterModel;
  weatherList: Weather[];
}
