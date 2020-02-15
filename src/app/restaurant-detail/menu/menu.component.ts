import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import {Observable} from 'rxjs/Observable'

import {RestaurantsService} from '../../restaurants/restaurants.service'
import { MenuItem } from '../menu-item/menu-item.model';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';

@Component({
  selector: 'mt-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {

  menu: Observable<MenuItem[]>

  constructor(private route: ActivatedRoute, 
    private restaurantsService: RestaurantsService,
    private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
    this.menu = this.restaurantsService
      .getMenuByRestaurant(this.route.parent.snapshot.params['id'])
  }

}
