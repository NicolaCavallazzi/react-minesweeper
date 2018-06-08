import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faSkull from '@fortawesome/fontawesome-free-solid/faSkull'
import faSmile from '@fortawesome/fontawesome-free-solid/faSmile'
import faMeh from '@fortawesome/fontawesome-free-solid/faMeh'
import faTrophy from '@fortawesome/fontawesome-free-solid/faTrophy'
import faClock from '@fortawesome/fontawesome-free-solid/faClock'
import faFlag from '@fortawesome/fontawesome-free-solid/faFlag'

class GameStats extends Component {
	constructor(props){
		super(props);
		this.state = { elapsed: 0, start: 0 }
		this.tick = this.tick.bind(this);
   }

	tick(){
		if(this.props.gameState !== 1){
			clearInterval(this.timer);
		}
		else
			this.setState({elapsed: new Date() - this.state.start});
	}
	
	componentDidUpdate(prevProps, prevState) {
		if(prevProps.gameState === 0 && this.props.gameState === 1){
			// eslint-disable-next-line
			this.state.start = Date.now();
			this.timer = setInterval(this.tick, 200);
		}else if(prevProps.gameState === 1 && this.props.gameState > 1){
			clearInterval(this.timer);
		}else if(this.props.gameState === 0){
			// eslint-disable-next-line
			this.state.elapsed = 0;
		}
  }
	
	
	render() {
		var icon, flags, time;
		const s = this.props.gameState;
		var t = 0;
		flags = <span>{this.props.placedFlags+"/"+this.props.nBombs} <FontAwesomeIcon icon={faFlag} /></span>;
		if(s > 0)
			t = Math.floor(this.state.elapsed/1000);
		time = <span><FontAwesomeIcon icon={faClock} /> {t}</span>;
		if(s === 0) // Game to be started
			icon = <FontAwesomeIcon icon={faMeh} onClick={this.props.onClick} />;
		else if(s === 1) // Game going
			icon = <FontAwesomeIcon icon={faSmile} onClick={this.props.onClick} />;
		else if(s === 2) // You loose
			icon = <FontAwesomeIcon icon={faSkull} onClick={this.props.onClick} />;
		else if (s === 3){ // You win
			icon = <FontAwesomeIcon icon={faTrophy} onClick={this.props.onClick} />;
			flags = <span>{this.props.nBombs+"/"+this.props.nBombs} <FontAwesomeIcon icon={faFlag} /></span>;
		}
		return (
		<div className="game-stats-container">
			<div style={{textAlign: "right"}} ><br />{flags}</div>
			<div className="game-stats">{icon}</div>
			<div style={{textAlign: "left"}} ><br />{time}</div>
		</div>
		);
	}
}


export default GameStats;