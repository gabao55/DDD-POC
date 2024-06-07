import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {
    it("Should throw error when id is empty", () => {
        expect(
            () => {
                new Order("", "1", []);
            }
        ).toThrowError("Id is required");
    });
    it("Should throw error when items array is empty", () => {
        expect(
            () => {
                new Order("1", "123", []);
            }
        ).toThrowError("Item qtd must be greater than 0");
    });
    it("Should throw error if item quantity is less or equal to 0", () => {
        expect(
            () => {
                new OrderItem("1", "p1", "123", 100, 0);
            }
        ).toThrowError("Quantity must be greater than 0");
    });
    it("Should throw error if price is less or equal to 0", () => {
        expect(
            () => {
                new OrderItem("1", "p1", "123", 0);
            }
        ).toThrowError("Price must be greater than 0");
    });
    it("Should calculate total", () => {
        const item = new OrderItem("1", "p1", "item", 10, 2);
        const item2 = new OrderItem("2", "p2", "item2", 20, 2);

        const order = new Order("1", "123", [item, item2]);

        expect(order.total()).toBe(60);
    });
});