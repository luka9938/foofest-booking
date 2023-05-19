import Head from "next/head";
import { useContext } from "react";
import { useRouter } from "next/router";
import styles from "./Buyers.module.css";
import Buyer from "@/components/Buyer";
import { StoreContext } from "@/contexts/buyerContext";
import Link from "next/link";

export default function Buyers({ data }) {
  const state = useContext(StoreContext);
  const { query } = useRouter();
  return (
    <>
      <Head>
        <title>Find buyer | EDC</title>
      </Head>
      <div className="wrapper">
        <h1 className={styles.h1}>
          Potential <span className={styles.headline}>buyers</span>
        </h1>
        {state.basket.length > 0 ? (
          <Link className={styles.button} href="/contact">
            Choose selected Buyers
          </Link>
        ) : null}
        <div className={styles.content}>
          <div className={styles.home}>
            {data.map((buyer) => (
              <Buyer key={buyer.id} {...buyer} zipCode={query.zipCode} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(ctx) {
  // Get data from api
  const res = await fetch(
    "http://charlie-tango-case-six.vercel.app/api/find-buyers?zipCode" +
      ctx.query.zipCode +
      "&price=" +
      ctx.query.price +
      "&size=" +
      ctx.query.size +
      "&estateType=" +
      ctx.query.estateType
  );
  const data = await res.json();
  // Return the data inside props
  return {
    props: {
      data,
    },
  };
}
