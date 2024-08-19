import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Country } from "@models/countries.models";
import { Observable, map } from "rxjs";

@Injectable({
    providedIn: "root"
  })
  export class CatalogueService {

    constructor(private http: HttpClient) { }
    
    // Change for api endpoint when needed
    countriesPath: string = 'assets/data/countries.csv';

    getCountries(): Observable<any> {
        return this.http.get(this.countriesPath, {responseType: 'text'}).pipe(
            map((data) => {
                let countries: Country[] = [];
                const countriesStrings: string[] = data.split('\n');
                for (let i = 0; i < countriesStrings.length; i++) {
                    const row = countriesStrings[i].split(',');
                    const newCountry: Country = {
                        code: row[0],
                        english: row[1],
                        spanish: row[2]
                    }
                    countries.push(newCountry);
                }
                return countries
            })
        );
    }

  }