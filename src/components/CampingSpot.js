import React, { useContext } from "react";
import { DispatchContext } from "@/contexts/basketContext";

export default function CampingSpot(props) {
  const dispatch = useContext(DispatchContext);

  function addToBasket() {
    dispatch({
      action: "ADD_CAMP",
      payload: {
        area: props.area,
        available: props.available,
        spots: props.spots,
      },
    });
  }

  return (
    <div className="card">
      <div className="card2">
        <h2 className="h2">{props.area}</h2>
        <p className="spots">{props.spots} Tickets</p>
        <button className="button" onClick={addToBasket}>
          <span className="button_text">Add to basket</span>
          <span className="bottom_key_1"></span>
          <span className="bottom_key_2"></span>
        </button>
        <p className="price">{props.available} Available</p>
      </div>
    </div>
  );
}
