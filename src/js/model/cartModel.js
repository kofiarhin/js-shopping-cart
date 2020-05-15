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

    removeItem(id, cartegory) {

        const data = this.cartData;

        // find index of item
        const index = data.findIndex(item => {

            return item.id === id && item.category === cartegory;
        });

        if (index !== -1) {

            const cartData = this.cartData;
            cartData.splice(index, 1);
            this.saveCart(cartData)

        }

    }

    getCartLength() {

        const cartData = this.cartData;
        return cartData.length;
    }
}
