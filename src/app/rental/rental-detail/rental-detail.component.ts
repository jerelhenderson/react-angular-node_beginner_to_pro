import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Rental } from '../shared/rental.model';
import { RentalService } from '../shared/rental.service';

@Component({
  selector: 'bwm-rental-detail',
  templateUrl: './rental-detail.component.html',
  styleUrls: ['./rental-detail.component.scss']
})
export class RentalDetailComponent implements OnInit {

  constructor(private rentalService: RentalService, private router: Router, private route: ActivatedRoute) { }
  rental: Rental[];
  id: number;

  ngOnInit(): void {
    // .params is an Observable
    this.route.params.subscribe((params: Params) => {
      this.id = +params['rentalId'];
    })
  }

}
