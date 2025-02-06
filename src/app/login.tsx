"use client";
import { useEffect, useState, useRef } from 'react';

export default function Login() {
	let [name, setName] = useState('');
	let [email, setEmail] = useState('');
	const nameRef = useRef(null);
	const emailRef = useRef(null);

	useEffect(() => {
		nameRef.current.addEventListener('keydown', (event) => {
		  	if (event.key === 'Enter') {
		  		emailRef.current.focus();
		  	}
		})
	})

	return (
		<div>
			<h4>Name</h4>
			<input 
				name='name'
				ref={nameRef}
				onChange={e => setName(e.target.value)}
			/>
			<h4>Email</h4>
			<input 
				name='email' 
				ref={emailRef}
				onChange={e => setEmail(e.target.value)}
			/>
		</div>
	)
}