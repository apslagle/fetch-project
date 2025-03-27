'use client';
import Image from "next/image";
import styles from "./page.module.css";
import Dog from "./dog";
import Login from "./login";
import Search from "./search";
import NavigationButtons from "./navigation";
import { memo, useState } from "react";
import {baseUrl} from './constants';
import DogResults from './dogResults'

export default function Home() {
  const [user, setUser] = useState('');
  const [searchParams, setSearchParams] = useState('');


  function searchDogs(options) {
    const queryParams = createQueryParams(options);
    let urlParams = "/dogs/search?size=24&" + queryParams;
    setSearchParams(urlParams);
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {user ? 
        (<Search searchDogs={searchDogs} />) : 
        (<Login setUser={setUser} />)}
        <DogResults searchParams={searchParams} />
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

function createQueryParams(options) {
  const keys = Object.keys(options);
  const parameters = keys.map(key => {
    let value = options[key];
    if (Array.isArray(value)) value = `${value}`;
    return isDefined(value) ? `${key}=${value}` : ''
  });
  const definedParameters = parameters.filter(str => str.length > 0);
  const queryString = definedParameters.join('&');
  return queryString;
}

function isDefined(value) {
  if (typeof value === 'number') {
    return true;
  }
  return value.length > 1;
}

function makeJson(res) {
  return res.json();
}


