import React, {useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import './favorite.css';
import Axios from 'axios';
import {Popover} from 'antd';
import {IMAGE_BASE_URL} from '../../Config';

function FavoritePage() {
	
	
	
	const [Favored, setFavored] = useState([])
	
	useEffect(()=> {
		
		fetchFavoredMovie()
		
	}, [])
	
	const fetchFavoredMovie = () => {
		Axios.post('/api/favorite/getFavoredMovie', {userFrom: localStorage.getItem("userId")})
			.then(response => {
				if(response.data.success) {
					console.log(response.data.favored)
					setFavored(response.data.favored)
				} else {
					alert('영화 정보 가져오기 실패')
				}
			})
	}
	
	
	const onClickDelete = (movieId, userFrom) => {
		const variable = {
			movieId,
			userFrom
		}
		
		Axios.post('/api/favorite/removeFromFavorite', variable)
			.then(response => {
				if(response.data.success) {
					fetchFavoredMovie()
				} else {
					alert('리스트에서 지우기 실패')
				}
			})
	}
	
	const renderCards = Favored.map((favor, index)=> {
		
		const content = (
			<div>
				{favor.moviePost ?
					<img src = {`${IMAGE_BASE_URL}w500${favor.moviePost}`}/> 
					: "no image"
				}
			</div>
		)
		
		return <tr key={index}>
					<Popover 
						content={content} 
						title={`${favor.movieTitle}`}
					>
						<td>{favor.movieTitle}</td>
					</Popover>
					<td>{favor.movieRunTime} mins</td>
					<td>
						<Link to={`/movie/${favor.movieId}`}>
							<button>Click</button>
						</Link>
					</td>
					<td><button onClick={() => onClickDelete(favor.movieId, favor.userFrom)}>Remove</button></td>
				</tr>
	})
	
	
	
	
	return (
		<div style={{width: '85%', margin: '3rem auto'}}>
			<h2>Favorite Movies</h2>
			<hr />
			
			<table>
				<thead>
					<tr>
						<th>Movie Title</th>
						<th>Movie RunTime</th>
						<th>Movie Link</th>
						<td>Remove from favorites</td>
					</tr>
				</thead>
				<tbody>
					{renderCards}
				</tbody>
			</table>
		</div>
	)
}

export default FavoritePage