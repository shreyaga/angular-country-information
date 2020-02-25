import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import * as data from "../../assets/config.json";
import { Observable } from "rxjs";
@Injectable()
export class CountryService {
  countries: any;
  config: any = {};
  constructor(private http: HttpClient) {}

  getAllCountries(): Observable<any> {
    console.log(data.allCountries);
    return this.http.get(data.allCountries);
  }

  getCountryDetails(name): Observable<any> {
    return this.http.get(data.countryApi + "/" + name + "?fullText=true");
  }
}
