import { Injectable } from "@angular/core";
import { Http } from '@angular/http'

import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map'

import { MEAT_API } from '../app.api'
import { Restaurant } from "./restaurant/restaurant.model";


@Injectable()
export class RestaurantsService {

    data: Restaurant[];

    constructor(private http: Http){}

    getRestaurants(): Observable<Restaurant[]> {

        return this.http.get(`${MEAT_API}/restaurants`)
            .map(response => response.json())

    }

}