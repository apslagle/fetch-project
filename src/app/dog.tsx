"use client";
import { useCallback, useEffect, useState, useRef } from 'react';

export default function Dog({data, toggleFavorite, favorite}) {
	const fontColor = favorite ? 'red' : 'white';
	const like = () => {
		toggleFavorite(data.id);
	}
	return (
		<div id={data.id} style={{float: 'left', height: '300px', width: '29%', margin: '2%', backgroundColor: 'gray'}}>
			<h4>Name: {data.name}<span onClick={like} style={{float: 'right', fontSize: 'x-large', marginRight:'5px', color: fontColor}}>♥</span></h4>
			<h4>Age: {data.age}</h4>
			<h4>Breed: {data.breed}</h4>
			<h4>Zip Code: {data.zip_code}</h4>
			<img src={data.img} style={{width: '100%', maxHeight: '150px'}}></img>
		</div>
	)
}
