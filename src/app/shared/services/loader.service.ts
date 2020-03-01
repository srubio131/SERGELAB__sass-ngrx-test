import { Injectable, OnDestroy } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";

@Injectable()
export class LoaderService {
  private counter: number;

  constructor(private ngxSpinnerService: NgxSpinnerService) {
    this.counter = 0;
  }

  public show() {
    this.counter++;
    this.ngxSpinnerService.show();
  }

  public hide(resetCounter?: boolean) {
    this.counter = resetCounter ? 0 : this.counter;
    this.counter = this.counter > 0 ? --this.counter : this.counter;

    if (this.counter === 0) {
      this.ngxSpinnerService.hide();
    }
  }
}
