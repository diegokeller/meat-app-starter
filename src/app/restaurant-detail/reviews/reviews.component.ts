import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import {ActivatedRoute} from '@angular/router'

import {RestaurantsService} from '../../restaurants/restaurants.service'


@Component({
  selector: 'mt-reviews',
  templateUrl: './reviews.component.html'
})
export class ReviewsComponent implements OnInit {

  reviews: Observable<any>

  constructor(private restaurantsService: RestaurantsService, 
    private route: ActivatedRoute) {}

  ngOnInit() {
    // Temos que navegar para o pai (parent) pois estamos numa rota filha
    this.reviews = this.restaurantsService.getReviewsByRestaurant(
      this.route.parent.snapshot.params['id']
    )
  }

}