import { useContext } from "react";
import { DispatchContext } from "@/contexts/basketContext";

export default function BasketCart(props) {
  const dispatch = useContext(DispatchContext);

  const totalPrice = props.price * props.amount;
  return (
    <ul className="flex_box">
      <li>{props.name}</li>
      <li>{totalPrice.toFixed(2)} kr.</li>
      <li>
        {props.price.toFixed(2)} kr. x {props.amount}
      </li>
    </ul>
  );
}
