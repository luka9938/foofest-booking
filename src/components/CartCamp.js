import { useContext } from "react";
import { DispatchContext } from "@/contexts/basketContext";

export default function CartCamp(props) {
  const dispatch = useContext(DispatchContext);
  return (
    <>
      <li>{props.area}</li>
      <li>{props.available} Available</li>
      <li>Spots: {props.spots} tickets</li>
    </>
  );
}
