import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import JoblyApi from './JoblyApi';
import CardList from './CardList';
// import UserContext from './UserContext';

export default function Company(){
	const { handle } = useParams();

	const [ company, setCompany ] = useState(null);

	useEffect(
		() => {
			const getCompaniesAndJobs = async () => {
				const c = await JoblyApi.getCompany(handle);
				setCompany(c);
			};
			getCompaniesAndJobs();
		},
		[ handle ]
	);
	if (!company) {
		return <div>Loading...</div>;
	}
	return (
		<div>
			<div className="col-md-8 offset-md-2">
				<h5 className="text-capitalize">{company.name}</h5>
				<p>{company.description}</p>
				
			</div>
		</div>
	);
}

// <CardList cards={company.jobs} apply={apply} />