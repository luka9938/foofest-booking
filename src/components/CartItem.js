import { useContext } from "react";
import { DispatchContext } from "@/contexts/buyerContext";

export default function CartItem(props) {
  const dispatch = useContext(DispatchContext);
  function removeOne() {
    dispatch({
      action: "REMOVE_ONE_PRODUCT",
      payload: {
        area: props.area,
      },
    });
  }
  function addOne() {
    dispatch({
      action: "ADD_PRODUCT",
      payload: {
        area: props.area,
      },
    });
  }
  return (
    <li>
      {props.area}
      <div>
        <button onClick={removeOne}>[-]</button>
        {props.amount}
        <button onClick={addOne}>[+]</button>
      </div>
    </li>
  );
}
