import React from 'react'
import { Descriptions } from 'antd';
import CastProfile from './CastProfile';

function CastInfo(props) {

    const { cast } = props;
	
	const gender = (gen) => {
		if(gen === 1) {
			return "Female"
		} else if(gen === 2) {
			return "Male"
		} else {
			return "Unknown"
		}
	}
    
    return (
        <Descriptions title="Cast Info" bordered>
		<Descriptions.Item label="Photo" span={3}>
			<CastProfile
				image={cast.profile_path}
			/>
		</Descriptions.Item>
        <Descriptions.Item label="Name">{cast.name}</Descriptions.Item>
        <Descriptions.Item label="Gender">{gender(cast.gender)}</Descriptions.Item>
        <Descriptions.Item label="Birthday">{cast.birthday}</Descriptions.Item>	
        <Descriptions.Item label="Place of Birth">{cast.place_of_birth}</Descriptions.Item>
        <Descriptions.Item label="Known For">{cast.known_for_department}</Descriptions.Item>
        <Descriptions.Item label="Popularity">{cast.popularity}</Descriptions.Item>
        <Descriptions.Item label="Biography" span={3}>{cast.biography}</Descriptions.Item>
      	</Descriptions>
    )
}

export default CastInfo