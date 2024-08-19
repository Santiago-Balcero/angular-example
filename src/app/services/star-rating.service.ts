import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class StarRatingService {
    
    private showPerformance = new BehaviorSubject<number>(0);

    constructor() { }

    showStars(effectiveness: number): void {
        this.showPerformance.next(effectiveness);
    }

    getStars(): Observable<any> {
        return this.showPerformance.asObservable();
    } 
}