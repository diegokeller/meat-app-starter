import { CanLoad, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Route } from "@angular/router";
import { Injectable } from "@angular/core";
import { LoginService } from "./login/login.service";

@Injectable()
export class LoggedInGuard implements CanLoad, CanActivate {

    constructor(private loginService: LoginService){}

    checkAuthentication(path: string): boolean {
        const loggedIn = this.loginService.isLoggedIn()

        if(!loggedIn){
            this.loginService.handleLogin(`/${path}`)
        }

        return loggedIn;
    }

    canLoad(route: Route): boolean {
        console.log('Can load')
        return this.checkAuthentication(route.path)
    }

    canActivate(activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): boolean {
        console.log('Can activate ' + activatedRoute.routeConfig.path)
        return this.checkAuthentication(activatedRoute.routeConfig.path)
    }

}