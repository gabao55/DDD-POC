import Address from "../value-objects/address";
import Customer from "../entities/customer";
import EventDispatcher from "../../@shared/events/event-dispatcher";
import AddressChangedEvent from "./address-changed.event";
import EnviaConsoleLogHandler from "./handler/log-when-customer-changes-addres.handler";

describe("Customer domain events tests", () => {

    it("Should log message when customer address is changed", () => {
        const customer = new Customer("1", "John Doe");
        const address = new Address("Test Street", 123, "000", "Test City");
        customer.changeAddress(address);
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new EnviaConsoleLogHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");
        const logSpy = jest.spyOn(console, 'log');

        eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]).toMatchObject(eventHandler);

        const addressChangedEvent = new AddressChangedEvent({
            id: customer.id,
            name: customer.name,
            address: customer.getAddress()
        });

        eventDispatcher.notify(addressChangedEvent);

        expect(spyEventHandler).toHaveBeenCalled();
        expect(logSpy).toHaveBeenCalledWith(`Endereço do cliente: ${customer.id}, ${customer.name} alterado para: ${customer.getAddress()}`);
    });

});