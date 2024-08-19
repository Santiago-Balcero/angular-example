import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class LoaderService {

    private loader = new BehaviorSubject<boolean>(false);

    constructor() { }

    showLoader(loading: boolean): void {
        this.loader.next(loading)
    }

    getLoader(): Observable<any> {
        return this.loader.asObservable();
    } 
}