import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CamelizePipe } from 'ngx-pipes';

@Injectable()
export class MapService {
    private geoCoder;
    private locationCache: any = {};

    constructor(private camelizePipe: CamelizePipe) {}

    // Location strings will be converted to camelcase to standardize input into the geoCoder()
    private camelize(value: string): string {
        return this.camelizePipe.transform(value);
    }

    // If isLocationCached === false, jump here to cache the coordinate values
    private cacheLocation(location: string, coordinates: any) {
        this.locationCache[this.camelize(location)] = coordinates;
    }

    // Check if location being accessed has already been cached
    private isLocationCached(location): Boolean {
        return this.locationCache[this.camelize(location)];
    }

    private geocodeLocation(location: string): Observable<any> {
        if (this.geoCoder) { this.geoCoder = new (<any>window).google.maps.Geocoder() }

        return new Observable((observer) => {
            this.geoCoder.geocode({address: location}, (res, status) => {
                if (status === 'OK') {
                    const geometry = res[0].geometry.location;
                    const coordinates = {lat: geometry.lat(), lng: geometry.lng()};
                    this.cacheLocation(location, coordinates);

                    observer.next(coordinates);
                } else {
                    observer.error('Location could not be determined');
                }
            });
        });
    }

    public getGeoLocation(location: string): Observable<any> {
        if (this.isLocationCached(location)) {

            // RxJS v5/6 `Observable.of()`... in v6.+ import `{ of }` from... and use `of()`
            // Reason: "Classes that operate on observables have been replaced by functions"
            return of(this.locationCache[this.camelize(location)]);
        } else {
            return this.geocodeLocation(location);
        }
    }
}