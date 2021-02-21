import React, {useEffect, useState} from 'react';
import {API_URL, API_KEY} from '../../Config';
import CastInfo from './Sections/CastInfo';
import MainImage from '../commons/MainImage';

function CastDetail(props) {
	
	let castId = props.match.params.castId
	console.log(castId)
	
	const [PeopleInfo, setPeopleInfo] = useState([])
	
	useEffect(() => {
	
		let peopleInfo = `${API_URL}person/${castId}?api_key=${API_KEY}`;
		
		fetch(peopleInfo)
			.then(response => response.json())
			.then(response => {
				console.log(response)
				setPeopleInfo(response)
			})
		
	}, [])
	
	return (
		<div>
			{/* Body */}
			<div style={{width:'85%', margin:'1rem auto'}}>
				
				{/* Cast Info */}
				<CastInfo 
					cast={PeopleInfo}
				/>
				
				
			</div>
		</div>
	)
}

export default CastDetail