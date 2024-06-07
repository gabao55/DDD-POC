import { Sequelize } from "sequelize-typescript";
import Product from "../../../../domain/product/entities/product";
import ProductRepository from "../../../product/repositories/sequilize/product.repository";
import OrderItemModel from "./order-item.model";
import CustomerModel from "../../../customer/repositories/sequilize/customer.model";
import OrderModel from "./order.model";
import CustomerRepository from "../../../customer/repositories/sequilize/customer.repository";
import Customer from "../../../../domain/customer/entities/customer";
import Address from "../../../../domain/customer/value-objects/address";
import OrderItem from "../../../../domain/checkout/entities/order_item";
import Order from "../../../../domain/checkout/entities/order";
import OrderRepository from "./order-repository";
import ProductModel from "../../../product/repositories/sequilize/product.model";

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

    it("should update an order", async () => {
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

        const neworderItem = new OrderItem("1", product.name, product.id, product.price, 2);
        order.addItem(neworderItem);
        await orderRepository.update(order);

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

    it("should find an order by id", async () => {
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

        const orderFound = await orderRepository.findById(order.id);

        expect(orderFound).toEqual(order);

    });

    it("should find all orders", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const customer2 = new Customer("1234", "Customer 2");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address);
        customer2.changeAddress(address);
        await customerRepository.create(customer);
        await customerRepository.create(customer2);

        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 100);
        await productRepository.create(product);

        const orderItem = new OrderItem("1", product.name, product.id, product.price, 1);
        const orderItem2 = new OrderItem("2", product.name, product.id, product.price, 2);

        const orderRepository = new OrderRepository();
        const order = new Order("1", customer.id, [orderItem]);
        await orderRepository.create(order);

        const order2 = new Order("2", customer2.id, [orderItem2]);
        await orderRepository.create(order2);

        const allOrders = await orderRepository.findAll();

        expect(allOrders).toStrictEqual([order, order2]);

    });

});