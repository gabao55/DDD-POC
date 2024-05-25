import Order from "../../domain/entities/order";
import OrderRepositoryInterface from "../../domain/repositories/order-repository.interface";
import OrderModel from "../db/sequelize/model/order.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderItem from "../../domain/entities/order_item";

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

    update(entity: Order): Promise<void> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<Order[]> {
        throw new Error("Method not implemented.");
    }
}