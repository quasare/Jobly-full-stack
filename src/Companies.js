import React, { useState, useEffect } from 'react';
import CardList from './CardList';
// import Search from './Search';
import JoblyApi from './JoblyApi';
export default function Companies(){
	const [ companies, setCompanies ] = useState([]);

	useEffect(() => {
		async function getCompanies(){
			let companies = await JoblyApi.getCompanies();
			setCompanies(companies);
		}

		getCompanies();
	}, []);
	
	return (
		<div className="col-md-8 offset-md-2">
			<CardList cards={companies} />
		</div>
	);
}
