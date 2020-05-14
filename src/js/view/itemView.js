import { getElement } from "./helper";


export function renderItem(data) {

    const container = getElement("#item .container .item-wrapper");

    let markup = `
            <div class="cover" style="background-image: url(${data.image_url})">
                </div>

                <div class="content">

                    <h1 class="item-title"> ${data.title}</h1>
                    <p class="item-price">$${data.price.toFixed(2)}</p>
                    <p class="info"> Delivery and returns info  </p>
                    <div class="button-wrapper">
                        <button class="btn-add"> Add To Cart </button>
                    </div>
                </div>
                
        `;

    container.innerHTML = markup;
}