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

  const handleStoreContent = () => {
    // Logic to store the content of the Basket component
    const contentToStore = {
      tickets: state.ticketBasket,
      tents: state.tentBasket,
      camps: state.campBasket,
      additionalCost: additionalCost,
    };
    setStoredContent(contentToStore);

    // Navigate to the next page with stored content as query parameters
    router.push({
      pathname: "/checkout",
      query: { storedContent: JSON.stringify(contentToStore) },
    });
  };

  return (
    <div>
      <Basket />
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
      <ul>
        <li>booking fee 99,-</li>
      </ul>
      <p>Total Price: {calculateTotalPrice().toFixed(2)} Kr.</p>
      <button
        onClick={handleStoreContent}
        className={`button ${isBasketEmpty() ? "disabled" : ""}`}
        disabled={isBasketEmpty()}
      >
        Continue
      </button>
    </div>
  );
}

export default IndexBasket;
