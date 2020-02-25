import { Component, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-list-view",
  templateUrl: "./list-view.component.html",
  styleUrls: ["./list-view.component.css"]
})
export class ListViewComponent {
  @Output() country = new EventEmitter();
  @Output() mode = new EventEmitter();
  getCountry(countries: any) {
    console.log(countries);
    this.country.emit(countries);
  }

  getMode(event) {
    this.mode.emit(event);
  }
}
