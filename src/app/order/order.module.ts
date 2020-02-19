import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { OrderComponent } from "./order.component";
import { OrderItemsComponent } from "./order-items/order-items.component";
import { DeliveryCostsComponent } from "./delivery-costs/delivery-costs.component";
import { SharedModule } from "app/shared/shared.module";
import { LeaveOrderGuard } from "./leave-order.guard";

const ROUTES: Routes = [
    {
        path: '', 
        component: OrderComponent,
        canDeactivate: [LeaveOrderGuard] // Tem que ser colocado dentro do módulo pois o guard espera o módulo como parâmetros, se fosse no arquivo de rotas o componente não estaria pronto, undefined
    }
]

@NgModule({
    declarations: [
        OrderComponent, 
        OrderItemsComponent, 
        DeliveryCostsComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(ROUTES)
    ],
    exports: [
        // Só preciso exportar componentes que são usados fora desse módulo
    ]

})
export class OrderModule {

}