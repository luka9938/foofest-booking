import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import styles from "./Checkout.module.css";
import CheckoutBasket from "@/components/CheckoutBasket";

export default function Checkout() {
  const router = useRouter();
  const { storedContent } = router.query;
  const parsedContent = storedContent ? JSON.parse(storedContent) : {};

  const [timer, setTimer] = useState(600); // 10 minutes in seconds
  const formEl = useRef(null);

  useEffect(() => {
    if (timer <= 0) {
      // Redirect to another page when timer reaches 0
      router.push("/");
    } else {
      const countdown = setTimeout(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearTimeout(countdown);
    }
  }, [timer]);

  async function submitToSupabase(formData) {
    const supabase = createClient(
      "https://ilqkiywscxodpkjnsfkn.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlscWtpeXdzY3hvZHBram5zZmtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODUxMDQ4MjcsImV4cCI6MjAwMDY4MDgyN30.Dk8gReDA1S8WP8qNsxSAeJLd5j--rrmDKDXivQtvBKo"
    );
    const { data, error } = await supabase.from("buyers").insert([formData]); // Insert the form data into the "buyers" table
    if (error) {
      console.error("Error inserting data:", error);
    } else {
      console.log("Data inserted successfully:", data);
      // Redirect to the confirmation page
      router.push("/confirmation");
    }
  }

  function submitted(e) {
    e.preventDefault();
    const formData = {
      name: e.target.elements.name.value,
      email: e.target.elements.email.value,
      phone: e.target.elements.phone.value,
      address: e.target.elements.address.value,
      postalCode: e.target.elements.postalCode.value,
      basket: parsedContent,
    };
    submitToSupabase(formData);
  }

  return (
    <>
      <Head>
        <title>Checkout | Boom Fest</title>
      </Head>
      <div className="hero">
        <h1>Checkout</h1>
      </div>
      <div className="container_container">
        <div className="container_box">
          <div className="content">
            <div className="divide">
              <form ref={formEl} onSubmit={submitted}>
                <div className={styles.form}>
                  <label>
                    <input
                      placeholder="Name"
                      type="text"
                      className={styles.field}
                      name="name"
                      required
                    />
                  </label>
                  <label>
                    <input
                      placeholder="Email"
                      type="email"
                      className={styles.field}
                      name="email"
                      required
                    />
                  </label>
                  <label>
                    <input
                      placeholder="Phone"
                      type="text"
                      className={styles.field}
                      name="phone"
                      required
                    />
                  </label>
                  <label>
                    <input
                      placeholder="Address"
                      type="text"
                      className={styles.field}
                      name="address"
                      required
                    />
                  </label>
                  <label>
                    <input
                      placeholder="Postal Code"
                      type="text"
                      className={styles.field}
                      name="postalCode"
                      required
                    />
                  </label>
                </div>
                <button className="button" type="submit">
                  Send
                </button>
              </form>
            </div>
          </div>
          <div className="divide">
            <div className="basket">
              <h2 className={styles.h2}>
                Time remaining: {Math.floor(timer / 60)}:
                {timer % 60 < 10 ? "0" : ""}
                {timer % 60}
              </h2>
              <CheckoutBasket />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
