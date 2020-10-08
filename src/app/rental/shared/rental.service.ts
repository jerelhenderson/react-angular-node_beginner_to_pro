import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';


@Injectable()
export class RentalService {
	constructor(private http: HttpClient) {}

	public getRentalById(rentalId: number): Observable<any> {
		return this.http.get('/api/v1/rentals/' + rentalId);
	}

	public getRentals(): Observable<any> {
		return this.http.get('/api/v1/rentals');
	}

	public getRentalsByCity(city): Observable<any> {
		return this.http.get(`/api/v1/rentals?city=${city}`);
	}
}