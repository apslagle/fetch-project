import Image from "next/image";
import styles from "./page.module.css";
import Login from "./login.tsx";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Login />
      </main>
      <footer className={styles.footer}>
        <a
          href="https://github.com/apslagle"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Created by Andrew Slagle
        </a>
      </footer>
    </div>
  );
}
