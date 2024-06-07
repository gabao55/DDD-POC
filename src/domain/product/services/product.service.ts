import Product from "../entities/product";

export default class ProductService {
    static IncreasePrice(products: Product[], percentage: number): void {
        products.forEach(product => {
            product.changePrice(product.price * (100 + percentage) / 100);
        });
    }
}