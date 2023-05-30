import React, { useState, useContext } from "react";
import { StoreContext } from "@/contexts/basketContext";
import { ticketTypes } from "@/data/ticketTypes";
import { tentTypes } from "@/data/tentTypes";
import BasketCart from "./BasketCart";
import CartCamp from "./CartCamp";
import Link from "next/link";
import { useRouter } from "next/router";

<div className="Basket">
  <h2>Your Tickets</h2>
  <ul>
    {state.ticketBasket.map((item) => {
      const ticketType = ticketTypes.find((type) => type.id === item.id);
      return <BasketCart key={item.id} {...ticketType} amount={item.amount} />;
    })}
  </ul>
  <h2>Your Tents</h2>
  <ul>
    {state.tentBasket.map((item) => {
      const tentType = tentTypes.find((type) => type.id === item.id);
      return (
        <BasketCart
          key={item.id}
          {...tentType}
          amount={item.amount}
          ticketCount={state.ticketBasket.length}
        />
      );
    })}
  </ul>
  <h2>Your Camps</h2>
  <ul>
    {state.campBasket.map((item) => {
      return <CartCamp key={item.id} {...item} />;
    })}
  </ul>
  <p>Total Price: {calculateTotalPrice()} Kr.</p>
</div>;
