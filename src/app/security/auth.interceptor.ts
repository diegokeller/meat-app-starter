import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable, Injector } from "@angular/core";
import { LoginService } from "./login/login.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private injector: Injector) {
        
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        const loginService: LoginService = this.injector.get(LoginService)

        if(loginService.isLoggedIn()){

            // Clone necessário pois Request é imutável
            const authReq = req.clone({
                setHeaders: {
                    'Authorization': `Bearer ${loginService.user.accessToken}`
                }
            })

            // Chama o próximo interceptor passando a nova requisição
            return next.handle(authReq)
        }else{
            return next.handle(req)
        }

    }

    

}