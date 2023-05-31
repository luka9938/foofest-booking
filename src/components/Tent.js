import React, { useState, useContext } from "react";
import { DispatchContext } from "@/contexts/basketContext";

export default function Tent({ id, name, price }) {
  const dispatch = useContext(DispatchContext);
  const [amount, setAmount] = useState(0);

  function removeOne() {
    if (amount > 0) {
      setAmount(amount - 1);
      dispatch({
        action: "REMOVE_TENT",
        payload: {
          id: id,
        },
      });
    }
  }

  function addOne() {
    setAmount(amount + 1);
    dispatch({
      action: "ADD_TENT",
      payload: {
        id: id,
      },
    });
  }

  return (
    <div className="card">
      <div className="card2">
        <h2 className="h2">{name}</h2>
        <p>{price},-</p>
        <button className="tentbtn" onClick={removeOne}>
          [-]
        </button>
        {amount}
        <button className="tentbtn" onClick={addOne}>
          [+]
        </button>
      </div>
    </div>
  );
}
