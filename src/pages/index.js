import { useContext } from "react";
import { useRouter } from "next/router";
import styles from "./Home.module.css";
import Ticket from "@/components/Ticket";
import { StoreContext } from "@/contexts/buyerContext";

export default function Home({ data }) {
  const state = useContext(StoreContext);
  const { query } = useRouter();
  const { basket } = state;
  return (
    <>
      <div className="hero">
        <h1 className={styles.h1}>CAMPING</h1>
      </div>
      <div className="container_container">
        <div className="container_box">
          <div className={styles.content}>
            <div className={styles.home}>
              {data.map((buyer) => (
                <Ticket key={buyer.id} {...buyer} />
              ))}
            </div>
          </div>
          <div className={styles.home}>
            <div>
              <div>
                <p>Regular Festival Ticket, excluding fee</p>
                <p>799,-</p>
                <p>VIP Festival Ticket, excluding fee</p>
                <p>1299,-</p>
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
