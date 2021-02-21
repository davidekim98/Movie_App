import React, {useEffect, useState} from 'react';
import {API_URL, API_KEY, IMAGE_BASE_URL} from '../../Config';
import MainImage from '../commons/MainImage';
import MovieInfo from './Sections/MovieInfo';
import GridCards from '../commons/GridCards';
import { Row } from 'antd';
import avatarImage from '../../images/unknown-avatar.jpg';
import Favorite from './Sections/Favorite';

function MovieDetail(props) {
	
	let movieId = props.match.params.movieId
	const [Movie, setMovie] = useState([])
	const [Cast, setCast] = useState([])
	const [ActorToggle, setActorToggle] = useState(false)
	
	useEffect(() => {
	
		let endPointInfo =
			  `${API_URL}movie/${movieId}?api_key=${API_KEY}`;
		
		fetch(endPointInfo)
			.then(response => response.json())
			.then(response => {
				console.log(response)
				setMovie(response)
			})
		
		let endPointCrew = 
				  `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;

		fetch(endPointCrew)
			.then(response => response.json())
			.then(response => {
				console.log(response)
				setCast(response.cast)
				setActorToggle(true)
			})
					
	}, [])
	
	const toggleActorView = () => {
		setActorToggle(!ActorToggle)
	}
	
	return (
		<div>
			{/* Header */}
				{/* Main Image */}
				{Movie.backdrop_path &&
					<MainImage 
						image={Movie.backdrop_path ? `${IMAGE_BASE_URL}w1280${Movie.backdrop_path}` : null}
						title={Movie.original_title}
						text={Movie.overview}
					/>
				}
			
			
			{/* Body */}
			<div style={{width:'85%', margin:'1rem auto'}}>
				
				{localStorage.getItem('userId') &&
					<div style={{display:'flex', justifyContent:'flex-end'}}>
						<Favorite 
							movieInfo={Movie} 
							movieId={movieId} 
							userFrom={localStorage.getItem('userId')}
						/>
					</div>
				}
				
				{/* Movie Info */}
				<MovieInfo 
					movie={Movie}
				/>
				
				<br />
				{/* Actors Grid */}
				
				<div style={{display:'flex', justifyContent:'center', margin:'2rem'}}>
					<button onClick={toggleActorView}>
						View Cast
					</button>
				</div>
				
				{!ActorToggle &&
					<Row gutter={[16, 16]}>
						{Cast && Cast.map((cast, index)=> (
							<React.Fragment key={index}>
								<GridCards
									castId={cast.id}
									image={cast.profile_path ? `${IMAGE_BASE_URL}w500${cast.profile_path}` : avatarImage}
									name={cast.name}
									character={cast.character}
								/>
							</React.Fragment>
						))}
					</Row>
				}
				
			</div>
		</div>
	)
}

export default MovieDetail