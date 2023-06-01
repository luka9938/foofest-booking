import React, { useState, useContext } from "react";
import { StoreContext } from "@/contexts/basketContext";
import { ticketTypes } from "@/data/ticketTypes";
import { tentTypes } from "@/data/tentTypes";
import BasketCart from "./BasketCart";
import CartCamp from "./CartCamp";

function Basket() {
  const state = useContext(StoreContext);
  const [additionalCost, setAdditionalCost] = useState(0);

  // Calculate the total price
  const calculateTotalPrice = () => {
    let totalPrice = 99;

    // Calculate ticket prices
    state.ticketBasket.forEach((item) => {
      const ticketType = ticketTypes.find((type) => type.id === item.id);
      totalPrice += ticketType.price * item.amount;
    });

    // Calculate tent prices
    state.tentBasket.forEach((item) => {
      const tentType = tentTypes.find((type) => type.id === item.id);
      totalPrice += tentType.price * item.amount;
    });

    // Add additional cost if checkbox is checked
    totalPrice += additionalCost;

    return totalPrice;
  };

  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    const additionalCostValue = isChecked ? 249 : 0;
    setAdditionalCost(additionalCostValue);
  };

  return (
    <>
      <h3>Your Tickets</h3>
      {state.ticketBasket.map((item) => {
        const ticketType = ticketTypes.find((type) => type.id === item.id);
        return (
          <BasketCart key={item.id} {...ticketType} amount={item.amount} />
        );
      })}
      <h3>Your Tents</h3>
      {state.tentBasket.map((item) => {
        const tentType = tentTypes.find((type) => type.id === item.id);
        return (
          <BasketCart
            key={item.id}
            {...tentType}
            amount={item.amount}
            ticketCount={state.ticketBasket.length}
          />
        );
      })}
      <h3>Your Camps</h3>
      <ul className="flex_box">
        {state.campBasket.map((item) => {
          return <CartCamp key={item.id} {...item} />;
        })}
      </ul>
    </>
  );
}

export default Basket;
