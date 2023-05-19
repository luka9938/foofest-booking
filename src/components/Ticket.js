import { estateTypes } from "@/data/estateTypes";
import React, { useState, useContext } from "react";
import { DispatchContext } from "@/contexts/buyerContext";

export default function Buyer(props) {
  const [selected, setSelected] = useState(false);
  const dispatch = useContext(DispatchContext);

  let price = props.maxPrice;
  let priceDots = price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");

  function addToBasket() {
    if (selected) {
      setSelected(!selected);
      dispatch({
        action: "REMOVE_ONE_PRODUCT",
        payload: {
          id: props.id,
          zipCode: props.zipCode,
          price: priceDots,
          estateType: estateTypes[props.estateType - 1].name,
          size: props.minSize,
        },
      });
    } else if (!selected) {
      setSelected(!selected);
      dispatch({
        action: "ADD_PRODUCT",
        payload: {
          id: props.id,
          zipCode: props.zipCode,
          price: priceDots,
          estateType: estateTypes[props.estateType - 1].name,
          size: props.minSize,
        },
      });
    }
  }

  return (
    <div className="card">
      <h2>{props.name}</h2>
      <p>{props.description}</p>
      <p>Price: {priceDots} kr.</p>
      <p>Zip Code: {props.zipCode}</p>
      <p>Estate Type: {estateTypes[props.estateType - 1].name}</p>
      <p>Size: {props.minSize} m²</p>
      <input
        className="checkbox"
        type="checkbox"
        checked={selected}
        onChange={addToBasket}
      />
    </div>
  );
}
