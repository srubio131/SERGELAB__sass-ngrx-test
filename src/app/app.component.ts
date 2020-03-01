import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  public currentLang: string;

  constructor(private translate: TranslateService) {}

  public ngOnInit() {
    this.currentLang = this.translate.getBrowserLang();
    this.translate.setDefaultLang(this.currentLang);
  }

  public onLanguageChange(newLanguage: string): void {
    this.translate.use(newLanguage);
  }
}
