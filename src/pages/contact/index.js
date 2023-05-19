import Head from "next/head";
import styles from "./Contact.module.css";
import { StoreContext } from "@/contexts/buyerContext";
import { useContext, useRef } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/router";

export default function Checkout() {
  const router = useRouter();
  const formEl = useRef(null);
  const state = useContext(StoreContext);
  const { basket } = state;

  // Initialize Supabase client
  const supabase = createClient(
    "https://fbqdkjurwhlhzytwwqng.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZicWRranVyd2hsaHp5dHd3cW5nIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODMwMjY3MjMsImV4cCI6MTk5ODYwMjcyM30.dfxQxZZyAZ1-vFpLrECXTIakwI-UHxBmGtXxAUNtPPQ"
  );

  // Function to submit form data to Supabase
  async function submitToSupabase(formData) {
    const { data, error } = await supabase.from("Contacts").insert(formData);
    if (error) {
      console.error(error);
    } else {
      console.log(data);
    }
  }

  // Function to handle form submission
  function submitted(e) {
    e.preventDefault();
    const formData = {
      name: e.target.elements.name.value,
      email: e.target.elements.email.value,
      phone: e.target.elements.phone.value,
      basket: basket,
    };
    submitToSupabase(formData);
  }

  return (
    <>
      <Head>
        <title>Find buyer | EDC</title>
      </Head>
      <div className="wrapper">
        <div className={styles.content}></div>
      </div>
      <section>
        <div className="kontakt">
          <div className="container">
            <div className="container_box">
              <form ref={formEl} onSubmit={submitted} className="left">
                <h1 className={styles.h1}>
                  Contact potential{" "}
                  <span className={styles.headline}>buyers</span>
                </h1>
                <label>
                  <input
                    placeholder="Name"
                    type="text"
                    className="field"
                    name="name"
                    required
                  />
                </label>

                <label>
                  <input
                    placeholder="Email"
                    type="email"
                    className="field"
                    name="email"
                    required
                  />
                </label>

                <label>
                  <input
                    placeholder="Phone"
                    type="text"
                    className="field"
                    name="phone"
                    required
                  />
                </label>

                <label>
                  <input className="checkbox" type="checkbox" />
                  <p>
                    Yes please, EDC may contact me with offers and information
                    related to the real estate market.
                  </p>
                </label>

                <button
                  className="button"
                  onClick={() => router.push("/confirmation")}
                >
                  Send
                </button>
              </form>
              <div className="right">
                <div className={styles.home}>
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
