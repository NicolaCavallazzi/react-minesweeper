import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faSkull from '@fortawesome/fontawesome-free-solid/faSkull'
import faSmile from '@fortawesome/fontawesome-free-solid/faSmile'
import faMeh from '@fortawesome/fontawesome-free-solid/faMeh'
import faTrophy from '@fortawesome/fontawesome-free-solid/faTrophy'

class GameStats extends Component {
	render() {
		var icon;
		const s = this.props.gameState;
		if(s === 0) // Game to be started
			icon = <FontAwesomeIcon icon={faMeh} />;
		else if(s === 1) // Game going
			icon = <FontAwesomeIcon icon={faSmile} />;
		else if(s === 2) // You loose
			icon = <FontAwesomeIcon icon={faSkull} />;
		else if (s === 3) // You win
			icon = <FontAwesomeIcon icon={faTrophy} />;
		
		return (
		<div className="game-stats">{icon}</div>
		);
	}
}


export default GameStats;