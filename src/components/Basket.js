import { useContext } from "react";
import { StoreContext, DispatchContext } from "@/contexts/buyerContext";
import CartItem from "./CartItem";
import Link from "next/link";

function Basket() {
  const state = useContext(StoreContext);
  const dispatch = useContext(DispatchContext);
  let total = 0;
  if (state.basket) {
    state.basket.forEach((item) => {
      total += item.price * item.amount;
    });
  }
  let totalamount = 0;
  if (state.basket) {
    state.basket.forEach((item) => {
      totalamount += item.amount;
    });
  }
  return (
    <div className="Basket">
      <h2>Basket</h2>
      <ul>
        {state.basket.map((item) => {
          return <CartItem key={item.key} {...item} />;
        })}
      </ul>
      {state.basket.length > 0 ? <Link href="/checkout">Checkout</Link> : null}
    </div>
  );
}

export default Basket;
