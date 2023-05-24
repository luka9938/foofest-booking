import { useContext } from "react";
import { DispatchContext } from "@/contexts/basketContext";

export default function CartTicket(props) {
  const dispatch = useContext(DispatchContext);
  return (
    <li>
      {props.name}
      <p>{props.price},-</p>
      <div>x{props.amount}</div>
    </li>
  );
}
