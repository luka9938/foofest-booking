import { useState, useEffect } from "react";
import { useRouter } from "next/router";

function Confirmation() {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsChecked(true);
      setTimeout(() => {
        router.push("/");
      }, 2500);
    });

    return () => clearTimeout(timer);
  }, [router]);

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      backgroundColor: "#fff",
    },
    heading: {
      fontSize: "2rem",
      fontWeight: "bold",
      marginBottom: "1rem",
    },
    message: {
      fontSize: "1.2rem",
      color: "#666",
    },
    checkmark: {
      position: "relative",
      display: "inline-block",
      width: "5rem",
      height: "5rem",
      lineHeight: "5rem",
      borderRadius: "50%",
      textAlign: "center",
      fontSize: "3rem",
      color: "green",
      marginBottom: "1rem",
    },
    circle: {
      position: "absolute",
      top: "0",
      left: "0",
      width: "5rem",
      height: "5rem",
      borderRadius: "50%",
      border: "3px solid green",
    },
  };

  return (
    <div style={styles.container}>
      {isChecked && (
        <span style={styles.checkmark}>
          <span style={styles.circle}></span>
          &#10003;
        </span>
      )}
      <h1 style={styles.heading}>Thanks!</h1>
      <p style={styles.message}>You will hear from us in 1-2 days.</p>
    </div>
  );
}

export default Confirmation;
