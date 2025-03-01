"use client";
import { useCallback, useEffect, useState, useRef } from 'react';
import { baseUrl } from './constants.tsx';
import Select from "react-dropdown-select";


export default function Search({searchDogs}) {
	const [breedOptions, setBreedOptions] = useState([]);
	const [breeds, setBreeds] = useState([]);
	const [ageMin, setMinAge] = useState(0);
	const [ageMax, setMaxAge] = useState(20);
	const [zipCodes, setZipCodes] = useState([]);

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

	function setBreedsWrapper(breeds) {
		breeds = breeds.map(breed => breed.label);
		setBreeds(breeds);
	}

	function addZipCode(e) {
		e.preventDefault();
		let zip = e.target[0].value;
		e.target[0].value = '';
		let newZips = [...zipCodes];
		newZips.push(zip);
		newZips.sort((a, b) => Number(a) - Number(b))
		setZipCodes(newZips);
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

	function removeZip(zip) {
		let newZips = zipCodes.filter(code => code !== zip);
		setZipCodes(newZips);

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

	const zipButtons = zipCodes.map(zip => <ZipButton key={zip} value={zip} removeZip={removeZip} />);

	return (
		<div>
			<h2>Search Options</h2>
			<h3>Possible Breeds</h3>
			<Select 
				options={breedOptions}
				multi={true}
				color={'#4d4d4d'}
				onChange={setBreedsWrapper}
			/>
			<h3>Zip Codes</h3>
			<form onSubmit={addZipCode}>
				<input></input>
				<button type="submit">Submit</button>
			</form>
			{zipButtons}
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

function ZipButton({value, removeZip}) {
	function removeButton() {
		removeZip(value)
	}
	return (
			<button onClick={removeButton}>{value}</button>
		)
}