import { Component, Input, SimpleChanges, Output } from "@angular/core";
import { CountryService } from "../../services/country.service";
import { EventEmitter } from "@angular/core";

@Component({
  selector: "app-country-list",
  templateUrl: "./country-list.component.html",
  styleUrls: ["./country-list.component.css"]
})
export class CountryListComponent {
  @Input()
  filterName: string;
  tempCountry: any = undefined;

  @Output() selectedCountry = new EventEmitter();
  @Output() compareMode = new EventEmitter();
  countries: any;
  filteredCountries: any;
  constructor(private countryService: CountryService) {
    this.countryService.getAllCountries().subscribe(data => {
      this.countries = data.map(obj => obj.name);
      this.filteredCountries = this.countries;
    });
  }

  ngOnInit() {
    // this.countryService.getAllCountries().subscribe(data => {
    //   this.countries = data.map(obj => obj.name);
    //   this.filteredCountries = this.countries;
    // });
  }

  ngOnChanges(simpleChanges: SimpleChanges[]) {
    console.log(JSON.stringify(simpleChanges));
    if (simpleChanges.filterName.currentValue) {
      console.log("change");
      this.filteredCountries = this.filteredCountries.map(obj => {
        if (
          obj
            .toUpperCase()
            .startsWith(simpleChanges.filterName.currentValue.toUpperCase())
        ) {
          return obj;
        } else {
          return undefined;
        }
      });
      this.filteredCountries = this.filteredCountries.filter(obj => {
        return obj !== undefined;
      });
    }
  }

  getCountryInfo(country) {
    if (this.tempCountry === undefined) {
      this.tempCountry = country;
      this.selectedCountry.emit([country]);
    } else {
      console.log("Option to chose");
      if (confirm("Compare Values")) {
        this.compareMode.emit(true);
        this.selectedCountry.emit([this.tempCountry, country]);
      } else {
        this.compareMode.emit(false);
        this.selectedCountry.emit([this.tempCountry, country]);
      }
    }
  }

  trackByItems(index: number, country: string) {
    return country;
  }
}
