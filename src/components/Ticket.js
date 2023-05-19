import React, { useState, useContext } from "react";
import { DispatchContext } from "@/contexts/buyerContext";

export default function Ticket(props) {
  const dispatch = useContext(DispatchContext);
  function addToBasket() {
    dispatch({
      action: "ADD_PRODUCT",
      payload: {
        id: props.id,
        price: props.price,
        productdisplayname: props.productdisplayname,
      },
    });
  }
  return (
    <div className="card">
      <h2 className="h2">{props.area}</h2>
      <p>{props.available} Available</p>
      <p>{props.spots} Tickets</p>
      <button onClick={addToBasket}>Add to basket</button>
    </div>
  );
}
