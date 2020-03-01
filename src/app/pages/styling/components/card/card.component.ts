import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"]
})
export class CardComponent implements OnInit {
  @Input() imageName: string;

  public phase1: boolean = false;
  public phase2: boolean = false;
  public phase3: boolean = false;
  public imgSrc: string = "";

  ngOnInit() {
    this.imgSrc = this.getSrcImg(this.imageName);
  }

  public getSrcImg(imgName: string): string {
    return `/assets/img/${imgName}.jpg`;
  }
}
