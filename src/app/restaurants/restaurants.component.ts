import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms'
import { trigger, state, style, transition, animate } from '@angular/animations'

import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/distinctUntilChanged'
import 'rxjs/add/operator/catch'
import 'rxjs/add/Observable/from'
import {Observable} from 'rxjs/Observable'

import { Restaurant } from './restaurant/restaurant.model';
import { RestaurantsService } from './restaurants.service';

@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html',
  animations: [
    trigger('toggleSearch', [
      state('hidden', style({
        opacity: 0,
        "max-height": "0px"
      })),
      state('visible', style({
        opacity: 1,
        "max-height": "70px",
        "margin-top": "20px"
      })),
      transition('* => *', animate('250ms 0s ease-in-out'))
    ])
  ]
})
export class RestaurantsComponent implements OnInit {

  searchBarState = 'hidden'
  restaurants: Restaurant[];

  searchForm: FormGroup
  searchControl: FormControl

  constructor(
    private restaurantsService: RestaurantsService,
    private fb: FormBuilder) { }

  ngOnInit() {

    this.restaurantsService.getRestaurants()
      .subscribe(data => this.restaurants = data);

      this.searchControl = this.fb.control('')
      this.searchForm = this.fb.group({
        searchControl: this.searchControl
      })

      this.searchControl.valueChanges
        .debounceTime(500) // Ignora eventos repetidos com menos de 500ms
        .distinctUntilChanged() // Ignora eventos com valores iguais
        .do(term => console.log(term))
        .switchMap(searchTerm => // Troca o observer
          this.restaurantsService.getRestaurants(searchTerm)
            .catch(error => Observable.from([])) // Retorna vazio em caso de error para prevedir quebrar o observable
        )
        .subscribe( // Atualiza o valor
          restaurants => this.restaurants = restaurants
        )

  }

  toggleSearch(){
    this.searchBarState = this.searchBarState == 'hidden' ? 'visible' : 'hidden'
  }

}
