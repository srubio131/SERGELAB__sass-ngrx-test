import { Component, Input, ChangeDetectionStrategy } from "@angular/core";

import { Weather } from "../../../../shared/models/weather.model";
import { GLOBALS } from "../../../../../app/globals";

@Component({
  selector: "app-cities-list",
  templateUrl: "./cities-list.component.html",
  styleUrls: ["./cities-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CitiesListComponent {
  @Input("data")
  public set data(weatherList: Weather[]) {
    this._data = weatherList || [];
    this.averageTemp = this.calculateAverageTemp(this._data);
  }
  public get data(): Weather[] {
    return this._data;
  }

  public averageTemp: number = 0;
  private _data: Weather[] = [];

  constructor() {}

  public getSrcImg(stateAbbr: string): string {
    return `${GLOBALS.paths.weatherAssets}${stateAbbr}.svg`;
  }

  private calculateAverageTemp(weathers: Weather[]): number {
    return (
      weathers.reduce(function(accumulator, weather) {
        return accumulator + weather.temp;
      }, 0) / weathers.length
    );
  }
}
