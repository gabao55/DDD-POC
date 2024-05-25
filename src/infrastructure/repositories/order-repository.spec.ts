import { Sequelize } from "sequelize-typescript";
import Product from "../../domain/entities/product";
import ProductRepository from "./product.repository";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import CustomerModel from "../db/sequelize/model/customer.model";
import OrderModel from "../db/sequelize/model/order.model";
import CustomerRepository from "./customer.repository";
import Customer from "../../domain/entities/customer";
import Address from "../../domain/entities/address";
import OrderItem from "../../domain/entities/order_item";
import Order from "../../domain/entities/order";
import OrderRepository from "./order-repository";
import ProductModel from "../db/sequelize/model/product.model";

describe("Order repository tests", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = await new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([ProductModel, OrderItemModel, CustomerModel, OrderModel]);
        await sequelize.sync();
    });
    
    afterEach(async () => {
        await sequelize.close();
    });

    it("should create an order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 100);
        await productRepository.create(product);

        const orderItem = new OrderItem("1", product.name, product.id, product.price, 1);

        const orderRepository = new OrderRepository();
        const order = new Order("1", customer.id, [orderItem]);
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({ where: { id: order.id }, include: [{ model: OrderItemModel }] });

        expect(orderModel.toJSON()).toStrictEqual({
            id: order.id,
            customerId: customer.id,
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    productId: orderItem.productId,
                    orderId: order.id,
                    quantity: orderItem.quantity,
                    name: orderItem.name,
                    price: orderItem.price,
                },
            ]
        });

    });

});