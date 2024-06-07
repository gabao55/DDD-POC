import Product from "../../../../domain/product/entities/product";
import ProductRepositoryInterface from "../../../../domain/product/repositories/product-repository.interface";
import ProductModel from "./product.model";

export default class ProductRepository
    implements ProductRepositoryInterface {

    async create(product: Product): Promise<void> {
        await ProductModel.create({
            id: product.id,
            name: product.name,
            price: product.price,
        });
    }

    async update(product: Product): Promise<void> {
        await ProductModel.update({
            name: product.name,
            price: product.price,
        }, {
            where: { id: product.id },
        });
    }
    
    async findById(productId: string): Promise<Product> {
        const productModel = await ProductModel.findOne({ where: { id: productId } });

        return new Product(
            productModel.id,
            productModel.name,
            productModel.price
        );
    }

    async findAll(): Promise<Product[]> {
        const products = await ProductModel.findAll();

        return products.map((productModel) => new Product(
            productModel.id,
            productModel.name,
            productModel.price
        ));
    }

}