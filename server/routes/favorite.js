const express = require('express');
const router = express.Router();
const {Favorite} = require('../models/Favorite');

//=================================
//             Favorite
//=================================

router.post('/favoriteNumber', (req, res) => {
	
	
	//mongoDB에서 favorite 숫자를 가져오기
	Favorite.find({ "movieId":req.body.movieId })
		.exec((err, info) => {
			if(err) return res.status(400).send(err)
			
			res.status(200)
			.json({success:true, favoriteNumber:info.length})
		})
	
	//그다음에 프론트에 다시 숫자 정보를 보내주기
	
	
})

router.post('/favored', (req, res) => {
	
	
	//내가 이 영화를 Favorite 리스트에 넣었는지 정보를 DB에서 가져오기
	Favorite.find({ "movieId":req.body.movieId, 
				   "userFrom":req.body.userFrom })
		.exec((err, info) => {
			if(err) return res.status(400).send(err)
			// 그다음에 프론트에 다시 숫자 정보를 보내주기
			
			let result = false;
			if( info.length !== 0 ) {
				result = true
			}
			
			res.status(200)
			.json({success:true, favored:result})
		})
	
	//그다음에 프론트에 다시 숫자 정보를 보내주기
	
	
})

router.post('/removeFavorite', (req, res) => {
	
	Favorite.findOneAndDelete({
		movieId:req.body.movieId, 
		userFrom:req.body.userFrom
	}).exec((err, doc)=> {
		if(err) return res.status(400).send(err)
		return res.status(200).json({success:true, doc})
	})
	
})

router.post('/addFavorite', (req, res) => {
	
	const favorite = new Favorite(req.body)
	
	favorite.save((err, doc) => {
		if(err) return res.status(400).send(err)
		return res.status(200).json({success:true})
	})
	
})

router.post('/getFavoredMovie', (req, res) => {
	
	Favorite.find({  "userFrom":req.body.userFrom })
		.exec((err, info) => {
			if(err) return res.status(400).send(err)
		
			return res.status(200)
			.json({success:true, favored:info})
		})
	
})

router.post('/removeFromFavorite', (req, res) => {
	
	Favorite.findOneAndDelete({ "movieId":req.body.movieId,
								"userFrom":req.body.userFrom })
		.exec((err, info) => {
			if(err) return res.status(400).send(err)
			
			return res.status(200)
			.json({success:true})
		})
	
})

module.exports = router;
