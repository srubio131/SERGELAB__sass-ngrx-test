import {
  Component,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  Input
} from "@angular/core";

import { SearchModel } from "../../models/search.model";

@Component({
  selector: "app-cities-search",
  templateUrl: "./cities-search.component.html",
  styleUrls: ["./cities-search.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CitiesSearchComponent {
  @Input("searchText") searchType: string = "";
  @Output("newSearch") newSearch = new EventEmitter<SearchModel>();

  public showErrorSearch: boolean = false;
  public isSearch: boolean = false;

  constructor() {}

  public onSearchClicked(): void {
    const isValid: boolean = this.isValidSearchType();
    this.showErrorSearch = !isValid;
    const dataEmit: SearchModel = {
      text: this.searchType,
      isValid
    };
    this.newSearch.emit(dataEmit);
  }

  private isValidSearchType(): boolean {
    const sanitizeSearchType: string = this.searchType.trim();
    return sanitizeSearchType !== "" && sanitizeSearchType.length < 50;
  }
}
