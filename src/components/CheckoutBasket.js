import { Fragment } from "react";
import { useRouter } from "next/router";
import { useRef } from "react";
import { ticketTypes } from "@/data/ticketTypes";
import { tentTypes } from "@/data/tentTypes";

export default function CheckoutBasket() {
  const router = useRouter();
  const { storedContent } = router.query;

  // Parse the storedContent if it's a JSON string
  const parsedContent = storedContent ? JSON.parse(storedContent) : {};

  const formEl = useRef(null);

  const calculateSubtotal = () => {
    let subtotal = 99;

    // Calculate subtotal for tickets
    if (parsedContent.tickets) {
      parsedContent.tickets.forEach((ticket) => {
        const ticketType = ticketTypes.find((type) => type.id === ticket.id);
        if (ticketType) {
          subtotal += ticketType.price * ticket.amount;
        }
      });
    }

    // Calculate subtotal for tents
    if (parsedContent.tents) {
      parsedContent.tents.forEach((tent) => {
        const tentType = tentTypes.find((type) => type.id === tent.id);
        if (tentType) {
          subtotal += tentType.price * tent.amount;
        }
      });
    }

    // Add additional cost if it exists
    if (parsedContent.additionalCost > 0) {
      subtotal += parsedContent.additionalCost;
    }

    return subtotal;
  };

  const ticketPrices = parsedContent.tickets
    ? parsedContent.tickets.map((item) => {
        const ticketType = ticketTypes.find((type) => type.id === item.id);
        const totalPrice = ticketType.price * item.amount;
        return {
          type: "Ticket",
          name: ticketType.name,
          amount: item.amount,
          price: ticketType.price,
          totalPrice,
        };
      })
    : [];

  const tentPrices = parsedContent.tents
    ? parsedContent.tents.map((item) => {
        const tentType = tentTypes.find((type) => type.id === item.id);
        const totalPrice = tentType.price * item.amount;
        return {
          type: "Tent",
          name: tentType.name,
          amount: item.amount,
          price: tentType.price,
          totalPrice,
        };
      })
    : [];

  const campSpots = parsedContent.camps
    ? parsedContent.camps.map((camp) => {
        return {
          area: camp.area,
          available: camp.available,
          spots: camp.spots,
        };
      })
    : [];

  return (
    <>
      {ticketPrices.length > 0 && (
        <>
          <h3>Your Tickets</h3>
          <ul className="flex_box">
            {ticketPrices.map((item, index) => (
              <Fragment key={index}>
                <li>{item.name}</li>
                <li>{item.totalPrice.toFixed(2)} kr.</li>
                <li>
                  {item.price.toFixed(2)} kr. x {item.amount}
                </li>
              </Fragment>
            ))}
          </ul>
        </>
      )}
      <h3>Your Tents</h3>
      <ul className="flex_box">
        {tentPrices.map((item, index) => (
          <Fragment key={index}>
            <li>{item.name}</li>
            <li>{item.totalPrice.toFixed(2)} kr.</li>
            <li>
              {item.price.toFixed(2)} kr. x {item.amount}
            </li>
          </Fragment>
        ))}
      </ul>
      <h3>Your Camps</h3>
      <ul className="flex_box">
        {campSpots.map((camp, index) => (
          <Fragment key={index}>
            <li>{camp.area}</li>
            <li>{camp.available} Available</li>
            <li>Spots: {camp.spots} tickets</li>
          </Fragment>
        ))}
      </ul>
      <h3>Order Processing Fees</h3>
      <ul className="flex_box">
        {parsedContent.additionalCost > 0 && (
          <>
            <li>Green camping</li>
            <li>{parsedContent.additionalCost} kr.</li>
          </>
        )}
        <li>Booking fee</li>
        <li>99 kr.</li>
      </ul>
      <ul className="flex_box subtotal">
        {parsedContent.tickets && (
          <>
            <li>Subtotal:</li>
            <li>{calculateSubtotal().toFixed(2)} kr.</li>
          </>
        )}
      </ul>
    </>
  );
}
