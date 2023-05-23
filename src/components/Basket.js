import { useContext, useState } from "react";
import { StoreContext, DispatchContext } from "@/contexts/buyerContext";
import CartItem from "./CartItem";
import Link from "next/link";

function Basket() {
  const state = useContext(StoreContext);
  const dispatch = useContext(DispatchContext);

  const [vipAmount, setVipAmount] = useState(0);
  const [regularAmount, setRegularAmount] = useState(0);

  function removeOne(ticketName) {
    if (ticketName === "VIP" && vipAmount > 0) {
      setVipAmount(vipAmount - 1);
      dispatch({
        action: "REMOVE_ONE_PRODUCT",
        payload: {
          name: ticketName,
        },
      });
    } else if (ticketName === "Regular" && regularAmount > 0) {
      setRegularAmount(regularAmount - 1);
      dispatch({
        action: "REMOVE_ONE_PRODUCT",
        payload: {
          name: ticketName,
        },
      });
    }
  }

  function addOne(ticketName) {
    if (ticketName === "VIP") {
      setVipAmount(vipAmount + 1);
      dispatch({
        action: "ADD_PRODUCT",
        payload: {
          name: ticketName,
        },
      });
    } else if (ticketName === "Regular") {
      setRegularAmount(regularAmount + 1);
      dispatch({
        action: "ADD_PRODUCT",
        payload: {
          name: ticketName,
        },
      });
    }
  }

  return (
    <div className="Basket">
      <h2>Basket</h2>
      <ul>
        <li name="ticketName">
          VIP Festival Ticket, excluding fee
          <p name="ticketPrice">1299,-</p>
          <div>
            <button onClick={() => removeOne("VIP")}>[-]</button>
            {vipAmount}
            <button onClick={() => addOne("VIP")}>[+]</button>
          </div>
        </li>
        <li name="ticketName">
          Regular Festival Ticket, excluding fee
          <p name="ticketPrice">799,-</p>
          <div>
            <button onClick={() => removeOne("Regular")}>[-]</button>
            {regularAmount}
            <button onClick={() => addOne("Regular")}>[+]</button>
          </div>
        </li>
      </ul>
      <ul>
        {state.basket.map((item) => {
          // Exclude tickets from rendering CartItem
          if (item.name === "VIP" || item.name === "Regular") {
            return null;
          }
          return <CartItem key={item.id} {...item} />;
        })}
      </ul>
      {state.basket.length > 0 ? <Link href="/checkout">Checkout</Link> : null}
    </div>
  );
}

export default Basket;
