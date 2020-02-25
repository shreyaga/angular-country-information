import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "CodeSandbox";
  country: any = null;
  selectedMode: boolean = false;
  selectedCountry(countries: any) {
    console.log("Here");
    this.country = countries;
  }
  getMode(event) {
    console.log("Mode" + event);
    this.selectedMode = event;
  }
}
