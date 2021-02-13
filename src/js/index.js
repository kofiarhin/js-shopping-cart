import "../css/styles.sass"
import ProductsModel from './model/productsModel';
import CartModel from "./model/cartModel";
import * as IndexView from "./view/indexView";
import * as shopView from "./view/shopView";
import * as itemView from "./view/itemView";
import * as cartView from "./view/cartView";
import * as SearchView from "./view/searchView";

import { getElement } from "./view/helper";


// global state
const state = {
    query: "women",
    products: "",
    path: "index.html",
    search: ""
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


// addd item to cart  controller
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


// place order controller
function placeOderController(event) {

    if (event.target.className = "btn-place-order") {

        //  clear cart data;
        state.cartModel.clearCart()
        // clear ui
        cartView.clearCartView()
    }
}


// cart controller
function cartController() {

    const cartWrapper = getElement("#cart .container .cart-wrapper");
    const ctaWrapper = getElement(".cta-wrapper");


    cartView.renderCart(state.cartModel.cartData);

    // add event lister to when user clickes on the remove button
    cartWrapper.addEventListener("click", removeItemController)

    // add event listener when user clicks on place order
    ctaWrapper.addEventListener("click", placeOderController)
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

    if (state.path === "search.html") {

        SearchController()
    }

}

// toggle nav
function toggleNav() {

    const nav = getElement("#side-nav")

    nav.classList.toggle("active")
}



// search controller
function SearchController() {


    const search = new URLSearchParams(window.location.search).get("search");

    state.products.searchItems(search, state.query);

    if (state.products.searchData) {

        SearchView.renderItems(state.products.searchData)
    }




}



// key press controller
function keyPressController(event) {

    // if enter key is pressed
    if (event.keyCode === 13) {

        const sideSearch = getElement(".side-search").value;
        const search = getElement('.search').value;

        if (search && search.length > 0) {
            window.location.href = `search.html?search=${search}`;

        }

        else if (sideSearch && sideSearch.length > 0) {

            window.location.href = `search.html?search=${sideSearch}`
        }

    }

}


// when thee is a hashchange
window.addEventListener("hashchange", controlHashchange)


// when key is pressed
window.addEventListener("keypress", keyPressController)

//  on load of window
window.addEventListener("load", async () => {

    // get menu icon
    const menu = getElement(".menu");


    // add event listener
    menu.addEventListener("click", toggleNav)

    // localStorage.clear()
    // load cart
    state.cartModel = new CartModel();

    // render cart length
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


    else if (state.path === "search.html") {

        SearchController();



    }



});






