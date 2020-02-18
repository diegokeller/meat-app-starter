export class User {

    constructor(
        public email: string, 
        public name: string, 
        private password: string){

    }

    matches(another: User): boolean {
        return another !== undefined && 
            another.email == this.email && 
            another.password == this.password
    }

}

export const users: {[key: string]: User} = {
    'juliana@gmail.com': new User('juliana@gmail.com', 'Juliana', '123'),
    'amanda@gmail.com': new User('amanda@gmail.com', 'Juliana', '456'),
    'carla@gmail.com': new User('carla@gmail.com', 'Juliana', '789')
}