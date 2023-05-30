import { useContext } from "react";
import { useRouter } from "next/router";
import styles from "./Home.module.css";
import Ticket from "@/components/Ticket";
import Tent from "@/components/Tent";
import CampingSpot from "@/components/CampingSpot";
import IndexBasket from "@/components/IndexBasket";
import { StoreContext } from "@/contexts/basketContext";
import { ticketTypes } from "@/data/ticketTypes";
import { tentTypes } from "@/data/tentTypes";
import Link from "next/link";

export default function Home({ data }) {
  const state = useContext(StoreContext);
  const { query } = useRouter();

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
        <h1 className={styles.h1}>CAMPING</h1>
      </div>
      <div className="container_container">
        <div className="container_box">
          <div className={styles.content}>
            <div className={styles.home}>
              <h2>Tickets</h2>
              {ticketTypes.map((ticketType) => (
                <Ticket key={ticketType.id} {...ticketType} />
              ))}
            </div>
            <div className={styles.home}>
              <h2>Tents</h2>
              {tentTypes.map((tentType) => (
                <Tent key={tentType.id} {...tentType} />
              ))}
            </div>
            <div className={styles.home}>
              <h2>Camping Spots</h2>
              {data.map((camp) => (
                <CampingSpot key={camp.area} {...camp} />
              ))}
            </div>
          </div>
          <div className={styles.home}>
            <div className={styles.basket}>
              <div className="basket">
                <h2>Basket</h2>
                <IndexBasket />
                {isBasketEmpty() && (
                  <p>Please select tickets, tents and camp.</p>
                )}
                {!isBasketEmpty() && (
                  <Link href="/checkout">Proceed to Checkout</Link>
                )}
              </div>
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
