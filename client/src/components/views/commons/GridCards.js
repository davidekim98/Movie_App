import React from 'react'
import { Col, Popover } from 'antd';

function GridCards(props) {
	
	if(props.landingPage) {
	   return (
		<div>
			<Col lg={6} md={8} sm={12}>
				<div style={{ position: 'relative' }}>
					<a href ={`/movie/${props.movieId}`}>
						<img style={{width:'220px', height:'320px'}} src={props.image} alt={props.movieName} />
					</a>
				</div>
			</Col>
		</div>
		)
	} else {
	   return (
		<div>
			<Col lg={6} md={8} sm={12}>
				<div style={{ position: 'relative' }}>
					<Popover
						title={props.name}
						content={props.character}
					>
						<a href ={`/cast/${props.castId}`}>
							<img 
								style={{width:'220px', height:'320px'}} 
								src={props.image} 
								alt={props.name} 
							/>
						</a>
					</Popover>
				</div>
			</Col>
		</div>
		)	
	}
	   
	
}

export default GridCards