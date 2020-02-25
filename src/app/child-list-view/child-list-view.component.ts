import { Component, Input, SimpleChanges } from "@angular/core";
import { CountryService } from "../services/country.service";
@Component({
  selector: "app-child-list-view",
  templateUrl: "./child-list-view.component.html",
  styleUrls: ["./child-list-view.component.css"]
})
export class ChildListViewComponent {
  @Input() country: string[];
  @Input() compareMode: boolean;
  currentMode: boolean = false;
  countryInfos: any[] = [];
  tempCountry: any = undefined;
  headers: string[] = [
    "country",
    "flag",
    "capital",
    "region",
    "subregion",
    "population",
    "currencies",
    "timezones",
    "area",
    "languages"
  ];
  constructor(private countryService: CountryService) {}

  ngOnChanges(simpleChanges: SimpleChanges[]) {
    console.log(simpleChanges);
    if (simpleChanges.country && simpleChanges.country.currentValue) {
      console.log(JSON.stringify(simpleChanges));
      this.tempCountry = simpleChanges.country.currentValue.pop();
      console.log(this.tempCountry);
      console.log(this.tempCountry);
      this.countryService
        .getCountryDetails(this.tempCountry)
        .subscribe(data => {
          console.log("After subscribing");
          if (
            (simpleChanges.compareMode &&
              simpleChanges.compareMode.currentValue &&
              simpleChanges.compareMode.currentValue === false) ||
            this.currentMode === false
          ) {
            console.log("I am here");
            let temp =
              this.countryInfos.length > 1 ? this.countryInfos.shift() : data;
            this.countryInfos = [];

            this.countryInfos.push(this.sanitizeData(temp));
          } else {
            if (this.countryInfos.length <= 1) {
              this.countryInfos.push(this.sanitizeData(data));
            }
          }
          console.log(this.countryInfos);
        });
    }

    if (
      simpleChanges.compareMode &&
      simpleChanges.compareMode.currentValue &&
      simpleChanges.compareMode.currentValue === true
    ) {
      this.currentMode = true;
    } else {
      this.compareMode = false;
    }
    //   if (this.countryInfos.length > 1) {
    //     this.countryInfos = this.countryInfos.splice(1, 1);
    //   } else {
    //     console.log("To do ");
    //     //this.countryInfos.pop();
    //   }
    // }
  }

  sanitizeData(data) {
    let countryInfo = {};
    countryInfo["flag"] = data[0].alpha2Code
      ? "https://www.countryflags.io/" + data[0].alpha2Code + "/shiny/64.png"
      : "";
    countryInfo["country"] = this.tempCountry;
    countryInfo["capital"] = data[0].capital ? data[0].capital : "";
    countryInfo["region"] = data[0].region ? data[0].region : "";
    countryInfo["subregion"] = data[0].subregion ? data[0].subregion : "";
    countryInfo["population"] = data[0].population ? data[0].population : "";
    countryInfo["currencies"] = data[0].currencies
      ? data[0].currencies.map(obj => obj.name).join()
      : "";
    countryInfo["timezones"] = data[0].timezones
      ? data[0].timezones.join()
      : "";
    countryInfo["area"] = data[0].area;
    countryInfo["languages"] = data[0].languages
      ? data[0].languages.map(obj => obj.name).join()
      : "";
    return countryInfo;
  }
}
