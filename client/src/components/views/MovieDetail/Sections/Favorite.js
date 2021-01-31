import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import {Button} from 'antd';

function Favorite(props) {
	
	const movieId = props.movieId
	const userFrom = props.userFrom
	const movieTitle = props.movieInfo.title
	const moviePost = props.movieInfo.backdrop_path
	const movieRunTime = props.movieInfo.runtime
	
	const [FavoriteNumber, setFavoriteNumber] = useState(0)
	const [Favored, setFavored] = useState(false)
	
	let variables = {
		userFrom,
		movieId,
		movieTitle,
		moviePost,
		movieRunTime
	}
	
	useEffect(() => {
		
		Axios.post('/api/favorite/favoriteNumber', variables)
			.then(response => {
				if(response.data.success) {
					console.log(response.data.favoriteNumber)
					setFavoriteNumber(response.data.favoriteNumber)
				} else {
					alert('숫자 정보 가져오기 실패')
				}
			})
		
		Axios.post('/api/favorite/favored', variables)
			.then(response => {
				if(response.data.success) {
					console.log(response.data)
					setFavored(response.data.favored)
				} else {
					alert('정보 가져오기 실패')
				}
			})
		
		
		
	}, [])
	
	const onClickFavorite = () => {
		
		if(Favored) {
			Axios.post('/api/favorite/removeFavorite', variables)
				.then(response => {
					if(response.data.success) {
						setFavored(!Favored)
						setFavoriteNumber(FavoriteNumber-1)
					} else {
						alert('Favorite 지우기 실패')
					}
			})
		} else {
			Axios.post('/api/favorite/addFavorite', variables)
				.then(response => {
					if(response.data.success) {
						setFavored(!Favored)
						setFavoriteNumber(FavoriteNumber+1)
					} else {
						alert('Favorite 생성 실패')
					}
			})
		}
	}
	
	return (
		<div>
			<Button onClick={onClickFavorite}>{Favored ? "Added " : "Add to Favorite"} {FavoriteNumber}</Button>
		</div>
	)
}

export default Favorite