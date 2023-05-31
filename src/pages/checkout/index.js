import Head from "next/head";
import styles from "./Checkout.module.css";
import { useRouter } from "next/router";
import { useRef } from "react";
import CheckoutBasket from "@/components/CheckoutBasket";

export default function Checkout() {
  const router = useRouter();
  const { storedContent } = router.query;

  // Parse the storedContent if it's a JSON string
  const parsedContent = storedContent ? JSON.parse(storedContent) : {};

  const formEl = useRef(null);

  function submitted(e) {
    e.preventDefault();
    const formData = {
      name: e.target.elements.name.value,
      email: e.target.elements.email.value,
      phone: e.target.elements.phone.value,
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
                    <input placeholder="Name" type="text" className="field" name="name" required />
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
                  <div className={styles.flexRow}>
                    <label>
                      <input
                        placeholder="Address"
                        type="text"
                        className="field"
                        name="address"
                        required
                      />
                    </label>
                    <label>
                      <input
                        placeholder="Postal Code"
                        type="text"
                        className="field"
                        name="postalCode"
                        required
                      />
                    </label>
                  </div>
                </div>
                <button className="button" onClick={() => router.push("/confirmation")}>
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
