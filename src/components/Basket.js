import { useContext } from "react";
import { StoreContext } from "@/contexts/basketContext";
import { ticketTypes } from "@/data/ticketTypes";
import { tentTypes } from "@/data/tentTypes";
import BasketCart from "./BasketCart";
import Link from "next/link";

function Basket() {
  const state = useContext(StoreContext);

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
      <ul>
        {state.tentBasket.map((item) => {
          const tentType = tentTypes.find((type) => type.id === item.id);
          return (
            <BasketCart key={item.id} {...tentType} amount={item.amount} />
          );
        })}
      </ul>
      <Link
        href="./tents"
        className={`button ${
          state.ticketBasket.length === 0 ? "disabled" : ""
        }`}
        disabled={state.ticketBasket.length === 0}
      >
        Continue
      </Link>
    </div>
  );
}

export default Basket;
