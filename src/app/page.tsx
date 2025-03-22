'use client';
import Image from "next/image";
import styles from "./page.module.css";
import Dog from "./dog.tsx";
import Login from "./login.tsx";
import Search from "./search.tsx";
import NavigationButtons from "./navigation.tsx";
import { memo, useState } from "react";
import {baseUrl} from './constants.tsx';

export default function Home() {
  const [user, setUser] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [dogs, setDogs] = useState([]);
  const [next, setNext] = useState('');
  const [previous, setPrevious] = useState('');

  let dogElements = dogs.map(dog =>{
    return (
      <Dog data={dog} key={dog.id} />
    )
  }) || null;


  function searchDogs(options) {
    const queryParams = createQueryParams(options);
    let urlParams = "/dogs/search?size=24&" + queryParams;
    fetchDogs(urlParams);
  }

  const navigateNext = () => {
    fetchDogs(next);
  }

  const navigatePrevious = () => {
    fetchDogs(previous);
  }

  function fetchDogs(urlParams) {
    let request1 = new Request(baseUrl + urlParams, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    });
    fetch(request1).then(makeJson).then(response => {
      let request2 = new Request(baseUrl + "/dogs", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(response.resultIds),
        credentials: "include"
      });
      setNext(response.next);
      setPrevious(response.prev);
      return fetch(request2);
    }).then(makeJson).then(dogs => setDogs(dogs));
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {user ? 
        (<Search searchDogs={searchDogs} />) : 
        (<Login setUser={setUser} />)}
        <div style={{width: '100%'}}>
          {dogElements}
        </div>
        <NavigationButtons previous={navigatePrevious} next={navigateNext} />
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
  const parameters = keys.map(key => isDefined(options[key]) ? `${key}=${options[key]}` : '');
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
