import React, { useState, useEffect } from 'react';
import './App.css';
import Home from './Home';
import Routes from './Routes';
import Nav from './Nav';
import { decode } from 'jsonwebtoken';
import JoblyApi from './JoblyApi';
import UserContext from './UserContext';
import useLocalStorage from './hooks/useLocalStorage';

const TOKEN_STORAGE_ID = 'jobly-token';

function App(){
	const [ infoLoaded, setInfoLoaded ] = useState(false);
	const [ currentUser, setCurrentUser ] = useState(null);

	const [ _token, setToken ] = useLocalStorage(TOKEN_STORAGE_ID);

	useEffect(
		() => {
			async function getCurrentUser(){
				try {
					let { username } = decode(_token);
					let currentUser = await JoblyApi.getCurrentUser(username);
					console.log(currentUser);
					setCurrentUser(currentUser);
				} catch (err) {
					setCurrentUser(null);
				}
				setInfoLoaded(true);
			}
			setInfoLoaded(false);
			getCurrentUser();
		},
		[ _token ]
	);
	const handleLogOut = () => {
		setCurrentUser(null);
		setToken(null);
	  };
	return (
		<UserContext.Provider value={{ currentUser, setCurrentUser }}>
			<div className="App">
				<Nav logout={handleLogOut} />
				<Routes setToken={setToken} />
			</div>
		</UserContext.Provider>
	);
}

export default App;
