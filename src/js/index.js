import "../css/styles.sass"
import ProductsModel from './model/productsModel';
import CartModel from "./model/cartModel";
import * as IndexView from "./view/indexView";
import * as shopView from "./view/shopView";
import * as itemView from "./view/itemView";
import * as cartView from "./view/cartView";

import { getElement } from "./view/helper";


// global state
const state = {
    query: "women",
    products: "",
    path: "index.html"
}


// control shop
function controlShop() {

    // get query
    const search = new URLSearchParams(window.location.search);
    state.query = search.get("query")

    shopView.renderItems(state.products.result[state.query], state.query)

}


// control index
function controlIndex() {

    const data = state.products.result;
    const query = state.query;
    const products = state.products;

    // // load banner
    IndexView.renderBanner(state.query);

    // // render latest
    IndexView.renderLastest(data[query], state.query)

    // //render trending
    IndexView.renderTrending(products.result[query], state.query)

    // // render best sellers
    IndexView.renderBestSellers(data[query], state.query)


    // render trending brands
    IndexView.renderTrendingBrand()

}


// products control;
async function controlLoad() {

    state.products = new ProductsModel();
    await state.products.getProducts();

}

// view item controller
function viewItemController() {

    // get query details
    const search = new URLSearchParams(window.location.search);
    const id = parseInt(search.get("id"));
    const category = search.get("category")

    state.query = category;

    // fetch data
    const products = state.products.result[category]

    // find item
    const product = products.find(item => {

        return item.id === id;
    });

    state.product = product;

    itemView.renderItem(product);



    // when user clicks on add to cart
    const itemWrapper = getElement("#item .container .item-wrapper")

    itemWrapper.addEventListener("click", function (event) {

        if (event.target.className === "btn-add") {

            addItemController()

        }
    });

}



// addd item controller
function addItemController() {

    // get product from state
    const product = state.product;
    // add item to cart
    state.cartModel.addItem(product, state.query)
    // get cart data

    window.location.href = "cart.html";


}


// remove item controller
function removeItemController(event) {

    if (event.target.className === "remove") {

        const element = event.target.parentNode.parentNode;

        const id = parseInt(element.dataset.id);
        const category = element.dataset.category;

        if (id) {

            state.cartModel.removeItem(id, category);
            cartView.renderCart(state.cartModel.cartData);

            renderCartLength()

        }
    }

}

// cart controller
function cartController() {

    const cartWrapper = getElement("#cart .container .cart-wrapper");

    cartView.renderCart(state.cartModel.cartData);
    // add event lister to when user clickes on the remove button
    cartWrapper.addEventListener("click", removeItemController)
}



// render cartlength

function renderCartLength() {
    // const cartLength = state.cartModel.getCartLength();
    // IndexView.renderCartLength(cartLength);


    // check if there are items in cart
    if (state.cartModel.cartData && state.cartModel.cartData.length > 0) {

        const cartLength = state.cartModel.cartData.length;

        // render cart length on ui
        cartView.renderCartLength(cartLength)

    }

    // lazy approach but hey it works
    else {

        cartView.clearCartLength()

    }

}

// control hashChange
function controlHashchange() {

    const hash = window.location.hash;
    state.query = hash.replace("#", "");


    // if on the index page
    if (!state.path || state.path === "index.html") {

        // renderbanner
        IndexView.renderBanner(state.query);

        // render trending
        IndexView.renderTrending(state.products.result[state.query], state.query);

        // render latest
        IndexView.renderLastest(state.products.result[state.query], state.query);

        // render best sellers
        IndexView.renderBestSellers(state.products.result[state.query], state.query)

    }


    // if on the shop page
    if (state.path === "shop.html") {
        shopView.renderItems(state.products.result[state.query], state.query)
    }

}


//  on load of window
window.addEventListener("load", async () => {


    console.log("render side nav")
    // localStorage.clear()
    // load cart
    state.cartModel = new CartModel();

    renderCartLength()

    // load products
    await controlLoad();

    // set default query to men
    state.query = "men";

    // get the page
    state.path = window.location.pathname.replace("/", "");

    // if on index page load index controller
    if (!state.path || state.path === "index.html") {
        controlIndex()
    }

    // if on shop page
    else if (state.path === "shop.html") {

        // load shop controller
        controlShop()

    }

    //  view item page
    else if (state.path === "viewItem.html") {

        viewItemController()
    }

    else if (state.path === "cart.html") {
        cartController()
    }

});





// when thee is a hashchange
window.addEventListener("hashchange", controlHashchange)




