import Order from "../../../../domain/checkout/entities/order";
import OrderRepositoryInterface from "../../../../domain/checkout/repositories/order-repository.interface";
import OrderModel from "./order.model";
import OrderItemModel from "./order-item.model";
import OrderItem from "../../../../domain/checkout/entities/order_item";

export default class OrderRepository
    implements OrderRepositoryInterface {

    async create(entity: Order): Promise<void> {
        await OrderModel.create({
            id: entity.id,
            customerId: entity.customerId,
            items: entity.items.map((item) => ({
                id: item.id,
                name: item.name,
                productId: item.productId,
                price: item.price,
                quantity: item.quantity,
            })),
            total: entity.total(),
        },
        {
            include: [{ model: OrderItemModel }],
        });
    }

    async findById(id: string): Promise<Order | undefined> {
        const orderModel = await OrderModel.findOne({
            where: { id },
            include: [{ model: OrderItemModel }],
        });

        return new Order(
            orderModel.id,
            orderModel.customerId,
            orderModel.items.map((item) => new OrderItem(
                item.id,
                item.name,
                item.productId,
                item.price,
                item.quantity,
            )
        ));
    }

    async update(order: Order): Promise<void> {
        await OrderModel.update({
            customerId: order.customerId,
            items: order.items.map((item) => ({
                id: item.id,
                productId: item.productId,
                orderId: order.id,
                quantity: item.quantity,
                name: item.name,
                price: item.price,
            })),
            total: order.total(),
        }, {
            where: { id: order.id },
        });
    }
    
    async findAll(): Promise<Order[]> {
        return (await OrderModel.findAll({
            include: [{ model: OrderItemModel }],
        })).map((orderModel) => new Order(
            orderModel.id,
            orderModel.customerId,
            orderModel.items.map((item) => new OrderItem(
                item.id,
                item.name,
                item.productId,
                item.price,
                item.quantity,
            ))
        ));
    }
}