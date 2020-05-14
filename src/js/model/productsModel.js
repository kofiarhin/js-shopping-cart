export default class ProductsModel {



    async  getProducts() {

        const url = "./products.json";

        const products = await fetch(url).then(response => response.json()).then(result => result);

        this.result = products;
    }
}