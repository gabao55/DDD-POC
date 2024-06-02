import EventHandlerInterface from "../../@shared/event-handler.interface";
import CustomerAddressChangedEvent from "../address-changed.event";

export default class EnviaConsoleLogHandler implements EventHandlerInterface<CustomerAddressChangedEvent> {
    handle(address: CustomerAddressChangedEvent): void {
        console.log(`Endereço do cliente: ${address.eventData.id}, ${address.eventData.name} alterado para: ${address.eventData.address}`)
    }
}