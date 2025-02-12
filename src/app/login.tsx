"use client";
import { useCallback, useEffect, useState, useRef } from 'react';
import {baseUrl} from './constants.tsx';

export default function Login({setUser}) {
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

	});

	const login = (e) => {
		e.preventDefault()
		const nameUndefined = !name;
		const emailUndefined = !email;
		if (nameUndefined || emailUndefined) {
			alert('Name and Email must both be provided to login');
			return;
		}
		let request1 = new Request(baseUrl + "/auth/login", {
  			method: "POST",
  			headers: {
		        "Content-Type": "application/json"
		    },
  			body: JSON.stringify({
  				name: name,
  				email: email
  			}),
  			credentials: "include"
		});
		fetch(request1).then(response => {
			setUser(name);
		});
	};

	return (
		<div>
			<form>
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
				<br></br>
				<button onClick={login}>Login</button>
			</form>
		</div>
	)
}