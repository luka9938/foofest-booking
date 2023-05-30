import Head from "next/head";
import styles from "./Checkout.module.css";
import { useRouter } from "next/router";
import { useRef } from "react";
import { ticketTypes } from "@/data/ticketTypes";
import { tentTypes } from "@/data/tentTypes";

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

  const ticketPrices = parsedContent.tickets
    ? parsedContent.tickets.map((item) => {
        const ticketType = ticketTypes.find((type) => type.id === item.id);
        const totalPrice = ticketType.price * item.amount;
        return {
          type: "Ticket",
          name: ticketType.name,
          amount: item.amount,
          price: ticketType.price,
          totalPrice,
        };
      })
    : [];

  const tentPrices = parsedContent.tents
    ? parsedContent.tents.map((item) => {
        const tentType = tentTypes.find((type) => type.id === item.id);
        const totalPrice = tentType.price * item.amount;
        return {
          type: "Tent",
          name: tentType.name,
          amount: item.amount,
          price: tentType.price,
          totalPrice,
        };
      })
    : [];

  return (
    <>
      <Head>
        <title>Checkout | Boom Fest</title>
      </Head>
      <div className="hero">
        <h1 className={styles.h1}>CAMPING</h1>
      </div>
      <div className="container">
        <div className="container_box">
          <div className={styles.content}>
            <div className={styles.Checkout}>
              <form ref={formEl} onSubmit={submitted}>
                <div className={styles.form}>
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
                    <input
                      placeholder="Address"
                      type="address"
                      className="field"
                      name="address"
                      required
                    />
                  </label>
                  <label>
                    <input
                      placeholder="Postal_code"
                      type="postal_code"
                      className="field"
                      name="postal_code"
                      required
                    />
                  </label>
                </div>
                <button
                  className="button"
                  onClick={() => router.push("/confirmation")}
                >
                  Send
                </button>
              </form>
            </div>
          </div>
          <div className={styles.checkout}>
            <div className={styles.basket}>
              {ticketPrices.length > 0 && (
                <div>
                  <h2>Your Tickets</h2>
                  <ul>
                    {ticketPrices.map((item, index) => (
                      <li key={index}>
                        {item.name} - Amount: {item.amount} - Price:{" "}
                        {item.price} - Total: {item.totalPrice}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {tentPrices.length > 0 && (
                <div>
                  <h2>Your Tents</h2>
                  <ul>
                    {tentPrices.map((item, index) => (
                      <li key={index}>
                        {item.name} - Amount: {item.amount} - Price:{" "}
                        {item.price} - Total: {item.totalPrice}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
