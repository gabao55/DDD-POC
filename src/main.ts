import Address from "./domain/entities/address";
import Customer from "./domain/entities/customer";
import Order from "./domain/entities/order";
import OrderItem from "./domain/entities/order_item";

let customer = new Customer("1", "John Doe");
const address = new Address("Main St", 123, "Springfield", "USA");

customer.Address = address;
customer.activate();

const item1 = new OrderItem("1", "p1", "Laptop", 1000);
const item2 = new OrderItem("2", "p2", "Mouse", 20);

const order = new Order("1", customer.id, [item1, item2]);