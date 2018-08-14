module.exports = function Cart(cart) {
    this.items = cart.items || {};
    this.totalItems = cart.totalItems || 0;
    this.totalPrice = cart.totalPrice || 0;

    this.add = function(item, id) {
        var cartItem = this.items[id];
        if (!cartItem) {
            cartItem = this.items[id] = {item: item, quantity: 0, price: 0};
        }
        cartItem.quantity++;
        cartItem.price = cartItem.item.price * cartItem.quantity;
        this.totalItems++;
        this.totalPrice += cartItem.item.price;
    };

    this.removeAll = function(id) {
        var cartItem = this.items[id];
        console.log(id);
        console.log(cartItem);
        this.totalItems -= cartItem.quantity;
        this.totalPrice -= cartItem.price;
        delete this.items[id];
    };

    this.removeOne = function(id) {
        var cartItem = this.items[id];
        cartItem.quantity--;
        cartItem.price = cartItem.item.price * cartItem.quantity;
        this.totalItems--;
        this.totalPrice -= cartItem.item.price;
        if (cartItem.quantity <= 0) {
            delete this.items[id];
        }
    };

    this.getItems = function() {
        var arr = [];
        for (var id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    };
};