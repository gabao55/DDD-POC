import Order from "../entities/order";
import OrderItem from "../entities/order_item";

interface OrderFactoryProps {
    id: string;
    customerId: string;
    items: {
        id: string;
        name: string;
        productId: string;
        quantity: number;
        price: number;
    }[];
}

export default class OrderFactory {
    static create(orderProps: OrderFactoryProps): Order {
        const items = orderProps.items.map((item) => new OrderItem(
            item.id,
            item.name,
            item.productId,
            item.price,
            item.quantity
        ));
        
        return new Order(orderProps.id, orderProps.customerId, items);
    }
}