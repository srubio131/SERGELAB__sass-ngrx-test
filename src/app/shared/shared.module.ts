import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HttpService } from "./services/http.service";

import { LinkComponent } from "./components/link/link.component";
import { RouterModule } from "@angular/router";
import { LoaderService } from "./services/loader.service";

const components = [LinkComponent];

@NgModule({
  declarations: components,
  imports: [CommonModule, RouterModule],
  providers: [HttpService, LoaderService],
  exports: components
})
export class SharedModule {}
