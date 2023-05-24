import { useContext } from "react";
import { useRouter } from "next/router";
import styles from "./Home.module.css";
import Ticket from "@/components/Ticket";
import Tent from "@/components/Tent";
import Basket from "@/components/Basket";
import CampingSpot from "@/components/CampingSpot";
import { StoreContext } from "@/contexts/basketContext";
import { ticketTypes } from "@/data/ticketTypes";
import { tentTypes } from "@/data/tentTypes";

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
            <div className={styles.home}>
              {tentTypes.map((tentType) => (
                <Tent key={tentType.id} {...tentType} />
              ))}
            </div>
            <div className={styles.home}>
              {data.map((camp) => (
                <CampingSpot key={camp.area} {...camp} />
              ))}
            </div>
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
