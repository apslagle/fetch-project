"use client";
import { useCallback, useEffect, useState, useRef } from 'react';

export default function Dog({data, toggleFavorite, favorite}) {
	const match = data.match;
	favorite = favorite || match;
	const heartColor = favorite ? 'red' : 'white';
	const fontColor = favorite ? 'black' : 'white';
	const backgroundColor = favorite ? 'pink' : 'gray';
	const height = match ? '400px' : '300px';
	const width = match ? '50%' : '29%';
	const margin = match ? '25%' : '2%';
	const matchText =  match ? (<h3>Congratulations! You have matched with {data.name}!</h3>) : null;

	const like = () => {
		toggleFavorite(data.id);
	}
	return (
		<div id={data.id} style={{float: 'left', height: height, width: width, margin: margin, backgroundColor: backgroundColor, color: fontColor}}>
			{matchText}
			<h4>Name: {data.name}<span onClick={like} style={{float: 'right', fontSize: 'x-large', marginRight:'5px', color: heartColor}}>♥</span></h4>
			<h4>Age: {data.age}</h4>
			<h4>Breed: {data.breed}</h4>
			<h4>Zip Code: {data.zip_code}</h4>
			<img src={data.img} style={{width: '100%', maxHeight: '150px'}}></img>
		</div>
	)
}
