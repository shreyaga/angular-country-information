import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { ListViewComponent } from "./list-view/list-view.component";
import { CountryService } from "./services/country.service";
import { HttpClientModule } from "@angular/common/http";
import { CountryListComponent } from "./list-view/country-list/country-list.component";
import { ListSearchComponent } from "./list-view/list-search/list-search.component";
import { ChildListViewComponent } from "./child-list-view/child-list-view.component";

@NgModule({
  declarations: [
    AppComponent,
    ListViewComponent,
    ListSearchComponent,
    CountryListComponent,
    ChildListViewComponent
  ],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  providers: [CountryService],
  bootstrap: [AppComponent]
})
export class AppModule {}
