"use client";
import { useCallback, useEffect, useState, useRef } from 'react';

export default function Dog({data}) {
	return (
		<div id={data.id}>
			<img src={data.img}></img>
			<h4>Name: {data.name}</h4>
			<h4>Age: {data.age}</h4>
			<h4>Breed: {data.breed}</h4>
			<h4>Zip Code: {data.zip_code}</h4>
		</div>
	)
}

/*
age: 10
breed: "Chihuahua"
id: "VXGFTIcBOvEgQ5OCx40W"
img: "https://frontend-take-home.fetch.com/dog-images/n02085620-Chihuahua/n02085620_10976.jpg"
name: "Emory"
zip_code: "48333"
*/