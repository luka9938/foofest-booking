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
      <h2 className="h2">{props.area}</h2>
      <p>{props.available} Available</p>
      <p>{props.spots} Tickets</p>
      <button className="button" onClick={addToBasket}>
        Add to basket
      </button>
    </div>
  );
}
