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
