import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Rental } from '../shared/rental.model';
import { RentalService } from '../shared/rental.service';

@Component({
  selector: 'bwm-rental-detail',
  templateUrl: './rental-detail.component.html',
  styleUrls: ['./rental-detail.component.scss']
})
export class RentalDetailComponent implements OnInit {

  constructor(private rentalService: RentalService, private route: ActivatedRoute) { }
  rental: Rental;

  ngOnInit() {
    // eliminate "undefined" error by assigning an instance of Rental to the rental before the page renders
    // this.rental = new Rental();

    // however, this can also be (and is) done by returning a new Rental[] instance in the .service file

    // .params is an Observable
    this.route.params.subscribe((params: Params) => {
      this.getRental(params['rentalId']);
    })
  }

  getRental(rentalId: number) {
    this.rentalService.getRentalById(rentalId)
    .subscribe((rental: Rental) => {
      this.rental = rental;
    })
  }

}
