import { Component, SimpleChanges, Output, EventEmitter } from "@angular/core";
import { CountryService } from "../../services/country.service";

@Component({
  selector: "app-list-search",
  templateUrl: "./list-search.component.html",
  styleUrls: ["./list-search.component.css"]
})
export class ListSearchComponent {
  //countries: [] = [];
  name: string = "";
  @Output()
  countrySelected = new EventEmitter();
  @Output()
  mode = new EventEmitter();
  constructor(private countryService: CountryService) {}

  ngOnChanges(simpleChanges: SimpleChanges[]) {
    console.log(simpleChanges);
  }

  onKey(event) {
    console.log("Here");
    console.log(event);
    this.name = event;
  }

  getSelectedCountry(event) {
    this.countrySelected.emit(event);
  }

  getMode(event) {
    this.mode.emit(event);
  }
}
