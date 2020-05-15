import { getElement } from "./helper";

// render cart items
function renderItems(data) {

    const container = getElement("#cart .container .cart-wrapper .cart-items")
    let output = "";

    data.forEach(item => {

        let itemMarkup = `
        <div class="cart-item" data-id=${item.id} data-category="${item.category}">
                    <div class="cover" style="background-image: url(${item.image_url})"></div>

                    <div class="content">
                        <h1 class="title">${item.title}</h1>
                        <p class="price">$${item.price.toFixed(2)}</p>
                        <button class="remove">Remove</button>
                    </div>
                </div>
        `;

        output += itemMarkup;

    });

    container.innerHTML = output;
}

function renderTotal(data) {

    const textWrapper = getElement('#cart .text-wrapper');
    let sum = 0;

    data.forEach(item => {
        sum += parseInt(item.price);
    });

    textWrapper.innerHTML = `<h1> Your Total: $${sum.toFixed(2)}</h1>`

}


// render Buttons
function renderButtons() {

    let ctaWrapper = getElement("#cart .cart-wrapper .cta-wrapper");
    let markup = `
            <div class="button-wrapper"> 
                    <button class="btn-place-order"> Place Order </button>
            </div>
    `;
    ctaWrapper.innerHTML = markup;
}

function renderTitle(data) {

    const title = getElement("#cart .main-title ")

    if (!data) {

        title.textContent = "Your cart is empty"
    } else {
        title.textContent = "Your Cart"
    }

}


function clearCart() {

    const container = getElement("#cart .container .cart-wrapper");
    const title = getElement('#cart .main-title');
    container.innerHTML = "";
    title.textContent = "Your Cart is empty"


}

// render cart
export function renderCart(data) {

    renderTitle(data)

    if (data && data.length > 0) {
        renderItems(data)
        renderTotal(data)
        renderButtons()
    } else {
        clearCart()
    }
}