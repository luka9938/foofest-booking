import { useContext } from "react";
import { DispatchContext } from "@/contexts/basketContext";

export default function CartCamp(props) {
  const dispatch = useContext(DispatchContext);
  return (
    <li>
      {props.area}
      <p>{props.available} spots left!</p>
    </li>
  );
}
