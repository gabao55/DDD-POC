import Customer from "../entities/customer";
import Order from "../entities/order";
import OrderItem from "../entities/order_item";
import OrderService from "./order.service";

describe("Order service unit tests", () => {

    it("Should place an order", () => {
        const customer = new Customer("1", "Customer 1");
        const item1 = new OrderItem("1", "Product 1", "123", 10, 1);

        const order = OrderService.placeOrder(customer, [item1]);
        
        expect(customer.rewardPoints).toBe(5);
        expect(order.total()).toBe(10);
    });
    
    it("Should get total of all orders", () => {
        const order1 = new Order("1", "Order 1", [
            new OrderItem("1", "Product 1", "123", 10, 1),
            new OrderItem("2", "Product 2", "123", 20, 2)
        ]);

        const order2 = new Order("2", "Order 2", [
            new OrderItem("3", "Product 3", "123", 10, 1),
            new OrderItem("4", "Product 4", "123", 20, 2)
        ]);

        const totalPrice = OrderService.total([order1, order2]);

        expect(totalPrice).toBe(100);
    });
    
});