import { Component, OnInit } from "@angular/core";

import { GLOBALS } from "../globals";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  public routes: string[];

  constructor() {
    this.routes = [];
  }

  ngOnInit() {
    this.routes.push(GLOBALS.routes.styling, GLOBALS.routes.javascript);
  }
}
