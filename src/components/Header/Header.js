import styles from "./Header.module.css";
import Link from "next/link";

export function Header() {
  return (
    <>
      <header className={styles.navbar}>
        <div className={`${styles.container} ${styles.nav_container}`}>
          <div className={styles.logo}>
            <Link
              href="https://foofest-weebs-six.vercel.app/"
              aria-label="Logo"
            >
              <img src="./logo.png" alt="Logo" />
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
