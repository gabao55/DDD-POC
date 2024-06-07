import EventHandlerInterface from "../../../@shared/events/event-handler.interface";
import ProductCreatedEvent from "../../events/product-created.event";

export default class SendEmailWhenProductIsCreatedHandler 
    implements EventHandlerInterface<ProductCreatedEvent> {
    handle(event: ProductCreatedEvent): void {
        console.log(`Send email to ${event.eventData.email} 
        with product ${event.eventData.name} created.`);
    }
};