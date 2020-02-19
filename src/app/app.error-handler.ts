import { HttpErrorResponse } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import { ErrorHandler, Injectable, Injector } from '@angular/core'
import { NotificationService } from './shared/messages/notification.service'
import { LoginService } from './security/login/login.service'

@Injectable()
export class ApplicationErrorHandler extends ErrorHandler {

    constructor(private notificationService: NotificationService, 
        private injector: Injector){
        super()
    }

    handleError(response: Response | any) {
        if(response instanceof HttpErrorResponse){

            const message: string = response.error.message

            switch(response.status){
                case 401:
                    this.injector.get(LoginService).handleLogin()
                    break;
                case 403:
                    this.notificationService.notify(message || 'Não autorizado.')
                    break;
                case 404:
                    this.notificationService.notify(message || 'Recurso não encontrado.')
                    break;
            }
        }
        super.handleError(response)
    }

}