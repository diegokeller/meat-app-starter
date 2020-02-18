"use strict";
exports.__esModule = true;
var User = /** @class */ (function () {
    function User(email, name, password) {
        this.email = email;
        this.name = name;
        this.password = password;
    }
    User.prototype.matches = function (another) {
        return another !== undefined &&
            another.email == this.email &&
            another.password == this.password;
    };
    return User;
}());
exports.User = User;
exports.users = {
    'juliana@gmail.com': new User('juliana@gmail.com', 'Juliana', '123'),
    'amanda@gmail.com': new User('amanda@gmail.com', 'Juliana', '456'),
    'carla@gmail.com': new User('carla@gmail.com', 'Juliana', '789')
};
