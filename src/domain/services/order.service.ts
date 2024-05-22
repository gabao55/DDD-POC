import Customer from "../entities/customer";
import Order from "../entities/order";
import OrderItem from "../entities/order_item";
import { v4 as uuid } from "uuid";

export default class OrderService {
    static placeOrder(customer: Customer, items: OrderItem[]): Order {
        if(items.length === 0) {
            throw new Error("Order must have at least one item");
        }

        const order = new Order(uuid(), customer.id, items);

        customer.addRewardPoints(order.total() / 2);

        return order;
    }

    static total(orders: Order[]) {
        return orders.reduce((total, item) => total + item.total(), 0);
    }
}