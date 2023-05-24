import { useContext } from "react";
import { useRouter } from "next/router";
import styles from "./Home.module.css";
import Ticket from "@/components/Ticket";
import Basket from "@/components/Basket";
import { StoreContext } from "@/contexts/buyerContext";
import { ticketTypes } from "@/data/ticketTypes";
import Link from "next/link";

export default function Home({ data }) {
  const state = useContext(StoreContext);
  const { query } = useRouter();

  return (
    <>
      <div className="hero">
        <h1 className={styles.h1}>CAMPING</h1>
      </div>
      <div className="container_container">
        <div className="container_box">
          <div className={styles.content}>
            <div className={styles.home}>
              {ticketTypes.map((ticketType) => (
                <Ticket key={ticketType.id} {...ticketType} />
              ))}
            </div>
            <Link
              href="./tents"
              className={`button ${
                state.basket.length === 0 ? "disabled" : ""
              }`}
              disabled={state.basket.length === 0}
            >
              Continue
            </Link>
          </div>
          <div className={styles.home}>
            <div className={styles.basket}>
              <Basket />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
