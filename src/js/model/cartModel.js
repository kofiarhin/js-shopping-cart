export default class CartModel {

    constructor() {

        const cartData = localStorage.getItem('cart');

        if (cartData) {
            this.cartData = JSON.parse(cartData);
        }
    }


    addItem(item, query) {
        //  get cartdata

        // modify data with  category
        item.category = query;

        let cartData = this.getCart();
        // add item to cart
        cartData.push(item);

        // save item to cart
        this.saveCart(cartData);


    }


    saveCart(data) {

        // save item  to local storage;
        localStorage.setItem("cart", JSON.stringify(data));
        this.cartData = this.getCart();

        console.log(this.cartData);

    }

    getCart() {

        let cartData = localStorage.getItem('cart');
        if (!cartData) {
            cartData = []
        } else {
            cartData = JSON.parse(cartData);
        }

        return cartData;
    }
}
