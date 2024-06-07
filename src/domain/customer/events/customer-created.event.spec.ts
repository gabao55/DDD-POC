import CustomerRepository from "../../../infrastructure/customer/repositories/sequilize/customer.repository";
import Address from "../value-objects/address";
import Customer from "../entities/customer";
import EventDispatcher from "../../@shared/events/event-dispatcher";
import CustomerCreatedEvent from "./customer-created.event";
import EnviaConsoleLog1Handler from "./handler/log-1-when-customer-is-created.handler";
import EnviaConsoleLog2Handler from "./handler/log-2-when-customer-is-created.handler";

describe("Customer domain events tests", () => {

    it("Should log message 1 when customer is created", () => {
        const customer = new Customer("1", "John Doe");
        const address = new Address("Test Street", 123, "000", "Test City");
        customer.changeAddress(address);
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new EnviaConsoleLog1Handler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");
        const logSpy = jest.spyOn(console, 'log');

        eventDispatcher.register("CustomerCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler);

        const customerCreatedEvent = new CustomerCreatedEvent(customer);

        eventDispatcher.notify(customerCreatedEvent);

        expect(spyEventHandler).toHaveBeenCalled();
        expect(logSpy).toHaveBeenCalledWith('Esse é o primeiro console.log do evento: CustomerCreated');
    });

    it("Should log message 2 when customer is created", () => {
        const customer = new Customer("1", "John Doe");
        const address = new Address("Test Street", 123, "000", "Test City");
        customer.changeAddress(address);
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new EnviaConsoleLog2Handler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");
        const logSpy = jest.spyOn(console, 'log');

        eventDispatcher.register("CustomerCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler);

        const customerCreatedEvent = new CustomerCreatedEvent(customer);

        eventDispatcher.notify(customerCreatedEvent);

        expect(spyEventHandler).toHaveBeenCalled();
        expect(logSpy).toHaveBeenCalledWith('Esse é o segundo console.log do evento: CustomerCreated');
    });

    it("Should log message 1 and 2 when customer is created", () => {
        const customer = new Customer("1", "John Doe");
        const address = new Address("Test Street", 123, "000", "Test City");
        const customer2 = new Customer("1", "John Doe");
        const address2 = new Address("Test Street", 123, "000", "Test City");
        customer.changeAddress(address);
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new EnviaConsoleLog1Handler();
        const eventHandler2 = new EnviaConsoleLog2Handler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");
        const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");
        const logSpy = jest.spyOn(console, 'log');

        eventDispatcher.register("CustomerCreatedEvent", eventHandler);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandler2);

        const customerCreatedEvent = new CustomerCreatedEvent(customer);
        const customerCreatedEvent2 = new CustomerCreatedEvent(customer2);

        eventDispatcher.notify(customerCreatedEvent);
        eventDispatcher.notify(customerCreatedEvent2);

        expect(spyEventHandler).toHaveBeenCalled();
        expect(logSpy).toHaveBeenCalledWith('Esse é o primeiro console.log do evento: CustomerCreated');
        expect(spyEventHandler2).toHaveBeenCalled();
        expect(logSpy).toHaveBeenCalledWith('Esse é o segundo console.log do evento: CustomerCreated');
    });

});