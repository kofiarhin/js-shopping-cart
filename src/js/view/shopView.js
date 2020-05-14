import { getElement, shuffle } from "./helper";


const itemsWrapper = getElement("#shop .items-wrapper")

export function renderItems(data, query) {

    const itemsWrapper = getElement("#shop .items-wrapper");
    let output = "";

    shuffle(data).forEach(item => {

        let markup = `
               <a href="viewItem.html?category=${query}&id=${item.id}" class="item-unit">
                    <div class="cover" style="background-image: url(${item.image_url})"></div>
                    <h2 class="item-title">${item.title}</h2>
                    <p class="item-price">$${item.price}</p>
                </a>      
        `;

        output += markup;

    });

    itemsWrapper.innerHTML = output;


}