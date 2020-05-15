function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

const renderItems = (data, container, query) => {

    const element = getElement(container);

    let output = "";
    data.forEach(item => {

        let markup = `
                 <a href="viewItem.html?category=${query}&id=${item.id}" class="item-unit">
                    <div class="cover" style="background-image: url(${item.image_url})"></div>
                </a>            
        `;

        output += markup;

    });

    element.innerHTML = output;


}




export function getElement(name) {

    return document.querySelector(name);
}

// render banner
export function renderBanner(query) {

    const banner = getElement("#banner .container")

    let markup = `
     <div class="banner-content">
             <img src="./images/${query}/banner.jpg" />
             <a href="shop.html?query=${query}" class="banner-cta"> Start Shopping </a> 
        </div>
     
     `;
    banner.innerHTML = markup;

}


// render latest
export function renderLastest(data, query) {

    const newData = shuffle(data).slice(5, 10);
    renderItems(newData, "#latest .container .items-wrapper", query)
}


// render trending
export function renderTrending(data, query) {

    const newData = shuffle(data).slice(0, 5);
    renderItems(newData, "#trending .container .items-wrapper", query)
}



export function renderBestSellers(data, query) {

    const newData = shuffle(data).slice(0, 5);
    renderItems(newData, "#best-sellers .container .items-wrapper", query)
}

export function renderCartLength(length) {

    const text = getElement(".main-header .cart-length");

    if (length) {
        text.textContent = length
    }

    if (!length) {
        text.textContent = ""
    }
}