import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable()
export class RentalService {
    private rentals: any[] = [{
        id: 1,
        title: "Center Apartment",
        city: "Manhattan",
        street: "Times Square",
        category: "apartment",
        image: "http://via.placeholder.com/3500x250",
        bedrooms: 3,
        description: "Be in the Center of the Square",
        dailyRate: 35,
        shared: false,
        createdAt: "2017/12/24"
      },
      {
        id: 2,
        title: "Central Apartment 2",
        city: "San Francisco",
        street: "Main Street",
        category: "condo",
        image: "http://via.placeholder.com/350x250",
        bedrooms: 2,
        description: "Very nice apartment",
        dailyRate: 12,
        shared: true,
        createdAt: "2017/12/24"
      },
      {
        id: 3,
        title: "Central Apartment 3",
        city: "Bratislava",
        street: "Hlavna",
        category: "condo",
        image: "http://via.placeholder.com/350x250",
        bedrooms: 2,
        description: "Very nice apartment",
        dailyRate: 334,
        shared: true,
        createdAt: "2017/12/24"
      },
      {
        id: 4,
        title: "Central Apartment 4",
        city: "Berlin",
        street: "Haupt strasse",
        category: "house",
        image: "http://via.placeholder.com/350x250",
        bedrooms: 9,
        description: "Very nice apartment",
        dailyRate: 33,
        shared: true,
        createdAt: "2017/12/24"
      }];

    public getRentals(): any {
        const rentalObservable = new Observable((observer) => {
            setTimeout(() => {
                observer.next(this.rentals);
            }, 1000);
            setTimeout(() => {
                observer.error("Error message");
            }, 2000);
            setTimeout(() => {
                observer.complete();
            }, 3000);
        });
        return rentalObservable;
    }
}