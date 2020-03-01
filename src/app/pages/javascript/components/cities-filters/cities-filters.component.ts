import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  OnDestroy,
  ChangeDetectionStrategy
} from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";

import { CityFilter } from "../../models/city-filter.model";
import { Subscription } from "rxjs";
import { FilterModel } from "../../../../shared/models/filter.model";

@Component({
  selector: "app-cities-filters",
  templateUrl: "./cities-filters.component.html",
  styleUrls: ["./cities-filters.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CitiesFiltersComponent implements OnInit, OnDestroy {
  @Input("statesList")
  public set statesList(statesList: CityFilter[]) {
    this._statesList = statesList || [];
    if (this.isSelectedAllState() && this.filtersForm) {
      this.filtersForm.patchValue({ weatherState: "All" });
    }
  }
  public get statesList(): CityFilter[] {
    return this._statesList;
  }
  @Input("filters") filters: FilterModel;
  @Output("filterChanges") filterChanges = new EventEmitter<FilterModel>();

  public filtersForm: FormGroup;
  public selectedAll: boolean = false;

  private subscriptions: Subscription[] = [];
  private _statesList: CityFilter[];

  constructor(private formBuilder: FormBuilder) {}

  public ngOnInit() {
    this.filtersForm = this.formBuilder.group(this.filters);
    this.initializeSubscriptions();
  }

  public ngOnDestroy() {
    if (this.subscriptions && this.subscriptions.length > 0) {
      this.subscriptions.forEach((subscription: Subscription) => {
        subscription.unsubscribe();
      });
    }
  }

  public isSelectedAllState() {
    const isEmpty: boolean = this.statesList && this.statesList.length === 0;
    const isSomeSelected: boolean = this.statesList.some(
      (state: CityFilter) => state.isSelected
    );
    return isEmpty || !isSomeSelected;
  }

  private initializeSubscriptions(): void {
    this.subscriptions.push(
      this.filtersForm.valueChanges.subscribe((changes: FilterModel) => {
        const { weatherState, orderBy, tempMin, tempMax } = changes;
        const filters: FilterModel = {
          weatherState,
          tempMin,
          tempMax,
          orderBy
        };
        this.filterChanges.emit(filters);
      })
    );
  }
}
