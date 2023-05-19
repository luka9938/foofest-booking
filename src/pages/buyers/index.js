import { useContext } from "react";
import { useRouter } from "next/router";
import styles from "./Buyers.module.css";
import Ticket from "@/components/Ticket";
import { StoreContext } from "@/contexts/buyerContext";

export default function Buyers({ data }) {
  const state = useContext(StoreContext);
  const { query } = useRouter();
  const { basket } = state;
  return (
    <>
      <div className="hero">
        <h1 className={styles.h1}>CAMPING</h1>
      </div>
      <div className="container">
        <div className="container_box">
          <div className={styles.home}>
            <div>
              {" "}
              {basket.map((item) => (
                <div key={item.key}>
                  <p>{item.zipCode}</p>
                  <p>{item.price} kr.</p>
                  <p>{item.estateType}</p>
                  <p>{item.size} m²</p>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.home}>
              {data.map((buyer) => (
                <Ticket key={buyer.id} {...buyer} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  // Get data from api
  const res = await fetch("https://kea-alt-del.dk/t7/api/products");
  const data = await res.json();
  // Return the data inside props
  return {
    props: {
      data,
    },
  };
}
