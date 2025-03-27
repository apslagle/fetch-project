'use client'

import NavigationButtons from './navigation';
import Dog from "./dog";
import SortSelect from "./sortSelect";
import {baseUrl} from './constants';
import { memo, useState, useEffect } from "react";

const favoriteKey = 'favoriteDogs';


export default function DogResults({searchParams}) {
	const [sortOrder, setSortOrder] = useState('breed:asc');
  	const [dogs, setDogs] = useState([]);
  	const [next, setNext] = useState('');
  	const [previous, setPrevious] = useState('');
  	const [favorites, setFavorites] = useState([]);
  	const [match, setMatch] = useState(null);

  	function fetchDogs(urlParams) {
  		const sort = urlParams.includes('sort=') ? '' : `&sort=${sortOrder}`;
  		const url = baseUrl + urlParams + sort;
  		const options = generateRequestOptions({
	        method: "GET",
	    });
	    let request1 = new Request(url, options);
	    fetch(request1).then(makeJson).then(response => {
	      	setNext(response.next);
	      	setPrevious(response.prev);
	      	return getDogsByIds(response.resultIds)
    	}).then(makeJson).then(dogs => setDogs(dogs));
  	}

  	useEffect(() => {
  		if (searchParams) {
  			fetchDogs(searchParams);
  		}
  	}, [searchParams, sortOrder])
  	useEffect(() => {
  		let storedFavorites = sessionStorage.getItem(favoriteKey)?.split(',');
  		setFavorites(storedFavorites || []);
  	}, [])

  	function toggleFavorite(targetId) {
  		let newFavorites = favorites.slice(0);
  		if (newFavorites.includes(targetId)) {
  			newFavorites = newFavorites.filter(id => targetId !== id);
  		} else {
  			newFavorites.push(targetId);
  		}
  		sessionStorage.setItem(favoriteKey, newFavorites.join(','));
  		setFavorites(newFavorites);
  	}

  	const findMatch = () => {
  		const url = baseUrl + '/dogs/match';
  		const options = generateRequestOptions({
  			method: 'POST',
  			body: JSON.stringify(favorites)
  		});
  		const request1 = new Request(url, options);
  		fetch(request1).then(makeJson).then(response => {
  			return getDogsByIds([response.match]);
  		}).then(makeJson).then(dogs => {
  			dogs[0].match = true;
  			setPrevious('');
  			setNext('');
  			setDogs(dogs);
  		});
  	}

	let dogElements = dogs.map(dog =>{
		const favorite = favorites.includes(dog.id);
	    return (
	      <Dog data={dog} key={dog.id} toggleFavorite={toggleFavorite} favorite={favorite} />
	    )
  	});
	const navigateNext =  next ? () => fetchDogs(next) : null;
  	const navigatePrevious = previous ? () => fetchDogs(previous) : null;

	if (!searchParams) {
		return null;
	}
	return (
		<div style={{width: '100%'}}>
			<h3>Click the heart of your favorite pups! Select match below and we will match you with one of your favorites!</h3>
			<SortSelect setSortOrder={setSortOrder} />
          	{dogElements}
          	<NavigationButtons previous={navigatePrevious} next={navigateNext} findMatch={findMatch} />
        </div>

    )
}

function makeJson(res) {
  return res.json();
}

function generateRequestOptions(options) {
	let result = {
		headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        ...options
	}
	return result;
}

function getDogsByIds(ids) {
	const url = baseUrl + "/dogs";
	const options = generateRequestOptions({
        method: "POST",
        body: JSON.stringify(ids),
    })
  	let request = new Request(url, options);
  	return fetch(request);
}