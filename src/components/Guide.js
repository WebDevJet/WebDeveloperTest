import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from './Spinner';
import { motion } from 'framer-motion';

export default function Guide(props) {
	const { id } = props.match.params;
	const [guide, setGuide] = useState('');
	const [loading, isLoading] = useState(false);

	// Set loading to true. Get response from API. Set loading to false.

	useEffect(() => {
		isLoading(true);
		axios
			.get(
				`https://cors-anywhere.herokuapp.com/http://lgapi-us.libapps.com/1.1/guides/${id}?site_id=8488&key=0b8da796b00334ae3471f60e6a10e8c6&expand=owner,pages`
			)
			.then((res) => {
				setGuide(res.data);
				console.log(res.data);
			})
			.then(() => isLoading(false));
	}, [id]);
	console.log(guide);
	return (
		<div>
			{/* If loading is equal to true, Display the spinner component. Else display the card. */}
			{loading === true ? (
				<Spinner />
			) : (
				<motion.div
					initial={{ opacity: 0, y: 100 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					{guide !== '' ? (
						<div className='card'>
							<h1 className='card-header'>{guide[0].name}</h1>
							<div className='card-body'>
								<p>ID: {guide[0].id}</p>
								<p>
									Published Date: {guide[0].published.substring(5, 10)}-
									{guide[0].published.substring(0, 4)}
								</p>
								<p>Group: {guide[0].type_label}</p>
								<p>
									Author: {guide[0].owner.first_name} {guide[0].owner.last_name}
								</p>
								{guide[0].owner.title !== null && (
									<p>Author Title: {guide[0].owner.title}</p>
								)}
								{guide[0].owner.email !== null && (
									<p>Author Email: {guide[0].owner.email}</p>
								)}
								{guide[0].description && null && (
									<p>Description: {guide[0].description}</p>
								)}
								<p>Pages:</p>
								<ul>
									{guide[0].pages.map((page) => (
										<li key={page.id}>
											<a
												href={page.url}
												target='_blank'
												rel='noopener noreferrer'
												className='text-info'
											>
												{page.name}
											</a>
										</li>
									))}
								</ul>
								<a
									href={guide[0].url}
									target='_blank'
									rel='noopener noreferrer'
									className='btn btn-primary'
								>
									View The Full Guide
								</a>
							</div>
						</div>
					) : (
						''
					)}
				</motion.div>
			)}
		</div>
	);
}
