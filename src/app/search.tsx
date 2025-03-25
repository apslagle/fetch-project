"use client";
import { useCallback, useEffect, useState, useRef } from 'react';
import { baseUrl } from './constants.tsx';
import Select from "react-dropdown-select";


export default function Search({searchDogs}) {
	const [breedOptions, setBreedOptions] = useState([]);
	const [breeds, setBreeds] = useState([]);
	const [ageMin, setMinAge] = useState(0);
	const [ageMax, setMaxAge] = useState(20);
	const [zipCodes, setZipCodes] = useState('');
	let dropdownRef = useRef(null);

	useEffect(() => {
		async function getBreeds() {
			let request = new Request(baseUrl + "/dogs/breeds", {
				method: "GET",
				credentials: 'include'
			});
			let response = await fetch(request)
			let json = await response.json();
			let parsed = json.map((breed, i) => {
				return {
					value: i,
					label: breed
				}
			});
			setBreedOptions(parsed);
			
		}
		getBreeds();
	}, [])
	useEffect(() => {
		let dropdownObserver = new MutationObserver(() => {
			let dropdown = document.getElementsByClassName('react-dropdown-select-dropdown')[0];
			if (dropdown) {
				dropdown.style.background = 'black';
			}
		});
		dropdownObserver.observe(dropdownRef.current.select.current, {
			childList: true
		})
	}, [breedOptions])

	function setBreedsWrapper(breeds) {
		breeds = breeds.map(breed => breed.label);
		setBreeds(breeds);
	}

	function addZipCodes(e) {
		let zip = e.target.value;
		if (zip.length !== 5) {
			setZipCodes('')
			return
		}
		setZipCodes(zip);
	}

	function setMinimumAge(e) {
		e.preventDefault();
		const min = Number(e.target?.value);
		setMinAge(min);
	}

	function setMaximumAge(e) {
		e.preventDefault();
		const max = Math.max(Number(e.target?.value), 1);
		setMaxAge(max);
	}

	function findDogs() {
		let options = {
			breeds,
			zipCodes,
			ageMax,
			ageMin
		}
		searchDogs(options);
	}

	return (
		<div>
			<h2>Search Options</h2>
			<h3>Possible Breeds</h3>
			<Select 
				ref={dropdownRef}
				options={breedOptions}
				multi={false}
				onChange={setBreedsWrapper} 
			/>
			<h3>Zip Codes</h3>
			<form onChange={addZipCodes}>
				<input></input>
				{zipCodes ? null : <p>Zip codes must be exactly 5 characters</p>}
			</form>
			<h3>Age</h3>
			<form>
				<h4>Minimum Age</h4>
				<input onChange={setMinimumAge} ></input>
				<h4>Maximum Age</h4>
				<input onChange={setMaximumAge}></input>
			</form>
			<button onClick={findDogs}>Find a Dog!</button>
		</div>
	)
}