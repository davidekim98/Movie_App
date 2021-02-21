import React from 'react';
import {IMAGE_BASE_URL} from '../../../Config';

function CastProfile(props) {
	console.log(props.image)
	return (
		<div>
			<img style={{width: '250px'}} 
				src={`${IMAGE_BASE_URL}w500${props.image}`}
			/>
		</div>
	)
}

export default CastProfile