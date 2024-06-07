import Product from "./product";

describe("Product unit tests", () => {
    it("Should throw error when id is empty", () => {
        expect(
            () => {
                new Product("", "1", 0);
            }
        ).toThrowError("Id is required");
    });
    it("Should throw error when name is empty", () => {
        expect(
            () => {
                new Product("1", "", 0);
            }
        ).toThrowError("Name is required");
    });
    it("Should throw when price is less than 0", () => {
        expect(
            () => {
                new Product("1", "ABC", 0);
            }
        ).toThrowError("Price must be greater than 0");
    });
    it("Should change name", () => {
        const product = new Product("1", "ABC", 10);
        product.changeName("DEF");
        expect(product.name).toBe("DEF");
    });
    it("Should change price", () => {
        const product = new Product("1", "ABC", 10);
        product.changePrice(20);
        expect(product.price).toBe(20);
    });
});