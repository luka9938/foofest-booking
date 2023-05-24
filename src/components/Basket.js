import { useContext } from "react";
import { StoreContext } from "@/contexts/buyerContext";
import { ticketTypes } from "@/data/ticketTypes";
import CartItem from "./CartItem";

function Basket() {
  const state = useContext(StoreContext);

  return (
    <div className="Basket">
      <h2>Your Tickets</h2>
      <ul>
        {state.basket.map((item) => {
          const ticketType = ticketTypes.find((type) => type.id === item.id);
          return (
            <CartItem key={item.id} {...ticketType} amount={item.amount} />
          );
        })}
      </ul>
    </div>
  );
}

export default Basket;
