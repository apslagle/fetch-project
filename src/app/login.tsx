"use client";
import { useCallback, useEffect, useState, useRef } from 'react';

export default function Login({setUser}) {
	let [name, setName] = useState('');
	let [email, setEmail] = useState('');
	let [ready, setReady] = useState(false);
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
		let request = new Request("https://frontend-take-home-service.fetch.com/auth/login", {
  			method: "POST",
  			body: JSON.stringify({
  				name: name,
  				email: email
  			}),
  			credentials: 'include'
		});
		fetch(request).then(response => {
			console.log(response)/**/
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
				<button onClick={login}>Login</button>
			</form>
		</div>
	)
}