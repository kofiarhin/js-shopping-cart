export function getElement(name) {

    return document.querySelector(name);
}


export function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}


export function renderElements(element, data) {

    let output = "";
    data.forEach(item => {

        let markup = `
                <div class="item-unit"> 
                <div class="cover" style="background-image: url(${item.image_url})"> </div>
                        <h2 class="item-title"> ${item.title}</h2>
                        <p class="item-price"> ${item.price} </p>           
                </div>
        `;

        output += markup;
    });

    element.innerHTML = output
}