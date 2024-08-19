import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { ModalData } from '../models/modalData.model';

@Injectable({
    providedIn: 'root'
})
export class ModalService {
    
    private modalData = new BehaviorSubject<any>(null);

    constructor() { }

    // Can add detail to data (data.detail = something) to send a specific message to modal
    // when sending data from app and not from http responses
    showModal(data: ModalData): void {
        this.modalData.next(data);
    }

    getModal(): Observable<any> {
        return this.modalData.asObservable();
    } 
}    