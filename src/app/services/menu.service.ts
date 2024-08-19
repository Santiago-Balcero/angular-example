import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class MenuService {
    
    private menuData = new BehaviorSubject<any>(null);

    constructor() { }

    sendMenuData(data: any): void {
        this.menuData.next(data);
    }

    getMenuData(): Observable<any> {
        return this.menuData.asObservable();
    } 
}