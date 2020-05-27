export default class ProductsModel {

    searchItems(search, query) {

        const data = this.result[query];

        if (data && data.length > 0) {

            const searchData = data.filter(item => item.title.toLowerCase().includes(search.toLowerCase()));
            this.searchData = searchData;
        }

    }

    async  getProducts() {

        const url = "./products.json";

        const products = await fetch(url).then(response => response.json()).then(result => result);

        this.result = products;
    }
}