import Address from "../value-objects/address";
import CustomerFactory from "./customer.factory";

describe("Customer factory unit tests", () => {

    it("Should create a customer", () => {
        const customer = CustomerFactory.create("Customer A");

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("Customer A");
        expect(customer.getAddress()).toBeNull();
    });

    it("Should create a customer with an Address", () => {
        const address = new Address("Street", 1, "1234", "City");
        const customer = CustomerFactory.createWithAddress("Customer A", address);

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("Customer A");
        expect(customer.getAddress()).toBe(address.toString());
    });

});