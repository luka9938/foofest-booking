import { useContext } from "react";
import Ticket from "@/components/Ticket";
import Tent from "@/components/Tent";
import CampingSpot from "@/components/CampingSpot";
import IndexBasket from "@/components/IndexBasket";
import { StoreContext } from "@/contexts/basketContext";
import { ticketTypes } from "@/data/ticketTypes";
import { tentTypes } from "@/data/tentTypes";
import styles from "./Home.module.css";

export default function Home({ data }) {
  const state = useContext(StoreContext);

  const isBasketEmpty = () => {
    return (
      state.ticketBasket.length === 0 ||
      state.tentBasket.length === 0 ||
      state.campBasket.length === 0
    );
  };

  return (
    <>
      <div className="hero">
        <h1>BOOKING</h1>
      </div>
      <div className="container_container">
        <div className="container_box">
          <div className="content">
            <div className={`divide ${styles.divide}`}>
              {ticketTypes.map((ticketType) => (
                <Ticket key={ticketType.id} {...ticketType} />
              ))}
            </div>
            <div className={`divide ${styles.divide}`}>
              {tentTypes.map((tentType) => (
                <Tent key={tentType.id} {...tentType} />
              ))}
            </div>
            <div className={`divide ${styles.divide}`}>
              {data.map((camp) => (
                <CampingSpot key={camp.area} {...camp} />
              ))}
            </div>
          </div>
          <div className="divide">
            <div className="basket">
              <IndexBasket />
              {isBasketEmpty() && <p>Please select tickets, tents and camp.</p>}
              {!isBasketEmpty() && <p>Proceed to Checkout</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  // Get data from api
  const res = await fetch(
    "https://sunrise-innovative-pediatrician.glitch.me/available-spots"
  );
  const data = await res.json();
  // Return the data inside props
  return {
    props: {
      data,
    },
  };
}
