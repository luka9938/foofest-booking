import React, { useState, useContext } from "react";
import { DispatchContext } from "@/contexts/basketContext";

export default function Ticket({ id, name, price }) {
  const dispatch = useContext(DispatchContext);
  const [amount, setAmount] = useState(0);

  function removeOne() {
    if (amount > 0) {
      setAmount(amount - 1);
      dispatch({
        action: "REMOVE_TICKET",
        payload: {
          id: id,
        },
      });
    }
  }

  function addOne() {
    setAmount(amount + 1);
    dispatch({
      action: "ADD_TICKET",
      payload: {
        id: id,
      },
    });
  }

  return (
    <div className="card">
      <div className="card2">
        <h2 className="h2">{name}</h2>
        <div className="add_remove_one">
          <button className="tentbtn" onClick={addOne}>
            <span className="tentbtn_text">+</span>
            <span className="bottom_key_1"></span>
            <span className="bottom_key_2"></span>
          </button>
          <p className="amount">{amount}</p>
          <button className="tentbtn" onClick={removeOne}>
            <span className="tentbtn_text">-</span>
            <span className="bottom_key_1"></span>
            <span className="bottom_key_2"></span>
          </button>
        </div>
        <p className="price">{price} kr.</p>
      </div>
    </div>
  );
}
