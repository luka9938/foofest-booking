import React, { useContext, useState } from "react";
import { StoreContext } from "@/contexts/basketContext";
import { useRouter } from "next/router";
import Basket from "./Basket";
import { ticketTypes } from "@/data/ticketTypes";
import { tentTypes } from "@/data/tentTypes";

function IndexBasket() {
  const [storedContent, setStoredContent] = useState(null);
  const router = useRouter();
  const state = useContext(StoreContext);
  const [additionalCost, setAdditionalCost] = useState(0);

  const isBasketEmpty = () => {
    return (
      state.ticketBasket.length === 0 ||
      state.tentBasket.length === 0 ||
      state.campBasket.length === 0
    );
  };

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
    if (additionalCost > 0) {
      totalPrice += additionalCost;
    }

    return totalPrice;
  };

  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    const additionalCostValue = isChecked ? 249 : 0;
    setAdditionalCost(additionalCostValue);
  };

  const totalPrice = calculateTotalPrice();

  const handleStoreContent = () => {
    // Logic to store the content of the Basket component
    const contentToStore = {
      tickets: state.ticketBasket,
      tents: state.tentBasket,
      camps: state.campBasket,
      additionalCost: additionalCost,
      totalPrice: totalPrice,
    };
    setStoredContent(contentToStore);

    // Navigate to the next page with stored content as query parameters
    router.push({
      pathname: "/checkout",
      query: { storedContent: JSON.stringify(contentToStore) },
    });
  };

  return (
    <>
      <Basket />
      <h3>Order Processing Fees</h3>
      <ul className="flex_box">
        <li>
          <label>
            Green camping
            <input
              type="checkbox"
              onChange={handleCheckboxChange}
              checked={additionalCost > 0}
            />
          </label>
        </li>
        <li>249.00 kr.</li>
        <li>booking fee</li>
        <li> 99.00 kr.</li>
      </ul>
      <ul className="flex_box subtotal">
        <li>Subtotal:</li>
        <li>{calculateTotalPrice().toFixed(2)} kr.</li>
      </ul>
      <button
        onClick={handleStoreContent}
        className={`button button_big ${isBasketEmpty() ? "disabled" : ""}`}
        disabled={isBasketEmpty()}
      >
        <span className="button_text">GÅ TIL KASSSEN</span>
        <span className="bottom_key_1"></span>
        <span className="bottom_key_2"></span>
      </button>
    </>
  );
}

export default IndexBasket;
