import Address from "./address";
import Customer from "./customer";

describe("Customer unit tests", () => {
    it("Should throw error when id is empty", () => {
        expect(
            () => {
                new Customer("", "John Doe")
            }
        ).toThrowError("Id is required");
    });
    it("Should throw error when name is empty", () => {
        expect(
            () => {
                new Customer("1", "");
            }
        ).toThrowError("Name is required");
    });
    it("Should change name", () => {
        const customer = new Customer("1", "John Doe");

        customer.changeName("Jane Doe");

        expect(customer.name).toBe("Jane Doe");
    });
    it("Should activate customer", () => {
        const customer = new Customer("1", "John Doe");
        customer.Address = new Address("Street", 1, "1234", "City");

        customer.activate();

        expect(customer.isActive()).toBe(true);
    });
    it("Should deactivate customer", () => {
        const customer = new Customer("1", "John Doe");
        customer.Address = new Address("Street", 1, "1234", "City");

        customer.activate();
        customer.deactivate();

        expect(customer.isActive()).toBe(false);
    });
    it("Should throw error when address is undefined and try to activate customer", () => {
        expect(() => {
            const customer = new Customer("1", "John Doe");

            customer.activate()
        }).toThrowError("Address is mandatory to customer activation")
    });

    it("Should add reward points to customer", () => {
        const customer = new Customer("1", "Customer 1");
        expect(customer.rewardPoints).toBe(0);
        
        customer.addRewardPoints(10);

        expect(customer.rewardPoints).toBe(10);
        
        customer.addRewardPoints(10);

        expect(customer.rewardPoints).toBe(20);
    });
});