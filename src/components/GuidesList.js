import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash';

export default function GuidesList() {
	//Create state variables for setList and setSearchTerm
	const [list, setList] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');

	useEffect(() => {
		getList();
	}, []);

	// Create function that pulls data from API and stores it in a state variable
	function getList() {
		axios
			.get(
				`https://cors-anywhere.herokuapp.com/http://lgapi-us.libapps.com/1.1/guides?site_id=8488&key=0b8da796b00334ae3471f60e6a10e8c6&search_terms=${searchTerm}&sort_by=relevance&expand=owner&status=1`
			)
			.then((res) => {
				setList(res.data);
				console.log(res.data);
				console.log(searchTerm);
			});
	}

	// Create function to keep page from refreshing and call getList on Submit
	function handleSubmit(e) {
		e.preventDefault();
		getList();
	}

	// Create function to update search term state variable
	function handleChange(e) {
		setSearchTerm(e.target.value);
	}

	const sortBy = (e) => {
		if (e.target.value === 'name') {
			setList(
				_.orderBy(list, [(list) => list.name.toLowerCase()], [e.target.value])
			);
		} else {
			setList(_.sortBy(list, [e.target.value]));
		}
	};

	return (
		<div>
			<h1 className='text-center mb-4'>LibGuides Search Application</h1>
			<form onSubmit={handleSubmit}>
				<div className='input-group mb-3'>
					<input
						type='text'
						className='form-control'
						placeholder='Enter a Search Term'
						aria-label='Search Term'
						aria-describedby='button-addon2'
						onChange={handleChange}
					/>
					<div className='input-group-append'>
						<button
							className='btn btn-primary'
							type='submit'
							id='button-addon2'
						>
							Submit
						</button>
					</div>
				</div>
				<div className='input-group mb-3 w-50'>
					<div className='input-group-prepend'>
						<label className='input-group-text' htmlFor='inputGroupSelect01'>
							Sort
						</label>
					</div>
					<select
						onChange={sortBy}
						className='custom-select'
						id='inputGroupSelect01'
					>
						<option defaultValue>Choose...</option>
						<option value='name'>Alphabetically</option>
						<option value='owner.last_name'>Author Last Name</option>
						<option value='type_label'>Group Name</option>
					</select>
				</div>
			</form>
			<div className='d-flex flex-wrap'>
				{list.map((guide) => (
					<div key={guide.id} className='p-2  w-50 d-flex'>
						<div className='card mb-4 w-100 d-flex'>
							<h5 className='card-header'>{guide.name}</h5>
							<div className='card-body'>
								<p>Group: {guide.type_label}</p>
								<p>
									Published Date: {guide.published.substring(5, 10)}-
									{guide.published.substring(0, 4)}
								</p>
								<p>{guide.description}</p>
								<p>
									Author: {guide.owner.first_name} {guide.owner.last_name}
								</p>

								<Link
									to={{ pathname: `/${guide.id}` }}
									className='btn btn-primary'
								>
									Read More
								</Link>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
