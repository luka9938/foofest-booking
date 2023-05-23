import { useContext } from "react";
import { StoreContext, DispatchContext } from "@/contexts/buyerContext";
import CartItem from "./CartItem";
import Link from "next/link";

function Basket(props) {
  const state = useContext(StoreContext);
  const dispatch = useContext(DispatchContext);
  function removeOne(e) {
    const ticketName =
      e.target.parentNode.parentNode.getAttribute("ticketName");
    const ticketPrice = parseFloat(
      e.target.parentNode.parentNode.querySelector("p[name='ticketPrice]")
        .textContent
    );

    dispatch({
      action: "REMOVE_ONE_PRODUCT",
      payload: {
        name: ticketName,
        price: ticketPrice,
      },
    });
  }

  function addOne(e) {
    const ticketName =
      e.target.parentNode.parentNode.getAttribute("ticketName");
    const ticketPrice = parseFloat(
      e.target.parentNode.parentNode.querySelector("p[name='ticketPrice']")
        .textContent
    );

    dispatch({
      action: "ADD_PRODUCT",
      payload: {
        name: ticketName,
        price: ticketPrice,
      },
    });
  }
  return (
    <div className="Basket">
      <h2>Basket</h2>
      <ul>
        <li name="ticketName">
          VIP Festival Ticket, excluding fee
          <p name="ticketPrice">1299,-</p>
          <div>
            <button onClick={removeOne}>[-]</button>
            {props.amount}
            <button onClick={addOne}>[+]</button>
          </div>
        </li>
        <li name="ticketName">
          Regular Festival Ticket, excluding fee
          <p name="ticketPrice">799,-</p>
          <div>
            <button onClick={removeOne}>[-]</button>
            {props.amount}
            <button onClick={addOne}>[+]</button>
          </div>
        </li>
      </ul>
      <ul>
        {state.basket.map((item) => {
          return <CartItem {...item} />;
        })}
      </ul>
      {state.basket.length > 0 ? <Link href="/checkout">Checkout</Link> : null}
    </div>
  );
}

export default Basket;
