import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Guide(props) {
	const { id } = props.match.params;
	const [guide, setGuide] = useState('');
	useEffect(() => {
		axios
			.get(
				`https://cors-anywhere.herokuapp.com/http://lgapi-us.libapps.com/1.1/guides/${id}?site_id=8488&key=0b8da796b00334ae3471f60e6a10e8c6&expand=owner,pages`
			)
			.then((res) => {
				setGuide(res.data);
				console.log(res.data);
			});
	}, [id]);
	console.log(guide);
	return (
		<div>
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
								<li>
									<a href={page.url} target='_blank' rel='noopener noreferrer'>
										{page.name}
									</a>
								</li>
							))}
						</ul>
						<a href={guide[0].url} target='_blank' rel='noopener noreferrer'>
							View The Full Guide
						</a>
					</div>
				</div>
			) : (
				''
			)}
		</div>
	);
}
