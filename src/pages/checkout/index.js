import Head from "next/head";
import styles from "./Checkout.module.css";
import { useRouter } from "next/router";
import { useRef } from "react";
import { createClient } from "@supabase/supabase-js"; // Import the Supabase client
import CheckoutBasket from "@/components/CheckoutBasket";

export default function Checkout() {
  const router = useRouter();
  const { storedContent } = router.query;

  // Parse the storedContent if it's a JSON string
  const parsedContent = storedContent ? JSON.parse(storedContent) : {};

  const formEl = useRef(null);

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
        <h1>CAMPING</h1>
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
              <CheckoutBasket />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
