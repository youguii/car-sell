import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Offer } from '../interfaces/offer';
import { OffersService } from '../services/offers.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(
    private router :Router,
    private offersService: OffersService
     ) { }

  offersSubscription!: Subscription;
  offers: Offer[] = [];

  ngOnInit(): void {
    this.initOffers();
  }

  ngOnDestroy(): void {
      this.offersSubscription.unsubscribe();
  }

  initOffers(): void {
    this.offersSubscription = this.offersService.offersSubject.subscribe({
      next: offers => this.offers = offers,
      error: console.error
    });
    this.offersService.getOffers();
  }


}
