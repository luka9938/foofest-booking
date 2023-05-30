import Head from "next/head";
import styles from "./Checkout.module.css";
import { useRouter } from "next/router";
import { useRef } from "react";

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
                {/* Form input fields */}
              </form>
              <div className="right">
                <h2>Your Stored Basket:</h2>
                <pre>{JSON.stringify(parsedContent, null, 2)}</pre>
                {parsedContent.tickets && (
                  <div>{parsedContent.additionalCost}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
