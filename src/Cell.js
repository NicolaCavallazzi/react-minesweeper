import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faFlag from '@fortawesome/fontawesome-free-solid/faFlag'
import faBomb from '@fortawesome/fontawesome-free-solid/faBomb'

class Cell extends Component {
	constructor(props) {
		super(props);
		this.state = {
			x: props.posX,
			y: props.posY,
			value: 0, //0..8 => number of close bombs, B=> bomb
			stat: 0 //0=>undiscovered, 1=>discovered, 2=>flagged
		};
		this.handleClick = this.handleClick.bind(this);
		this.handleRightClick = this.handleRightClick.bind(this);
	}
	
	
	handleClick(e) {
		this.props.onClick(this.state.x, this.state.y);
	}
	
	handleRightClick(e) {
		e.preventDefault();
		this.props.onRightClick(this.state.x, this.state.y);
	}
	
	render() {
		const cl = "cell cell-state-" + this.props.stat + " cell-value-" + this.props.value;
		var val = (this.props.stat === 0 || this.props.value === 0) ? " " : this.props.value
		if(this.props.stat === 2)
			val = <FontAwesomeIcon icon={faFlag} />;
		if(val==="B")
			val = <FontAwesomeIcon icon={faBomb} />;
		if(this.props.gameState > 1 && this.props.stat === 0 && this.props.value === "B")
			val = <FontAwesomeIcon icon={faFlag} style={{color: "#888"}} />;
		if(this.props.gameState===2 && this.props.stat === 2 && this.props.value !== "B")
			val = <span><FontAwesomeIcon icon={faFlag} /><span className="wrong-flag-x">X</span></span>;
		return <div className={cl} onClick={this.handleClick} onContextMenu={this.handleRightClick} >{val}</div>
		
	}
}

export default Cell;