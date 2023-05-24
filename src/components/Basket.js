import React, { useState, useContext } from "react";
import { StoreContext } from "@/contexts/basketContext";
import { ticketTypes } from "@/data/ticketTypes";
import { tentTypes } from "@/data/tentTypes";
import BasketCart from "./BasketCart";
import CartCamp from "./CartCamp";
import Link from "next/link";

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

  // Check if all baskets are empty
  const isBasketEmpty = () => {
    return (
      state.ticketBasket.length === 0 ||
      state.tentBasket.length === 0 ||
      state.campBasket.length === 0
    );
  };

  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    const additionalCostValue = isChecked ? 249 : 0;
    setAdditionalCost(additionalCostValue);
  };

  return (
    <div className="Basket">
      <h2>Your Tickets</h2>
      <ul>
        {state.ticketBasket.map((item) => {
          const ticketType = ticketTypes.find((type) => type.id === item.id);
          return (
            <BasketCart key={item.id} {...ticketType} amount={item.amount} />
          );
        })}
      </ul>
      <h2>Your Tents</h2>
      <ul>
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
      </ul>
      <h2>Your Camps</h2>
      <ul>
        {state.campBasket.map((item) => {
          return <CartCamp key={item.id} {...item} />;
        })}
      </ul>
      <ul>
        <label>
          <input
            type="checkbox"
            onChange={handleCheckboxChange}
            checked={additionalCost > 0}
          />
          Green camping (249,-)
        </label>
      </ul>
      <p>Total Price: {calculateTotalPrice()} Kr.</p>
      <Link
        href="./tents"
        className={`button ${isBasketEmpty() ? "disabled" : ""}`}
        disabled={isBasketEmpty()}
      >
        Continue
      </Link>
    </div>
  );
}

export default Basket;
