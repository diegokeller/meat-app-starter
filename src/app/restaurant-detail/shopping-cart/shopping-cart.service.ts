import { MenuItem } from "../menu-item/menu-item.model"
import { CartItem } from "./cart-item"


export class ShoppingCartService {

    items: CartItem[] = []

    empty(): boolean {
        return this.items.length == 0
    }

    clear(){
        this.items = [];
    }

    total(): number {
        return this.items
            .map(i => i.value())
            .reduce((prev, value) => prev + value, 0)
    }

    addItem(item: MenuItem){
        let foundItem = this.items
            .find((mItem) => mItem.menuItem.id == item.id)

        if(foundItem){
            this.increaseQty(foundItem);
        }else{
            this.items.push(new CartItem(item))
        }
    }

    removeItem(item: CartItem){
        this.items.splice(this.items.indexOf(item), 1)
    }

    increaseQty(item: CartItem) {
        item.quantity += 1
    }

    decreaseQty(item: CartItem) {
        item.quantity -= 1
        if(item.quantity == 0){
            this.removeItem(item)
        }
    }

}