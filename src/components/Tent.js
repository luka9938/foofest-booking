import React, { useState, useContext } from "react";
import { DispatchContext } from "@/contexts/basketContext";

export default function Tent({ id, name, price, capacity }) {
  const dispatch = useContext(DispatchContext);
  const [tentAmount, setTentAmount] = useState(0);

  function removeOne() {
    if (tentAmount > 0) {
      setTentAmount(tentAmount - 1);
      dispatch({
        action: "REMOVE_TENT",
        payload: {
          id: id,
        },
      });
    }
  }

  function addOne() {
    setTentAmount(tentAmount + 1);
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
        <div className="add_remove_one">
          <button className="tentbtn" onClick={addOne}>
            <span className="tentbtn_text">+</span>
            <span className="bottom_key_1"></span>
            <span className="bottom_key_2"></span>
          </button>
          <p className="amount">{tentAmount}</p>
          <button className="tentbtn" onClick={removeOne}>
            <span className="tentbtn_text">-</span>
            <span className="bottom_key_1"></span>
            <span className="bottom_key_2"></span>
          </button>
        </div>
        <p className="price">{price} kr.</p>
        <p className="capacity">Capacity: {capacity}</p>
      </div>
    </div>
  );
}
