'use client';
import Image from "next/image";
import styles from "./page.module.css";
import Login from "./login.tsx";
import Search from "./search.tsx";
import { memo, useState } from "react";

export default function Home() {
  let [user, setUser] = useState('');

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {user ? 
        (<Search />) : 
        (<Login setUser={setUser} />)}
      </main>
      <footer className={styles.footer}>
        <a
          href="https://github.com/apslagle/fetch-project"
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
          See code on Github
        </a>
      </footer>
    </div>
  );
}
